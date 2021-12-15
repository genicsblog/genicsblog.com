function toggleNav() {
    let menuOpen = document.getElementById("menu-open")
    let menuClose = document.getElementById("menu-close")
    let mobileNav = document.getElementById("mobile-nav")
    
    if (menuClose.classList.contains("hidden")) {
        // nav is opened
        menuOpen.classList.add("hidden")
        menuClose.classList.remove("hidden")
        mobileNav.classList.remove("hidden")
    } else {
        // nav is closed
        menuOpen.classList.remove("hidden")
        menuClose.classList.add("hidden")
        mobileNav.classList.add("hidden")
    }
}