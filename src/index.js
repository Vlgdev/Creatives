import '@data/styles';
import '@data/images';

$(function () {
  document
    .querySelector('.header__scroll-btn')
    .addEventListener('click', scrollToElement);

  const nav = document.querySelector('.header__head');
  nav.addEventListener('click', scrollToElement);

  fixedMenu();
  document.addEventListener('scroll', fixedMenu);

  function scrollToElement(event) {
    const target = event.target.closest('[data-target]')

    if (!target) return;


    const dataTarget = target.dataset.target;

    if (target.tagName === 'A') {
      event.preventDefault();
    }

    let top = $(dataTarget).offset().top;
    if (nav.classList.contains('header__head--fixed')) {
      top -= nav.offsetHeight;
    }

    $('html, body').animate({ scrollTop: top }, 500);
  }

  function fixedMenu() {
    if (
      !nav.classList.contains('header__head--fixed') &&
      window.pageYOffset > $('.features').offset().top
    ) {
      console.log(nav.classList);
      nav.classList.add('header__head--fixed');
    } else if (
      nav.classList.contains('header__head--fixed') &&
      window.pageYOffset < $('.features').offset().top
    ) {
      nav.classList.remove('header__head--fixed');
    }
  }

  function startScroll() {
    const top = $('.features').offset().top;

    $('html, body').animate(
      {
        scrollTop: top,
      },
      500
    );
  }
});
