const body = document.querySelector("body");
const settings = JSON.parse(localStorage.getItem("settings"));

const clearAndAdd = name => {
    body.classList.remove("orange");
    body.classList.remove("space");
    body.classList.remove("redblack");
    body.classList.add(name);
};

const setPageColors = (colorPalette) => {
    if (colorPalette != null) {
        switch (colorPalette) {
            case 0: body.className = ''; break;
            case 1: clearAndAdd("orange"); break;
            case 2: clearAndAdd("space"); break;
            case 3: clearAndAdd("redblack"); break;
        }
    }
}

setPageColors(settings?.colorPalette)

export {clearAndAdd, setPageColors}
