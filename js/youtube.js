var observer = new MutationObserver(function (mutations) {
    mutations.forEach(function (mutation) {
        if (mutation.addedNodes.length) {
            if (document.querySelector(".ytp-ad-skip-button.ytp-button")) {
                document.querySelector(".ytp-ad-skip-button.ytp-button").click();
            }
            if (
                document.querySelector(
                    "#container .ytp-ad-overlay-container.ytp-rounded-overlay-ad"
                )
            ) {
                document
                    .querySelector(
                        "#container .ytp-ad-overlay-container.ytp-rounded-overlay-ad"
                    )
                    .remove();
            }
        }
    })
})

var domElement = document.querySelector("body")
observer.observe(domElement, {
    childList: true,
    characterData: true,
    atributes: true,
    subtree: true,
    attributeOldValue: true,
    characterDataOldValue: true
})