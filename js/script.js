const tabsElements = document.querySelectorAll('.tab-list .tab-item');
const panesElements = document.querySelectorAll('.tab-content .tab-pane');

const tabActive = document.querySelector('.tabs .tab-item.active')
const line = document.querySelector('.tabs .line');

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
    }
}); 