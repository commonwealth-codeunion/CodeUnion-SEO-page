document.addEventListener('DOMContentLoaded', () => {
    const mainButton = document.querySelector('.main-button');
    const price = document.querySelector('.price');
    const header = document.querySelector('.header');
    const footer = document.querySelector('.footer');
    const priceScrollHeight = price.offsetTop;
    console.log(priceScrollHeight);
    document.addEventListener('scroll', ()=>{
        if(pageYOffset >= priceScrollHeight){
            mainButton.classList.add("dark");
            header.classList.add("dark");
            footer.classList.add("dark");
        }else{
            mainButton.classList.remove("dark");
            header.classList.remove("dark");
            footer.classList.remove("dark");
        }
    })
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