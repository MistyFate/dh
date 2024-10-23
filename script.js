//const autos = ["LKW", "Schwarzer Peugeot", "Weißer Peugeot", "VW"];
const speichernButton = document.querySelector("#speichernButton");
//const autos = JSON.parse(localStorage.getItem("autos")) || [];
const autosListe = document.querySelector("#autosListe");

speichernButton.onclick = speichern;

function speichern(){
    //Variablen aus Eingabefeldern entnehmen
    let auto = document.querySelector("#autos").value;
    let fahrer = document.querySelector("#inputName");
    let kilometer = document.querySelector("#kilometerInput");
    let ort = document.querySelector("#ortInput");
    let anmerkung = document.querySelector("#anmerkungInput");
    
    
}