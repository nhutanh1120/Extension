// Hàm kiểm tra xem một URL có phải là trang YouTube không
function isYouTubeTab(url) {
    const youtubeRegex = /^(https?:\/\/)?(www\.)?(youtube\.com\/(c\/.+\/)?|youtu\.be\/)/;
    return youtubeRegex.test(url);
}

// Hàm gửi thông điệp đến tab YouTube với dữ liệu cần thiết
function sendMessageToYouTubeTab(tabId, dataToSend) {
    chrome.tabs.sendMessage(tabId, { message: "sendData", data: dataToSend });
}

// Hàm thiết lập tab và pane làm tab và pane hiện tại
function setActiveTab(tab, pane) {
    const activeTab = document.querySelector(".tabs .tab-item.active");
    const activePane = document.querySelector(".tabs .tab-pane.active");

    line.style.width = `${tab.offsetWidth}px`;
    line.style.left = `${tab.offsetLeft}px`;

    activeTab?.classList.remove("active");
    activePane?.classList.remove("active");

    tab.classList.add("active");
    pane.classList.add("active");
}

// Hàm xử lý sự kiện khi toggle theme hoặc toggle YouTube
function toggleTheme() {
    const toggle = this;
    const toggleIcon = toggle?.firstElementChild;

    if (!toggleIcon) return;

    toggleIcon.classList.toggle("active");

    if (toggle.id === "toggle-theme") {
        setTheme(toggleIcon.classList.contains("active"));
    }
    if (toggle.id === "toggle-youtube") {
        toggleYouTube(toggleIcon.classList.contains("active"));
    }
}

// Hàm thiết lập chủ đề cho trang web
function setTheme(isDark) {
    const theme = isDark ? "dark" : "light";
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
}

// Hàm xử lý sự kiện khi toggle YouTube
function toggleYouTube(dataToSend) {
    localStorage.setItem("observe", dataToSend);
    chrome.tabs.query({}, function (tabs) {
        if (tabs && tabs.length > 0) {
            for (let i = 0; i < tabs.length; i++) {
                const currentTab = tabs[i];
                const tabURL = currentTab.url;

                if (isYouTubeTab(tabURL)) {
                    sendMessageToYouTubeTab(currentTab.id, dataToSend);
                }
            }
        }
    });
}

// Hàm khởi tạo trạng thái của toggle theme khi trang web được load
function initializeThemeToggle() {
    const themeToggleElement = document.querySelector("#toggle-theme");
    const storedTheme = localStorage.getItem("theme");
    const toggleIcon = themeToggleElement.firstElementChild;

    if (storedTheme === "dark") {
        toggleIcon.classList.add("active");
    } else {
        toggleIcon.classList.remove("active");
    }

    // Gọi hàm setTheme với trạng thái hiện tại của toggle
    setTheme(toggleIcon.classList.contains("active"));
}

// Hàm khởi tạo trạng thái của toggle YouTube khi trang web được load
function initializeObserverToggle() {
    const observeToggleElement = document.querySelector("#toggle-youtube");
    const observe = localStorage.getItem("observe");
    if (observe && observe !== "false") {
        observeToggleElement.firstElementChild.classList.add("active");
        localStorage.setItem("observe", true);
    }
}

// Lấy tất cả các tab và pane
const tabsElements = document.querySelectorAll(".tab-list .tab-item");
const panesElements = document.querySelectorAll(".tab-content .tab-pane");
const toggleElements = document.querySelectorAll(".toggle");
const line = document.querySelector(".tabs .line");

// Gắn sự kiện click cho mỗi tab
tabsElements.forEach((tab, index) => {
    const pane = panesElements[index];
    tab.addEventListener("click", () => setActiveTab(tab, pane));
});

// Gắn sự kiện click cho mỗi toggle
toggleElements.forEach((toggle) => {
    toggle.addEventListener("click", toggleTheme);
});

// Khởi tạo trạng thái của toggle theme và toggle YouTube khi trang web được load
initializeThemeToggle();
initializeObserverToggle();
