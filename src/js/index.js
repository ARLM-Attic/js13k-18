const canvas = document.querySelector('canvas')
canvas.width = GAME_WIDTH
canvas.height = GAME_HEIGHT
const ctx = canvas.getContext('2d')

const player = {
  x: 100,
  y: 50,
  width: TILE_SIZE,
  height: TILE_SIZE,
  speed: 1,
  velocity: {
    x: 0,
    y: 0
  }
}

// collision probes
const xProbe1 = { x: 0, y: 0, active: false }
const xProbe2 = { x: 0, y: 0, active: false }
const yProbe1 = { x: 0, y: 0, active: false }
const yProbe2 = { x: 0, y: 0, active: false }


let worldPos = {
  x: 0,
  y: 1
}

let sprites = new Image()
sprites.onload = start
sprites.src = './sprites.png'
