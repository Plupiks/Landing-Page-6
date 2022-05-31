document.addEventListener('DOMContentLoaded', function () {
  $(window).on('scroll load resize', () => {
    //Header functions
    header();

    //Вирівнюю контент у секції Hero по центру
    heroContentCentered();

    //Виконую функції (щоб уникнути неполадок зі скріном)
    forScreenWork();

    // Вирівнюю текст у services по висоті
    textAlignHeight();
  });

  //Header
  function header() {
    //висота для header body
    function headerBodyHeight() {
      const headerBody = document.querySelector('.header__body');
      const headerNavHeight = document.querySelector('.header__nav').clientHeight;

      if (window.matchMedia('(min-width:992px)').matches) {
        headerBody.style.height = `${headerNavHeight}px`;
      }
    }

    //Міняю колір фону і розмір шапки при скролі
    function changeHeaderOnScroll() {
      const scrollTop = scrollY; //scrollY - новий запис pageYOffset
      const header = document.querySelector('.header');
      const headerHeight = header.clientHeight;
      if (window.matchMedia('(min-width:992px)').matches) {
        if (scrollTop > headerHeight) {
          header.classList.add('header__scrolled');
        } else {
          header.classList.remove('header__scrolled');
        }
      } else header.classList.remove('header__scrolled');
    }

    // Задаю розміри для контента бургер меню
    function burgerMenuSizePos() {
      const headerHeight = document.querySelector('.header').clientHeight;
      const burgerMenuContentBody = document.querySelector('.burger-menu__nav');

      burgerMenuContentBody.style.top = `${headerHeight}px`;
      burgerMenuContentBody.style.height = `calc(100vh - (${headerHeight}px + 15px))`;
    }

    //Переміщаю навігацію в бургер меню
    function moveNavToBurger() {
      const headerNav = document.querySelector('.header__nav');
      const headerMenuBody = document.querySelector('.header__body');
      const burgerMenuBody = document.querySelector('.burgerMenu-nav');

      if (window.matchMedia('(max-width:992px)').matches) {
        $(headerNav).prependTo(burgerMenuBody);
      } else {
        $(headerNav).prependTo(headerMenuBody);
      }
    }

    //Показ тіла контента бургер меню
    function showBurgerMenu() {
      const burgerMenuBody = document.querySelector('.burgerMenu-nav');
      const checkboxInput = document.getElementById('menu_checkbox');
      const header = document.querySelector('.header');
      const scrollTop = scrollY;
      const headerHeight = header.clientHeight;

      // При кліку на кнопку бургер меню
      checkboxInput.addEventListener('click', function () {
        if ($(this).is(':checked')) {
          burgerMenuBody.style.display = 'block';
          header.classList.add('show-menu'); // Включаеться темний задній фон
          header.classList.remove('header__scrolled'); // Забираю у меню стиль при скролі (тільки коли ми розкрили меню)
        } else {
          header.classList.remove('show-menu');

          // Стиль для шапки при скролі для мобільних версій (коли меню закрите)
          if (scrollTop > headerHeight) {
            header.classList.add('header__scrolled');
          } else {
            header.classList.remove('header__scrolled');
          }
        }
      });

      // Закриваю меню при перезагрузці сторінки або при ресайзі
      $(window).on('resize load', function () {
        burgerMenuBody.style.display = 'none';
        header.classList.remove('show-menu');
        $(checkboxInput).prop('checked', false);
      });

      // Стиль для шапки при скролі для мобільних версій (для коректної роботи при закритті меню)
      $(window).on('scroll load resize', function () {
        if (!checkboxInput.checked) {
          if (scrollTop > headerHeight) {
            header.classList.add('header__scrolled');
          } else {
            header.classList.remove('header__scrolled');
          }
        }
      });
    }

    // Викликаю всі функціїї
    headerBodyHeight();
    changeHeaderOnScroll();
    burgerMenuSizePos();
    moveNavToBurger();
    showBurgerMenu();
  }

  //Вирівнюю контент у секції Hero по центру
  function heroContentCentered() {
    const heroSection = document.querySelector('.hero');
    const heroBody = document.querySelector('.hero__body');

    heroBody.style.height = `${heroSection.clientHeight - 150}px`;
  }

  //Виконую функції (щоб уникнути неполадок зі скріном)
  function forScreenWork() {
    const heroSection = document.querySelector('.hero');

    if ($(window).width() == 1466) {
      heroSection.style.height = '922px';
    } else {
      heroSection.style.height = '100vh';
    }
  }

  //Скрол до першого блоку
  function scrollToAbout() {
    const arrow = document.querySelector('.hero__arrow');
    const aboutSectionBody = document.querySelector('.about');

    arrow.addEventListener('click', function () {
      // aboutSectionBody.scrollIntoView({ block: 'start', behavior: 'smooth' });
      $('html,body').animate({ scrollTop: $('.about').offset().top - 65 + 'px' }, 500);
    });
  }
  scrollToAbout();

  //Заповнення прогресбару при скроллі !зробити окремо для кожного елементу
  function animateProgressOnScroll() {
    // заповнення прогресбару
    const progressBodyFill1 = document.querySelector('.progress__bar_fill1');
    const progressBodyFill2 = document.querySelector('.progress__bar_fill2');
    const progressBodyFill3 = document.querySelector('.progress__bar_fill3');

    // значення заповнення прогресбару (у відсотках)
    const progressBodyFillValue1 = +progressBodyFill1.getAttribute('data-percent');
    const progressBodyFillValue2 = +progressBodyFill2.getAttribute('data-percent');
    const progressBodyFillValue3 = +progressBodyFill3.getAttribute('data-percent');

    // текст заповнення прогресбару
    const progressTextValue1 = document.querySelector('.progress__label_value1');
    const progressTextValue2 = document.querySelector('.progress__label_value2');
    const progressTextValue3 = document.querySelector('.progress__label_value3');

    // Плавність
    const easingFn = function (t, b, c, d) {
      var ts = (t /= d) * t;
      var tc = ts * t;
      return b + c * (tc + -3 * ts + 3 * t);
    };

    // Опції
    const options = {
      easingFn,
      suffix: '%',
      duration: 1.2,
      enableScrollSpy: false,
      scrollSpyOnce: true,
    };

    // Функція збільшення числа
    const countUp1 = new CountUp(progressTextValue1, progressBodyFillValue1, options);
    const countUp2 = new CountUp(progressTextValue2, progressBodyFillValue2, options);
    const countUp3 = new CountUp(progressTextValue3, progressBodyFillValue3, options);

    // Активую анімацію заповнення при скролі
    $(window).on('load scroll', function () {
      let scrollOffset = $(document).scrollTop();
      let aboutOffset = $('.about').offset().top - 430;

      if (scrollOffset > aboutOffset && scrollOffset < 1497) {
        $(progressBodyFill1).animate({ width: progressBodyFillValue1 + '%' }, 1200);
        $(progressBodyFill2).animate({ width: progressBodyFillValue2 + '%' }, 1200);
        $(progressBodyFill3).animate({ width: progressBodyFillValue3 + '%' }, 1200);

        countUp1.start();
        countUp2.start();
        countUp3.start();
      }
    });
  }
  animateProgressOnScroll();

  // Галерея фото
  function photoGallery() {
    Fancybox.bind('[data-fancybox="gallery-single"]', {
      // Your options go here
    });
  }
  photoGallery();

  // Вирівнюю текст у services по висоті
  function textAlignHeight() {
    // Заголовок
    const servicesTitles = document.querySelectorAll('.sccb__title');
    const servicesTitlesHeight = Array.from(servicesTitles).map((e) => e.offsetHeight);
    const maxHeightTitle = Math.max(...servicesTitlesHeight);
    for (let i = 0; i < servicesTitles.length; i++) {
      servicesTitles[i].style.minHeight = maxHeightTitle + 'px';
    }

    // Текст
    const servicesText = document.querySelectorAll('.sccb__text');
    const servicesTextHeight = Array.from(servicesText).map((e) => e.offsetHeight);
    const maxHeightText = Math.max(...servicesTextHeight);
    for (let i = 0; i < servicesText.length; i++) {
      servicesText[i].style.minHeight = maxHeightText + 'px';
    }
  }

  // Добавляю активний клас при кліку
  function addActiveClass() {
    let filterItems = document.getElementsByClassName('filter__item');
    let active = document.getElementsByClassName('filter__item_active');
    for (i = 0; filterItems.length > i; i++) {
      filterItems[i].onclick = function () {
        let currentActive = active[0]; //отримуємо той елемент у якого є активний клас

        //При кліку ми удаляємо активний клас у елемента у якого був активний клас
        if (currentActive) {
          currentActive.classList.remove('filter__item_active');
        }

        // Добавляємо активний клас тому елементу на який нажали якщо у нього немає активного класу
        if (filterItems[i] !== currentActive) {
          this.classList.add('filter__item_active');
        }
      };
    }
  }
  addActiveClass();

  // Галлерея фото
  function gallery() {
    //Таким чином вибираю тільки не відфільтровані елементи
    Fancybox.bind('.filtr-item:not(.filteredOut) > img', {
      dragToClose: false,

      Toolbar: false,
      closeButton: 'outside',

      Image: {
        zoom: false,
        click: false,
        wheel: 'slide',
      },

      on: {
        initCarousel: (fancybox) => {
          const slide = fancybox.Carousel.slides[fancybox.Carousel.page];

          fancybox.$container.style.setProperty('--bg-image', `url("${slide.$thumb.src}")`);
        },
        'Carousel.change': (fancybox, carousel, to, from) => {
          const slide = carousel.slides[to];

          fancybox.$container.style.setProperty('--bg-image', `url("${slide.$thumb.src}")`);
        },
      },
    });
  }
  gallery();
});
