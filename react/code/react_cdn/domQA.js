/**
 * Feature
 * - Copy the color
 * - save the color
 * - Generate random color
 */
/**
 * Color representation
 * - Hex #rrggbb
 * - RGB rgb(0-255, 0-255, 0-255)
 * - RGBA rgba(0-255, 0-255, 0-255, 0-1)
 */

/**
 * What is binary number?
 * - 0,1
 * What is Decimal Number?
 * - 0,1,2,3,4,5,6,7,8,9
 * What is Hex Decimal Number
 * - 0-9,a,b,c,d,e,f
 */
class RandomColor {
  constructor() {
    (this.colors = []),
      (this.root = document.getElementById("root")),
      (this.currentColor = "");
  }

  generateRandomColorRGB() {
    const r = Math.floor(Math.random() * 255);
    const g = Math.floor(Math.random() * 255);
    const b = Math.floor(Math.random() * 255);
    return `rgb(${r},${g},${b})`;
  }

  generateRandomColorHex() {
    const hexDigit = [
      "0",
      "1",
      "2",
      "3",
      "4",
      "5",
      "6",
      "7",
      "8",
      "9",
      "a",
      "b",
      "c",
      "d",
      "e",
      "f",
    ];
    let hexCode = "#";
    for (let i = 0; i < 6; i++) {
      let digitIndex = Math.floor(Math.random() * 16);
      hexCode += hexDigit[digitIndex];
    }
    return hexCode;
  }

  generateRandomColorHandler = (e) => {
    console.log("generate handler");

    e.stopPropagation();
    console.log(this.currentColor);
    const color = this.generateRandomColorHex();
    console.log(color);
    document.getElementById("random-color-container").style.backgroundColor =
      color;
    this.currentColor = color;
  };

  copyColorHandler = (e) => {
    console.log("Copy handler");
    e.stopPropagation();
    navigator.clipboard.writeText(this.currentColor);
  };

  saveColorHandler = (e) => {
    console.log("Copy handler");
    e.stopPropagation();
    if (!this.colors.includes(this.currentColor)) {
      this.colors.push(this.currentColor);
      const colorCircle = document.createElement("span");
      colorCircle.dataset.value = this.currentColor;
      colorCircle.className = "color_circle";
      colorCircle.style.backgroundColor = this.currentColor;
      colorCircle.addEventListener("click", this.colorCircleClickHandler);
      document.getElementById("color_viewer").appendChild(colorCircle);
    }
  };

  colorCircleClickHandler = (e) => {
    const tempColor = e.target.dataset.value;
    document.getElementById("random-color-container").style.backgroundColor =
      tempColor;
  };
  randomColorViewer() {
    const randomColorContainer = document.createElement("div");
    randomColorContainer.id = "random-color-container";
    randomColorContainer.style.backgroundColor = this.generateRandomColorHex();

    const generateButton = document.createElement("button");
    generateButton.innerText = "Generate";
    generateButton.addEventListener("click", (e) =>
      this.generateRandomColorHandler(e)
    );

    const copyButton = document.createElement("button");
    copyButton.innerText = "Copy";
    copyButton.addEventListener("click", (e) => this.copyColorHandler(e));

    const saveButton = document.createElement("button");
    saveButton.innerText = "Save";
    saveButton.addEventListener("click", (e) => this.saveColorHandler(e));

    const colorViewer = document.createElement("div");
    colorViewer.id = "color_viewer";
    const nodes = [generateButton, copyButton, saveButton, colorViewer];
    randomColorContainer.append(...nodes);
    this.root.append(randomColorContainer);
  }
}

(function init() {
  document.addEventListener("DOMContentLoaded", () => {
    const randomColor = new RandomColor();
    randomColor.randomColorViewer();
  });
})();
