# 🚀 Frontend Architecture Implementation Guide

## Quick Start: Implementing the New Architecture

This guide shows you how to migrate from the current monolithic structure to the optimized, component-based architecture.

---

## 📋 Step-by-Step Migration

### Step 1: Understand Current vs New Structure

**Current (Monolithic):**
```
web/static/css/style.css (2000+ lines)
web/templates/*.html (7 files)
```

**New (Modular):**
```
web/static/css/
├── critical.css (inline in layout)
├── base.css (core styles)
├── components/*.css (per-component)
└── pages/*.css (per-page)
```

---

### Step 2: Split Your CSS

#### A. Extract Critical CSS

Create `web/static/css/critical.css` with only above-the-fold styles:

```css
/* critical.css - ~200 lines */
:root { /* CSS variables */ }
* { /* Reset */ }
body { /* Base body */ }
header { /* Header only */ }
nav { /* Navigation */ }
.container { /* Layout */ }
```

#### B. Create Base CSS

Create `web/static/css/base.css` with common styles:

```css
/* base.css - Foundation styles */
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');

/* Typography */
h2 { }
h3 { }
p { }
a { }

/* Forms */
input,textarea,select { }
button { }

/* Common utilities */
.btn { }
.btn-primary { }
```

#### C. Create Component CSS

For each component, create a separate file:

```bash
# Run these commands
mkdir -p web/static/css/components
touch web/static/css/components/header.css
touch web/static/css/components/nav.css
touch web/static/css/components/footer.css
touch web/static/css/components/article-card.css
touch web/static/css/components/button.css
touch web/static/css/components/form.css
touch web/static/css/components/table.css
```

Example - `web/static/css/components/header.css`:
```css
/* Header Component */
.header {
  background-color: var(--card-bg);
  box-shadow: var(--shadow);
  position: sticky;
  top: 0;
  z-index: 100;
}

.header__container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 1.5rem;
}

.header__logo {
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--primary-color);
}
```

#### D. Create Page-Specific CSS

```bash
mkdir -p web/static/css/pages
touch web/static/css/pages/home.css
touch web/static/css/pages/article.css
touch web/static/css/pages/admin.css
touch web/static/css/pages/login.css
```

Example - `web/static/css/pages/home.css`:
```css
/* Home Page Specific Styles */
.articles-grid {
  display: grid;
  gap: 2rem;
}

.hero-section {
  padding: 4rem 0;
  text-align: center;
}
```

---

### Step 3: Update Go Handlers

#### A. Add the assets helper

You already have `internal/handler/assets.go` (created above). Now use it:

```go
// In internal/handler/article.go

func (h *ArticleHandler) List(w http.ResponseWriter, r *http.Request) {
	articles, err := h.service.ListArticles()
	if err != nil {
		http.Error(w, "Failed to fetch articles", http.StatusInternalServerError)
		return
	}

	// Create page data with metadata
	pageData := PageData{
		Meta:    HomePageMeta(),
		Content: articles,
	}

	renderTemplate(w, r, "home.html", pageData)
}

func (h *ArticleHandler) Get(w http.ResponseWriter, r *http.Request) {
	idStr := r.URL.Query().Get("id")
	id, err := strconv.Atoi(idStr)
	if err != nil {
		http.Error(w, "Invalid ID", http.StatusBadRequest)
		return
	}

	article, err := h.service.GetArticle(id)
	if err != nil || article == nil {
		http.NotFound(w, r)
		return
	}

	// Create page data with article metadata
	pageData := PageData{
		Meta:    ArticlePageMeta(article),
		Content: article,
	}

	renderTemplate(w, r, "article.html", pageData)
}
```

#### B. Update Admin Handlers

```go
// In internal/handler/admin.go

func (h *AdminHandler) Dashboard(w http.ResponseWriter, r *http.Request) {
	articles, err := h.service.ListArticles()
	if err != nil {
		http.Error(w, "Failed to load articles", http.StatusInternalServerError)
		return
	}

	pageData := PageData{
		Meta:    AdminPageMeta("Dashboard"),
		Content: articles,
	}

	renderTemplate(w, r, "admin_dashboard.html", pageData)
}
```

---

### Step 4: Update Templates

#### A. Use the new optimized layout

Option 1: Update existing `layout.html`:

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  
  <!-- SEO Meta Tags -->
  {{ if .Meta }}
  {{ template "seo-meta" .Meta }}
  {{ else }}
  <title>Go Blog</title>
  {{ end }}
  
  <!-- Critical CSS (inline) -->
  <style>{{ template "critical-css" }}</style>
  
  <!-- Base CSS (async load) -->
  <link rel="stylesheet" href="/static/css/base.css" media="print" onload="this.media='all'">
  
  <!-- Page-specific CSS -->
  {{ if .Meta }}
  {{ range .Meta.PageCSS }}
  <link rel="stylesheet" href="/static/css/{{ . }}" media="print" onload="this.media='all'">
  {{ end }}
  {{ end }}
  
  <script src="https://unpkg.com/htmx.org@1.9.10" defer></script>
</head>
<body>
  <header>
    <div class="container">
      <h1><a hx-get="/" hx-target="#content" hx-push-url="true">📝 Go Blog</a></h1>
      <nav>
        <a hx-get="/" hx-target="#content" hx-push-url="true">Home</a>
        <a hx-get="/admin" hx-target="#content" hx-push-url="true">Admin</a>
        <a href="/logout">Logout</a>
      </nav>
    </div>
  </header>

  <main>
    <div class="container">
      <div id="content">
        {{ if .Content }}
        {{ template "content" .Content }}
        {{ else }}
        {{ template "content" . }}
        {{ end }}
      </div>
    </div>
  </main>

  <footer>
    <div class="container">
      <p>&copy; 2026 Go Blog. Built with Go, HTMX, and ❤️</p>
    </div>
  </footer>
  
  <!-- Lazy load script helper -->
  <script>
    (function() {
      var links = document.querySelectorAll('link[media="print"]');
      for (var i = 0; i < links.length; i++) {
        links[i].media = 'all';
      }
    })();
  </script>
</body>
</html>

{{ define "critical-css" }}
/* Critical CSS goes here - see critical.css */
:root {
  --primary-color: #2563eb;
  --primary-hover: #1d4ed8;
  --secondary-color: #64748b;
  --bg-color: #f8fafc;
  --text-color: #1e293b;
  --border-color: #e2e8f0;
  --card-bg: #ffffff;
}
/* ... rest of critical CSS ... */
{{ end }}
```

#### B. Create component templates

Already created `web/templates/components/article-card.html` above.

Update `home.html` to use it:

```html
{{ define "title" }}Home{{ end }}

{{ define "content" }}
<h2>Latest Articles</h2>
<div class="articles-list">
  {{ range . }}
    {{ template "article-card" . }}
  {{ else }}
    <p class="empty-state">No articles published yet. Check back soon!</p>
  {{ end }}
</div>
{{ end }}
```

---

### Step 5: Add Components to Template Loader

Update `internal/handler/template.go`:

```go
func init() {
	// Base templates with components
	baseFiles := []string{
		"web/templates/layout.html",
		"web/templates/base/seo-meta.html",
		"web/templates/components/article-card.html",
	}

	// Parse each page with base templates
	templates["home.html"] = template.Must(
		template.ParseFiles(append(baseFiles, "web/templates/home.html")...),
	)
	
	templates["article.html"] = template.Must(
		template.ParseFiles(append(baseFiles, "web/templates/article.html")...),
	)
	
	// ... rest of templates
}
```

---

### Step 6: Performance Optimization

#### A. Add Caching Headers

Create `internal/middleware/cache.go`:

```go
package middleware

import (
	"net/http"
	"strings"
)

func CacheControl(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		// Cache static assets for 1 year
		if strings.HasPrefix(r.URL.Path, "/static/") {
			w.Header().Set("Cache-Control", "public, max-age=31536000, immutable")
		} else {
			// No cache for dynamic content
			w.Header().Set("Cache-Control", "no-cache, no-store, must-revalidate")
		}
		next.ServeHTTP(w, r)
	})
}
```

Update `main.go`:

```go
// Serve static files with caching
fs := http.FileServer(http.Dir("web/static"))
http.Handle("/static/", middleware.CacheControl(http.StripPrefix("/static/", fs)))
```

#### B. Add Compression

```go
package middleware

import (
	"compress/gzip"
	"net/http"
	"strings"
)

type gzipResponseWriter struct {
	http.ResponseWriter
	Writer *gzip.Writer
}

func (w gzipResponseWriter) Write(b []byte) (int, error) {
	return w.Writer.Write(b)
}

func Compress(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		if !strings.Contains(r.Header.Get("Accept-Encoding"), "gzip") {
			next.ServeHTTP(w, r)
			return
		}

		w.Header().Set("Content-Encoding", "gzip")
		gz := gzip.NewWriter(w)
		defer gz.Close()

		next.ServeHTTP(gzipResponseWriter{ResponseWriter: w, Writer: gz}, r)
	})
}
```

---

### Step 7: Testing

#### A. Test Page Load Performance

```bash
# Install Lighthouse CI
npm install -g @lhci/cli

# Run audit
lhci autorun --collect.url=http://localhost:5050
```

#### B. Test Different Pages

```bash
# Home page
curl -I http://localhost:5050/

# Should see:
# Cache-Control: no-cache (for HTML)
# Content-Encoding: gzip

# Static assets
curl -I http://localhost:5050/static/css/base.css

# Should see:
# Cache-Control: public, max-age=31536000
```

---

## 📊 Measuring Success

### Before Migration
- **CSS Size**: ~50KB (minified)
- **First Paint**: 2-3s
- **Lighthouse Score**: 70-80

### After Migration
- **Critical CSS**: ~5KB (inline)
- **Lazy Loaded CSS**: ~45KB (loaded after FCP)
- **First Paint**: < 1s
- **Lighthouse Score**: 95+

---

## 🎯 Quick Wins

### Priority 1 (Do First - Biggest Impact)
1. ✅ Split CSS into critical + base
2. ✅ Inline critical CSS
3. ✅ Async load non-critical CSS
4. ✅ Add caching headers

### Priority 2 (Next Week)
5. ✅ Create component CSS files
6. ✅ Add SEO meta tags
7. ✅ Implement component templates

### Priority 3 (Nice to Have)
8. ✅ Add compression middleware
9. ✅ Create style guide page
10. ✅ Set up monitoring

---

## 🛠️ Tools & Resources

### Performance Testing
- [Lighthouse](https://developers.google.com/web/tools/lighthouse)
- [WebPageTest](https://www.webpagetest.org/)
- [PageSpeed Insights](https://pagespeed.web.dev/)

### CSS Tools
- [PurgeCSS](https://purgecss.com/) - Remove unused CSS
- [Critical](https://github.com/addyosmani/critical) - Extract critical CSS
- [CSSO](https://github.com/css/csso) - CSS minifier

### Monitoring
```javascript
// Add to your site
if ('PerformanceLongTaskTiming' in window) {
  const observer = new PerformanceObserver((list) => {
    for (const entry of list.getEntries()) {
      console.log('Long task detected:', entry);
    }
  });
  observer.observe({entryTypes: ['longtask']});
}
```

---

## 🚨 Common Pitfalls

### 1. **Don't Load All CSS**
❌ Bad: `<link rel="stylesheet" href="all-styles.css">`
✅ Good: Load only what page needs

### 2. **Don't Block Rendering**
❌ Bad: Synchronous CSS in `<head>`
✅ Good: Async load or inline critical

### 3. **Don't Forget Caching**
❌ Bad: No cache headers
✅ Good: Cache static assets aggressively

### 4. **Don't Skip SEO Meta**
❌ Bad: No meta description
✅ Good: Unique meta per page

---

## 📝 Checklist

- [ ] CSS split into modules
- [ ] Critical CSS inlined
- [ ] Non-critical CSS lazy loaded
- [ ] Component templates created
- [ ] SEO meta tags added
- [ ] Caching headers configured
- [ ] Compression enabled
- [ ] Performance tested
- [ ] Lighthouse score > 90
- [ ] Documentation updated

---

**Follow this guide step-by-step and you'll have a high-performance, SEO-optimized, maintainable frontend!** 🚀
