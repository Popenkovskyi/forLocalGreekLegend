console.log("uniq js loaded");

const tabs = document.querySelectorAll('.uniq-content__type span');
const textBlock = document.getElementById('uniq-text-block');

const tabTexts = {
    acid: `Уникальная кислотность Extra Virgin<br>
         каждого урожая: 0,2% – 0,6%.<br>
         Плавающая кислотность зависит<br>
         от погоды и урожая.`,
    harvest: `Mock Text: Урожай собирается вручную в оптимальные сроки,<br>
            чтобы сохранить вкус и питательные свойства.`,
    quality: `Mock Text: Контроль качества на всех этапах: от сбора<br>
            до холодного отжима и хранения.`
};

tabs.forEach(tab => {
    tab.addEventListener('click', () => {
        tabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');

        const selected = tab.dataset.tab;
        textBlock.innerHTML = tabTexts[selected];
    });
});