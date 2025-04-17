if (window.innerWidth > 1200) {
    gsap.registerPlugin(ScrollTrigger);

    console.log('quality load')
    const imagesOffsets = [-115, 50, 30, -150, -68, -18];

    const ctx = gsap.context(() => {
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: ".quality__images",
                start: "top top",
                end: "bottom center",
                scrub: true,
                // markers: true
            }
        });

        const images = gsap.utils.toArray(".quality__images .quality__content");
        images.forEach((image, index) => {
            tl.to(image, {
                ease: "none",
                yPercent: imagesOffsets[index]
            }, 0);
        });
    });

    window.addEventListener("load", () => {
        ScrollTrigger.refresh();
    });
}

const videos = document.querySelectorAll('.quality__images .quality__video');
const observer = new IntersectionObserver(
    (entries) => {
        entries.forEach(entry => {
            const video = entry.target;
            if (entry.isIntersecting) {
                video.play().catch(e => console.warn("Не удалось воспроизвести:", e));
            } else {
                video.pause();
            }
        });
    },
    {
        threshold: 0.2
    }
);

videos.forEach(video => {
    observer.observe(video);
});