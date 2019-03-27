function Observer (data) {
	this.data = data
	this.walk(data)
}

Observer.prototype = {
	walk: function (data) {
		var self = this
		Object.keys(data).forEach(function (key) {
			self.defineReactive(data, key, data[key])
		})
	},
	defineReactive: function (data, key, value) {
		var dep = new Dep()
		observe(value)
		Object.defineProperty(data, key, {
			enumerable: true,
			configurable: true,
			get: function () {
				if (Dep.target) {
					dep.addSub(Dep.target)
				}
				return value
			},
			set: function (newVal) {
				value = newVal
				dep.notify()
			}
		})
	}
}

function Dep () {
	this.subs = []
}

Dep.prototype = {
	addSub: function (sub) {
		this.subs.push(sub)
	},
	notify: function (argument) {
		this.subs.forEach(function (item) {
			item.update()
		})
	}
}

function observe (data, vm) {
	if (!data || typeof data !== 'object') {
		return
	}
	return new Observer(data)
}