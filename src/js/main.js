document.addEventListener('DOMContentLoaded', () => {
    const trust = document.querySelector('.trust');
    const header = document.querySelector('.header');
    const footer = document.querySelector('.footer');
    const trustScrollHeight = trust.offsetTop;
    console.log(trustScrollHeight);
    document.addEventListener('scroll', ()=>{
        if(pageYOffset >= trustScrollHeight){
            header.style.color = "#000";
            footer.style.color = "#000";
        }else{
            header.style.color = "";
            footer.style.color = "";
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