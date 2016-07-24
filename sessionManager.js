var sessionMap = (function() {
	var instance;
	return instance || (instance = {});
})();
var idArray = (function() {
	var instance;
	return instance || (instance = []);
})();
var currentIndex = (function() {
	var instance;
	return instance || (instance = 0);
})();

const MAX_NUMBER = 4000;
function init() {
	for (var i = 0; i < MAX_NUMBER; i++) {
		idArray.push(i);
	}
	// shuffle
	for (var i = 0; i < MAX_NUMBER; i++) {
		var j = Math.floor(Math.random() * (MAX_NUMBER - i) + i);
		var tmp = idArray[i];
		idArray[i] = idArray[j];
		idArray[j] = tmp;
	}
}

function getNextID() {
	var res = idArray[currentIndex];
	currentIndex = (currentIndex + 1) % MAX_NUMBER;
	return res;
}

function add(ip, mor, user, password, scriptAddress, life) {
	if (sessionMap[id]) {
		return -1;
	}
	var id = getNextID();
	var obj = {
		ip: ip,
		mor: mor,
		user: user,
		password: password,
		scriptAddress: scriptAddress,
		startTime: new Date().toLocaleTimeString(),
		life: life
	}
	sessionMap[id] = obj;
	return id;
}

function check(id, ip) {
	if (!sessionMap[id]) {
		return null;
	}
	var obj = sessionMap[id];
	return (obj.ip === ip) ? obj : null;
}

function del(id) {
	if (!sessionMap[id]) {
		return null;
	}
	var obj = sessionMap[id];
	delete sessionMap[id];
	return obj;
}

function update(id, propertyName, value) {
	if (!sessionMap[id]) {
		return false;
	}
	var obj = sessionMap[id];
	obj[propertyName] = value;
	return true;
}

/* test */
init();
// console.log(idArray);
var id = add('1');
console.log(id);
console.log(check(id, '1'));
console.log(check(id, '2'));
console.log(update(id, 'life', '200'));
console.log(check(id, '1'));
console.log(del(id));
console.log(check(id, '1'));
