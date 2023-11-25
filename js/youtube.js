// Biến toàn cục để lưu trữ đối tượng MutationObserver
let observer;

// Mảng chứa các selector để tìm kiếm các phần tử quảng cáo trong DOM
const selectors = [
    ".ytp-ad-skip-button.ytp-button",
    ".ytp-ad-skip-button-modern.ytp-button",
    "#container .ytp-ad-overlay-container.ytp-rounded-overlay-ad",
    ".ytp-autonav-endscreen-button-container .ytp-autonav-endscreen-upnext-cancel-button~.ytp-autonav-endscreen-upnext-play-button",
];

// Hàm xử lý hành động cho từng phần tử quảng cáo dựa trên selector
function handleElementAction(selector, element) {
    if (selector.includes("ytp-ad-skip-button") || selector.includes("ytp-autonav-endscreen-upnext-play-button")) {
        element.click();
    } else if (selector.includes("ytp-ad-overlay-container")) {
        element.remove();
    }
}

// Hàm xử lý sự kiện mutation, kiểm tra và xử lý các thay đổi trong DOM
function handleMutation(mutations) {
    // Kiểm tra và ấn nút xác nhận nếu tồn tại
    const confirmButton = document.querySelector("#confirm-button");
    if (confirmButton) {
        confirmButton.click();
        return;
    }

    // Kiểm tra và xử lý các phần tử quảng cáo trong container video
    const container = document.querySelector(".video-ads");
    if (!container || container.childElementCount === 0) {
        return;
    }

    // Duyệt qua mảng selector và xử lý từng phần tử
    selectors.forEach((selector) => {
        const elements = document.querySelectorAll(selector);
        elements.forEach((element) => {
            handleElementAction(selector, element);
        });
    });
}

// Hàm thêm MutationObserver để theo dõi các thay đổi trong DOM
function addObserver() {
    if (!observer) {
        observer = new MutationObserver(handleMutation);
        const config = {
            childList: true,
            characterData: true,
            attributes: true,
            subtree: true,
            attributeOldValue: true,
            characterDataOldValue: true,
        };
        observer.observe(document.body, config);
    }
}

// Hàm ngừng theo dõi các thay đổi trong DOM
function removeObserver() {
    if (observer) {
        observer.disconnect();
        observer = null;
    }
}

// Hàm kiểm tra và khởi tạo quan sát nếu cần
function initializeObserver() {
    const observe = localStorage.getItem("observe");
    if (!observe || observe === "true") {
        addObserver();
    }
}

// Hàm xử lý thông điệp từ extension popup
function handleMessage(request) {
    if (request.message === "sendData") {
        const observeValue = request.data;
        if (observeValue) {
            addObserver();
        } else {
            removeObserver();
        }
        localStorage.setItem("observe", observeValue);
    }
}

// Lắng nghe sự kiện khi có thông điệp từ extension popup
chrome.runtime.onMessage.addListener(handleMessage);

// Khởi tạo quan sát khi trang web được load
initializeObserver();
