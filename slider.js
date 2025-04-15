new Swiper('.js-premium-recipes-swiper', {
    slidesPerView: 1.1,
    spaceBetween: 8,
    slidesOffsetBefore: 16,
    slidesOffsetAfter: 16,
    breakpoints: {
        768: {
            slidesPerView: 1.5,
        },
        1024: {
            slidesPerView: 2.7,
            spaceBetween: 16,
            slidesOffsetBefore: 24,
            slidesOffsetAfter: 24,
        },
    },
});

console.log('swiper')