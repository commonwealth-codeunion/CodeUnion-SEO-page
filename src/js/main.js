document.addEventListener('DOMContentLoaded', () => {
    var mySwiper = new Swiper('.services__slider', {
        // effect: 'fade',
        speed: 400,
        loop: true,
        spaceBetween: 100,
        pagination: {
            el: '.swiper-pagination',
            type: 'fraction',
        },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
    });
})