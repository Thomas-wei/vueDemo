var Utils = {
	getData: function (data, exp) {
		expArr = exp.split('.')
		var result = data
		expArr.forEach(function (exp) {
			result = result[exp]
		})
		return result
	}
}
