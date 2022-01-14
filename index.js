const fs = require('fs');

let cmdArg = process.argv[2],
    lines = [],
    screen = [],
    fileBuffer, arrBuffer;

try {
    fileBuffer = fs.readFileSync(cmdArg);
} catch (error) {
    console.error("Pass the file!");
}

// fileBuffer = fs.readFileSync(cmdArg);
// convert to array buffer
arrBuffer = fileBuffer.buffer.slice(fileBuffer.byteOffset, fileBuffer.byteOffset + fileBuffer.byteLength);

for (let i = 0; i < arrBuffer.byteLength; i += 8) {
    if (!((arrBuffer.byteLength - i) < 8)) {
        lines.push(Array.from(new Uint8Array(arrBuffer, i, 8)).map(x => x.toString(16).padStart(2, 0)));
    } else {
        lines.push(Array.from(new Uint8Array(arrBuffer, i, (arrBuffer.byteLength - i))).map(x => x.toString(16).padStart(2, 0)));
    }
}

function formatAddress(arrBuffer) {
    let addrLines = [],
        address = 0;
    for (let i = 0; i < (lines.length / 2); i++) {
        address += 16;
        addrLines.push(address.toString(16).padStart(8, 0));
    }
    return addrLines;
}
// console.log(formatAddress(arrBuffer));

function formatHexCode(lines) {
    const element = [];
    let v = lines.map(v => v.join(" "));
    for (let i = 0; i < lines.length; i += 2) {
        element.push(`${v[i]}  ${v[i+1]}`);
    }
    return element;
}
function concatAscii(lines) {
    const element = [];
    let v = lines.map(v => v.join(""));
    for (let i = 0; i < lines.length; i += 2) {
        element.push(`${v[i]}${v[i+1]}`);
    }
    return element;
}
/*  [
  '30', '0f', '24',
  '4f', '48', '00',
  '00', '00'
]
*/
function formatAscii(lines) {
    let c = [];
    for (let i = 0; i < lines.length; i++) {
       let value = [...lines[i].map(v => parseInt(v, 16))];
       c.push(...[value.map(value => value >= 0x20 && value < 0x7f ? String.fromCharCode(value) : ".")]);
    }
    return concatAscii(c);
}

function formatScreen(params) {
    let address = formatAddress();
    let hexCode = formatHexCode(lines);
    let ascii = formatAscii(lines);
    for (let i = 0; i < (lines.length / 2); i++) {
        console.log(`${address[i]}  ${hexCode[i]} |${ascii[i]}|`);

    }
}
formatScreen();
// console.log(formatHexCode());
// console.log(lines);