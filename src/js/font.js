function drawText (text) {
  // split at 30 characters on word boundaries
  const lines = text.toUpperCase().split(/(.{1,24}\b)/).filter(Boolean)

  const max = lines.slice().sort((a, b) => (b.length - a.length))[0].length

  const pad = 4
  const lineHeight = 8

  // background box
  let bw = (max * 4) + (pad * 2)
  if (bw %2 !== 0) bw += 1

  let bh = (lines.length * lineHeight) + (pad * 2) - 2
  if (bh %2 !== 0) bh += 1

  const bx = (128 - bw) / 2
  const by = (128 - bh) / 2
  ctx.fillStyle = '#000000'
  ctx.fillRect(bx, by, bw, bh)

  lines.forEach((line, y) => line.trim().split('').forEach((c, x) => {
    const sx = getX(c)
    const dx = x * 4 + pad
    const dy = (y * lineHeight) + pad
    ctx.drawImage(
      font,
      sx, 0,
      3, 5,
      dx + bx,
      dy + by,
      3, 5
    )
  }))
}

// A is 65, which is at 1, and each character is 3 wide
function getX (c) {
  const cc = c.charCodeAt(0)
  if (cc === 32) return 78
  if (cc === 44) return 81
  return (cc - 65) * 3
}
