# Using the square root of 2 (approx. 1.414) as the scaling factor for base-2 progression
base_font_size = 0.5  # in pixels
base_letter_spacing = 0.25

sqr2 = 1.414  # square root of 2
cRoot = 1.2599  # cube root of 2
n = 18  # Number of values on each side of 'normal' (tight and wide)

# Compute font sizes
font_sizes = [base_font_size * (cRoot ** i) for i in range(n)]

# Compute letter spacings
tight_values = [-0.01 * (cRoot ** i) for i in range(1, n + 1)]
wide_values = [0.01 * (cRoot ** i) for i in range(1, n + 1)]
letter_spacings = tight_values[::-1] + [0] + wide_values

# Compute spacings
spacings = [base_letter_spacing * (cRoot ** i) for i in range(n)]

font_sizes = ['xxxs', 'xxs', 'xs', 'sm', 'base', 'lg', 'xl'] + [f'{i}xl' for i in range(2, n)]

for i in range(len(font_sizes)):
    print(f"'{font_sizes[i]}':'{font_sizes[i]}rem',")

for i in range(len(spacings)):
    print(f"'{i+1}':'{spacings[i]}rem',")

letterSpacing = ['tight' + str(i+1) for i in range(n)][::-1] + ['normal'] + ['wide' + str(i+1) for i in range(n)]
for i in range(len(letter_spacings)):
    print(f"'{letterSpacing[i]}':'{letter_spacings[i]}em',")
