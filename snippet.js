import { Vyxal } from "https://vyxal.github.io/Vyxal/vyxal.js";
console.log("Vyxal " + Vyxal.getVersion())
var s=document.querySelector("script[type=vyxal3]").text
for (const a of args){
    var out=[a," -> "]
    Vyxal.execute(s, [a], "", out.push.bind(out), out.push.bind(out)) 
    console.log(out.join(""))
}