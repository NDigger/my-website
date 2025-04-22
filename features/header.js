const HTML = `
<header>
    <div id="left-header-refs">
        <a href="/main/index.html">Main Page</a>
    </div>
    <div id="right-header-links">
        <button id="menu-btn">Menu
            <div id="menu-btn-popup" class="header-popup" style="display: none">
                <a href="/index.html">Main Page</a>
                <a href="/discussions/index.html">Discussions</a>
                <a href="/settings/index.html">Settings</a>
                <p class="header-category">Links</p><hr>
                <a href="/drawings/index.html">My Drawings</a>
                <a href="https://ndagger1.itch.io/" target="_blank">My Games</a>
            </div>
        </button>
    </div>
</header>
    `
//<a href="/discussions/index.html">Discussions</a>

const firstChild = document.body.firstChild;
document.body.insertAdjacentHTML('afterbegin', HTML); // Insert HTML in beginning of body

const menuBtn = document.getElementById("menu-btn");
const menuBtnPopup = document.getElementById("menu-btn-popup");
const header = document.querySelector("header");

const popupTabs = [menuBtnPopup]

changePopupTabVisibility = (popupTab) => {
    if (popupTab.style.display !== "none") {
        popupTab.style.display = "none";
    } else {
        popupTab.style.display = "flex";
    }
    popupTabs.forEach(arrPopupTab => {
        if (arrPopupTab !== popupTab && arrPopupTab.style.display === "flex") {arrPopupTab.style.display = "none"}
    })
}

menuBtn.addEventListener("click", () => {
    changePopupTabVisibility(menuBtnPopup)
}) 