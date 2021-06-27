// 打字机代码
export default class TextScramble {
	constructor(el) {
		this.el = el
		this.chars = '!<>-_\/[]{}—=+*^?#________'
		this.update = this.update.bind(this)
	}
	setText(newText) {
		const oldText = this.el.innerText
		const length = Math.max(oldText.length, newText.length)
		const promise = new Promise((resolve) => this.resolve = resolve)
		this.queue = []
		for (let i = 0; i < length; i++) {
			const from = oldText[i] || ''
			const to = newText[i] || ''
			const start = Math.floor(Math.random() * 40)
			const end = start + Math.floor(Math.random() * 40)
			this.queue.push({ from, to, start, end })
		}
		cancelAnimationFrame(this.frameRequest)
		this.frame = 0
		this.update()
		return promise
	}
	update() {
		let output = ''
		let complete = 0
		for (let i = 0, n = this.queue.length; i < n; i++) {
			let { from, to, start, end, char } = this.queue[i]
			if (this.frame >= end) {
				complete++
				output += to
			} else if (this.frame >= start) {
				if (!char || Math.random() < 0.28) {
					char = this.randomChar()
					this.queue[i].char = char
				}
				output += <span class="dud">${char}</span>
			} else {
				output += from
			}
		}
		this.el.innerHTML = output
		if (complete === this.queue.length) {
			this.resolve()
		} else {
			this.frameRequest = requestAnimationFrame(this.update)
			this.frame++
		}
	}
	randomChar() {
		return this.chars[Math.floor(Math.random() * this.chars.length)]
	}
}

// 使用方法
const el = document.getElementById('descText')
const fx = new TextScramble(el)
const phrases = [
	'我是一名前端',
	'爱吃小熊饼干',
	'上班只为下班',
	'工资刚够早餐',
	'每晚都要加班',
	'只求线上平安',
	'头发快要掉完',
	'前端真的好难',
	'只是无名前端',
	'写代码的憨憨'
]
// fx.setText('写代码的憨憨')
let counter = 0
const next = () => {
	fx.setText(phrases[counter]).then(() => {
		setTimeout(next, 800)
	})
	counter = (counter + 1) % phrases.length
}