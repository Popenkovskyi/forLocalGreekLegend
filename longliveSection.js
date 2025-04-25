gsap.registerPlugin(ScrollTrigger);

ScrollTrigger.config({
    autoRefreshEvents: "visibilitychange,DOMContentLoaded,load"
});

const blocks = gsap.utils.toArray(".block");
const container = document.querySelector("#longliveBlock");
const numBlocks = blocks.length;

blocks.forEach((block, i) => {
    block.style.zIndex = i;

    if (i !== 0) {
        gsap.set(block, { yPercent: 100 });
    }
});

ScrollTrigger.create({
    trigger: container,
    start: "bottom bottom",
    end: "+=" + (numBlocks * window.innerHeight) + " center",
    pin: true,
    scrub: true,
    // markers: true,
    onUpdate: self => {
        const progress = self.progress; // от 0 до 1
        const activeIndex = Math.floor(progress * numBlocks);

        blocks.forEach((block, i) => {
            if (i === 0) return;

            if (i < activeIndex) {
                gsap.to(block, { yPercent: 0, overwrite: true });
            } else if (i === activeIndex) {
                const localProgress = (progress * numBlocks) % 1;
                gsap.to(block, { yPercent: 100 * (1 - localProgress), overwrite: true });
            } else {
                gsap.to(block, { yPercent: 100, overwrite: true });
            }
        });
    }
});
