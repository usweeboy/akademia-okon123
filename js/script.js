// Слайдеры
const heroSlider = new Swiper('.hero-slider', {
  loop: true,
  navigation: {
    nextEl: '.hero-slider-btn-next',
    prevEl: '.hero-slider-btn-prev',
  },
  keyboard: {
    enabled: true,
    onlyInViewport: true,
  },
  pagination: {
    el: '.hero-slider__control-pagination',
    type: 'fraction',
  },
  autoplay: {
    delay: 5000,
    disableOnInteraction: false,
  },
});

const reviewsSlider = new Swiper('.reviews-slider__swiper', {
  loop: true,
  slidesPerView: 1,
  spaceBetween: 30,
  navigation: {
    nextEl: '.reviews-slider-btn-next',
    prevEl: '.reviews-slider-btn-prev',
  },
  keyboard: {
    enabled: true,
    onlyInViewport: true,
  },
  pagination: {
    el: '.reviews-slider__control-pagination',
    type: 'fraction',
  },
});

const portfolioSlider = new Swiper(".portfolio-slider", {
  slidesPerView: 4,
  grid: {
    rows: 2,
    fill: "row",
  },
  spaceBetween: 20,
  breakpoints: {  
    '0': {
      slidesPerView: 2,
      grid: {
        rows: 2,
        fill: "row",
      },
      spaceBetween: 14,
    },
    '576': {
      slidesPerView: 2,
      grid: {
        rows: 2,
        fill: "row",
      },
    },
    '768': {
      slidesPerView: 3,
      grid: {
        rows: 2,
        fill: "row",
      },
    },
    '1024': {
      slidesPerView: 4,
      grid: {
        rows: 2,
        fill: "row",
      },
    }
  },
  keyboard: {
    enabled: true,
    onlyInViewport: true,
  },
  pagination: {
    el: '.portfolio-slider__pagination',
    clickable: true,
  },
  navigation: {
    nextEl: '#portfolio-slider-btn-next',
    prevEl: '#portfolio-slider-btn-prev',
  },
});

const profilesSlider = new Swiper('.profile-systems__slider', {
  loop: true,
  slidesPerView: 1,
  spaceBetween: 16,
  navigation: {
    nextEl: '#profile-systems-slider-btn-next',
    prevEl: '#profile-systems-slider-btn-prev',
  },
  pagination: {
    el: '.profile-systems__slider-control__pagination',
    type: 'fraction',
  },
  keyboard: {
    enabled: true,
    onlyInViewport: true,
  },
});


// Оптимизация Яндекс карты
const ymap = document.getElementById("ymap");

const mapObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      const lazyMap = document.getElementById('ymap-lazy');

      lazyMap.setAttribute("src", lazyMap.getAttribute("data-src"));
      lazyMap.removeAttribute("data-src");

      observer.unobserve(entry.target);
    }
  });
}, {});

mapObserver.observe(ymap);


Fancybox.bind('[data-fancybox="gallery"]', {});
Fancybox.bind('[data-fancybox="recommendations-gallery"]', {});


// Бургер-меню
const menu = document.querySelector('.menu');
const menuWrapper = document.querySelector('.menu__wrapper');
const headerBurger = document.querySelector('.header-burger');

const body = document.body;

if (menu && headerBurger) {
  headerBurger.addEventListener('click', () => {
    menu.classList.toggle('active');
    headerBurger.classList.toggle('active');
    body.classList.toggle('lock');
  });
}

// Закрыть меню при нажатии на Ecsape
window.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    menu.classList.remove('active');
    headerBurger.classList.remove('active');
    body.classList.remove('lock');
  }
})

// Закрыть меню при клике вне его
menuWrapper.addEventListener('click', event => {
  event._isClickWithInMenu = true;
});

headerBurger.addEventListener('click', event => {
  event._isClickWithInMenu = true;
});

menu.addEventListener('click', event => {
  if (event._isClickWithInMenu) return;
  menu.classList.remove('active');
  headerBurger.classList.remove('active');
  body.classList.remove('lock');
});


// Подменю
const subMenu = document.querySelector('.sub-menu__list');
const subMenuBtnOpen = document.querySelector('.sub-menu-open').addEventListener('click', () => {
  subMenu.classList.toggle('active');
});


// Липкий header
const headerSticky = document.querySelector('.header-sticky');

window.addEventListener('scroll', () => {
  let scrollPosition = window.scrollY;

  if (scrollPosition > 150) {
    headerSticky.classList.add('active');
  } else {
    headerSticky.classList.remove('active');
  }
});

// Липкий header burger-menu
const menuSticky = document.querySelector('.header-sticky__menu');
const headerStickyBurger = document.querySelector('.header-sticky__burger');

if (menuSticky && headerStickyBurger) {
  headerStickyBurger.addEventListener('click', () => {
    menuSticky.classList.toggle('active');
    headerStickyBurger.classList.toggle('active');
  });
}


// МАСКА ВВОДА ДЛЯ ТЕЛЕФОНА
document.addEventListener("DOMContentLoaded", function () {
  const phoneInputs = document.querySelectorAll('input[data-tel-input]');

  const getInputNumbersValue = (input) => {
    return input.value.replace(/\D/g, '');
  }

  const onPhonePaste = (e) => {
    let input = e.target,
        inputNumbersValue = getInputNumbersValue(input);
    let pasted = e.clipboardData || window.clipboardData;
    if (pasted) {
      let pastedText = pasted.getData('Text');
      if (/\D/g.test(pastedText)) {
        input.value = inputNumbersValue;
        return;
      }
    }
  }

  const onPhoneInput = (e) => {
    let input = e.target,
        inputNumbersValue = getInputNumbersValue(input),
        selectionStart = input.selectionStart,
        formattedInputValue = "";

    if (!inputNumbersValue) {
      return input.value = "";
    }

    if (input.value.length != selectionStart) {
      if (e.data && /\D/g.test(e.data)) {
        input.value = inputNumbersValue;
      }
      return;
    }

    if (["7", "8", "9"].indexOf(inputNumbersValue[0]) > -1) {
      if (inputNumbersValue[0] == "9") inputNumbersValue = "7" + inputNumbersValue;
      let firstSymbols = (inputNumbersValue[0] == "8") ? "8" : "+7";
      formattedInputValue = input.value = firstSymbols + " ";
      if (inputNumbersValue.length > 1) {
        formattedInputValue += '(' + inputNumbersValue.substring(1, 4);
      }
      if (inputNumbersValue.length >= 5) {
        formattedInputValue += ') ' + inputNumbersValue.substring(4, 7);
      }
      if (inputNumbersValue.length >= 8) {
        formattedInputValue += '-' + inputNumbersValue.substring(7, 9);
      }
      if (inputNumbersValue.length >= 10) {
        formattedInputValue += '-' + inputNumbersValue.substring(9, 11);
      }
    } else {
      formattedInputValue = '+' + inputNumbersValue.substring(0, 16);
    }

    input.value = formattedInputValue;
  }
  const onPhoneKeyDown = (e) => {
    let inputValue = e.target.value.replace(/\D/g, '');
    if (e.keyCode == 8 && inputValue.length == 1) {
      e.target.value = "";
    }
  }

  for (let phoneInput of phoneInputs) {
    phoneInput.addEventListener('keydown', onPhoneKeyDown);
    phoneInput.addEventListener('input', onPhoneInput, false);
    phoneInput.addEventListener('paste', onPhonePaste, false);
  }
});


// Аккордеон
document.querySelectorAll('.faq__item-trigger').forEach(accordion => {
  accordion.addEventListener('click', () => {
    accordion.parentNode.classList.toggle('faq__item--active')
  })
});


// Показать текст
const showMoreText = document.querySelectorAll('.show-more').forEach(item => {
  item.addEventListener('click', () => {
    const text = item.previousSibling.previousSibling;
    text.classList.add('active');

    item.style.display = 'none';
  })
});