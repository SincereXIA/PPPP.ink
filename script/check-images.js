const fs = require('fs')
const path = require('path')
const crypto = require('crypto')

const root = path.resolve(__dirname, '..')
const images = require('./image-sources.json')
const publicDir = path.join(root, 'content/.vuepress/public')
const checkDist = process.argv.includes('--dist')
const errors = []

for (const image of images) {
  const directories = checkDist ? [publicDir, path.join(root, 'public')] : [publicDir]
  for (const directory of directories) {
    const file = path.join(directory, image.local)
    if (!fs.existsSync(file)) {
      errors.push(`Missing image: ${file}`)
      continue
    }
    const data = fs.readFileSync(file)
    const hash = crypto.createHash('sha256').update(data).digest('hex')
    if (hash !== image.sha256) errors.push(`Image checksum changed: ${file}`)
  }

  for (const reference of image.references) {
    const content = fs.readFileSync(path.join(root, reference), 'utf8')
    if (!content.includes(image.local)) errors.push(`Missing local reference: ${reference}: ${image.local}`)
    if (content.includes(image.source)) errors.push(`Old image URL remains: ${reference}: ${image.source}`)
  }
}

if (errors.length) {
  console.error(errors.join('\n'))
  process.exitCode = 1
} else {
  console.log(`Verified ${images.length} recovered images and their references${checkDist ? ' (including build output)' : ''}.`)
}
