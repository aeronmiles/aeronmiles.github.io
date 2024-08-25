const fontkit = require('fontkit');
const sharp = require('sharp');

async function generateGlyphSDF(glyph, fontSize: number): Promise<Buffer> {
    try {
        const scale = 10;
        const width = Math.ceil(glyph.advanceWidth * scale);
        const height = Math.ceil(fontSize * scale);
        
        const svgPath = glyph.path.toSVG(2);
        const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}">
            <path d="${svgPath}" fill="black" transform="translate(0,${height}) scale(1,-1)"/>
        </svg>`;

        const svgBuffer = Buffer.from(svg);

        // Convert SVG to grayscale image
        const { data } = await sharp(svgBuffer)
            .resize(width, height)
            .greyscale()
            .raw()
            .toBuffer({ resolveWithObject: true });

        // Compute SDF
        const sdfData = new Uint8ClampedArray(width * height);
        const maxDist = Math.sqrt(width * width + height * height);

        for (let y = 0; y < height; y++) {
            for (let x = 0; x < width; x++) {
                const idx = y * width + x;
                const inside = data[idx] < 128;
                let minDist = maxDist;

                // Simple distance field computation
                for (let sy = 0; sy < height; sy++) {
                    for (let sx = 0; sx < width; sx++) {
                        const sIdx = sy * width + sx;
                        const sInside = data[sIdx] < 128;
                        if (inside !== sInside) {
                            const dx = x - sx;
                            const dy = y - sy;
                            const dist = Math.sqrt(dx * dx + dy * dy);
                            minDist = Math.min(minDist, dist);
                        }
                    }
                }

                // Normalize and adjust contrast
                const normDist = Math.min(minDist / maxDist, 1);
                sdfData[idx] = inside ? normDist * 255 : 255 - normDist * 255;
            }
        }

        return Buffer.from(sdfData);
    } catch (error) {
        console.error('Error in generateGlyphSDF:', error);
        throw error;
    }
}

async function generateSDFTextureSheet(fontPath: string, fontSize: number, glyphs: string[], outputFilePath: string): Promise<void> {
    try {
        const font = fontkit.openSync(fontPath);
        const scale = 10;
        const maxWidth = 1024;
        const maxHeight = 1024;

        const canvasBuffer = Buffer.alloc(maxWidth * maxHeight, 255);
        
        let x = 0;
        let y = 0;
        let maxHeightInRow = 0;

        for (const char of glyphs) {
            const glyph = font.glyphForCodePoint(char.codePointAt(0) || 0);
            const sdfBuffer = await generateGlyphSDF(glyph, fontSize);

            const glyphWidth = Math.ceil(glyph.advanceWidth * scale / 10);
            const glyphHeight = Math.ceil(fontSize * scale / 10);

            if (x + glyphWidth > maxWidth) {
                x = 0;
                y += maxHeightInRow;
                maxHeightInRow = 0;
            }

            if (y + glyphHeight > maxHeight) {
                break;
            }

            // Composite the SDF buffer onto the canvas buffer
            for (let j = 0; j < glyphHeight; j++) {
                for (let i = 0; i < glyphWidth; i++) {
                    const srcIdx = j * glyphWidth + i;
                    const dstIdx = (y + j) * maxWidth + (x + i);
                    canvasBuffer[dstIdx] = sdfBuffer[srcIdx];
                }
            }

            x += glyphWidth;
            maxHeightInRow = Math.max(maxHeightInRow, glyphHeight);
        }

        // Convert the canvas buffer to an image and save it
        await sharp(canvasBuffer, {
            raw: {
                width: maxWidth,
                height: maxHeight,
                channels: 1
            }
        })
        .png()
        .toFile(outputFilePath);
    } catch (error) {
        console.error('Error in generateSDFTextureSheet:', error);
        throw error;
    }
}

// Example usage
const font = 'IBM_Plex_Mono/IBMPlexMono-Regular';
const fontPath = `./src/_dev/${font}.ttf`;
const fontSize = 64;
const glyphs = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'.split('');
// const glyphs = '0'.split('');
const outputFilePath = `./${font.split('/')[1]}.png`;

generateSDFTextureSheet(fontPath, fontSize, glyphs, outputFilePath)
    .then(() => console.log('Texture sheet generated and saved as', outputFilePath))
    .catch((err) => console.error('Error generating texture sheet:', err));