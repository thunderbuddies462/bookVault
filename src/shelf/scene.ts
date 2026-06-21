import * as THREE from 'three'
import { books } from '../data/books'
import { generateSpine } from '../covers/generator'
import { createCylinder, TUNNEL_Z } from './cylinder'
import { initInteraction } from './interaction'

export function mountShelf(): void {
  const container = document.getElementById('shelf-canvas-container')
  if (!container) return

  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false })
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
  renderer.setSize(container.clientWidth, container.clientHeight)
  container.appendChild(renderer.domElement)

  const maxAniso = renderer.capabilities.getMaxAnisotropy()

  const BG = 0x0d0d0d
  const scene = new THREE.Scene()
  scene.background = new THREE.Color(BG)
  scene.fog = new THREE.FogExp2(BG, 0.012)

  const camera = new THREE.PerspectiveCamera(62, container.clientWidth / container.clientHeight, 0.1, 120)
  camera.position.set(0, 0, 0)
  camera.lookAt(0, 0.25, -1)

  scene.add(new THREE.AmbientLight(0xffffff, 7.0))
  const viewerLight = new THREE.PointLight(0xfff8e8, 80, 12, 2)
  scene.add(viewerLight)
  const topRim = new THREE.PointLight(0xffeedd, 28, 0, 2)
  topRim.position.set(0, 6, 0)
  scene.add(topRim)
  const bottomFill = new THREE.PointLight(0xffcc88, 22, 0, 2)
  bottomFill.position.set(0, -5, 0)
  scene.add(bottomFill)

  const cylinderGroup = new THREE.Group()
  scene.add(cylinderGroup)

  const loader = new THREE.TextureLoader()
  const coverTextures = new Map<number, THREE.Texture>()
  let loaded = 0

  function onAllLoaded() {
    const bookMeshes = createCylinder(books, cylinderGroup, coverTextures, maxAniso)

    const { getTargetRotation, getParallax, handleClick } = initInteraction(
      container!,
      renderer.domElement,
      camera,
      cylinderGroup,
      bookMeshes,
    )

    renderer.domElement.addEventListener('click', (e) => {
      const bookId = handleClick(e, camera)
      if (bookId !== null) window.location.href = `book.html?id=${bookId}`
    })

    const animStart = performance.now()
    let currentRotation = 0

    const TOTAL_MS = 1600
    const P1_FRAC  = 0.50

    function easeOutBack(t: number): number {
      const c1 = 1.70158, c3 = c1 + 1
      return 1 + c3 * Math.pow(t - 1, 3) + c1 * Math.pow(t - 1, 2)
    }

    function animate() {
      requestAnimationFrame(animate)

      const target = getTargetRotation()
      currentRotation += (target - currentRotation) * 0.072
      cylinderGroup.rotation.y = currentRotation

      const { px, py } = getParallax()
      camera.position.x += (px - camera.position.x) * 0.05
      camera.position.y += (py - camera.position.y) * 0.08

      const elapsed = performance.now() - animStart

      for (const { mesh } of bookMeshes) {
        const delay = mesh.userData.fallDelay as number
        if (elapsed < delay) continue

        const t = Math.min(1, (elapsed - delay) / TOTAL_MS)
        const tx = mesh.userData.targetX as number
        const tz = mesh.userData.targetZ as number
        const ty = mesh.userData.targetY as number

        if (t <= P1_FRAC) {
          // Phase 1: single-lane rush from tunnel vanishing point → viewer
          const t1 = t / P1_FRAC
          const e1 = t1 * t1 * (3 - 2 * t1)
          mesh.position.set(0, 0, TUNNEL_Z * (1 - e1))
        } else {
          // Phase 2: scatter from origin to shelf (ease-out-back slam)
          const t2 = (t - P1_FRAC) / (1 - P1_FRAC)
          const e2 = easeOutBack(t2)
          mesh.position.set(tx * e2, ty * e2, tz * e2)
        }
      }

      renderer.render(scene, camera)
    }

    animate()
  }

  books.forEach(book => {
    const onLoad = (tex: THREE.Texture) => {
      tex.colorSpace = THREE.SRGBColorSpace
      tex.anisotropy = maxAniso
      coverTextures.set(book.id, tex)
      loaded++
      if (loaded === books.length) onAllLoaded()
    }
    const onError = () => {
      const canvas = generateSpine(book, 256, 384)
      const tex = new THREE.CanvasTexture(canvas)
      tex.colorSpace = THREE.SRGBColorSpace
      coverTextures.set(book.id, tex)
      loaded++
      if (loaded === books.length) onAllLoaded()
    }
    loader.load(`/covers/${book.id}.jpg`, onLoad, undefined, onError)
  })

  window.addEventListener('resize', () => {
    const el = document.getElementById('shelf-canvas-container')
    if (!el) return
    camera.aspect = el.clientWidth / el.clientHeight
    camera.updateProjectionMatrix()
    renderer.setSize(el.clientWidth, el.clientHeight)
  })

  renderer.render(scene, camera)
}
