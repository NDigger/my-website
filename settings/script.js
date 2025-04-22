import { setPageColors, clearAndAdd } from "/features/globalAdjustments.js";

const cloudsInput = document.getElementById("clouds");
const animationsInput = document.getElementById("animations");
const colorPaletteButton = document.getElementById("color-palette-button");
const saveBtn = document.getElementById("save");

const inputs = [cloudsInput, animationsInput];

const enableSaveButtonOnClick = element => {
    if (Array.isArray(element)) {
    element.forEach(el => {
        el.addEventListener("click", () => {saveBtn.removeAttribute("disabled")});
    }) 
    } else {
        element.addEventListener("click", () => {saveBtn.removeAttribute("disabled")})
    }
} 

const saveData = () => {
    localStorage.setItem("settings", JSON.stringify({
       cloudsEnabled: cloudsInput.checked,
       animationsEnabled: animationsInput.checked,
       colorPalette: currentColor,
    }))
}

const loadData = () => {
    const raw = localStorage.getItem("settings");
    return raw ? JSON.parse(raw) : null
}

const loadCheckedInputs = () => {
    const settings = loadData();
    if (!settings) return;

    if (!settings.cloudsEnabled) cloudsInput.checked = false;
    if (!settings.animationsEnabled) animationsInput.checked = false;
}

let currentColor = loadData()?.colorPalette ?? 0;

colorPaletteButton.addEventListener("click", () => {
    currentColor >= 3 ? currentColor = 0 : currentColor++;
    setPageColors(currentColor);
})

saveBtn.addEventListener("click", () => {
    saveBtn.setAttribute("disabled", "true");
    saveData()
});

enableSaveButtonOnClick(inputs);
enableSaveButtonOnClick(colorPaletteButton);
loadCheckedInputs();

