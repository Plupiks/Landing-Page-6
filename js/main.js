document.addEventListener('DOMContentLoaded', function () {
  $(window).on('scroll load resize', () => {
    //Header functions
    header();

    //Вирівнюю контент у секції Hero по центру
    heroContentCentered();

    //Виконую функції (щоб уникнути неполадок зі скріном)
    forScreenWork();
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
});
