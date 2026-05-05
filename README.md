# Resume

## GitHub Pages deployment

This project is configured to deploy automatically to GitHub Pages using GitHub Actions.

### 1) Repository settings

In your GitHub repository:

1. Go to `Settings` → `Pages`.
2. In **Build and deployment**, set **Source** to **GitHub Actions**.

### 2) Trigger deployment

The workflow is defined in `.github/workflows/deploy-pages.yml` and runs on every push to `main`.

You can deploy by pushing to `main`:

```bash
git push origin main
```

### 3) Local build check

Before pushing, you can verify the build locally:

```bash
npm run build:pages
```

