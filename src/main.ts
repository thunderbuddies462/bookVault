import './styles/base.css'
import './styles/nav.css'
import './styles/shelf.css'
import { books } from './data/books'
import { getCoverDataURL } from './covers/generator'

// Nav: auto-hide, reveals on scroll-to-top or mouse at top of screen
const nav = document.querySelector<HTMLElement>('.site-nav')
if (nav) {
  let lastScrollY = 0
  let hideTimer = 0

  const showNav = () => {
    nav.classList.add('nav-visible')
    clearTimeout(hideTimer)
  }

  const scheduleHide = (ms = 2200) => {
    clearTimeout(hideTimer)
    hideTimer = window.setTimeout(() => {
      if (window.scrollY > 60) nav.classList.remove('nav-visible')
    }, ms)
  }

  // Reveal immediately, then auto-hide after 2.2s if scrolled down
  showNav()
  scheduleHide()

  window.addEventListener('scroll', () => {
    const y = window.scrollY
    nav.classList.toggle('scrolled', y > 10)
    if (y < 60 || y < lastScrollY) {
      showNav()
      scheduleHide()
    } else {
      clearTimeout(hideTimer)
      nav.classList.remove('nav-visible')
    }
    lastScrollY = y
  }, { passive: true })

  // Mouse near top → reveal
  document.addEventListener('mousemove', (e) => {
    if (e.clientY < 72) { showNav(); scheduleHide() }
  }, { passive: true })
}

// Mobile check → dynamic import
const isMobile = window.matchMedia('(max-width: 768px), (hover: none) and (pointer: coarse)').matches
const hasWebGL = (() => {
  try {
    const c = document.createElement('canvas')
    return !!(c.getContext('webgl') || c.getContext('experimental-webgl'))
  } catch { return false }
})()

if (!isMobile && hasWebGL) {
  import('./shelf/scene').then(m => m.mountShelf())
} else {
  import('./shelf/mobile').then(m => m.mountCarousel())
}

// Hint text fades in after load
const hint = document.querySelector('.hero-hint')
if (hint) {
  setTimeout(() => hint.classList.add('show'), 1500)
}

// Populate trending section
const trendingGrid = document.getElementById('trending-grid')
if (trendingGrid) {
  const featured = books.slice(0, 6)
  featured.forEach(book => {
    const card = document.createElement('a')
    card.href = `book.html?id=${book.id}`
    card.className = 'book-card'

    const img = document.createElement('img')
    img.src = getCoverDataURL(book)
    img.alt = book.title
    img.className = 'book-card__cover'

    const body = document.createElement('div')
    body.className = 'book-card__body'
    body.innerHTML = `
      <div class="book-card__genre">${book.genre}</div>
      <div class="book-card__title">${book.title}</div>
      <div class="book-card__author">${book.author}</div>
      <div class="book-card__price">from <span>$${book.rentPrice7.toFixed(2)}</span> rent · <span>$${book.buyPrice.toFixed(2)}</span> buy</div>
    `

    card.appendChild(img)
    card.appendChild(body)
    trendingGrid.appendChild(card)
  })
}
