import './styles/base.css'
import './styles/nav.css'
import './styles/browse.css'
import { books, genres, type Genre } from './data/books'
import { getCoverDataURL } from './covers/generator'

// Nav scroll effect
const nav = document.querySelector('.site-nav')
window.addEventListener('scroll', () => {
  nav?.classList.toggle('scrolled', window.scrollY > 10)
}, { passive: true })

// State
let activeGenre: Genre | 'All' = 'All'
let searchQuery = ''

function getFilteredBooks() {
  return books.filter(b => {
    const matchesGenre = activeGenre === 'All' || b.genre === activeGenre
    const q = searchQuery.toLowerCase()
    const matchesSearch = !q ||
      b.title.toLowerCase().includes(q) ||
      b.author.toLowerCase().includes(q) ||
      b.genre.toLowerCase().includes(q)
    return matchesGenre && matchesSearch
  })
}

function renderGrid() {
  const grid = document.getElementById('books-grid')!
  const filtered = getFilteredBooks()

  if (filtered.length === 0) {
    grid.innerHTML = `
      <div class="empty-state">
        <span class="empty-state__icon">📭</span>
        <p class="empty-state__title">No books found</p>
        <p class="empty-state__body">Try a different genre or search term</p>
      </div>
    `
    return
  }

  grid.innerHTML = ''
  filtered.forEach(book => {
    const card = document.createElement('a')
    card.href = `book.html?id=${book.id}`
    card.className = 'book-card'

    const img = document.createElement('img')
    img.src = getCoverDataURL(book)
    img.alt = book.title
    img.className = 'book-card__cover'
    img.loading = 'lazy'

    const body = document.createElement('div')
    body.className = 'book-card__body'

    body.innerHTML = `
      <div class="book-card__genre">${book.genre}</div>
      <div class="book-card__title">${book.title}</div>
      <div class="book-card__author">${book.author}</div>
      <div class="book-card__price">
        Rent <span>$${book.rentPrice7.toFixed(2)}</span> · Buy <span>$${book.buyPrice.toFixed(2)}</span>
      </div>
    `

    card.appendChild(img)
    card.appendChild(body)
    grid.appendChild(card)
  })

  // Update count
  const countEl = document.getElementById('result-count')
  if (countEl) countEl.textContent = String(filtered.length)
}

// Build genre chips
function buildFilterBar() {
  const bar = document.getElementById('genre-chips')!
  const allChip = createChip('All', true)
  bar.appendChild(allChip)

  genres.forEach(g => {
    bar.appendChild(createChip(g, false))
  })
}

function createChip(label: string, active: boolean): HTMLButtonElement {
  const btn = document.createElement('button')
  btn.className = `filter-chip${active ? ' active' : ''}`
  btn.textContent = label
  btn.addEventListener('click', () => {
    activeGenre = label as Genre | 'All'
    document.querySelectorAll('.filter-chip').forEach(c => c.classList.remove('active'))
    btn.classList.add('active')
    renderGrid()
  })
  return btn
}

// Search
document.getElementById('search-input')?.addEventListener('input', (e) => {
  searchQuery = (e.target as HTMLInputElement).value
  renderGrid()
})

// URL param: pre-select genre from homepage links
const urlGenre = new URLSearchParams(location.search).get('genre') as Genre | null
if (urlGenre && genres.includes(urlGenre)) {
  activeGenre = urlGenre
}

// Init
buildFilterBar()

// Activate correct chip if from URL
if (urlGenre) {
  document.querySelectorAll('.filter-chip').forEach(chip => {
    if (chip.textContent === urlGenre) chip.classList.add('active')
    else chip.classList.remove('active')
  })
}

renderGrid()
