function toggleNav() {
    var menuOpen = document.getElementById("menu-open")
    var menuClose = document.getElementById("menu-close")
    
    if (menuClose.classList.contains("hidden")) {
        menuOpen.classList.add("hidden")
        menuClose.classList.remove("hidden")
    } else {
        menuOpen.classList.remove("hidden")
        menuClose.classList.add("hidden")
    }
}