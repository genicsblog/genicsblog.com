window.onscroll = function () { setStickyness() };

var navbar = document.getElementById("navbar");
var banner = document.getElementById("banner");
var sticky = navbar.offsetTop;

function setStickyness() {
    if (window.pageYOffset >= sticky) {
        navbar.classList.add("fixed");
        banner.classList.add("mt-16");
    } else {
        navbar.classList.remove("fixed");
        banner.classList.remove("mt-16");
    }
}

function toggleNav() {
    var menuOpen = document.getElementById("menu-open")
    var menuClose = document.getElementById("menu-close")
    var mobileNav = document.getElementById("mobile-nav")

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

function showSearch() {
    document.getElementById("search-container").classList.remove("hidden");
    document.getElementById("search-input").focus();
    var sjs = SimpleJekyllSearch({
        searchInput: document.getElementById("search-input"),
        resultsContainer: document.getElementById("results-container"),
        json: "/search.json",
        debounceTime: 500,
        noResultsText: "<span class='mt-2 flex'>No results found</span>",
        searchResultTemplate: `<a class="search-item underline-none hover:border-{category}" href="{url}"><span>{title}</span></a>`,
    });
}

function hideSearch() {
    document.getElementById("search-container").classList.add("hidden");
    document.getElementById("search-input").value = "";
    document.getElementById("results-container").innerHTML = "";
}

document.getElementById("search-container")
    .addEventListener("click", function (event) {
        if (event.target.id === "search-container") {
            hideSearch();
        }
    });