gsap.registerPlugin(ScrollTrigger);

const oilTitle = document.querySelector('.oil-facts-section .title');
const oilTitleText = [
    [
        "Не осветляем, не смешиваем",
        "и не фильтруем масло"
    ],
    [
        "Позволяет жить дольше на",
        "23%"
    ],
    [
        "Содержит на 240% больше",
        "полифенолов, чем обычное",
        "оливковое масло"
    ],
];
function renderTitleLines(lines) {
    oilTitle.innerHTML = '';
    lines.forEach(lineText => {
        const mask = document.createElement('div');
        mask.className = 'text-line-mask';
        const line = document.createElement('div');
        line.className = 'oil-title-line';
        line.textContent = lineText;
        mask.appendChild(line);
        oilTitle.appendChild(mask);
    });
}
renderTitleLines(oilTitleText[0]);

const oilSubtitle = document.querySelector('.oil-facts-section .subtitle');
const oilSubtitleText = [
    ["Только живой фермерский продукт"],
    ["Доказано в 2020 году British Journal of Nutrition"],
    ["Исследовано в ELGO-DIMITRA, Греция"],
];
function renderSubtitleLines(lines) {
    oilSubtitle.innerHTML = '';
    lines.forEach(lineText => {
        const mask = document.createElement('div');
        mask.className = 'text-line-mask';
        const line = document.createElement('div');
        line.className = 'oil-subtitle-line';
        line.textContent = lineText;
        mask.appendChild(line);
        oilSubtitle.appendChild(mask);
    });
}
renderSubtitleLines(oilSubtitleText[0]);

const oilText = document.querySelector('.oil-facts-section .text')
const oilTexts = [
    [
        "Уникальная кислотность Extra Virgin",
        "каждого урожая: 0,2% – 0,6%.",
        "Плавающая кислотность зависит",
        "от погоды и урожая."
    ],
    [
        "Средняя продолжительность жизни",
        "в Греции — 82 года, что выше",
        "среднего по ЕС. Это связано",
        "с уникальной средиземноморской ",
        "диетой, в которой оливковое масло",
        "играет ключевую роль для здоровья ",
        "и долголетия.",
    ],
    [
        "Живое оливковое масло",
        "Greek Legend Premium — это",
        "по сути свежевыжатый сок",
        "оливы, который содержит ",
        "на 120% больше полифенолов ",
        "и витаминов, чем обычное масло.",
    ]
];
function renderTextLines(lines) {
    oilText.innerHTML = '';
    lines.forEach(lineText => {
        const mask = document.createElement('div');
        mask.className = 'text-line-mask left';
        const line = document.createElement('div');
        line.className = 'oil-text-line';
        line.textContent = lineText;
        mask.appendChild(line);
        oilText.appendChild(mask);
    });
}
renderTextLines(oilTexts[0]);

const oilSection = document.querySelector('.oil-facts-section');
const typeListItems = document.querySelectorAll('.type-list-item');

const oilImages = document.querySelectorAll('.oil-facts-section .img-block img');
gsap.set(oilImages[0], { clipPath: 'inset(0 0 0 0)' });

const typeListItemsSteps = typeListItems.length;
let oilLastIndex = 0;
ScrollTrigger.create({
    trigger: oilSection,
    start: "top top",
    end: `+=${typeListItemsSteps * 100}%`,
    pin: true,
    scrub: true,
    onUpdate: self => {
        const idx = Math.min(typeListItemsSteps - 1, Math.floor(self.progress * typeListItemsSteps));

        if (idx !== oilLastIndex) {
            gsap.to('.oil-title-line', {
                y: -50,
                opacity: 0,
                stagger: 0.05,
                duration: 0.35,
                ease: "power2.in",
                onComplete: () => {
                    // Обновляем текст
                    renderTitleLines(oilTitleText[idx]);
                    // Новые строки появляются снизу
                    gsap.fromTo('.oil-title-line',
                        { y: 50, opacity: 0 },
                        { y: 0, opacity: 1, stagger: 0.05, duration: 0.4, ease: 'power2.out' }
                    );
                }
            })

            gsap.to('.oil-subtitle-line', {
                y: -50,
                opacity: 0,
                stagger: 0.05,
                duration: 0.35,
                ease: "power2.in",
                onComplete: () => {
                    // Обновляем текст
                    renderSubtitleLines(oilSubtitleText[idx]);
                    // Новые строки появляются снизу
                    gsap.fromTo('.oil-subtitle-line',
                        { y: 50, opacity: 0 },
                        { y: 0, opacity: 1, stagger: 0.05, duration: 0.4, ease: 'power2.out' }
                    );
                }
            })

            gsap.to('.oil-text-line', {
                y: -50,
                opacity: 0,
                stagger: 0.05,
                duration: 0.35,
                ease: "power2.in",
                onComplete: () => {
                    // Обновляем текст
                    renderTextLines(oilTexts[idx]);
                    // Новые строки появляются снизу
                    gsap.fromTo('.oil-text-line',
                        { y: 50, opacity: 0 },
                        { y: 0, opacity: 1, stagger: 0.05, duration: 0.4, ease: 'power2.out' }
                    );
                }
            })

            typeListItems.forEach((el, i) => el.classList.toggle('active', i === idx));

            if (idx > oilLastIndex) {
                gsap.to(oilImages[idx], {
                    clipPath: 'inset(0 0 0 0)',
                    duration: 0.6,
                    ease: 'power2.out'
                });
            } else {
                gsap.to(oilImages[oilLastIndex], {
                    clipPath: 'inset(100% 0 0 0)',
                    duration: 0.6,
                    ease: 'power2.in'
                });
            }

            oilLastIndex = idx;
        }
    }
});