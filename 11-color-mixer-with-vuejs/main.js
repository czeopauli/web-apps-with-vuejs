"use strict";

Vue.createApp({
  data() {
    return {
      red: 0,
      green: 0,
      blue: 0,
      hexvalue: "#000000",
    };
  },

  methods: {
    //hier werden Zahlen in einen Hex-Wert konvertiert. Hexdezimaldarstellung gibt es 16 Ziffern. Mindestlänge von 2, wenn weniger wird mir 0 aufgefüllt.
    numToHex(num) {
      return num.toString(16).padStart(2, "0");
    },

    //hintergrundfarbe wird aktualisiert
    updateBackgroundColor() {
      const rgbColor = `rgb(${this.red},${this.green},${this.blue})`;
      document.body.style.backgroundColor = rgbColor;

      const hexRed = this.numToHex(this.red);
      const hexGreen = this.numToHex(this.green);
      const hexBlue = this.numToHex(this.blue);

      //zuweisung des hexadezimalwertes + zusammenführung der einzelnen Werte zu einem einzigen Wert
      this.hexvalue = `#${hexRed}${hexGreen}${hexBlue}`;
    },
    //zufällige farbe wird von der api abgerufen
    fetchRandomColor() {
      fetch("https://dummy-apis.netlify.app/api/color")
        .then((response) => response.json())
        .then((jsonData) => {
          this.red = jsonData.rgb.r;
          this.green = jsonData.rgb.g;
          this.blue = jsonData.rgb.b;
          this.updateBackgroundColor();
        });
    },
  },
}).mount("#app");

/*
const body = document.querySelector("body");
const redSlider = document.getElementById("red");
const greenSlider = document.getElementById("green");
const blueSlider = document.getElementById("blue");
const hexColor = document.getElementById("hex-color");

let red = redSlider.value;
let green = greenSlider.value;
let blue = blueSlider.value;

function numToHex(rgb) {
  rgb = parseInt(rgb).toString(16);
  return rgb.length === 1 ? "0" + rgb : rgb;
}

function updateBackgroundColor() {
  let rgbColor = "rgb(" + red + "," + green + "," + blue + ")";
  body.style.backgroundColor = rgbColor;
  hexColor.innerText = "#" + numToHex(red) + numToHex(green) + numToHex(blue);
}

redSlider.addEventListener("input", (event) => {
  red = event.target.value;
  updateBackgroundColor();
});

greenSlider.addEventListener("input", (event) => {
  green = event.target.value;
  updateBackgroundColor();
});

blueSlider.addEventListener("input", (event) => {
  blue = event.target.value;
  updateBackgroundColor();
});
updateBackgroundColor();

function fetchRandomColor() {
  const fetchRequest = fetch("https://dummy-apis.netlify.app/api/color");
  fetchRequest
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
    })
    .then((jsonData) => {
      hexColor.innerText = jsonData.color;
      red = jsonData.rgb.r;
      green = jsonData.rgb.g;
      blue = jsonData.rgb.b;
      redSlider.value = jsonData.rgb.r;
      greenSlider.value = jsonData.rgb.g;
      blueSlider.value = jsonData.rgb.b;
    });
  updateBackgroundColor();
}

const randomBtn = document.getElementById("randomBtn");
randomBtn.addEventListener("click", fetchRandomColor);*/
