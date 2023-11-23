var observer = new MutationObserver(function (mutations) {
    mutations.forEach(function (mutation) {
        if (mutation.addedNodes.length) {

            const container = document.querySelector(".video-ads");
            if (!container || container?.childElementCount === 0) {
                return true;
            }
            const ytpAdSkipButton = document.querySelector(".ytp-ad-skip-button.ytp-button");
            if (ytpAdSkipButton) {
                ytpAdSkipButton.click();
                return true;
            }
            const ytpAdSkipButtonModern = document.querySelector(".ytp-ad-skip-button-modern.ytp-button");
            if (ytpAdSkipButtonModern) {
                ytpAdSkipButtonModern.click();
                return true;
            }
            const ytpAdOverlayContainer = document.querySelector("#container .ytp-ad-overlay-container.ytp-rounded-overlay-ad");
            if (ytpAdOverlayContainer) {
                ytpAdOverlayContainer.remove();
                return true;
            }
            const confirmButton = document.getElementById("confirm-button");
            if (confirmButton) {
                confirmButton.click();
                return true;
            }
            const ytpAutonavEndscreenUpnextPlayButton = document.querySelector(".ytp-autonav-endscreen-button-container .ytp-autonav-endscreen-upnext-cancel-button~.ytp-autonav-endscreen-upnext-play-button");
            if (ytpAutonavEndscreenUpnextPlayButton) {
                ytpAutonavEndscreenUpnextPlayButton.click();
                return true;
            }
        }
    })
})

var domElement = document.querySelector("body");
observer.observe(domElement, {
    childList: true,
    characterData: true,
    atributes: true,
    subtree: true,
    attributeOldValue: true,
    characterDataOldValue: true
});