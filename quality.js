if (window.innerWidth > 1200) {
    gsap.registerPlugin(ScrollTrigger);

    console.log('quality load')
    // const imagesOffsets = new Array(6).fill().map(() => gsap.utils.random(-150, 100));
    // console.log('iamgesOffets', imagesOffsets)

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

        const images = gsap.utils.toArray(".quality__images .image");
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