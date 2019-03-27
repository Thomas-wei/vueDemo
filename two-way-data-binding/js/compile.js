function Compile (el, vm) {
	this.el = document.querySelector(el)
	this.vm = vm
	this.fragment = null
	this.init()
}

Compile.prototype = {
	init: function () {
		if (this.el) {
			this.fragment = this.nodeToFragment(this.el)
			this.compileFragment(this.fragment)
			this.el.appendChild(this.fragment)
		} else {
			console.error('dom元素不存在')
		}
	},
	nodeToFragment: function (el) {
		var fragment = document.createDocumentFragment()
		var child = el.firstChild
		while (child) {
			fragment.appendChild(child)
			child = el.firstChild
		}
		return fragment
	},
	compileFragment: function (el) {
		var childNodes = el.childNodes
		var self = this;
		[].slice.call(childNodes).forEach(function (node) {
			var reg = /\{\{(.*)\}\}/
			var text = node.textContent
			if (self.istextNode(node) && reg.test(text)) {
				self.compileText(node, reg.exec(text)[1])
			}
			if (node.childNodes && node.childNodes.length) {
				self.compileFragment(node)
			}
		})
	},
	compileText: function (node, exp) {
		var self = this
		var initText = Utils.getData(this.vm, exp)
		this.updateText(node, initText)
		new Watcher(this.vm, exp, function (val, oldVal) {
			self.updateText(node, val)
		})
	},
	updateText: function (node, value) {
		node.textContent = value || ''
	},
	istextNode: function (node) {
		return node.nodeType === 3
	}
}