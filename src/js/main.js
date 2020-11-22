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
const formLoading = form.querySelector('.form__sending');
const formSended = document.querySelector('.sended');
const sectionUp = document.querySelector('.section-up');
const sectionDown = document.querySelector('.section-down');
const sectionBg = document.querySelectorAll('.section-bg');
const whyBg = document.querySelector('.why__bg');
const bg = document.querySelector('.section-bg');

document.addEventListener('DOMContentLoaded', () => {
    preloader.classList.add('loaded');
    document.body.style.overflow = ''
    new fullpage('#fullpage', {
        licenseKey: 'YOUR KEY HERE',
        onLeave(origin, destination, direction) {
            if (destination.anchor == 'promotion') {
                    whyBg.style.display = 'none';
                    bg.style.display = 'block';
                    bg.currentTime = whyBg.currentTime += 1;

            }
            else if (origin.anchor == 'promotion' && destination.anchor == 'why') {
                setTimeout(() => {
                    whyBg.style.display = 'block';
                    bg.style.display = 'none';
                    whyBg.currentTime = bg.currentTime += 1;
                }, 1000)
            }
        },
        menu: '#myMenu',
        anchors: ['promotion', 'why', 'services', 'price', 'trust'],
        normalScrollElements: '.price__items-wrapper, .trust__slider',
    });
    sectionUp.addEventListener('click', () => {
        fullpage_api.moveSectionUp()
    })
    sectionDown.addEventListener('click', () => {
        fullpage_api.moveSectionDown()
    })
    let servicesSwiper = new Swiper('.services__slider', {
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
            disableOnInteraction: true,
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
        classlistHandler([footer, headerNav, headerBurger], 'toggle', 'active')

    });
    headerNavItem.forEach((elem) => {
        elem.addEventListener('click', () => {
            classlistHandler([footer, headerNav, headerBurger], 'remove', 'active')
        })
    })
    popupBtn.forEach(elem => {
        elem.addEventListener('click', () => {
            event.stopPropagation()
            videoHandler(sectionBg, 'pause');
            classlistHandler([popup, wrapper], 'toggle', 'active')
            fullpage_api.setAllowScrolling(false);
            fullpage_api.setKeyboardScrolling(false);
        });
    })
    popupClose.addEventListener('click', () => {
        videoHandler(sectionBg, 'play');
        classlistHandler([popup, wrapper], 'remove', 'active')
        fullpage_api.setAllowScrolling(true);
        fullpage_api.setKeyboardScrolling(true);

    });
    wrapper.addEventListener('click', () => {
        videoHandler(sectionBg, 'play');
        classlistHandler([popup, wrapper], 'remove', 'active')
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
    let err = 0;
    form.addEventListener('submit', function (e) {
        e.preventDefault();
        formValidate(validate);
        if (err === 0) {
            sendForm()
        }
    })

    function formValidate(form) {
        for (let i = 0; i < form.length; i++) {
            if (form[i].classList.contains('_email')) {
                const emailTest = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
                if (emailTest(form[i])) {
                    form[i].classList.add('wrong');
                    return err++;

                }
            } else if (form[i].classList.contains('phone')) {
                let phoneValidate = /([^0-9])/g;
                if (phoneValidate(form[i])) {
                    form[i].classList.add('wrong');
                    return err++;

                }
            } else if (!form[i].value) {
                form[i].classList.add('wrong');
                return err++;

            }
            err = 0;
        }
    }

    function sendForm() {

        let formData = new FormData(form);
        const xhr = new XMLHttpRequest();
        xhr.open('POST', './mail.php');
        xhr.addEventListener('load', () => {
            if (Math.floor(xhr.status / 100) !== 2) {
                console.log(`Error. Status code: ${xhr.status}`, xhr);
                return;
            }
            formSended.textContent = 'Заявка успешно отправлена, с вами свяжутся наши специалист';
            addFormClasses();
        });
        xhr.addEventListener('error', () => {
            formSended.textContent = 'Что-то пошло не так. Пожалуйста, проверьте ваше соединение и попробуйте отправить снова';
            addFormClasses();
        });
        xhr.send(formData);
        formLoading.classList.add('loading');
    }

    function addFormClasses() {
        popup.classList.remove('active');
        formLoading.classList.remove('loading');
        formSended.classList.add('active')
        wrapper.classList.add('active');
        form.reset();
        setTimeout(() => {
            formSended.classList.remove('active')
            wrapper.classList.remove('active');
        }, 3000)
    }

    function videoHandler(arr, type) {
        arr.forEach(item => {
            if (type === "play") {
                item.play();
            } else {
                item.pause();
            }
        })
    }

    function classlistHandler(arr, method, className) {
        arr.forEach(item => {
            if (method === 'toggle') {

                item.classList.toggle(className)
            } else if (method === 'add') {
                item.classList.add(className)
            } else {
                item.classList.remove(className)
            }
        })
    }
    validate.forEach((elem) => {
        elem.addEventListener('click', () => {
            elem.classList.remove('wrong')
        })
    })
})