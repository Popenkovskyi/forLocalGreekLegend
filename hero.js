const img = document.getElementById("video-frame");
const frameSlider = document.getElementById("frame-slider");
const currentFrameDisplay = document.getElementById("current-frame");

const DURATION_SPEED = 0.2;

let currentFrame = 0;
const startFrame = 90;
const totalFrames = 240;

const FPS = 48;
let direction = 1; // 1 — вперёд, -1 — назад
let interval = null;

// 1. Обернём каждую строку в span.line
function wrapLines(spanLines) {
    spanLines.forEach(container => {
        const lines = container.innerHTML.split("<br>");

        container.innerHTML = "";

        lines.forEach(line => {
            const spanMask = document.createElement("span");
            spanMask.className = "mask";
            const span = document.createElement("span");
            span.className = "line";
            span.innerHTML = line.trim();
            container.appendChild(spanMask);
            spanMask.appendChild(span);
        });
    })
}

// ANIMATIONS
// utils
function revealBlock(timeline, blockElement, spanElements, stagger = 0.2) {
    timeline.to(blockElement, {
        opacity: 1,
        duration: DURATION_SPEED
    })

    timeline.to(spanElements, {
        opacity: 1,
        yPercent: 0,
        stagger: stagger,
        duration: DURATION_SPEED
    }, ">");
}

// main-block
const mainBlock = document.querySelector('.main-content');

// uv-block-animation
const uvBlock = document.querySelector('.uv-protection');
const uvBlockTextContainer = uvBlock.querySelectorAll('span');
wrapLines(uvBlockTextContainer)
const uvBlockTexts = uvBlock.querySelectorAll(".line");

gsap.set(uvBlockTexts, { yPercent: 100, });
function uvProtectionBlockAnimate() {
    const enterTl = gsap.timeline({ paused: true });
    const leaveTl = gsap.timeline({ paused: true });

    enterTl.to(mainBlock, {
        opacity: 0,
        duration: 0.7
    });

    revealBlock(enterTl, uvBlock, uvBlockTexts, 0);

    leaveTl.to(uvBlock, {
        opacity: 0,
        duration: DURATION_SPEED
    })


    return {
        onEnter: () => enterTl.restart(),
        onLeave: () => leaveTl.restart(),
    }
}

function mainBlockAnimate() {
    const enterTl = gsap.timeline({ paused: true });

    enterTl.to(mainBlock, {
        opacity: 1,
        duration: 0.7
    });

    enterTl.to(uvBlock, {
        opacity: 0,
        duration: DURATION_SPEED
    }, "=")

    return {
        onEnter: () => enterTl.restart()
    }
}

// description-block-animation
const avatars = document.querySelector('.avatars');
const avatarPeople = avatars.querySelectorAll('.avatars__people');

const avatarDescription = document.querySelector('.description');
const avatarDescriptionContainer = avatarDescription.querySelectorAll('[data-wrapper]');
const avatarDescriptionButton = avatarDescription.querySelector('button');

wrapLines(avatarDescriptionContainer)
const avatarDescriptionTexts = avatarDescription.querySelectorAll(".line")

gsap.set(avatarDescriptionTexts, { yPercent: 110, });
gsap.set(avatarDescriptionButton, { opacity: 0 });
function descriptionBlockAnimate() {
    const enterTl = gsap.timeline({ paused: true });
    const leaveTl = gsap.timeline({ paused: true });

    // enter animation
    enterTl.to(avatars, {
        opacity: 1,
        duration: DURATION_SPEED
    });

    revealBlock(enterTl, avatarDescription, avatarDescriptionTexts, 0);

    enterTl.to(avatarDescriptionButton, {
        opacity: 1,
        duration: DURATION_SPEED
    }, ">");

    // leave animation
    leaveTl.to(avatars, {
        opacity: 0,
        duration: DURATION_SPEED
    }, "=");

    leaveTl.to(avatarDescription, {
        opacity: 0,
        duration: DURATION_SPEED
    });

    return {
        onEnter: () => enterTl.restart(),
        onLeave: () => leaveTl.restart()
    };
}


// history-block-animation
const historyBlock = document.querySelector('.history');
const historyBlockContainer = historyBlock.querySelectorAll('span');
const historyTextContainer = historyBlock.querySelectorAll('span');
wrapLines(historyBlockContainer)
const historyBlockTexts = historyBlock.querySelectorAll(".line");
gsap.set(historyBlockTexts, { yPercent: 100 });
function historyBlockAnimate() {
    const enterTl = gsap.timeline({ paused: true });
    const leaveTl = gsap.timeline({ paused: true });

    revealBlock(enterTl, historyBlock, historyBlockTexts, 0);

    leaveTl.to(historyBlock, {
        opacity: 0,
        duration: DURATION_SPEED
    })

    return {
        onEnter: () => enterTl.restart(),
        onLeave: () => leaveTl.restart()
    }
}

const fragments = [
    {
        start: 0,
        end: 49,
        animationEnter: uvProtectionBlockAnimate().onEnter,
        animationEnterBack: mainBlockAnimate().onEnter,
    },
    {
        start: 49,
        end: 89,
        avatarIndex: 0,
        text: 'Фермерская линейка масла — Voutaktakis.',
        animationEnter: descriptionBlockAnimate().onEnter,
        animationLeave: uvProtectionBlockAnimate().onLeave,
        animationEnterBack: uvProtectionBlockAnimate().onEnter,
        animationLeaveBack: descriptionBlockAnimate().onLeave,
    },
    {
        start: 89,
        end: 104,
        avatarIndex: 1,
        text: 'Фермерская линейка масла — Chatzigiorgis.',
    },
    {
        start: 104,
        end: 118,
        avatarIndex: 2,
        text: 'Фермерская линейка масла — Papadakis.',
    },
    {
        start: 118,
        end: 170,
        animationEnter: historyBlockAnimate().onEnter,
        animationLeave: descriptionBlockAnimate().onLeave,
        animationEnterBack: descriptionBlockAnimate().onEnter,
        animationLeaveBack: historyBlockAnimate().onLeave,
    },
    {
        start: 170,
        end: 240,
        animationLeave: historyBlockAnimate().onLeave,
        animationLeaveBack: historyBlockAnimate().onEnter,
    },
];

function pad(n) {
    return n.toString().padStart(3, '0');
}

const frames = [];
function preloadFrames() {
    for (let i = 0; i < totalFrames; i++) {
        const frameNumber = startFrame + i;
        const padded = pad(frameNumber);
        const image = new Image();
        image.src = `frames-optimized/0${padded}.webp`;
        frames.push(image);
    }
}

function updateFrame() {
    if (frames[currentFrame]?.src)
        img.src = frames[currentFrame].src;
}

function play(index) {
    clearInterval(interval);
    const fragment = fragments[index];

    interval = setInterval(() => {
        currentFrame += direction;

        // Проверка границ с учетом направления
        if (direction === 1 && currentFrame >= fragment.end) {
            currentFrame = fragment.end;
            pause();
            unlockScroll();
        } else if (direction === -1 && currentFrame <= fragment.start) {
            currentFrame = fragment.start;
            pause();
            unlockScroll();
        }

        updateFrame();
    }, 1000 / FPS);
}

function pause() {
    clearInterval(interval);
}

// Инициализация
preloadFrames();
updateFrame();

async function playForward(index) {
    if (index < fragments.length - 1) {
        lockScroll();
    }

    direction = 1;
    currentFrame = fragments[index].start;

    changeActiveAvatar(fragments[index]);
    play(index);

    if (fragments[index]?.animationLeave) await fragments[index].animationLeave();
    if (fragments[index]?.animationEnter) await fragments[index].animationEnter();
}

async function playBackward(index) {
    lockScroll();

    direction = -1;
    currentFrame = fragments[index].end;

    changeActiveAvatar(fragments[index - 1], direction);
    play(index);

    if (fragments[index]?.animationLeaveBack) await fragments[index].animationLeaveBack();
    if (fragments[index]?.animationEnterBack) await fragments[index].animationEnterBack();
}

function lockScroll() {
    document.body.style.overflow = "hidden";
}

function unlockScroll() {
    document.body.style.overflow = "auto";
}

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);
document.querySelectorAll(".step").forEach((step, index) => {
    ScrollTrigger.create({
        trigger: step,
        start: "top center",
        end: "top center",
        onEnter: () => playForward(index),
        onEnterBack: () => playBackward(index),
        // markers: true
    });
});

const descriptionText = avatarDescription.querySelector(".description__text");
const descriptionStepNumber = avatarDescription.querySelectorAll(".description__step-numbers");
function changeActiveAvatar(fragment, direction = 1) {
    if (fragment?.avatarIndex === undefined || (fragment.avatarIndex === 0 && direction === 1)) return;

    avatarPeople.forEach(avatar => avatar.classList.remove('active'));
    avatarPeople[fragment.avatarIndex].classList.add('active');

    descriptionText.textContent = fragment.text;

    gsap.to(descriptionStepNumber, {
        y: fragment.avatarIndex * -20,
    })


}

