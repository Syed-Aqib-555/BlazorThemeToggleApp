(function () {
    const storageKey = "theme";

    function normalizeTheme(theme) {
        return theme === "dark" ? "dark" : "light";
    }

    function getStoredTheme() {
        try {
            return normalizeTheme(localStorage.getItem(storageKey));
        } catch {
            return "light";
        }
    }

    function applyTheme(theme) {
        const normalizedTheme = normalizeTheme(theme);

        document.documentElement.dataset.theme = normalizedTheme;

        if (document.body) {
            document.body.classList.remove("theme-light", "theme-dark");
            document.body.classList.add(`theme-${normalizedTheme}`);
        }

        return normalizedTheme;
    }

    window.blazorTheme = {
        get: getStoredTheme,
        apply: applyTheme,
        set: function (theme) {
            const normalizedTheme = applyTheme(theme);

            try {
                localStorage.setItem(storageKey, normalizedTheme);
            } catch {
                // The visual theme can still change even if browser storage is unavailable.
            }

            return normalizedTheme;
        }
    };

    applyTheme(getStoredTheme());
})();
