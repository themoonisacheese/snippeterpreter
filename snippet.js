import { Vyxal } from "https://vyxal.github.io/Vyxal/vyxal.js";
console.log("Vyxal " + Vyxal.getVersion())

// Load the short dictionary
const shortDictPromise = fetch("https://vyxal.github.io/Vyxal/ShortDictionary.txt")
    .then(response => response.text())
    .then(data => Vyxal.setShortDict(data))
    .catch(error => console.error("Failed to load short dictionary:", error));

// Load the long dictionary
const longDictPromise = fetch("https://vyxal.github.io/Vyxal/LongDictionary.txt")
    .then(response => response.text())
    .then(data => Vyxal.setLongDict(data))
    .catch(error => console.error("Failed to load long dictionary:", error));

// Wait for both dictionaries to load before proceeding
Promise.all([shortDictPromise, longDictPromise]).then(() => {
    // Create input and button elements
    const input = document.createElement("input");
    input.type = "text";
    input.id = "vyxalInput";
    input.placeholder = "Args (JSON or bare ints)";
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
    if (args.length === 0) {
        args.push([]);
    }
    for (const a of args){
        var out=[a," -> "]
        Vyxal.execute(s, a, "", out.push.bind(out), out.push.bind(out)) 
        console.log(out.join(""))
    }
});