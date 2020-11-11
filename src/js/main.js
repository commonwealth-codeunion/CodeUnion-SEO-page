document.addEventListener('DOMContentLoaded', () => {
    const header = document.querySelector('.header');
    const headerBurger = document.querySelector('.header__burger');
    const headerNav = document.querySelector('.header__nav');
    const headerNavItem = document.querySelectorAll('.header__nav-item');
    const inputPhone = document.querySelector('#phone');
    const overflow = document.querySelector('.overflow');
    const popupBtn = document.querySelectorAll('.popup-btn');
    const popup = document.querySelector('.popup');
    const popupClose = document.querySelector('.popup__close');
    const mainButton = document.querySelector('.main-button');
    const footer = document.querySelector('.footer');
    new fullpage('#fullpage', {
        licenseKey: 'YOUR KEY HERE',
        navigation: true,
    });
    popupBtn.forEach(elem => {
        elem.addEventListener('click', () => {
            popup.classList.add('active');
            overflow.classList.add('active');
            document.body.classList.add('lock');
        });
    })
    headerBurger.addEventListener('click', () => {
        headerBurger.classList.toggle('active');
        headerNav.classList.toggle('active');
        footer.classList.toggle('active');
    });
    headerNavItem.forEach((elem) => {
        elem.addEventListener('click', () => {
            headerBurger.classList.remove('active');
            headerNav.classList.remove('active');
            footer.classList.remove('active');
        })
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
        speed: 400,
        loop: true,
        spaceBetween: 200,
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
        breakpoints: {
            320: {
                slidesPerView: 2,
                spaceBetween: 20
            },
            580: {
                slidesPerView: 3,
                spaceBetween: 30
            },
            1280: {
                slidesPerView: 3,
                spaceBetween: 108
            }
        }
    });
    inputPhone.addEventListener('keydown', function (event) {
        if (!(event.key == 'ArrowLeft' || event.key == 'ArrowRight' || event.key == 'Backspace' || event.key == 'Tab')) {
            event.preventDefault()
        }
        var mask = '+7 (111) 111-11-11'; // Задаем маску

        if (/[0-9\+\ \-\(\)]/.test(event.key)) {
            // Здесь начинаем сравнивать this.value и mask
            // к примеру опять же
            var currentString = this.value;
            var currentLength = currentString.length;
            if (/[0-9]/.test(event.key)) {
                if (mask[currentLength] == '1') {
                    this.value = currentString + event.key;
                } else {
                    for (var i = currentLength; i < mask.length; i++) {
                        if (mask[i] == '1') {
                            this.value = currentString + event.key;
                            break;
                        }
                        currentString += mask[i];
                    }
                }
            }
        }
    });
})