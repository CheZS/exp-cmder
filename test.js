var req = {
	body: {
		arg1: 1,
		arg2: 'two',
		arg3: true
	}
}

function test(arg1, arg2, arg3) {
	console.log(arg1);
	console.log(arg2);
	console.log(arg3);
}


require('./cmder').cmder(req, test);