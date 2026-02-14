# 🎨 Frontend Architecture & Design System

## Overview

This document defines the frontend architecture for the Go Blog, focusing on:
- ⚡ **Performance**: Fast page loads with code splitting
- 🔍 **SEO**: Search engine optimized
- 🧩 **Components**: Reusable, maintainable components
- 📦 **Organization**: Clear structure for team collaboration
- ♿ **Accessibility**: WCAG 2.1 AA compliant

---

## 🏗️ Architecture Pattern

### **Progressive Enhancement + Component-Based Design**

```
┌─────────────────────────────────────────────┐
│           Server-Side Rendering              │
│  (Go Templates - SEO friendly, fast FCP)    │
└─────────────────┬───────────────────────────┘
                  │
        ┌─────────┴─────────┐
        │                   │
        ▼                   ▼
   Critical CSS        Base HTML
   (inline)            (semantic)
        │                   │
        └─────────┬─────────┘
                  │
        ┌─────────┴─────────┐
        │                   │
        ▼                   ▼
   Page-specific       HTMX (optional)
   CSS (lazy)          Progressive enhancement
```

---

## 📁 Proposed Folder Structure

```
web/
├── static/
│   ├── css/
│   │   ├── critical.css           # Critical above-the-fold CSS
│   │   ├── base.css               # Base styles (typography, reset)
│   │   ├── components/            # Component-specific CSS
│   │   │   ├── header.css
│   │   │   ├── nav.css
│   │   │   ├── article-card.css
│   │   │   ├── button.css
│   │   │   ├── form.css
│   │   │   └── table.css
│   │   ├── pages/                 # Page-specific CSS
│   │   │   ├── home.css
│   │   │   ├── article.css
│   │   │   ├── admin.css
│   │   │   └── login.css
│   │   └── utils/                 # Utility CSS
│   │       ├── spacing.css
│   │       └── animations.css
│   ├── js/
│   │   ├── core.js                # Essential JS (lazy load, etc.)
│   │   ├── components/            # Component scripts
│   │   │   ├── theme-toggle.js
│   │   │   └── search.js
│   │   └── pages/                 # Page-specific JS
│   │       ├── admin.js
│   │       └── article.js
│   └── images/
│       ├── icons/
│       └── optimized/
├── templates/
│   ├── base/
│   │   ├── layout.html            # Base layout
│   │   └── seo.html               # SEO meta tags
│   ├── components/                # Reusable components
│   │   ├── header.html
│   │   ├── nav.html
│   │   ├── footer.html
│   │   ├── article-card.html
│   │   └── pagination.html
│   └── pages/                     # Full page templates
│       ├── home.html
│       ├── article.html
│       ├── login.html
│       └── admin/
│           ├── dashboard.html
│           ├── add.html
│           └── edit.html
└── docs/
    ├── component-guide.md         # Component documentation
    └── style-guide.md             # Design system guide
```

---

## 🎯 CSS Strategy: Critical + Lazy Loading

### 1. **Critical CSS (Inline in `<head>`)**

Extract and inline only above-the-fold styles:

```html
<head>
  <style>
    /* Critical CSS - Inline for fastest FCP */
    :root { /* CSS variables */ }
    body { /* Base styles */ }
    header { /* Header styles */ }
    /* Only styles needed for initial viewport */
  </style>
  
  <!-- Non-critical CSS loaded async -->
  <link rel="preload" href="/static/css/base.css" as="style" onload="this.onload=null;this.rel='stylesheet'">
  <link rel="preload" href="/static/css/pages/{{.PageCSS}}.css" as="style" onload="this.onload=null;this.rel='stylesheet'">
  <noscript>
    <link rel="stylesheet" href="/static/css/base.css">
    <link rel="stylesheet" href="/static/css/pages/{{.PageCSS}}.css">
  </noscript>
</head>
```

### 2. **Component-Based CSS Modules**

Each component has its own CSS file:

```css
/* components/article-card.css */
.article-card {
  /* Scoped styles using BEM naming */
}

.article-card__title { }
.article-card__excerpt { }
.article-card--featured { }
```

### 3. **Page-Specific CSS**

Only load CSS needed for current page:

```go
// In handler
type PageData struct {
    Articles []Article
    Meta     PageMeta
}

type PageMeta struct {
    Title       string
    Description string
    PageCSS     string // "home", "article", "admin"
    PageJS      string
}
```

---

## 📦 Component-Based Architecture

### Component Structure

Each component is self-contained:

```
components/article-card/
├── article-card.html    # Template
├── article-card.css     # Styles
├── article-card.js      # Behavior (if needed)
└── README.md            # Documentation
```

### Example Component Template

```html
{{/* components/article-card.html */}}
{{ define "article-card" }}
<article class="article-card" data-article-id="{{ .ID }}">
  <h3 class="article-card__title">
    <a href="/article?id={{ .ID }}">{{ .Title }}</a>
  </h3>
  <time class="article-card__date" datetime="{{ .Date.Format "2006-01-02" }}">
    {{ .Date.Format "January 2, 2006" }}
  </time>
  <p class="article-card__excerpt">{{ .Excerpt }}</p>
  <a href="/article?id={{ .ID }}" class="article-card__link">Read more →</a>
</article>
{{ end }}
```

### Using Components

```html
{{/* pages/home.html */}}
{{ define "content" }}
<div class="articles-grid">
  {{ range .Articles }}
    {{ template "article-card" . }}
  {{ end }}
</div>
{{ end }}
```

---

## ⚡ Performance Optimizations

### 1. **Asset Loading Strategy**

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  
  <!-- DNS Prefetch -->
  <link rel="dns-prefetch" href="https://unpkg.com">
  
  <!-- Critical CSS (inline) -->
  <style>{{ .CriticalCSS }}</style>
  
  <!-- Preload important assets -->
  <link rel="preload" href="/static/css/base.css" as="style">
  <link rel="preload" href="/static/fonts/inter.woff2" as="font" type="font/woff2" crossorigin>
  
  <!-- Async load non-critical CSS -->
  <link rel="stylesheet" href="/static/css/base.css" media="print" onload="this.media='all'">
  <link rel="stylesheet" href="/static/css/pages/{{ .PageCSS }}.css" media="print" onload="this.media='all'">
  
  <!-- SEO Meta Tags -->
  {{ template "seo-meta" . }}
</head>
<body>
  <!-- Content -->
  
  <!-- Defer JavaScript -->
  <script src="https://unpkg.com/htmx.org@1.9.10" defer></script>
  {{ if .PageJS }}
  <script src="/static/js/pages/{{ .PageJS }}.js" defer></script>
  {{ end }}
</body>
</html>
```

### 2. **Image Optimization**

```html
<!-- Responsive images with lazy loading -->
<img 
  src="/static/images/placeholder.jpg"
  data-src="/static/images/article-{{ .ID }}.jpg"
  srcset="/static/images/article-{{ .ID }}-320w.jpg 320w,
          /static/images/article-{{ .ID }}-640w.jpg 640w,
          /static/images/article-{{ .ID }}-1280w.jpg 1280w"
  sizes="(max-width: 320px) 280px, (max-width: 640px) 600px, 1200px"
  alt="{{ .Title }}"
  loading="lazy"
  class="article-image">
```

### 3. **Code Splitting**

Load JavaScript only when needed:

```javascript
// core.js - Minimal, always loaded
const loadModule = (moduleName) => {
  return import(`/static/js/components/${moduleName}.js`);
};

// Load admin features only on admin pages
if (document.querySelector('.admin-dashboard')) {
  loadModule('admin').then(module => module.init());
}
```

---

## 🔍 SEO Best Practices

### 1. **SEO Meta Template**

```html
{{/* templates/base/seo.html */}}
{{ define "seo-meta" }}
<!-- Primary Meta Tags -->
<title>{{ .Meta.Title }} - Go Blog</title>
<meta name="title" content="{{ .Meta.Title }}">
<meta name="description" content="{{ .Meta.Description }}">
<meta name="keywords" content="{{ .Meta.Keywords }}">
<link rel="canonical" href="{{ .Meta.CanonicalURL }}">

<!-- Open Graph / Facebook -->
<meta property="og:type" content="website">
<meta property="og:url" content="{{ .Meta.URL }}">
<meta property="og:title" content="{{ .Meta.Title }}">
<meta property="og:description" content="{{ .Meta.Description }}">
<meta property="og:image" content="{{ .Meta.Image }}">

<!-- Twitter -->
<meta property="twitter:card" content="summary_large_image">
<meta property="twitter:url" content="{{ .Meta.URL }}">
<meta property="twitter:title" content="{{ .Meta.Title }}">
<meta property="twitter:description" content="{{ .Meta.Description }}">
<meta property="twitter:image" content="{{ .Meta.Image }}">

<!-- Structured Data -->
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "BlogPosting",
  "headline": "{{ .Meta.Title }}",
  "description": "{{ .Meta.Description }}",
  "author": {
    "@type": "Person",
    "name": "{{ .Author }}"
  },
  "datePublished": "{{ .Date.Format "2006-01-02" }}",
  "image": "{{ .Meta.Image }}"
}
</script>
{{ end }}
```

### 2. **Semantic HTML**

```html
<!-- Use semantic tags -->
<article itemscope itemtype="https://schema.org/BlogPosting">
  <header>
    <h1 itemprop="headline">{{ .Title }}</h1>
    <time itemprop="datePublished" datetime="{{ .Date.Format "2006-01-02" }}">
      {{ .Date.Format "January 2, 2006" }}
    </time>
    <meta itemprop="author" content="{{ .Author }}">
  </header>
  
  <div itemprop="articleBody">
    {{ .Content }}
  </div>
</article>
```

### 3. **Sitemap & RSS**

Generate automatically:

```go
// Add to main.go
http.HandleFunc("/sitemap.xml", handler.Sitemap)
http.HandleFunc("/rss", handler.RSS)
```

---

## 🎨 Design System

### CSS Architecture: ITCSS + BEM

```
1. Settings   - Variables, config
2. Tools      - Mixins, functions
3. Generic    - Reset, normalize
4. Elements   - Base HTML elements
5. Objects    - Layout patterns
6. Components - UI components
7. Utilities  - Helper classes
```

### Naming Convention: BEM

```css
.block { }
.block__element { }
.block--modifier { }

/* Example */
.article-card { }
.article-card__title { }
.article-card__title--large { }
.article-card--featured { }
```

### CSS Custom Properties

```css
:root {
  /* Colors */
  --color-primary: #2563eb;
  --color-primary-hover: #1d4ed8;
  
  /* Spacing Scale */
  --space-xs: 0.25rem;
  --space-sm: 0.5rem;
  --space-md: 1rem;
  --space-lg: 2rem;
  --space-xl: 4rem;
  
  /* Typography */
  --font-sans: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  --font-size-base: 1rem;
  --line-height-base: 1.6;
  
  /* Breakpoints (use in JS) */
  --breakpoint-sm: 640px;
  --breakpoint-md: 768px;
  --breakpoint-lg: 1024px;
}
```

---

## 🧩 Component Library

### Core Components

1. **Layout Components**
   - Header
   - Navigation
   - Footer
   - Container
   - Grid

2. **Content Components**
   - Article Card
   - Article Detail
   - Pagination
   - Breadcrumbs

3. **Form Components**
   - Input
   - Textarea
   - Button
   - Select
   - Checkbox/Radio

4. **Admin Components**
   - Table
   - Dashboard Card
   - Action Buttons
   - Modal

5. **Utility Components**
   - Loading Spinner
   - Toast Notification
   - Alert/Message

---

## 📝 Implementation Plan

### Phase 1: Restructure CSS (Week 1)

1. Split `style.css` into modules
2. Create component-specific CSS
3. Extract critical CSS
4. Implement lazy loading

### Phase 2: Component Templates (Week 2)

1. Break down templates into components
2. Create component documentation
3. Build style guide page

### Phase 3: Performance (Week 3)

1. Implement code splitting
2. Add image optimization
3. Set up caching headers
4. Measure and optimize

### Phase 4: SEO & Accessibility (Week 4)

1. Add meta tags
2. Implement structured data
3. Generate sitemap/RSS
4. Accessibility audit

---

## 🛠️ Development Workflow

### Adding a New Component

1. **Create component files**
   ```bash
   mkdir web/templates/components/my-component
   touch web/templates/components/my-component/my-component.html
   touch web/static/css/components/my-component.css
   ```

2. **Document the component**
   ```markdown
   # My Component
   
   ## Usage
   {{ template "my-component" .Data }}
   
   ## Props
   - Title (string)
   - Description (string)
   
   ## Example
   ...
   ```

3. **Add to style guide**
   Update component library page

4. **Write tests**
   Test component rendering

---

## 📊 Performance Metrics

### Target Metrics

- **First Contentful Paint (FCP)**: < 1.8s
- **Largest Contentful Paint (LCP)**: < 2.5s
- **Time to Interactive (TTI)**: < 3.8s
- **Cumulative Layout Shift (CLS)**: < 0.1
- **First Input Delay (FID)**: < 100ms

### Monitoring

```javascript
// web-vitals.js
import { getCLS, getFID, getFCP, getLCP, getTTFB } from 'web-vitals';

function sendToAnalytics(metric) {
  // Send to your analytics
  console.log(metric);
}

getCLS(sendToAnalytics);
getFID(sendToAnalytics);
getFCP(sendToAnalytics);
getLCP(sendToAnalytics);
getTTFB(sendToAnalytics);
```

---

## ♿ Accessibility Checklist

- ✅ Semantic HTML
- ✅ ARIA labels where needed
- ✅ Keyboard navigation
- ✅ Focus indicators
- ✅ Color contrast > 4.5:1
- ✅ Alt text for images
- ✅ Skip to content link
- ✅ Screen reader tested

---

## 📚 Documentation

### 1. **Component Guide**
Document each component with:
- Purpose
- Props/parameters
- Usage examples
- Do's and don'ts

### 2. **Style Guide**
- Color palette
- Typography scale
- Spacing system
- Component examples

### 3. **Contributing Guide**
- File naming conventions
- Code style
- Commit messages
- Review process

---

## 🔄 Migration Strategy

### From Current to New Architecture

```
Current (Monolithic)
└── style.css (2000+ lines)

New (Modular)
├── critical.css (200 lines, inline)
├── base.css (300 lines, async)
├── components/ (10 files, 100 lines each)
└── pages/ (5 files, 50 lines each)
```

**Benefit**: 
- Initial load: 200 lines (critical) vs 2000 lines
- Subsequent pages: Only load what's needed

---

## 🎯 Success Metrics

### Before
- CSS: 2000+ lines, 1 file
- Load time: ~3-4s
- Lighthouse: 70-80

### After
- CSS: ~200 lines initial, lazy load rest
- Load time: < 2s
- Lighthouse: 95+
- Maintainability: ⭐⭐⭐⭐⭐

---

**This architecture provides a solid foundation for scalable, performant, and maintainable frontend development!** 🚀
