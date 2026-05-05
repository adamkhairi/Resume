import { defineConfig } from 'vite'

const repositoryName = process.env.GITHUB_REPOSITORY?.split('/')[1]

export default defineConfig({
  root: '.',
  publicDir: 'public',
  base: repositoryName ? `/${repositoryName}/` : '/',
  build: {
    outDir: 'dist',
  },
})
