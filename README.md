# GymTownFitness — Gym Website

Modern, fully responsive gym website. Pure HTML, CSS and JavaScript. Zero dependencies. Deploy to GitHub Pages in 2 minutes.

## Pages Included
| Page | URL | Features |
|---|---|---|
| Home | `index.html` | Hero, ticker, why us, 6 classes, BMI calc, calorie calc, pricing tabs, testimonials, CTA |
| About | `pages/about.html` | Story, mission, animated counters, values |
| Training | `pages/classes.html` | 6 class cards with details |
| Timetable | `pages/timetable.html` | Full weekly schedule table |
| Trainers | `pages/trainers.html` | 6 trainer profiles |
| Pricing | `pages/pricing.html` | Multi-branch pricing + FAQ |
| Contact | `pages/contact.html` | Contact form + branch info |

## Deploy to GitHub Pages

### Option 1 — GitHub Desktop (easiest)
1. Download and open [GitHub Desktop](https://desktop.github.com)
2. File > Add Existing Repository > select this folder
3. Publish Repository (make it Public)
4. On GitHub.com: Settings > Pages > Source > main > / (root) > Save
5. Live at: `https://YOUR_USERNAME.github.io/YOUR_REPO_NAME`

### Option 2 — Git Command Line
```bash
cd forge-gym
git init
git add .
git commit -m "Initial commit — GymTownFitness website"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git
git push -u origin main
```
Then: GitHub repo > Settings > Pages > Source > main > / (root) > Save

### Option 3 — Upload directly on GitHub.com
1. Create new repository on github.com
2. Click "uploading an existing file"
3. Drag all files and folders into the upload area
4. Commit changes
5. Enable Pages in Settings

## File Structure
```
forge-gym/
├── index.html          ← Homepage (all sections)
├── css/
│   └── style.css       ← All styles
├── js/
│   └── main.js         ← All JavaScript
└── pages/
    ├── about.html
    ├── classes.html
    ├── timetable.html
    ├── trainers.html
    ├── pricing.html
    └── contact.html
```

## Customisation Guide
| What to change | Where |
|---|---|
| Gym name | Find/replace `FORGE`, `GymTown`, `GymTownFitness` in all files |
| Brand colour | Change `--accent: #ff2d00` in `css/style.css` line 6 |
| Pricing amounts | Edit `pages/pricing.html` and `index.html` pricing section |
| Phone / email | Edit `pages/contact.html` and all footers |
| Branch addresses | Edit `pages/contact.html` and `pages/pricing.html` |
| Trainer names | Edit `pages/trainers.html` |
| Class timetable | Edit `pages/timetable.html` |
| Hero image | Change the Unsplash URL in `.hero-bg` inside `css/style.css` |

## Features
- Fixed navbar with scroll effect
- Animated hero with stats counters
- Scrolling ticker band
- Scroll-triggered reveal animations
- Live BMI calculator (Quetelet formula)
- Live calorie calculator (Mifflin-St Jeor)
- Multi-branch pricing tabs
- Full weekly timetable
- Contact form with success feedback
- Fully responsive — mobile, tablet, desktop
- Zero external dependencies (no jQuery, no Bootstrap)
