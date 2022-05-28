//Заповнення прогресбару при скроллі !зробити окремо для кожного елементу
function animateProgressOnScroll() {
  function progressBarFill() {
    const progressBodyFill = document.querySelectorAll('.progress__bar_fill');
    let $queue = $({});

    // Отримую числа з дата атрибуту для всіх елементів
    const progressBodyFillValue = [];
    progressBodyFill.forEach(function (el) {
      progressBodyFillValue.push(+el.getAttribute('data-percent'));
    });

    $(progressBodyFill).each(function () {
      let $el = $(this);
      let origWidth = +$el.attr('data-percent');
      $el.width(0);
      $el.animate({ width: origWidth + '%' }, 1200);
    });
  }

  function countUpActivate() {
    const progressBodyFill = document.querySelectorAll('.progress__bar_fill');
    const progressText = document.querySelectorAll('.progress__label_value');

    // Отримую числа з дата атрибуту для всіх елементів
    const progressBodyFillValue = [];
    progressBodyFill.forEach(function (el) {
      progressBodyFillValue.push(+el.getAttribute('data-percent'));
    });

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
      enableScrollSpy: true,
      scrollSpyOnce: false,
    };

    // Сама функція
    for (let i = 0; i < progressText.length; i++) {
      const countUp1 = new CountUp(progressText[i], progressBodyFillValue[i], options);
    }
  }
  countUpActivate();

  // Активую анімацію заповнення при скролі
  $(window).on('load scroll resize', function () {
    let scrollOffset = $(document).scrollTop();
    let aboutOffset = $('.about').offset().top - 430;

    if (scrollOffset > aboutOffset) {
      progressBarFill();
    }
  });
}
animateProgressOnScroll();
