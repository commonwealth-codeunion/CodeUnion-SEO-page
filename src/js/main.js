const preloader = document.querySelector('.preloader');
const headerBurger = document.querySelector('.header__burger');
const headerNav = document.querySelector('.header__nav');
const headerNavItem = document.querySelectorAll('.header__nav-item');
const inputPhone = document.querySelector('#phone');
const wrapper = document.querySelector('.wrapper');
const popupBtn = document.querySelectorAll('.popup-btn');
const popup = document.querySelector('.popup');
const popupClose = document.querySelector('.popup__close');
const footer = document.querySelector('.footer');
const form = document.querySelector(".form");
const validate = document.querySelectorAll(".form__input");
document.addEventListener('DOMContentLoaded', () => {
    preloader.classList.add('loaded');
    document.body.style.overflow = ''
    new fullpage('#fullpage', {
        licenseKey: 'YOUR KEY HERE',
        navigation: true,
        anchors: ['promotion', 'why', 'services', 'price', 'trust'],
        normalScrollElements: '.price__items-wrapper, .trust__slider',
    });
    let servicesSwiper = new Swiper('.services__slider', {
        fadeEffect: {
            crossFade: true
        },
        effect: "fade",
        speed: 500,
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
        slidesPerView: 3,
        speed: 600,
        loop: true,
        spaceBetween: 108,
        autoplay: {
            delay: 1500,
            disableOnInteraction: false,
        },
        breakpoints: {
            320: {
                slidesPerView: 2,
                spaceBetween: 20
            },
            580: {
                slidesPerView: 3,
                spaceBetween: 50
            },
            1280: {
                slidesPerView: 3,
                spaceBetween: 108
            }
        }
    });

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
    popupBtn.forEach(elem => {
        elem.addEventListener('click', () => {
            event.stopPropagation()
            popup.classList.toggle('active');
            wrapper.classList.toggle('active');
            fullpage_api.setAllowScrolling(false);
            fullpage_api.setKeyboardScrolling(false);
        });
    })
    popupClose.addEventListener('click', () => {
        popup.classList.remove('active');
        wrapper.classList.remove('active');
        fullpage_api.setAllowScrolling(true);
        fullpage_api.setKeyboardScrolling(true);

    });
    wrapper.addEventListener('click', () => {
        popup.classList.remove('active');
        wrapper.classList.remove('active');
        fullpage_api.setAllowScrolling(true);
        fullpage_api.setKeyboardScrolling(true);
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
    form.addEventListener('submit', () => {
        event.preventDefault();
        let phoneValidate = /([^0-9])/g;
        if (!validate[0].value) {
            validate[0].classList.add('wrong');
        } else if (!validate[1].value) {
            validate[1].classList.add('wrong');
        } else if (validate[2].value.replace(phoneValidate, '').length !== 11) {
            validate[2].classList.add('wrong');
        }
    })
    validate.forEach((elem) => {
        elem.addEventListener('click', () => {
            elem.classList.remove('wrong')
        })
    })
})