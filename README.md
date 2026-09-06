# Siddharth K — AI-Assisted Web Developer Portfolio

A dark-themed, product-grade developer portfolio tailored for deployment on **GitHub Pages** (`https://siddharth387-debug.github.io`).

Designed from an engineering-first perspective, communicating:
> **Full-Stack Web Development + AI/LLM Integration + Prompt Engineering + Practical Project Building**

---

## ⚡ Key Highlights

- **Visual Identity**: Dark technical SaaS interface (charcoal/near-black `#090d12`, subtle `#222b38` borders, electric cyan `#38bdf8` accents). Strictly avoids cliché AI tropes (no giant glowing brains, no floating robots, no purple gradients).
- **Authentic Project Hierarchy**:
  1. **Rowl AI (Featured)**: Mental wellness platform built with MERN stack, JWT cookies, Razorpay, and low-latency Sera AI conversational companion powered by Groq Cloud Inference API.
  2. **Faculty Appraisal Management System**: Institutional MERN platform featuring multi-role RBAC, dynamic approval state machines, PDF report generation, and AI-assisted accomplishment synthesis.
  3. **ServeHub (Conventional Foundation)**: Local service marketplace built with PHP & relational MySQL, session-based auth, and RBAC across customer, provider, and admin roles.
- **How I Build With AI**: 10-step audited engineering progression (Understand → Decompose → Prompt → Explore → Evaluate → Implement → Test → Debug → Validate → Deploy).
- **Interactive Prompt Inspector**: Demonstrates structured prompt architecture (Role + Context + Task + Constraints + Output Schema) with an interactive side-by-side diff comparison against naive prompts.
- **Education & Credentials**: Academic credentials (MCA @ Thiagarajar College of Engineering, CGPA 8.47; B.Sc. IT, CGPA 7.62) and CSC Full Stack certifications.
- **Interactive Resume Modal**: Full authentic resume viewable in-browser with one-click print/PDF save.
- **GitHub Pages Routing**: Built with `HashRouter` and relative asset paths (`base: './'`), guaranteeing that direct links and page refreshes on `siddharth387-debug.github.io/#/projects/rowl-ai` never produce 404 errors.

---

## 🛠️ Tech Stack

- **Framework**: [React 19](https://react.dev/) + [Vite](https://vitejs.dev/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Routing**: [React Router](https://reactrouter.com/) (Hash-based for GitHub Pages static hosting)
- **Icons**: [Lucide React](https://lucide.dev/) + custom developer SVGs
- **Deployment**: Automated via GitHub Actions (`.github/workflows/deploy.yml`)

---

## 🚀 Local Development

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Start the local dev server**:
   ```bash
   npm run dev
   ```
   Open `http://localhost:5173` in your browser.

3. **Build for production**:
   ```bash
   npm run build
   ```

4. **Preview production build locally**:
   ```bash
   npm run preview
   ```

---

## 📦 How to Deploy to GitHub Pages (`siddharth387-debug.github.io`)

### Step 1: Create a repository on GitHub
Create a new public repository on GitHub named exactly:
```
siddharth387-debug.github.io
```

### Step 2: Initialize Git and Push
In the `portfolio-github-io` directory, run:
```bash
git init
git add .
git commit -m "feat: initial portfolio release with case studies and prompt inspector"
git branch -M main
git remote add origin https://github.com/siddharth387-debug/siddharth387-debug.github.io.git
git push -u origin main
```

### Step 3: Enable GitHub Pages in Repository Settings
1. Go to your repo on GitHub: `https://github.com/siddharth387-debug/siddharth387-debug.github.io`
2. Click **Settings** → **Pages** (in the left sidebar).
3. Under **Build and deployment** > **Source**, select **GitHub Actions**.
4. The included `.github/workflows/deploy.yml` workflow will automatically run and publish your portfolio to:
   ```
   https://siddharth387-debug.github.io/
   ```

---

## ⚙️ Updating Content & Links

All profile data, links, projects, and resume details are centralized in a single file:
`src/data/portfolioData.js`

You can update your email, add new projects, tweak live links, or modify case studies in this one file without touching UI components.
