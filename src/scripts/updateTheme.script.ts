function getThemePreference() {
  if (typeof localStorage !== "undefined" && localStorage.getItem("theme")) {
    return localStorage.getItem("theme");
  }
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}

function setTheme(theme: any) {
  if (theme === "dark") {
    document.documentElement.classList.add("dark");
  } else {
    document.documentElement.classList.remove("dark");
  }
  if (typeof localStorage !== "undefined") {
    localStorage.setItem("theme", theme);
  }
}

// Set theme on load
setTheme(getThemePreference());

// Listen for changes
window.addEventListener("storage", () => {
  setTheme(getThemePreference());
});
