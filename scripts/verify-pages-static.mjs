import { readFileSync } from 'node:fs'

const indexHtml = readFileSync(new URL('../index.html', import.meta.url), 'utf8')
const mainJs = readFileSync(new URL('../src/main.js', import.meta.url), 'utf8')

const issues = []

if (indexHtml.includes('href="/src/style.css"')) {
  issues.push('index.html uses root-absolute stylesheet path `/src/style.css`')
}

if (indexHtml.includes('src="/src/main.js"')) {
  issues.push('index.html uses root-absolute module path `/src/main.js`')
}

if (mainJs.includes("import content from './assets/content.json'")) {
  issues.push('src/main.js imports JSON as a JS module, which breaks when served unbundled on GitHub Pages branch deployments')
}

if (issues.length > 0) {
  console.error('GitHub Pages static compatibility checks failed:')
  for (const issue of issues) {
    console.error(`- ${issue}`)
  }
  process.exit(1)
}

console.log('GitHub Pages static compatibility checks passed.')