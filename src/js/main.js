const preloader = document.querySelector('.preloader'),
    headerBurger = document.querySelector('.header__burger'),
    headerNav = document.querySelector('.header__nav'),
    headerNavItem = document.querySelectorAll('.header__nav-item'),
    inputPhone = document.querySelector('#phone'),
    wrapper = document.querySelector('.wrapper'),
    popupBtn = document.querySelectorAll('.popup-btn'),
    popup = document.querySelector('.popup'),
    popupWrapper = document.querySelector('.popup__wrapper'),
    popupClose = document.querySelector('.popup__close'),
    footer = document.querySelector('.footer'),
    form = document.querySelector(".form"),
    validate = document.querySelectorAll(".form__input"),
    formLoading = form.querySelector('.form__sending'),
    formSended = document.querySelector('.sended'),
    sectionUp = document.querySelector('.section-up'),
    sectionDown = document.querySelector('.section-down'),
    sectionBg = document.querySelectorAll('.section-bg'),
    servicesBg = document.querySelector('.services__bg'),
    bg = document.querySelector('.section-bg-main'),
    promotionNext = document.querySelector('.promotion__next'),
    servicesBgSource = servicesBg.querySelector('source'),
    bgSource = bg.querySelector('source');
let isPlaying = true;
checkWidth()

function checkWidth() {
    if (window.innerWidth <= 1025) {
        sectionBg.forEach(video => {
            video.remove();
        })
    } else {
        servicesBgSource.src = 'bg-video/11.mp4';
        bgSource.src = 'bg-video/11.mp4';
        videoHandler(sectionBg, 'play');


    }
}

function showRotateImg() {
    if (window.innerWidth <= 840 && window.innerHeight <= 420) {
        const img = document.createElement('img');
        img.src = '../images/rotate.png';
        formSended.appendChild(img);
        classlistHandler([wrapper, formSended], 'add', 'active');
        $.fn.fullpage.setAllowScrolling(false);
        $.fn.fullpage.setKeyboardScrolling(false);
    } else {
        formSended.innerHTML = ''
        classlistHandler([wrapper, formSended], 'remove', 'active');
        $.fn.fullpage.setAllowScrolling(true);
        $.fn.fullpage.setKeyboardScrolling(true);
    }
}
let err = 0;

function formValidate(form) {
    for (let i = 0; i < form.length; i++) {
        if (form[i].classList.contains('email')) {
            const emailTest = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
            if (!emailTest.test(form[i].value)) {
                form[i].classList.add('wrong');
                setTimeout(() => {
                    form[i].classList.remove('wrong');
                }, 1000)
                return err++;

            }
        } else if (form[i].classList.contains('phone')) {
            var phoneValidate = form[i].value.replace(/[^\w\s]/g, '').split(' ').join('');
            if (phoneValidate.length !== 11) {
                form[i].classList.add('wrong');
                setTimeout(() => {
                    form[i].classList.remove('wrong');
                }, 1000)
                return err++;

            }
        } else if (!form[i].value) {
            form[i].classList.add('wrong');
            setTimeout(() => {
                form[i].classList.remove('wrong');
            }, 1000)
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
        popup.classList.add('success');
        popupWrapper.style.fontSize = '22px'
        popupWrapper.innerHTML = 'Спасибо за заявку! Наш специалист свяжется с вами в течение нескольких минут';
    });
    xhr.addEventListener('error', () => {
        popupWrapper.innerHTML = 'Что-то пошло не так. Пожалуйста, проверьте ваше соединение и попробуйте отправить снова';

    });
    xhr.send(formData);
    formLoading.classList.add('loading');
}


function videoHandler(arr, type) {
    setTimeout(function () {
        arr.forEach(item => {
            if (type === "play") {
                item.play();

                isPlaying = true;
            } else {
                item.pause();
                isPlaying = false;

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

function removeError() {

    for (let i = 0; i < validate.length; i++) {
        validate[i].addEventListener('click', () => {
            validate[i].classList.remove('wrong')
        })
    }
}
document.addEventListener('DOMContentLoaded', () => {
    window.addEventListener('resize', () => {
        showRotateImg();
        checkWidth()
    });
    preloader.classList.add('loaded');
    document.body.style.overflow = ''

    let fullPage = $('#fullpage').fullpage({
        menu: '#myMenu',
        normalScrollElements: '.trust__slider',
        anchors: ['promotion', 'why', 'services', 'price', 'trust'],
        onLeave(index, nextIndex, direction) {
            if (servicesBgSource.src.length > 10 && bgSource.src.length > 10) {
                if (nextIndex === 1) {
                    servicesBg.style.display = 'none';
                    bg.style.display = 'block';
                    setTimeout(() => {
                        videoHandler(sectionBg, 'play')
                    }, 150)
                } else if (nextIndex === 2) {
                    servicesBg.style.display = 'none';
                    bg.style.display = 'block';
                    setTimeout(() => {
                        videoHandler(sectionBg, 'play')
                    }, 150)
                    if (index === 3) {
                        bg.currentTime = (servicesBg.currentTime);
                    }
                } else if (nextIndex === 3) {
                    setTimeout(() => {
                        bg.style.display = 'none';
                        servicesBg.style.display = 'block';
                        servicesBg.play();
                    }, 700)
                    servicesBg.currentTime = (bg.currentTime + 0.7);

                } else {
                    setTimeout(() => {
                        videoHandler(sectionBg, 'pause')
                        bg.style.display = 'none';
                        servicesBg.style.display = 'block';
                    }, 150)
                }
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
        speed: 600,
        loop: true,
        slidesPerView: 3,
        spaceBetween: 108,
        autoplay: {
            delay: 1500,
            disableOnInteraction: true,
        },
        breakpoints: {
            540: {
                slidesPerView: 2,
                spaceBetween: 20,
            },
            768: {
                slidesPerView: 3,
                spaceBetween: 50,
            },
            1024: {
                slidesPerView: 3,
                spaceBetween: 108,
            },
        }
    });

    function burgerOpen() {
        headerBurger.addEventListener('click', () => {
            classlistHandler([footer, headerNav, headerBurger], 'toggle', 'active')
        });
    }

    function burgerItemClick() {
        for (let i = 0; i < headerNavItem.length; i++) {
            headerNavItem[i].addEventListener('click', () => {
                classlistHandler([footer, headerNav, headerBurger], 'remove', 'active')
            })
        }
    }

    function openPopup() {
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

    form.addEventListener('submit', function (e) {
        e.preventDefault();
        formValidate(validate);
        if (err === 0) {
            sendForm()
        }
    })
    showRotateImg()
    burgerOpen();
    burgerItemClick();
    openPopup();
    removeError();
})