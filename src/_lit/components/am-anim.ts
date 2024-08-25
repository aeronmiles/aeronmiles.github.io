import anime from 'animejs'

export class AMAnim {
  inst = {}
  el = document.querySelector("[anim]")

  constructor() { }

  addInst = (a: anime, att: string) => {
    let id = this.el?.getAttribute(att + '-id')
    if (id == null) return
    if (this.inst[id] == null) this.inst[id] = []
    this.inst[id].push(a)
  }

  removeInst = (a: anime, att: string) => {
    let id = this.el?.getAttribute(att + '-id')
    if (id == null || this.inst[id] == null) return
    let i = this.inst[id].indexOf(a)
    if (i > -1) this.inst[id].splice(i, 1)
    anime.remove(a)
  }

  isMobile = window.matchMedia("(any-pointer: coarse)").matches

  supported = (mobile: boolean, desktop: boolean) => (this.isMobile && mobile || !this.isMobile && desktop) ? true : false

  add = (x: HTMLElement) => {
    let exe = (e, att) => {
      aslice.call(e.children).forEach(c => {
        let a = c.getAttribute(att)
        if (a == null) return
        let id = c.getAttribute(att + '-id')
        if (this.inst[id] != null) this.inst[id].forEach(e => this.removeInst(e, att))
        this.el = c
        this.el?.setAttribute(att + '-id', window.performance.now().toString())
        c.getAttribute(att)?.split(';').forEach(f => {
          let id = c.getAttribute(att + '-id')
          if (id != null) anime.remove(this.inst[id])
          eval(f.split(')')[0] + ",this,'" + att + "')")
        })
      })
    },
      addx = (els) => {
        els.forEach(e => {
          exe(e, 'anim')
          if (this.supported(true, false)) exe(e, 'anim-m')
          if (this.supported(false, true)) exe(e, 'anim-d')
          if (e.children.length > 0) addx(aslice.call(e.children))
        })
      }
    addx([x])
  }
}

let aslice = Array.prototype.slice, r = anime.random
const anim = new AMAnim()
export { anim }


// @ts-ignore
const r_span = (steps, max, addClasses: string, e: Anim, att: string) => {
  let x = e.el
  if (x == null) return
  let t = "", i = 0, m = max / steps, l = x.textContent?.length
  if (!l) return
  while (i < l) {
    let n = Math.min(i + (r(1, steps) * m), l)
    t += '<span class="' + addClasses + '">' + x.textContent?.substring(i, n) + '</span>'
    i = n
  }
  x.innerHTML = t
  att
}

// @ts-ignore
const mech_space = (targetClass, e: Anim, att: string) => {
  let i = 0, a = {}, els = e.el?.querySelectorAll('.' + targetClass),
    run = () => {
      let s = i % r(3, 11) == 0,
        r14 = r(1, 4),
        r510 = r(5, 10)
      i = s ? 1 : ++i
      e.removeInst(a, att)
      a = anime({
        targets: els,
        letterSpacing: () => s ? 0 : r(-15, 10) * 4,
        opacity: () => s ? 1 : r(0, r14) > 0 ? 0 : 1,
        direction: () => r(0, 1) > 0 ? 'normal' : 'reverse',
        easing: () => ['easeInQuad', 'easeInSine', 'easeInExpo', 'linear'][r(0, 3)],
        delay: () => r(0, r510) * 200,
        duration: () => s ? (r(0, 3) * 50) + 10 : r(1, 3) * 2000,
        complete: () => s ? setTimeout(run, r(1, 3) * 3000) : run()
      })
      e.addInst(a, att)
    }
  run()
  att
}

// @ts-ignore
// const span_lines = (addClasses: string, e: Anim, att: string) => {
//   let x = e.el
//   if (x == null) return
//   let t = ""
//   x.textContent?.match(/[^\r\n]+/g)?.forEach(l => {
//     t += '<span class="' + addClasses + '">' + l + '\n</span>'
//   })
//   x.innerHTML = t
//   att
// }

// @ts-ignore
// const r_spans = (steps, max, addClasses: string, e: Anim, att: string) => {
//   let x = e.el
//   if (x == null) return
//   let t = document.createElement("span"), i = 0,
//     cs = Array.prototype.slice.call(x.children),
//     l = cs.length,
//     m = max / steps
//   while (i < l) {
//     let n = Math.min(i + (r(1, steps) * m), l)
//     let cI = document.createElement("span")
//     cI.classList.add(addClasses)
//     cs.slice(i, n).map(e => cI.appendChild(e))
//     console.log(cI)
//     t.appendChild(cI)
//     i = n
//   }
//   x.innerHTML = t.innerHTML
//   att
// }

// span_lines: (addClasses = "", att: string) => {
//   if (e.el === null) return;
//   let t = ""
//   e.el.textContent?.match(/[^\r\n]+/g)?.forEach(l => {
//     t += '<span class="' + addClasses + '">' + l + '\n</span>'
//   })
//   e.el.innerHTML = t
//   att
// },
// r_spans: function r_spans(steps, max, addClasses = "") {
//     let t = document.createElement("span")
//     let i = 0
//     let cs = Array.prototype.slice.call(el.children)
//     let l = cs.length
//     let m = max / steps
//     while (i < l) {
//       let n = Math.min(i + (r(1, steps) * m), l)
//       let cI = document.createElement("span")
//       cI.classList.add(addClasses)
//       cs.slice(i, n).map(e => cI.appendChild(e))
//       console.log(cI)
//       t.appendChild(cI)
//       i = n
//     }
//     el.innerHTML = t.innerHTML
//     return addClasses
//   },
// right_trails: (targets) => {
//   let els = el.querySelectorAll('.' + targets)
//   // let speed = el.cloneNode(1)
//   // let trails = speed.querySelectorAll('.' + targets)
//   // el.parentNode.appendChild(speed)
//   // let e = ['easeInQuad', 'easeInSine', 'easeInExpo', 'linear']
//   let r510 = r(5, 10)
//   let r13
//   function run() {
//     let l = els.length
//     for (let i = 0; i < l; i += 2) {
//       anime({
//         targets: els[r(0, l - 1)],
//         paddingLeft: [
//           {
//             value: () => Math.max(r(0, 4) - 3, 0) * r(1, 5) * 500,
//             duration: () => r(1, 3) * 3000,
//             delay: () => { r13 = r(1, 3); return r13 * 100 }
//           },
//           { value: 0, duration: 0 }],
//         opacity: [
//           {
//             value: 0,
//             duration: 3000,
//             delay: () => { return r13 * 100 }
//           },
//           { value: 1, duration: 0 }],
//         duration: 0,
//         easing: 'linear',
//         loop: true
//       })
//     }
//   }
//   run()
// },


// class TextScramble {
//   constructor(el) {
//     this.el = el
//     this.chars = '!<>-_\\/[]{}—=+*^?#________'
//     this.update = this.update.bind(this)
//   }
//   setText(newText) {
//     const oldText = this.el.innerText
//     const length = Math.max(oldText.length, newText.length)
//     const promise = new Promise((resolve) => this.resolve = resolve)
//     this.queue = []
//     for (let i = 0; i < length; i++) {
//       const from = oldText[i] || ''
//       const to = newText[i] || ''
//       const start = Math.floor(Math.random() * 40)
//       const end = start + Math.floor(Math.random() * 40)
//       this.queue.push({ from, to, start, end })
//     }
//     cancelAnimationFrame(this.frameRequest)
//     this.frame = 0
//     this.update()
//     return promise
//   }
//   update() {
//     let output = ''
//     let complete = 0
//     for (let i = 0, n = this.queue.length; i < n; i++) {
//       let { from, to, start, end, char } = this.queue[i]
//       if (this.frame >= end) {
//         complete++
//         output += to
//       } else if (this.frame >= start) {
//         if (!char || Math.random() < 0.28) {
//           char = this.randomChar()
//           this.queue[i].char = char
//         }
//         output += `<span class="dud">${char}</span>`
//       } else {
//         output += from
//       }
//     }
//     this.el.innerHTML = output
//     if (complete === this.queue.length) {
//       this.resolve()
//     } else {
//       this.frameRequest = requestAnimationFrame(this.update)
//       this.frame++
//     }
//   }
//   randomChar() {
//     return this.chars[Math.floor(Math.random() * this.chars.length)]
//   }
// }


// const phrases = [
//   'Hey,',
//   'put here all the sentences',
//   'that you want to cycle',
//   'they will all be automatically displayed.',
//   'Just',
//   'Like',
//   'This.',
//   'Have fun :)'
// ]

// const el = document.querySelector('.text')
// const fx = new TextScramble(el)

// let counter = 0
// const next = () => {
//   fx.setText(phrases[counter]).then(() => {
//     setTimeout(next, 800)
//   })
//   counter = (counter + 1) % phrases.length
// }

// next()


