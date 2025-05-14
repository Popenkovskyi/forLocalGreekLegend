gsap.registerPlugin(ScrollTrigger);

// элементы
const uniqContainer = document.querySelector('.uniq-scroll-wrapper');
const tabs = document.querySelectorAll('.uniq-content__type span');
const textBlock = document.getElementById('uniq-text-block');

const tabTexts = {
    acid: `Уникальная кислотность Extra Virgin<br>
         каждого урожая: 0,2% – 0,6%.<br>
         Плавающая кислотность зависит<br>
         от погоды и урожая.`,
    harvest: `Средняя продолжительность жизни в Греции — 82 года, что выше среднего по ЕС. Это связано с уникальной средиземноморской диетой, в которой оливковое масло играет ключевую роль для здоровья и долголетия.`,
    quality: `Живое оливковое масло Greek Legend Premium — это по сути свежевыжатый сок оливы, который содержит на 120% больше полифенолов и витаминов, чем обычное масло.`
};

const uniqTitles = {
    acid: 'Не осветляем, не смешиваем<br> и не фильтруем масло',
    harvest: 'Позволяет жить дольше на<br> 23%',
    quality: 'Содержит на 240% больше<br> полифенолов, чем обычное<br> оливковое масло',
}

const uniqSubtitles = {
    acid: 'Только живой фермерский продукт',
    harvest: 'Доказано в 2020 году British Journal of Nutrition',
    quality: 'Исследовано в ELGO-DIMITRA, Греция',
}

const uqniqImages = {
    acid: 'img/components/premium/uniq/image.webp',
    harvest: 'img/components/premium/uniq/image1.webp',
    quality: 'img/components/premium/uniq/image2.webp',
}

const tabOrder = ['acid', 'harvest', 'quality'];
const uniqBlocks = tabOrder.length;

textBlock.innerHTML = tabTexts[tabOrder[0]];
tabs[0].classList.add('active');

let previousIndex = 0;

ScrollTrigger.create({
    trigger: uniqContainer,
    start: "center center",
    end: "+=" + (uniqBlocks * window.innerHeight) + " center",
    pin: true,
    scrub: true,
    // markers: true,
    onUpdate: self => {

        const progress = self.progress;
        const activeIndex = Math.min(
            Math.floor(progress * uniqBlocks),
            uniqBlocks - 1
        );

        if (activeIndex !== previousIndex) {
            const currentTabName = tabOrder[activeIndex];
            const direction = self.direction;

            activateTabWithAnimation(currentTabName, direction);
            uniqImageAnimated(activeIndex, direction);
            uniqTextAnimation(uniqSubtitles[currentTabName], uniqTitles[currentTabName], direction)

            previousIndex = activeIndex;
        }
    }
});

let currentAnimation = null;

function activateTabWithAnimation(tabKey, direction) {
    if (currentAnimation) {
        currentAnimation.kill();
        const incompleteElements = textBlock.querySelectorAll('.new-text, .active-text');
        incompleteElements.forEach(el => el.remove());
    }

    const newText = tabTexts[tabKey];
    const newIndex = tabOrder.indexOf(tabKey);

    tabs.forEach(tab => tab.classList.remove('active'));
    tabs[newIndex].classList.add('active');

    const textContainer = document.createElement('div');
    textContainer.style.position = 'relative';
    textContainer.style.height = '100%';
    textContainer.style.width = '100%';

    const oldTextEl = textBlock.querySelector('.active-text');

    let oldContent;
    if (!oldTextEl) {
        oldContent = document.createElement('div');
        oldContent.className = 'active-text';
        oldContent.innerHTML = textBlock.innerHTML;
    } else {
        oldContent = oldTextEl.cloneNode(true);
    }

    const newTextEl = document.createElement('div');
    newTextEl.className = 'new-text';
    newTextEl.innerHTML = newText;

    [oldContent, newTextEl].forEach(el => {
        el.style.position = 'absolute';
        el.style.width = '100%';
        el.style.height = '100%';
        el.style.top = isHeroMobile ? '-150px' : '0';
        el.style.left = '0';
    });

    textContainer.appendChild(oldContent);
    textContainer.appendChild(newTextEl);
    textBlock.innerHTML = '';
    textBlock.appendChild(textContainer);

    const oldYStart = 0;
    const newYStart = direction === 1 ? 30 : -30;
    const oldYEnd = direction === 1 ? -30 : 30;

    gsap.set(oldContent, { yPercent: oldYStart, opacity: 1 });
    gsap.set(newTextEl, { yPercent: newYStart, opacity: 0 });

    currentAnimation = gsap.timeline({
        onComplete: () => {
            textBlock.innerHTML = newTextEl.outerHTML;
            textBlock.style.position = 'relative';
            newTextEl.classList.add('active-text');
            currentAnimation = null;
        }
    });

    currentAnimation.to(oldContent, {
        yPercent: oldYEnd,
        opacity: 0,
        duration: 0.8,
        ease: 'power2.inOut'
    }, 0);

    currentAnimation.to(newTextEl, {
        yPercent: 0,
        opacity: 1,
        duration: 0.8,
        ease: 'power2.inOut'
    }, 0);
}

const uniqImagesContainer = document.querySelector('.uniq-content__images');
const uniqImages = uniqImagesContainer.querySelectorAll('.uniq-image');
let lastZIndex = 1;
function uniqImageAnimated(index, direction) {
    if (index < 0 || index >= uniqImages.length) return;

    if (index === 0) {
        uniqImages.forEach(image => {
            gsap.set(image, {
                zIndex: 0,
            })
        })

        lastZIndex = 0;
    }

    lastZIndex += 1;

    gsap.set(uniqImages[index], {
        clipPath: direction === 1
            ? 'inset(100% 0% 0% 0%)'
            : 'inset(0% 0% 100% 0%)',
        autoAlpha: 1,
        zIndex: lastZIndex
    });

    gsap.to(uniqImages[index], {
        clipPath: 'inset(0% 0% 0% 0%)',
        duration: 1,
        ease: "power2.out"
    });
}

function uniqTextAnimation(newSubtitle, newText, direction = 1) {
    const subtitle = document.querySelector('#uniq-subtitle');
    const text = subtitle.nextElementSibling;

    if (!subtitle || !text) return;

    const offset = 100 * direction;

    // Анимируем уход старого текста
    gsap.to([subtitle, text], {
        y: -offset,
        autoAlpha: 0,
        duration: 0.5,
        ease: "power2.in",
        onComplete: () => {
            subtitle.innerHTML = newSubtitle;
            text.innerHTML = newText;

            gsap.set([subtitle, text], { y: offset, autoAlpha: 0 });

            gsap.to([subtitle, text], {
                y: 0,
                autoAlpha: 1,
                duration: 0.5,
                ease: "power2.out"
            });
        }
    });
}

document.addEventListener('DOMContentLoaded', () => {
    textBlock.innerHTML = `<div class="active-text">${tabTexts[tabOrder[0]]}</div>`;
});