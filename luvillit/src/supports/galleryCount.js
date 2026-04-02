import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const projectRoot = path.resolve(__dirname, '../../')

const folderPath = path.join(projectRoot, 'public/galleryCollection')
const output = path.join(projectRoot, 'src/supports/galleryCount.json')

try {
    const files = fs.readdirSync(folderPath)
    const imageFiles = files.filter(file => file.endsWith('.webp'))
    fs.writeFileSync(output, JSON.stringify({ count: imageFiles.length }))
    console.log(`Gallery: ${imageFiles.length} ảnh → ${output}`)
} catch (error) {
    console.error('galleryCount.js error:', error.message)
}