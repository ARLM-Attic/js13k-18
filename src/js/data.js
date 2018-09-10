const spaceToNull = char => char === ' ' ? null : char

function getTileData (type) {
  return {
    type,
    sy: 0,
    sx: (type - 1) * TILE_SIZE,
    ...(tileData[type] || {})
  }
}

const tileData = {
  0: { solid: false },
  1: { solid: false },
  9: { solid: false },
  10: { solid: false, damage: true },
  11: { solid: false },
}

function resetMap () {
  const rooms = []
  for (let y = 0; y < roomData.length; y++) {
    for (let x = 0; x < roomData[y].length; x++) {
      if(!rooms[y]) rooms[y] = []
      rooms[y][x] = parseRoom(roomData, x, y)
    }
  }
  world.rooms = rooms
}


function parseRoom (data, x, y) {

  const input = data[y][x]
  const tiles = input.data.map(spaceToNull)
  const room = new Room(x, y)

  for (let y = 0; y < MAP_HEIGHT; y++) {
    const row = []
    for (let x = 0; x < MAP_WIDTH; x++) {
      const ix = y * MAP_WIDTH + x
      let type = tiles[ix]
      const tile = {
        x, y,
        solid: true,
        ...getTileData(type)
      }
      row.push(tile)
    }
    room.data.push(row)
  }

  room.items = input.items ? input.items.map(props => {
    const { type } = props
    return createItem(type, props)
  }).filter(i => i) : []

  return room
}

function createItem (type, props) {
  try {
    const ClassName = eval(type)
    return new ClassName(props)
  } catch (e) {
    return console.warn(e)
  }
}
