if ('serviceWorker' in navigator) {
    window.addEventListener("load", () => {
    navigator.serviceWorker.register('/sw.js')
    .then(reg => console.log("Service worker registered"))
    .catch(err => console.error(`Service Worker Error: ${err}`));
    });
} else {
    console.log("Service Worker is not supported by browser.");
}
