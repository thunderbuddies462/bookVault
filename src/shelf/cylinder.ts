import * as THREE from 'three'
import type { Book } from '../data/books'

export interface BookMeshData {
  mesh: THREE.Mesh
  book: Book
  targetY: number
  fallDelay: number
}

const R = 5
const NUM_ROWS = 22
const COVER_W = 0.44
const BOOK_H = 0.63
const ROW_SPACING = 0.70
const PER_ROW = 72

export const TUNNEL_Z = -45

const START_Y = -((NUM_ROWS - 1) / 2) * ROW_SPACING

function rng(seed: number): number {
  const s = Math.sin(seed * 127.1 + 311.7) * 43758.5453
  return s - Math.floor(s)
}

export function createCylinder(
  books: Book[],
  group: THREE.Group,
  coverTextures: Map<number, THREE.Texture>,
  _maxAnisotropy = 8,
): BookMeshData[] {
  const meshData: BookMeshData[] = []

  for (let row = 0; row < NUM_ROWS; row++) {
    const rowY = START_Y + row * ROW_SPACING
    const rowOff = row * (Math.PI / 12)

    for (let i = 0; i < PER_ROW; i++) {
      const bookIdx = (i + row * 23) % books.length
      const book = books[bookIdx]

      const s = row * 10007 + i
      const bookH  = BOOK_H * (0.90 + rng(s)           * 0.14)
      const coverW = COVER_W * (0.90 + rng(s * 2 + 1) * 0.18)
      const yOff   = (rng(s * 3 + 2) - 0.5) * 0.010
      const rVar   = rng(s * 5 + 3) * 0.02
      const lean   = (rng(s * 7 + 4) - 0.5) * 0.015

      const yCenter = rowY + (bookH - BOOK_H) / 2 + yOff
      const theta   = (i / PER_ROW) * 2 * Math.PI + rowOff

      const rEff = R - rVar
      const x = rEff * Math.sin(theta)
      const z = rEff * Math.cos(theta)

      const tex = coverTextures.get(book.id)
      const coverGeo = new THREE.PlaneGeometry(coverW, bookH)
      const coverMat = new THREE.MeshLambertMaterial({
        map: tex ?? null,
        color: tex ? 0xffffff : 0x223355,
        side: THREE.DoubleSide,
      })
      const coverMesh = new THREE.Mesh(coverGeo, coverMat)

      const fallDelay = Math.floor(rng(row * 997 + i + 1) * 700)

      coverMesh.position.set(0, 0, TUNNEL_Z)
      coverMesh.rotation.y = -theta + lean

      coverMesh.userData.targetX   = x
      coverMesh.userData.targetZ   = z
      coverMesh.userData.targetY   = yCenter
      coverMesh.userData.fallDelay = fallDelay

      group.add(coverMesh)
      meshData.push({ mesh: coverMesh, book, targetY: yCenter, fallDelay })
    }
  }

  return meshData
}
