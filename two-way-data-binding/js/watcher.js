function Watcher (vm, exp, callBack) {
	this.vm = vm
	this.callBack = callBack
	this.exp = exp
	this.value = this.get()
}

Watcher.prototype = {
	update: function () {
		this.run()
	},
	run: function () {
		var value = Utils.getData(this.vm.data, this.exp)
		var oldValue = this.value
		if (value !== oldValue) {
			this.value = value
			this.callBack.call(this.vm, value, oldValue)
		}
	},
	get: function () {
		Dep.target = this
		var value = Utils.getData(this.vm.data, this.exp)
		Dep.target = null
		return value
	}
}