const tabsElements = document.querySelectorAll('.tab-list .tab-item');
const panesElements = document.querySelectorAll('.tab-content .tab-pane');

const tabActive = document.querySelector('.tabs .tab-item.active');
const line = document.querySelector('.tabs .line');

const toggleElements = document.querySelectorAll('.toggle');

line.style.width = tabActive.offsetWidth + 'px';
line.style.left = tabActive.offsetLeft + 'px';

tabsElements.forEach((tab, index) => {
    const pane = panesElements[index];
    tab.onclick = () => {
        document.querySelector('.tabs .tab-item.active')?.classList.remove('active');
        document.querySelector('.tabs .tab-pane.active')?.classList.remove('active');

        line.style.width = tab.offsetWidth + 'px';
        line.style.left = tab.offsetLeft + 'px';

        tab?.classList.add('active');
        pane?.classList.add('active');
    };
});

toggleElements.forEach(toggle => {
    toggle.onclick = function () {
        this?.firstElementChild.classList.toggle('active');
        if (this.id === 'toggle-theme') {
            if (this?.firstElementChild.classList[0] === 'active' || this?.firstElementChild.classList[1] === 'active') {
                document.documentElement.setAttribute('data-theme', 'dark');
            } else {
                document.documentElement.setAttribute('data-theme', 'light');
            };
        };
    };
});