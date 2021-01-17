import * as $ from 'jquery'
import 'jquery-mask-plugin'
import '@data/styles'
import '@data/images'

$(function () {
  document
    .querySelector('.header__scroll-btn')
    .addEventListener('click', scrollToElement)

  const nav = document.querySelector('.header__head')
  nav.addEventListener('click', scrollToElement)

  fixedMenu()
  document.addEventListener('scroll', fixedMenu)

  const invalidForms = {}
  const contact = document.querySelector('.contact__form')
  contact.addEventListener('submit', contactSubmit)

  $('input[type="tel"]').mask('+7 (000) 000 00 00', {
    onChange: (cep, event) => {
      watchingInvalidForm(event)
    }
  });

  const alert = document.querySelector('.alert')
  
  function contactSubmit(event) {
    event.preventDefault()

    const errs = []

    const name = contact.elements.name
    const email = contact.elements.email
    const phone = contact.elements.phone
    const message = contact.elements.message

    if (!checkName(name.value)) {
      errs.push(name)
    }

    if (!checkEmail(email.value)) {
      errs.push(email)
    }

    if (!checkMessage(message.value)) {
      errs.push(message)
    }

    if (!checkPhone(phone.value)) {
      errs.push(phone)
    }

    if (errs.length) {
      errs.forEach(e => e.classList.add('invalid'))
      invalidForms[event.target] = event.target
      event.target.addEventListener('input', watchingInvalidForm)
      return
    }

    event.target.removeEventListener('input', watchingInvalidForm)
    name.value = email.value = phone.value = message.value = ''
    showAlert('contact')
  }

  function showAlert(subject) {
    let html = ''
    if (subject === 'contact') {
      html = 'Сообщение успешно отправлено!'
    }

    alert.innerHTML = html
    alert.classList.remove('hidden')
    alert.classList.add('showed')

    setTimeout(hideAlert, 3000)
  }

  function hideAlert() {
    alert.classList.add('hidden')
    alert.classList.remove('showed')
  }

  function watchingInvalidForm(event) {
    const target = event.target
    const form = target.closest('form')

    if (!invalidForms[form]) return

    if (target.value.length === 0) {
      target.classList.remove('valid', 'invalid')
    } else {
      let valid
      if (target.name === 'name') {
        valid = checkName(target.value)
      } else if (target.name === 'email') {
        valid = checkEmail(target.value)
      } else if (target.name === 'phone') {
        valid = checkPhone(target.value)
      } else if (target.name === 'message') {
        valid = checkMessage(target.value)
      }

      if (valid) {
        target.classList.add('valid')
        target.classList.remove('invalid')
      } else {
        target.classList.add('invalid')
        target.classList.remove('valid')
      }
    }
  }

  function checkName(name) {
    const value = name.trim()
    return value && value.length > 1
  }

  function checkEmail(email) {
    const value = email.trim()
    return value && /[-.\w]+@([\w-]+\.)+[\w-]+/g.test(value)
  }

  function checkPhone(phone) {
    return phone.length === 18
  }

  function checkMessage(message) {
    const value = message.trim()
    return value && value.length > 5
  }

  function scrollToElement(event) {
    const target = event.target.closest('[data-target]')

    if (!target) return

    const dataTarget = target.dataset.target

    if (target.tagName === 'A') {
      event.preventDefault()
    }

    let top = $(dataTarget).offset().top
    if (nav.classList.contains('header__head--fixed')) {
      top -= nav.offsetHeight
    }

    $('html, body').animate({ scrollTop: top }, 500)
  }

  function fixedMenu() {
    if (
      !nav.classList.contains('header__head--fixed') &&
      window.pageYOffset > $('.features').offset().top
    ) {
      console.log(nav.classList)
      nav.classList.add('header__head--fixed')
    } else if (
      nav.classList.contains('header__head--fixed') &&
      window.pageYOffset < $('.features').offset().top
    ) {
      nav.classList.remove('header__head--fixed')
    }
  }

  function startScroll() {
    const top = $('.features').offset().top

    $('html, body').animate(
      {
        scrollTop: top,
      },
      500
    )
  }
})
