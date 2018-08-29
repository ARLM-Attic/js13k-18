const fs = require('fs')
const glob = require('glob')

const TILE_SIZE = 8
const rooms = []

glob('data/*.json', (_, files) => {
  files.forEach(file => {
    const json = fs.readFileSync(file)
    parseMap(JSON.parse(json))
  })
  writeOutput()
})

function parseMap (map) {
  const room = {}
  map.layers.forEach(layer => {
    if (layer.type === 'tilelayer') {
      room.data = layer.data.join('')
    }
    if (layer.type === 'objectgroup') {
      room.items = layer.objects.map(parseObject)
    }
  })
  rooms.push(room)
}

function parseObject (object) {
  const { type, x, y } = object
  const props = [type, x / TILE_SIZE, (y / TILE_SIZE) - 1]
  if (type === 'S') props.push(object.properties.text)
  return props.join('|')
}

// 'S|7|3|An ancient carving\nYou can\'t decipher it'

function writeOutput () {
  const output = 'let rooms = ' + JSON.stringify(rooms)
  fs.writeFileSync('./src/js/rooms.js', output)
}