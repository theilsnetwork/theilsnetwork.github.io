# The ILS Network — Website

Official website for **theILSnetwork.com**

## Project Files

```
ilsnetwork-website/
├── index.html     ← full single-page site
├── style.css      ← all styles (dark premium design, responsive)
├── script.js      ← nav, scroll animations, contact form
├── CNAME          ← custom domain for GitHub Pages
└── .gitignore
```

---

## Publish to GitHub Pages

### Step 1 — Push to your GitHub account
```bash
git remote add origin https://github.com/YOUR-ORG/ilsnetwork-website.git
git push -u origin main
```

### Step 2 — Enable GitHub Pages
In your repo on GitHub:
**Settings → Pages → Source:** `Deploy from a branch` → **Branch:** `main` → **Folder:** `/ (root)` → **Save**

### Step 3 — Point your domain (DNS)
Add these records in your DNS provider (GoDaddy, Namecheap, Cloudflare, etc.):

| Type  | Name | Value                  |
|-------|------|------------------------|
| A     | @    | 185.199.108.153        |
| A     | @    | 185.199.109.153        |
| A     | @    | 185.199.110.153        |
| A     | @    | 185.199.111.153        |
| CNAME | www  | YOUR-ORG.github.io     |

The `CNAME` file is already in the repo — GitHub Pages will handle the rest.

---

## Activate the Contact Form

The form uses [Formspree](https://formspree.io) (free tier: 50 submissions/month):

1. Create a free account at formspree.io
2. Create a new form → copy your **Form ID**
3. Open `index.html` and replace `YOUR_FORM_ID`:
   ```html
   action="https://formspree.io/f/xabcdefg"
   ```

---

## Customization Quick-Reference

| What to change | Where |
|----------------|-------|
| Headline & copy | `index.html` — search for the section comments |
| Colors & fonts | `style.css` — edit the `:root` CSS variables at the top |
| Social links | `index.html` — `<footer>` section, four `<a href="#">` icons |
| Stats (500+, 12+) | `index.html` — `about-stats` section |
| Contact email | `index.html` — `mailto:` link in the connect section |
