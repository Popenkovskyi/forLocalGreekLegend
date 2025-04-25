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
            const direction = self.direction; // 1 = вниз, -1 = вверх
            activateTabWithAnimation(tabOrder[activeIndex], direction);
            previousIndex = activeIndex;
        }

        blocks.forEach((block, i) => {
            if (i === 0) return;

            if (i < activeIndex) {
                gsap.to(block, { yPercent: 0, overwrite: true });
            } else if (i === activeIndex) {
                const localProgress = (progress * uniqBlocks) % 1;
                gsap.to(block, { yPercent: 100 * (1 - localProgress), overwrite: true });
            } else {
                gsap.to(block, { yPercent: 100, overwrite: true });
            }
        });
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
        el.style.top = '0';
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

document.addEventListener('DOMContentLoaded', () => {
    textBlock.innerHTML = `<div class="active-text">${tabTexts[tabOrder[0]]}</div>`;
});