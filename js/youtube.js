var observer = new MutationObserver(mutations => {
    mutations.forEach(mutation => {
        const container = document.querySelector(".video-ads");
        if (!container || container.childElementCount === 0) return;

        const selectors = [".ytp-ad-skip-button.ytp-button", ".ytp-ad-skip-button-modern.ytp-button"];
        for (const selector of selectors) {
            const button = document.querySelector(selector);
            if (button) {
                button.click();
                return true;
            }
        }

        const overlayContainer = document.querySelector("#container .ytp-ad-overlay-container.ytp-rounded-overlay-ad");
        if (overlayContainer) {
            overlayContainer.remove();
            return true;
        }

        const confirmButton = document.getElementById("confirm-button");
        if (confirmButton) {
            confirmButton.click();
            return true;
        }

        const playButton = document.querySelector(".ytp-autonav-endscreen-button-container .ytp-autonav-endscreen-upnext-cancel-button~.ytp-autonav-endscreen-upnext-play-button");
        if (playButton) {
            playButton.click();
            return true;
        }
    });
});

observer.observe(document.querySelector("body"), {
    childList: true,
    characterData: true,
    attributes: true,
    subtree: true,
    attributeOldValue: true,
    characterDataOldValue: true
});
