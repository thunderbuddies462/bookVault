import * as THREE from 'three'
import type { BookMeshData } from './cylinder'

export function initInteraction(
  container: HTMLElement,
  canvas: HTMLCanvasElement,
  camera: THREE.PerspectiveCamera,
  cylinderGroup: THREE.Group,
  bookMeshes: BookMeshData[],
) {
  let targetRotation = 0
  let lastDeltaX = 0
  let isDragging = false
  let dragStartX = 0
  let parallaxX = 0
  let parallaxY = 0

  const raycaster = new THREE.Raycaster()
  const pointer = new THREE.Vector2()

  // Floating book-name label — positioned next to the hovered book in screen space
  const tooltip = document.createElement('div')
  tooltip.className = 'shelf-tooltip'
  container.appendChild(tooltip)

  container.addEventListener('wheel', (e) => {
    e.preventDefault()
    targetRotation += e.deltaY * 0.003
  }, { passive: false })

  container.addEventListener('pointerdown', (e) => {
    isDragging = true
    dragStartX = e.clientX
    lastDeltaX = 0
    canvas.style.cursor = 'grabbing'
  })

  window.addEventListener('pointermove', (e) => {
    if (isDragging) {
      const dx = e.clientX - dragStartX
      targetRotation += dx * 0.005
      lastDeltaX = dx
      dragStartX = e.clientX
    }

    const rect = container.getBoundingClientRect()
    parallaxX = ((e.clientX - rect.left) / rect.width - 0.5) * 0.22
    parallaxY = ((e.clientY - rect.top) / rect.height - 0.5) * -9.0

    if (!isDragging) {
      pointer.x = ((e.clientX - rect.left) / rect.width) * 2 - 1
      pointer.y = -((e.clientY - rect.top) / rect.height) * 2 + 1
      doHoverCheck()
    }
  })

  window.addEventListener('pointerup', () => {
    if (isDragging) {
      targetRotation += lastDeltaX * 0.3 * 0.005
      isDragging = false
      canvas.style.cursor = 'grab'
    }
  })

  function projectToScreen(mesh: THREE.Mesh): { x: number; y: number } {
    // Get actual world position (accounts for cylinderGroup rotation)
    const worldPos = new THREE.Vector3()
    mesh.getWorldPosition(worldPos)
    worldPos.project(camera)

    const rect = container.getBoundingClientRect()
    return {
      x: (worldPos.x + 1) / 2 * rect.width,
      y: -(worldPos.y - 1) / 2 * rect.height,
    }
  }

  function doHoverCheck() {
    raycaster.setFromCamera(pointer, camera)
    raycaster.ray.applyMatrix4(new THREE.Matrix4().makeRotationY(-cylinderGroup.rotation.y))

    const meshes = bookMeshes.map(b => b.mesh)
    const hits = raycaster.intersectObjects(meshes)

    if (hits.length > 0) {
      const found = bookMeshes.find(b => b.mesh === hits[0].object)
      if (found) {
        canvas.style.cursor = 'pointer'

        // Position label next to the book in screen space
        const { x, y } = projectToScreen(found.mesh)
        const rect = container.getBoundingClientRect()
        // Place to the right; flip to left if near right edge
        const onRight = x < rect.width * 0.65
        tooltip.style.left   = onRight ? `${x + 16}px` : `${x - 16}px`
        tooltip.style.top    = `${y}px`
        tooltip.style.transform = onRight
          ? 'translateY(-50%)'
          : 'translate(-100%, -50%)'

        tooltip.textContent = found.book.title
        tooltip.classList.add('visible')
      }
    } else {
      canvas.style.cursor = 'grab'
      tooltip.classList.remove('visible')
    }
  }

  function handleClick(e: MouseEvent, cam: THREE.PerspectiveCamera): number | null {
    const rect = container.getBoundingClientRect()
    pointer.x = ((e.clientX - rect.left) / rect.width) * 2 - 1
    pointer.y = -((e.clientY - rect.top) / rect.height) * 2 + 1

    raycaster.setFromCamera(pointer, cam)
    raycaster.ray.applyMatrix4(new THREE.Matrix4().makeRotationY(-cylinderGroup.rotation.y))

    const hits = raycaster.intersectObjects(bookMeshes.map(b => b.mesh))
    if (hits.length > 0) {
      const found = bookMeshes.find(b => b.mesh === hits[0].object)
      return found ? found.book.id : null
    }
    return null
  }

  canvas.style.cursor = 'grab'

  return {
    getTargetRotation: () => targetRotation,
    getParallax: () => ({ px: parallaxX, py: parallaxY }),
    handleClick,
  }
}
