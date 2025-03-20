import { Vyxal } from "https://vyxal.github.io/Vyxal/vyxal.js";
console.log("Vyxal " + Vyxal.getVersion())

// Create input and button elements
const input = document.createElement("input");
input.type = "text";
input.id = "vyxalInput";
input.placeholder = "Args (JSON)";
document.body.appendChild(input);

const button = document.createElement("button");
button.innerText = "Run";
button.onclick = () => {
    const inputValue = document.getElementById("vyxalInput").value;
    let parsedInput;
    try {
        parsedInput = JSON.parse(inputValue);
        if (!Array.isArray(parsedInput)) {
            parsedInput = [parsedInput];
        }
        parsedInput = parsedInput.map(item => typeof item === 'number' ? item.toString() : item);
    } catch (e) {
        console.error("Invalid JSON input");
        return;
    }
    var out = [inputValue, " -> "];
    Vyxal.execute(s, parsedInput, "", out.push.bind(out), out.push.bind(out));
    console.log(out.join(""));
};
document.body.appendChild(button);

var s = document.querySelector("script[type=vyxal3]").text
for (const a of args){
    var out=[a," -> "]
    Vyxal.execute(s, a, "", out.push.bind(out), out.push.bind(out)) 
    console.log(out.join(""))
}