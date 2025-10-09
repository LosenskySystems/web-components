# Local Development Guide

Your monorepo is now set up for **dual-mode development**:

## 📦 Package Structure

- **Main Repo (GitHub)**: Only tracks `packages/` (component library)
- **Apps Repos (Separate GitHub)**: Independent repos for `demo` and `web`
- **Local Setup**: Apps stay in folder for testing, use local packages

## 🔄 Two Development Modes

### Mode 1: Local Development (Testing Unpublished Changes)

**When**: Developing packages and want to test immediately in apps

```bash
# Enable local workspace mode
pnpm workspace:enable

# Install dependencies (links apps to local packages)
pnpm install

# Start development
pnpm dev
```

**What happens:**
- ✅ Apps use local packages from `packages/`
- ✅ Changes to packages instantly reflect in apps
- ✅ Perfect for testing before publishing

### Mode 2: Production Mode (Using Published Packages)

**When**: Working with published packages only

```bash
# Disable local workspace mode
pnpm workspace:disable

# Apps now use published packages from npm
```

## 📝 How It Works

### Apps package.json (Committed to GitHub)
```json
{
  "dependencies": {
    "@losensky-systems/web-components-core": "^0.1.0",
    "@losensky-systems/web-components-tailwindcss": "^0.1.0"
  }
}
```

### When Local Mode is Enabled
pnpm automatically uses local packages even though version numbers are specified!

**How?** The workspace configuration takes precedence:
1. `workspace:enable` adds `apps/*` to `pnpm-workspace.yaml`
2. pnpm sees apps in workspace
3. pnpm links local packages instead of downloading from npm
4. Apps get live updates from your local packages

## 🚀 Complete Workflow

### 1. Develop Packages Locally

```bash
# Enable local mode
pnpm workspace:enable
pnpm install

# Work on packages
cd packages/core
# make changes...

# Test in apps (automatically uses local changes)
cd ../../apps/demo
pnpm dev
```

### 2. Commit App Changes to Their Repos

```bash
cd apps/web
git add .
git commit -m "Update docs"
git push  # Goes to apps/web GitHub repo

cd ../demo
git add .
git commit -m "Add demo"
git push  # Goes to apps/demo GitHub repo
```

### 3. Publish Packages

```bash
# Disable local mode first
pnpm workspace:disable

# Build and publish packages
cd packages/core
pnpm build
npm publish

cd ../tailwindcss
pnpm build
npm publish
```

### 4. Update Apps to Use New Published Version

```bash
cd apps/web
# Update package.json version numbers if needed
pnpm update @losensky-systems/web-components-core
git commit -am "Update to latest packages"
git push
```

## 🎯 Quick Commands

```bash
# Enable local development with apps
pnpm workspace:enable

# Disable local development (packages only)
pnpm workspace:disable

# Combined: enable + install + dev
pnpm dev:local
```

## ⚠️ Important Notes

1. **Always disable before committing to main repo**
   ```bash
   pnpm workspace:disable
   git add pnpm-workspace.yaml
   git commit -m "Your changes"
   ```

2. **App repos always use version numbers**
   - Never commit `workspace:*` to app repos
   - Always use `^0.1.0` or similar

3. **Local mode is automatic**
   - When workspace includes apps, pnpm uses local packages
   - When workspace excludes apps, pnpm uses published packages

## 🔍 Checking Current Mode

```bash
# Check workspace configuration
cat pnpm-workspace.yaml

# If it includes "apps/*" → Local mode ON
# If it doesn't → Local mode OFF
```

## 📊 Summary

| Aspect | Local Mode | Production Mode |
|--------|-----------|-----------------|
| **Workspace** | Includes `apps/*` | Only `packages/*` |
| **Package Source** | Local workspace | npm registry |
| **Use Case** | Development & testing | Published packages |
| **App Dependencies** | Linked to local | Downloaded from npm |

---

This setup gives you the best of both worlds:
- ✅ Test unpublished changes locally
- ✅ Apps work independently on GitHub
- ✅ Clean separation of concerns
- ✅ Easy switching between modes

Happy coding! 🎉

