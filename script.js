const root = document.documentElement;
const siteHeader = document.querySelector("#siteHeader");
const navToggle = document.querySelector("#navToggle");
const primaryNav = document.querySelector("#primaryNav");
const themeToggle = document.querySelector("#themeToggle");
const themeLabel = document.querySelector(".theme-label");

function getCurrentTheme() {
    return root.dataset.theme === "light" ? "light" : "dark";
}

function setTheme(theme) {
    root.dataset.theme = theme;
    localStorage.setItem("granskon-theme", theme);
    updateThemeButton();
}

function updateThemeButton() {
    if (!themeToggle) return;

    const theme = getCurrentTheme();
    const isDark = theme === "dark";

    themeToggle.setAttribute("aria-pressed", String(isDark));
    themeToggle.setAttribute(
        "aria-label",
        isDark ? "Przełącz na tryb jasny" : "Przełącz na tryb ciemny"
    );

    if (themeLabel) {
        themeLabel.textContent = isDark ? "Tryb ciemny" : "Tryb jasny";
    }
}

if (themeToggle) {
    themeToggle.addEventListener("click", () => {
        const nextTheme = getCurrentTheme() === "dark" ? "light" : "dark";
        setTheme(nextTheme);
    });
}

if (navToggle && siteHeader && primaryNav) {
    navToggle.addEventListener("click", () => {
        const isOpen = siteHeader.classList.toggle("nav-open");

        navToggle.setAttribute("aria-expanded", String(isOpen));
        navToggle.setAttribute(
            "aria-label",
            isOpen ? "Zamknij menu" : "Otwórz menu"
        );
    });

    primaryNav.querySelectorAll("a").forEach((link) => {
        link.addEventListener("click", () => {
            siteHeader.classList.remove("nav-open");
            navToggle.setAttribute("aria-expanded", "false");
            navToggle.setAttribute("aria-label", "Otwórz menu");
        });
    });

    document.addEventListener("click", (event) => {
        const clickedInsideHeader = siteHeader.contains(event.target);

        if (!clickedInsideHeader) {
            siteHeader.classList.remove("nav-open");
            navToggle.setAttribute("aria-expanded", "false");
            navToggle.setAttribute("aria-label", "Otwórz menu");
        }
    });
}

document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener("click", (event) => {
        const targetId = link.getAttribute("href");
        const target = document.querySelector(targetId);

        if (!target) return;

        event.preventDefault();

        target.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });
    });
});

updateThemeButton();