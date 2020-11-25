const preloader = document.querySelector('.preloader'),
    headerBurger = document.querySelector('.header__burger'),
    headerNav = document.querySelector('.header__nav'),
    headerNavItem = document.querySelectorAll('.header__nav-item'),
    inputPhone = document.querySelector('#phone'),
    wrapper = document.querySelector('.wrapper'),
    popupBtn = document.querySelectorAll('.popup-btn'),
    popup = document.querySelector('.popup'),
    popupClose = document.querySelector('.popup__close'),
    footer = document.querySelector('.footer'),
    form = document.querySelector(".form"),
    validate = document.querySelectorAll(".form__input"),
    formLoading = form.querySelector('.form__sending'),
    formSended = document.querySelector('.sended'),
    sectionUp = document.querySelector('.section-up'),
    sectionDown = document.querySelector('.section-down'),
    sectionBg = document.querySelectorAll('.section-bg'),
    whyBg = document.querySelector('.why__bg'),
    bg = document.querySelector('.section-bg-main'),
    promotionNext = document.querySelector('.promotion__next');
let isPlaying = true;

document.addEventListener('DOMContentLoaded', () => {
    preloader.classList.add('loaded');
    document.body.style.overflow = ''
    $('#fullpage').fullpage({
        //options here
        menu: '#myMenu',
        normalScrollElements: '.price__items-wrapper, .trust__slider',
        anchors: ['promotion', 'why', 'services', 'price', 'trust'],
        onLeave(index, nextIndex, direction) {
            if (nextIndex === 1) {
                whyBg.style.display = 'none';
                bg.style.display = 'block';
                setTimeout(() => {
                    videoHandler(sectionBg, 'play')
                    bg.currentTime = whyBg.currentTime;
                }, 150)

            } else if (nextIndex === 2) {
                setTimeout(() => {
                    videoHandler(sectionBg, 'play')
                    whyBg.style.display = 'block';
                    bg.style.display = 'none';
                    whyBg.currentTime = bg.currentTime;
                }, 700)
            } else {
                setTimeout(() => {
                    videoHandler(sectionBg, 'pause')
                    bg.style.display = 'none';
                }, 150)
            }
        },
    });
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
    function burgerOpen(){
        headerBurger.addEventListener('click', () => {
            classlistHandler([footer, headerNav, headerBurger], 'toggle', 'active')
        });
    }
    function burgerItemClick(){
        for (let i = 0; i < headerNavItem.length; i++) {
            headerNavItem[i].addEventListener('click', () => {
                classlistHandler([footer, headerNav, headerBurger], 'remove', 'active')
            })
        }
    }
    function openPopup(){
        for (let i = 0; i < popupBtn.length; i++) {
            popupBtn[i].addEventListener('click', () => {
                event.stopPropagation()
                videoHandler(sectionBg, 'pause');
                classlistHandler([popup, wrapper], 'toggle', 'active')
                $.fn.fullpage.setAllowScrolling(false);
                $.fn.fullpage.setKeyboardScrolling(false);
            });
        }

    }
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
        setTimeout(function () {
            arr.forEach(item => {
                if (type === "play") {
                    if (!isPlaying) {
                        item.play();
                    }
                    isPlaying = true;
                } else {
                    if (isPlaying) {
                        item.pause();
                        isPlaying = false;
                    }
                }
            })
        }, 0);
    }

    function classlistHandler(arr, method, className) {
        for (let i = 0; i < arr.length; i++) {
            if (method === 'toggle') {
                arr[i].classList.toggle(className)
            } else if (method === 'add') {
                arr[i].classList.add(className)
            } else {
                arr[i].classList.remove(className)
            }
        }
        arr.forEach(item => {})
    }
    function removeError(){

        for (let i = 0; i < validate.length; i++) {
            validate[i].addEventListener('click', () => {
                validate[i].classList.remove('wrong')
            })
        }
    }
    burgerOpen();
    burgerItemClick();
    openPopup();
    removeError();
})