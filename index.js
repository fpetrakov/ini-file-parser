const fs = require("fs");

const iniFile = fs.readFileSync("./main.ini").toString();
const objectFromIni = parseINI(iniFile);
console.log(objectFromIni);

function parseINI(string) {
	let result = {};
	let section = result;

	string.split(/\r?\n/).forEach((line) => {
		let match;

		if ((match = line.match(/^(\w+)=(.*)$/))) {
			section[match[1]] = match[2];
		} else if ((match = line.match(/^\[(.*)\]$/))) {
			section = result[match[1]] = {};
		} else if (!/^\s*(;.*)?$/.test(line)) {
			throw new Error("Строка '" + line + "' некорректна.");
		}
	});

	return result;
}
