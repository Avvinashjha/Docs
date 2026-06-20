# Machine Coding

## 1. Autocomplete Search

## 2. Infinite Scroll feed

## 3. Nested comments

## 4. Kanban Board

## 5. File Explorer

## 6. JSON Viewer

## 7. Data table/grid

## 8. Multi-select dropdown

## 9. Modal Manages

## 10. Toast Notification

## 11. Carousel 

## 12. Draggable modal

## 13. How can we load CSS Dynamically?

Solution 1: We can create a link element and append it to document.body

```js
function loadCSS(url) {
  // Check if it's already loaded to prevent duplicates
  if (document.querySelector(`link[href="${url}"]`)) return;

  const link = document.createElement('link');
  link.rel = 'stylesheet';
  link.type = 'text/css';
  link.href = url;

  // Optional: Handle loading success or failure
  link.onload = () => console.log(`CSS loaded successfully: ${url}`);
  link.onerror = () => console.error(`Failed to load CSS: ${url}`);

  document.head.appendChild(link);
}

// Example usage:
loadCSS('https://example.com/styles/theme-dark.css');
```

Solution 2: Dynamic Imports via modern bundler

```js
// Trigger this on a button click or route change
async function loadFeatureStyles() {
  try {
    await import('./styles/feature-component.css');
    console.log('Feature styles applied!');
  } catch (err) {
    console.error('Failed to load the stylesheet', err);
  }
}
```

Solution 3: Injecting Raw CSS string 

```js
function injectDynamicCSS(cssString) {
  const style = document.createElement('style');
  style.textContent = cssString;
  document.head.appendChild(style);
}

// Example usage (e.g., applying user-selected brand colors):
const userColor = '#ff5733';
injectDynamicCSS(`
  .dynamic-button { 
    background-color: ${userColor}; 
    color: white; 
  }
`);
```

Solution 4: Toggle Existing stylesheets

```html
<link id="theme-link" rel="stylesheet" href="light-theme.css">
```

```js
function switchTheme(themeName) {
  const themeLink = document.getElementById('theme-link');
  themeLink.href = `${themeName}-theme.css`;
}

// Switch to dark theme
switchTheme('dark');
```

When loading CSS dynamically, you might encounter a **FOUC (Flash of Unstyled Content)** while the file downloads.

- If the CSS is critical for the visual layout of the page, consider using `rel="preload"` in your initial HTML.

- If you are lazy-loading it for a specific component, it is best to delay rendering that component until the `link.onload` event fires.