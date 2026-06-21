import './styles/base.css'
import './styles/nav.css'
import './styles/detail.css'
import { books, getBookById, type Book } from './data/books'
import { getCoverDataURL } from './covers/generator'

// Nav scroll
const nav = document.querySelector('.site-nav')
window.addEventListener('scroll', () => {
  nav?.classList.toggle('scrolled', window.scrollY > 10)
}, { passive: true })

// Get book from URL
const params = new URLSearchParams(location.search)
const bookId = parseInt(params.get('id') ?? '1', 10)
const book = getBookById(bookId)

if (!book) {
  document.title = 'Book not found — bookVault'
  document.querySelector('main')!.innerHTML = `
    <div class="container" style="padding: 6rem 0; text-align:center;">
      <p style="font-size:var(--text-5xl); margin-bottom:1rem;">📭</p>
      <h1 style="font-family:var(--font-display); font-size:var(--text-3xl); color:var(--color-text-primary); margin-bottom:1rem;">Book not found</h1>
      <a href="browse.html" class="btn btn--primary">Back to Browse</a>
    </div>
  `
} else {
  renderBook(book)
}

function formatExpiryDate(daysFromNow: number): string {
  const d = new Date()
  d.setDate(d.getDate() + daysFromNow)
  return d.toLocaleString('en-US', {
    month: 'long', day: 'numeric', year: 'numeric',
    hour: '2-digit', minute: '2-digit', timeZoneName: 'short',
  })
}

function renderStars(rating: number): string {
  const full = Math.floor(rating)
  const half = rating % 1 >= 0.5
  return '★'.repeat(full) + (half ? '½' : '') + '☆'.repeat(5 - full - (half ? 1 : 0))
}

function renderBook(book: Book) {
  document.title = `${book.title} — bookVault`

  // Cover image
  const coverEl = document.getElementById('book-cover') as HTMLImageElement
  if (coverEl) {
    coverEl.src = getCoverDataURL(book)
    coverEl.alt = `Cover of ${book.title}`
  }

  // Breadcrumb
  const crumbTitle = document.getElementById('crumb-title')
  if (crumbTitle) crumbTitle.textContent = book.title

  // Metadata
  setText('book-genre', book.genre)
  setText('book-title', book.title)
  setText('book-author', `by ${book.author}`)
  setText('book-stars', renderStars(book.rating))
  setText('book-rating-num', book.rating.toFixed(1))
  setText('book-description', book.description)

  // Meta rows
  setText('meta-pages', `${book.pages} pages`)
  setText('meta-year', book.year > 0 ? String(book.year) : `${Math.abs(book.year)} BCE`)
  setText('meta-genre', book.genre)

  // Pricing
  setText('buy-price', `$${book.buyPrice.toFixed(2)}`)
  setText('rent-price-7', `$${book.rentPrice7.toFixed(2)}`)
  setText('rent-price-30', `$${book.rentPrice30.toFixed(2)}`)
  setText('rent-expires-7', `Access until ${formatExpiryDate(7)}`)
  setText('rent-expires-30', `Access until ${formatExpiryDate(30)}`)

  // Tab switching
  const tabs = document.querySelectorAll<HTMLButtonElement>('.pricing-tab')
  const panels = document.querySelectorAll<HTMLElement>('.pricing-panel')

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.setAttribute('aria-selected', 'false'))
      tab.setAttribute('aria-selected', 'true')
      const target = tab.dataset['target']
      panels.forEach(p => {
        if (p.id === target) p.removeAttribute('hidden')
        else p.setAttribute('hidden', '')
      })
    })
  })

  // Similar books
  const similarGrid = document.getElementById('similar-grid')
  if (similarGrid) {
    const similar = books
      .filter(b => b.genre === book.genre && b.id !== book.id)
      .slice(0, 4)

    similar.forEach(b => {
      const card = document.createElement('a')
      card.href = `book.html?id=${b.id}`
      card.className = 'book-card'

      const img = document.createElement('img')
      img.src = getCoverDataURL(b)
      img.alt = b.title
      img.className = 'book-card__cover'
      img.loading = 'lazy'

      const body = document.createElement('div')
      body.className = 'book-card__body'
      body.innerHTML = `
        <div class="book-card__title">${b.title}</div>
        <div class="book-card__author">${b.author}</div>
        <div class="book-card__price">from <span>$${b.rentPrice7.toFixed(2)}</span></div>
      `

      card.appendChild(img)
      card.appendChild(body)
      similarGrid.appendChild(card)
    })
  }
}

function setText(id: string, text: string) {
  const el = document.getElementById(id)
  if (el) el.textContent = text
}
