document.addEventListener('DOMContentLoaded', () => {
    new fullpage('#fullpage', {
        licenseKey: 'YOUR KEY HERE',
    });
    const overflow = document.querySelector('.overflow');
    const popupBtn = document.querySelectorAll('.popup-btn');
    const popup = document.querySelector('.popup');
    const popupClose = document.querySelector('.popup__close');
    const mainButton = document.querySelector('.main-button');
    const price = document.querySelector('.price');
    const header = document.querySelector('.header');
    const footer = document.querySelector('.footer');
    const priceScrollHeight = price.offsetTop;
    // document.addEventListener('scroll', () => {
    //     console.log(pageYOffset)
    //     if (pageYOffset >= priceScrollHeight) {
    //         mainButton.classList.add("dark");
    //         header.classList.add("dark");
    //         footer.classList.add("dark");
    //     } else {
    //         mainButton.classList.remove("dark");
    //         header.classList.remove("dark");
    //         footer.classList.remove("dark");
    //     }
    // });
    popupBtn.forEach(elem => {
        elem.addEventListener('click', () => {
            popup.classList.add('active');
            overflow.classList.add('active');
            document.body.classList.add('lock');
        });
    })
    popupClose.addEventListener('click', () => {
        popup.classList.remove('active');
        overflow.classList.remove('active');
        document.body.classList.remove('lock');
    });
    overflow.addEventListener('click', () => {
        popup.classList.remove('active');
        overflow.classList.remove('active');
        document.body.classList.remove('lock');
    });
    let servicesSwiper = new Swiper('.services__slider', {
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
    let trustSwiper = new Swiper('.trust__slider', {
        // effect: 'fade',
        slidesPerView: 3,
        speed: 400,
        loop: true,
        spaceBetween: 108,
    });
})