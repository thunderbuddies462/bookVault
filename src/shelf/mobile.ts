import { books } from '../data/books'
import { getCoverDataURL } from '../covers/generator'

export function mountCarousel(): void {
  const container = document.getElementById('shelf-canvas-container')
  if (!container) return

  const carousel = document.createElement('div')
  carousel.className = 'mobile-carousel'

  books.slice(0, 10).forEach(book => {
    const item = document.createElement('a')
    item.className = 'mobile-carousel__item'
    item.href = `book.html?id=${book.id}`

    const img = document.createElement('img')
    img.src = getCoverDataURL(book)
    img.alt = book.title
    img.className = 'mobile-carousel__cover'

    const info = document.createElement('div')
    info.className = 'mobile-carousel__info'
    info.innerHTML = `
      <span class="mobile-carousel__genre">${book.genre}</span>
      <h3 class="mobile-carousel__title">${book.title}</h3>
      <p class="mobile-carousel__author">${book.author}</p>
    `

    item.appendChild(img)
    item.appendChild(info)
    carousel.appendChild(item)
  })

  container.appendChild(carousel)

  // IntersectionObserver to scale the centered item
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        const el = entry.target as HTMLElement
        if (entry.intersectionRatio > 0.8) {
          el.classList.add('active')
        } else {
          el.classList.remove('active')
        }
      })
    },
    { root: carousel, threshold: [0.8], rootMargin: '0px' }
  )

  carousel.querySelectorAll('.mobile-carousel__item').forEach(el => observer.observe(el))
}
