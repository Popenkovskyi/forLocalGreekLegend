const avatars = document.querySelectorAll('.avatars__people');
const avatarDescription = document.querySelector('.avatar-description');

const img = document.getElementById("video-frame");
const frameSlider = document.getElementById("frame-slider");
const currentFrameDisplay = document.getElementById("current-frame");

let currentFrame = 0;
const startFrame = 90;
const totalFrames = 240;

let fps = 48;
let direction = 1; // 1 — вперёд, -1 — назад
let interval = null;

const fragments = [
    { start: 0, end: 89, text: 'Фермерская линейка масла — Voutaktakis.' },
    { start: 89, end: 104, text: 'Фермерская линейка масла — Chatzigiorgis.' },
    { start: 104, end: 118, text: 'Фермерская линейка масла — Papadakis.' },
    { start: 118, end: 170, text: 'Фермерская линейка масла — Другой текст' },
    { start: 170, end: 240, text: 'Фермерская линейка масла — Другой текст' },
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
    const frameNumber = startFrame + currentFrame;
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
    }, 1000 / fps);
}

function pause() {
    clearInterval(interval);
}

function step(dir) {
    currentFrame += dir;
    if (currentFrame >= totalFrames) currentFrame = 0;
    if (currentFrame < 0) currentFrame = totalFrames - 1;
    updateFrame();
}

// Инициализация
preloadFrames();
updateFrame();

function playForward(index) {
    lockScroll();
    direction = 1;
    currentFrame = fragments[index].start;
    changeActiveAvatar(index);
    play(index);
}

function playBackward(index) {
    lockScroll();
    direction = -1;
    currentFrame = fragments[index].end;
    changeActiveAvatar(index);
    play(index);
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

function changeActiveAvatar(index) {
    if (!avatars[index]) return;

    avatars.forEach(avatar => avatar.classList.remove('active'));
    avatars[index].classList.add('active');

    avatarDescription.innerHTML = `
                <span class="avatar-description__step">Premium (${index + 1}/3)</span>
                <span>${fragments[index].text}</span>
                <button>к карточке товара</button>
            `
}