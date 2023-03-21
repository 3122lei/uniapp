export function verifyPhone(data) {
	let reg = /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/
	return reg.test(data)
}
export function verifPassword(data) {
	let reg = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
	return reg.test(data)
}
