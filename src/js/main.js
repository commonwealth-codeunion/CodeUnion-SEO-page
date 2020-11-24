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
const promotionNext = document.querySelector('.promotion__next');
document.addEventListener('DOMContentLoaded', () => {
    promotionNext.addEventListener('click', (e) => {
        const scrollbar = document.querySelector('.fp-scroller');
        e.preventDefault();
        console.log(window.innerHeight);
        scrollbar.style.transform = `translate(0px, ${window.innerHeight}px) translateZ(0px);`
        scrollbar.style.transform = `rotate(90deg)`
        console.log(scrollbar);
    });
    preloader.classList.add('loaded');
    document.body.style.overflow = ''
    $('#fullpage').fullpage({
		//options here
		autoScrolling:true,
        scrollHorizontally: true,
        css3: true,
        scrollOverflow: true,
        animateAnchor: true,
        offsetSections: false,
        verticalCentered: false,
        menu: '#myMenu',
        normalScrollElements: '.price__items-wrapper, .trust__slider',
        anchors: ['fp-viewing-0', 'fp-viewing-1', 'fp-viewing-2', 'fp-viewing-3'],
	});
    // new fullpage('#fullpage', {
    //     css3: true,
    //     fitToSection: true,
    //     scrollOverflow: true,
    //     animateAnchor: true,
    //     offsetSections: false,
    //     verticalCentered: false,
    //     menu: '#myMenu',
    //     anchors: ['fp-viewing-0', 'fp-viewing-1', 'fp-viewing-2', 'fp-viewing-3'],
    //     normalScrollElements: '.price__items-wrapper, .trust__slider',
    // });
    sectionUp.addEventListener('click', () => {
        $.fn.fullpage.moveSectionUp()
    })
    sectionDown.addEventListener('click', () => {
        $.fn.fullpage.moveSectionDown()
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
            $.fn.fullpage.setAllowScrolling(false);
            $.fn.fullpage.setKeyboardScrolling(false);
        });
    })
    popupClose.addEventListener('click', () => {
        videoHandler(sectionBg, 'play');
        classlistHandler([popup, wrapper], 'remove', 'active')
        $.fn.fullpage.setAllowScrolling(true);
        $.fn.fullpage.setKeyboardScrolling(true);

    });
    wrapper.addEventListener('click', () => {
        videoHandler(sectionBg, 'play');
        classlistHandler([popup, wrapper], 'remove', 'active')
        $.fn.fullpage.setAllowScrolling(true);
        $.fn.fullpage.setKeyboardScrolling(true);
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
            formSended.textContent = 'Заявка успешно отправлена, с вами свяжется наши специалист';
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