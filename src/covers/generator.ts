import type { Book, Palette } from '../data/books'

interface PaletteDef {
  gradientStart: string
  gradientEnd: string
  accent: string
  textLight: string
}

const PALETTES: Record<Palette, PaletteDef> = {
  ember:   { gradientStart: '#5c2510', gradientEnd: '#1a0a04', accent: '#e05a1a', textLight: '#f5c4a0' },
  twilight:{ gradientStart: '#2e1650', gradientEnd: '#0e0520', accent: '#a78bfa', textLight: '#d4c0ff' },
  ocean:   { gradientStart: '#0d3f5c', gradientEnd: '#04151e', accent: '#38bdf8', textLight: '#bae6fd' },
  gold:    { gradientStart: '#4a3208', gradientEnd: '#1a1204', accent: '#fbbf24', textLight: '#fde68a' },
  forest:  { gradientStart: '#133520', gradientEnd: '#050f09', accent: '#4ade80', textLight: '#bbf7d0' },
  dusk:    { gradientStart: '#351545', gradientEnd: '#0f0418', accent: '#e879f9', textLight: '#f0abfc' },
  rose:    { gradientStart: '#4a1528', gradientEnd: '#1a040d', accent: '#fb7185', textLight: '#fecdd3' },
  slate:   { gradientStart: '#1e2d45', gradientEnd: '#080e1a', accent: '#94a3b8', textLight: '#dde5f0' },
}

function wrapText(ctx: CanvasRenderingContext2D, text: string, maxWidth: number): string[] {
  const words = text.split(' ')
  const lines: string[] = []
  let current = ''
  for (const word of words) {
    const test = current ? `${current} ${word}` : word
    if (ctx.measureText(test).width > maxWidth && current) {
      lines.push(current)
      current = word
    } else {
      current = test
    }
  }
  if (current) lines.push(current)
  return lines
}

export function generateCover(book: Book, width = 512, height = 800): HTMLCanvasElement {
  const canvas = document.createElement('canvas')
  canvas.width = width
  canvas.height = height
  const ctx = canvas.getContext('2d')!

  const p = PALETTES[book.palette]

  // Background gradient
  const grad = ctx.createLinearGradient(0, 0, width * 0.4, height)
  grad.addColorStop(0, p.gradientStart)
  grad.addColorStop(1, p.gradientEnd)
  ctx.fillStyle = grad
  ctx.fillRect(0, 0, width, height)

  // Decorative geometric pattern — unique per book (seeded by id)
  const seed = book.id
  ctx.save()
  ctx.globalAlpha = 0.18

  // Large arc in upper right
  ctx.beginPath()
  ctx.arc(width * 0.85, height * 0.2, width * 0.45, 0, Math.PI * 2)
  ctx.strokeStyle = p.accent
  ctx.lineWidth = 1.5
  ctx.stroke()

  // Second arc, offset
  ctx.beginPath()
  ctx.arc(width * 0.85, height * 0.2, width * 0.32, 0, Math.PI * 2)
  ctx.stroke()

  // Diagonal lines
  const lineCount = 4 + (seed % 3)
  for (let i = 0; i < lineCount; i++) {
    const x = width * (0.1 + (i / lineCount) * 0.8)
    ctx.beginPath()
    ctx.moveTo(x, 0)
    ctx.lineTo(x - width * 0.15, height)
    ctx.lineWidth = 0.8
    ctx.stroke()
  }

  // Small decorative diamond
  const cx = width * 0.15, cy = height * 0.72, ds = width * 0.04
  ctx.beginPath()
  ctx.moveTo(cx, cy - ds)
  ctx.lineTo(cx + ds, cy)
  ctx.lineTo(cx, cy + ds)
  ctx.lineTo(cx - ds, cy)
  ctx.closePath()
  ctx.fillStyle = p.accent
  ctx.globalAlpha = 0.35
  ctx.fill()

  ctx.restore()

  // Top accent bar
  const barGrad = ctx.createLinearGradient(0, 0, width * 0.6, 0)
  barGrad.addColorStop(0, p.accent)
  barGrad.addColorStop(1, 'transparent')
  ctx.fillStyle = barGrad
  ctx.fillRect(0, 0, width, 3)

  // Genre label
  ctx.save()
  ctx.font = `500 ${width * 0.035}px Inter, sans-serif`
  ctx.fillStyle = p.accent
  ctx.globalAlpha = 0.9
  ctx.letterSpacing = `${width * 0.006}px`
  ctx.fillText(book.genre.toUpperCase(), width * 0.08, height * 0.12)
  ctx.restore()

  // Decorative horizontal rule under genre
  ctx.save()
  ctx.strokeStyle = p.accent
  ctx.globalAlpha = 0.3
  ctx.lineWidth = 0.8
  ctx.beginPath()
  ctx.moveTo(width * 0.08, height * 0.145)
  ctx.lineTo(width * 0.55, height * 0.145)
  ctx.stroke()
  ctx.restore()

  // Title
  ctx.save()
  const titleFontSize = Math.min(width * 0.11, 56)
  ctx.font = `700 ${titleFontSize}px 'Cormorant Garamond', Georgia, serif`
  ctx.fillStyle = p.textLight
  const titleLines = wrapText(ctx, book.title, width * 0.84)
  const titleLineH = titleFontSize * 1.2
  const titleY = height * 0.38
  titleLines.forEach((line, i) => {
    ctx.fillText(line, width * 0.08, titleY + i * titleLineH)
  })
  ctx.restore()

  // Author
  ctx.save()
  const authorY = height * 0.38 + Math.max(titleLines.length, 1) * titleFontSize * 1.2 + width * 0.05
  ctx.font = `400 ${width * 0.045}px Inter, sans-serif`
  ctx.fillStyle = p.textLight
  ctx.globalAlpha = 0.65
  ctx.fillText(book.author, width * 0.08, Math.min(authorY, height * 0.75))
  ctx.restore()

  // Bottom accent bar
  const bottomGrad = ctx.createLinearGradient(width, height, width * 0.4, height)
  bottomGrad.addColorStop(0, p.accent)
  bottomGrad.addColorStop(1, 'transparent')
  ctx.fillStyle = bottomGrad
  ctx.fillRect(0, height - 3, width, 3)

  return canvas
}

// Spine texture — portrait canvas with vertical text (bottom→top, real book convention)
export function generateSpine(book: Book, width = 256, height = 680): HTMLCanvasElement {
  const canvas = document.createElement('canvas')
  canvas.width = width
  canvas.height = height
  const ctx = canvas.getContext('2d')!
  const p = PALETTES[book.palette]

  // Background: vertical gradient
  const bg = ctx.createLinearGradient(0, 0, 0, height)
  bg.addColorStop(0, p.gradientStart)
  bg.addColorStop(1, p.gradientEnd)
  ctx.fillStyle = bg
  ctx.fillRect(0, 0, width, height)

  // Edge shadow strips so books visually separate from each other
  const edge = ctx.createLinearGradient(0, 0, width, 0)
  edge.addColorStop(0, 'rgba(0,0,0,0.55)')
  edge.addColorStop(0.14, 'rgba(0,0,0,0)')
  edge.addColorStop(0.86, 'rgba(0,0,0,0)')
  edge.addColorStop(1, 'rgba(0,0,0,0.55)')
  ctx.fillStyle = edge
  ctx.fillRect(0, 0, width, height)

  // Thick accent bars — 15% of canvas height, drawn twice for vivid saturation
  const barH = Math.round(height * 0.15)
  ctx.fillStyle = p.accent
  ctx.fillRect(0, 0, width, barH)
  ctx.fillRect(0, height - barH, width, barH)
  // White highlight strip at top of each bar for a lit/glossy look
  ctx.fillStyle = 'rgba(255,255,255,0.22)'
  ctx.fillRect(0, 0, width, Math.round(barH * 0.35))
  ctx.fillRect(0, height - barH, width, Math.round(barH * 0.35))

  // Soft glow bleeding into the body below the top bar
  const topGlow = ctx.createLinearGradient(0, barH, 0, barH + Math.round(height * 0.12))
  topGlow.addColorStop(0, p.accent + '88')
  topGlow.addColorStop(1, 'transparent')
  ctx.fillStyle = topGlow
  ctx.fillRect(0, barH, width, Math.round(height * 0.12))

  // Rotated text: after rotate(-PI/2) the canvas +X goes UP the spine,
  // +Y goes right across spine width. textAlign=center + y=0 centres
  // text perfectly across the narrow spine dimension.
  // titleSize = width*0.36 → ~29 px on screen = clearly legible on each spine.
  ctx.save()
  ctx.translate(width / 2, height / 2)
  ctx.rotate(-Math.PI / 2)

  // Strong shadow so text pops over any background
  ctx.shadowColor = 'rgba(0,0,0,1)'
  ctx.shadowBlur = 14

  const titleSize = Math.round(width * 0.44)
  ctx.font = `700 ${titleSize}px Georgia, 'Cormorant Garamond', serif`
  ctx.fillStyle = '#ffffff'
  ctx.textAlign = 'center'
  ctx.textBaseline = 'middle'
  // Draw twice: shadow pass then bright pass for max legibility
  ctx.fillText(book.title, height * 0.1, 0, height * 0.72)
  ctx.shadowBlur = 0
  ctx.fillText(book.title, height * 0.1, 0, height * 0.72)

  ctx.shadowBlur = 6
  const authorSize = Math.round(titleSize * 0.52)
  ctx.font = `400 ${authorSize}px Georgia, serif`
  ctx.fillStyle = '#ffffff'
  ctx.globalAlpha = 0.95
  ctx.fillText(book.author, -height * 0.30, 0, height * 0.62)

  ctx.restore()
  ctx.globalAlpha = 1
  ctx.shadowBlur = 0

  return canvas
}

export function coverToDataURL(book: Book): string {
  return generateCover(book, 512, 800).toDataURL('image/jpeg', 0.92)
}

const _dataURLCache = new Map<number, string>()

export function getCoverDataURL(book: Book): string {
  if (!_dataURLCache.has(book.id)) {
    _dataURLCache.set(book.id, coverToDataURL(book))
  }
  return _dataURLCache.get(book.id)!
}
