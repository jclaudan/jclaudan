# ♿ Web Accessibility - RAWeb/WCAG Guide

> **Web accessibility** is the art of making websites usable by everyone, regardless of their physical, cognitive, or technical abilities. RAWeb (Référentiel Général d'Amélioration de l'Accessibilité) is the French standard based on WCAG.

## 📋 Table of Contents
- [🚀 Introduction](#-introduction)
- [📊 Standards and Compliance](#-standards-and-compliance)
- [🏗️ Semantic HTML](#️-semantic-html)
- [🎯 ARIA Attributes](#-aria-attributes)
- [⌨️ Keyboard Navigation](#️-keyboard-navigation)
- [🔊 Screen Readers](#-screen-readers)
- [🎨 Color and Contrast](#-color-and-contrast)
- [🧪 Testing Tools](#-testing-tools)
- [📝 Accessible Forms](#-accessible-forms)
- [🎭 Dynamic Content](#-dynamic-content)
- [📱 Responsive and Mobile](#-responsive-and-mobile)
- [🎯 Best Practices](#-best-practices)
- [📚 Resources](#-resources)

---

## 🚀 Introduction

### What is Web Accessibility?

Web accessibility consists of designing and developing websites that can be used by everyone, including:
- **People with disabilities**: Visual, hearing, motor, cognitive
- **Older users**: With diminished abilities
- **Mobile users**: With touch screens
- **Temporarily disabled users**: Injury, fatigue
- **Users with slow connections**: Limited context

### Why is Accessibility Important?

✅ **Benefits:**
- **Social inclusion**: Fundamental right to access information
- **Legal compliance**: Legal obligation in France (RGAA)
- **SEO improvement**: Better search ranking
- **User experience**: More intuitive interface for all
- **Economics**: Larger market, reduced support costs

### Impact of Disabilities on the Web

| Type of Disability | Difficulties Encountered | Solutions |
|-------------------|-------------------------|-----------|
| **Visual** | Cannot see colors, images, text | Alt text, contrast, structure |
| **Hearing** | Cannot hear sounds, videos | Subtitles, transcripts |
| **Motor** | Cannot use mouse | Keyboard navigation, clickable areas |
| **Cognitive** | Difficulty understanding | Simple language, clear structure |

---

## 📊 Standards and Compliance

### WCAG (Web Content Accessibility Guidelines)

**WCAG 2.1** is the international standard with 3 levels:
- **A**: Minimal level (basic compliance)
- **AA**: Standard level (recommended compliance)
- **AAA**: High level (maximum compliance)

### RAWeb (Référentiel Général d'Amélioration de l'Accessibilité)

**RAWeb** is the French reference based on WCAG 2.1 with 4 criteria:

#### 🎯 RGAA Criteria

| Criteria | Description | Examples |
|----------|-------------|----------|
| **Images** | Textual alternative | Alt text, captions |
| **Frames** | Title and alternative | iframe, title |
| **Colors** | Non-color information | Visual indicators |
| **Multimedia** | Subtitles, transcripts | Videos, audio |

#### 📊 RAWeb Compliance Levels

| Level | Description | Requirements |
|-------|-------------|--------------|
| **A** | Basic compliance | Essential criteria |
| **AA** | Standard compliance | Recommended criteria |
| **AAA** | High compliance | Advanced criteria |

### Compliance Checklist

```markdown
## ✅ Accessibility Checklist

### Structure and Navigation
- [ ] Hierarchical headings (H1, H2, H3...)
- [ ] Clear semantic structure
- [ ] Keyboard navigation possible
- [ ] Skip links available

### Images and Media
- [ ] Alternative text for all images
- [ ] Subtitles for videos
- [ ] Transcription for audio
- [ ] No information only visual

### Forms
- [ ] Labels associated with fields
- [ ] Clear error messages
- [ ] Real-time validation
- [ ] Help instructions

### Colors and Contrast
- [ ] Sufficient contrast (4.5:1 minimum)
- [ ] Information not only color-based
- [ ] Test with colorblindness
- [ ] Dark/light mode
```

---

## 🏗️ Semantic HTML

### Semantic Structure

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Accessible Page</title>
</head>
<body>
  <!-- Skip Links -->
  <a href="#main" class="skip-link">Go to main content</a>
  <a href="#nav" class="skip-link">Go to navigation</a>

  <!-- Header -->
  <header role="banner">
    <nav role="navigation" id="nav" aria-label="Main navigation">
      <ul>
        <li><a href="/">Home</a></li>
        <li><a href="/services">Services</a></li>
        <li><a href="/contact">Contact</a></li>
      </ul>
    </nav>
  </header>

  <!-- Main content -->
  <main id="main" role="main">
    <article>
      <header>
        <h1>Article Title</h1>
        <time datetime="2024-01-01">January 1, 2024</time>
      </header>
      
      <section>
        <h2>Section 1</h2>
        <p>Section content...</p>
      </section>
      
      <section>
        <h2>Section 2</h2>
        <p>Section content...</p>
      </section>
    </article>

    <!-- Secondary content -->
    <aside role="complementary" aria-label="Additional information">
      <h2>Related Articles</h2>
      <ul>
        <li><a href="/article-1">Article 1</a></li>
        <li><a href="/article-2">Article 2</a></li>
      </ul>
    </aside>
  </main>

  <!-- Footer -->
  <footer role="contentinfo">
    <p>&copy; 2024 My Site. All rights reserved.</p>
  </footer>
</body>
</html>
```

### Essential Semantic Elements

| Element | Role | Usage | Accessibility |
|---------|------|-------|---------------|
| `<header>` | Banner | Page/section header | Main navigation |
| `<nav>` | Navigation | Navigation menu | Link list |
| `<main>` | Main | Main content | Main entry point |
| `<article>` | Article | Autonomous content | Independent article |
| `<section>` | Section | Thematic section | Logical grouping |
| `<aside>` | Complementary | Secondary content | Additional information |
| `<footer>` | Contentinfo | Page footer | Page information |

### Heading Hierarchy

```html
<!-- ✅ Good: Logical hierarchy -->
<h1>Main page title</h1>
  <h2>Main section</h2>
    <h3>Subsection</h3>
      <h4>Detail</h4>
    <h3>Another subsection</h3>
  <h2>Another main section</h2>

<!-- ❌ Avoid: Broken hierarchy -->
<h1>Main title</h1>
  <h3>Subsection (missing H2)</h3>
    <h2>Section (wrong hierarchy)</h2>
```

### Landmarks and Regions

```html
<!-- Define accessible regions -->
<div role="banner">Header</div>
<div role="navigation" aria-label="Main menu">Navigation</div>
<div role="main">Main content</div>
<div role="complementary">Secondary content</div>
<div role="contentinfo">Footer</div>

<!-- Custom regions -->
<div role="region" aria-label="Search panel">
  <h2>Search</h2>
  <!-- Search content -->
</div>
```

---

## 🎯 ARIA Attributes

### Introduction to ARIA

**ARIA (Accessible Rich Internet Applications)** extends HTML to improve accessibility of dynamic web applications.

### ARIA Roles

```html
<!-- Structural roles -->
<div role="banner">Header</div>
<div role="navigation">Navigation</div>
<div role="main">Main content</div>
<div role="complementary">Secondary content</div>
<div role="contentinfo">Footer</div>

<!-- Component roles -->
<button role="button">Button</button>
<input role="textbox">Text area</input>
<div role="dialog" aria-labelledby="dialog-title">Modal</div>
<div role="tablist">Tab list</div>
<div role="tab" aria-selected="true">Active tab</div>
```

### ARIA States and Properties

```html
<!-- States -->
<button aria-pressed="true">Pressed button</button>
<div aria-expanded="false">Collapsed content</div>
<input aria-invalid="true" aria-describedby="error-message">Invalid field</input>
<div aria-hidden="true">Content hidden from screen readers</div>

<!-- Properties -->
<div aria-labelledby="title-id">Element with label</div>
<div aria-describedby="description-id">Element with description</div>
<div aria-required="true">Required field</div>
<input aria-autocomplete="list" aria-activedescendant="option-1">Autocomplete</input>
```

### ARIA Live Regions

```html
<!-- Dynamic messages -->
<div aria-live="polite" aria-atomic="true" id="status-message">
  <!-- Status messages -->
</div>

<div aria-live="assertive" aria-atomic="false" id="error-message">
  <!-- Urgent error messages -->
</div>

<!-- JavaScript to update -->
<script>
function updateStatus(message) {
  document.getElementById('status-message').textContent = message;
}

function showError(error) {
  document.getElementById('error-message').textContent = error;
}
</script>
```

### Common ARIA Patterns

#### Modal Dialog

```html
<div role="dialog" 
     aria-labelledby="modal-title" 
     aria-describedby="modal-description"
     aria-modal="true">
  <h2 id="modal-title">Modal title</h2>
  <p id="modal-description">Modal description</p>
  
  <button aria-label="Close modal">×</button>
  <button>Cancel</button>
  <button>Confirm</button>
</div>
```

#### Dropdown Menu

```html
<button aria-expanded="false" 
        aria-haspopup="true" 
        aria-controls="menu"
        id="menu-button">
  Menu
</button>

<ul role="menu" 
    aria-labelledby="menu-button" 
    id="menu"
    style="display: none;">
  <li role="none">
    <a role="menuitem" href="/item1">Recommendations</a>
  </li>
  <li role="none">
    <a role="menuitem" href="/item2">Search</a>
  </li>
</ul>
```

#### Tabs

```html
<div role="tablist" aria-label="Tab navigation">
  <button role="tab" 
          aria-selected="true" 
          aria-controls="panel1"
          id="tab1">
    Tab 1
  </button>
  <button role="tab" 
          aria-selected="false" 
          aria-controls="panel2"
          id="tab2">
    Tab 2
  </button>
</div>

<div role="tabpanel" 
     aria-labelledby="tab1" 
     id="panel1">
  Tab 1 content
</div>

<div role="tabpanel" 
     aria-labelledby="tab2" 
     id="panel2" 
     aria-hidden="true">
  Tab 2 content
</div>
```

---

## ⌨️ Keyboard Navigation

### Keyboard Navigation Principles

Keyboard navigation should allow access to all interactive elements without a mouse.

### Tab Order

```html
<!-- Logical tab order -->
<form>
  <label for="name">Name:</label>
  <input type="text" id="name" tabindex="0">
  
  <label for="email">Email:</label>
  <input type="email" id="email" tabindex="0">
  
  <button type="submit" tabindex="0">Submit</button>
</form>
```

### Focus Management

```css
/* Visible focus styles */
*:focus {
  outline: 2px solid #005fcc;
  outline-offset: 2px;
}

/* Custom focus */
button:focus {
  outline: none;
  box-shadow: 0 0 0 3px rgba(0, 95, 204, 0.3);
}

/* Focus for screen readers only */
.sr-only:focus {
  position: static;
  width: auto;
  height: auto;
  padding: 0.5rem;
  background: #000;
  color: #fff;
}
```

### Skip Links

```html
<!-- Links to skip navigation -->
<a href="#main" class="skip-link">Go to main content</a>
<a href="#nav" class="skip-link">Go to navigation</a>
<a href="#search" class="skip-link">Go to search</a>

<style>
.skip-link {
  position: absolute;
  top: -40px;
  left: 6px;
  background: #000;
  color: #fff;
  padding: 8px;
  text-decoration: none;
  z-index: 1000;
}

.skip-link:focus {
  top: 6px;
}
</style>
```

### Keyboard Shortcuts

```javascript
// Keyboard shortcut handling
document.addEventListener('keydown', function(event) {
  // Escape to close modals
  if (event.key === 'Escape') {
    closeModal();
  }
  
  // Enter to activate buttons
  if (event.key === 'Enter' && event.target.tagName === 'BUTTON') {
    event.target.click();
  }
  
  // Space for buttons and links
  if (event.key === ' ' && event.target.tagName === 'BUTTON') {
    event.preventDefault();
    event.target.click();
  }
});
```

### Clickable Areas

```css
/* Sufficiently large clickable areas */
.button {
  min-height: 44px;
  min-width: 44px;
  padding: 12px 24px;
}

/* Spacing between clickable elements */
.nav-item {
  margin: 8px;
}

/* Extended click areas */
.card {
  position: relative;
}

.card::before {
  content: '';
  position: absolute;
  top: -10px;
  left: -10px;
  right: -10px;
  bottom: -10px;
}
```

---

## 🔊 Screen Readers

### How Screen Readers Work

Screen readers convert web content into synthetic speech or braille.

### Structure for Screen Readers

```html
<!-- Clear semantic structure -->
<main>
  <h1>Main title</h1>
  
  <nav aria-label="Main navigation">
    <h2>Navigation</h2>
    <ul>
      <li><a href="/">Home</a></li>
      <li><a href="/services">Services</a></li>
    </ul>
  </nav>
  
  <article>
    <h2>Main article</h2>
    <p>Article content...</p>
  </article>
</main>
```

### Alternative Text for Images

```html
<!-- ✅ Good: Informative description -->
<img src="sales-chart.png" 
     alt="Chart showing 25% increase in sales in 2024">

<!-- ✅ Good: Decorative image -->
<img src="decoration.png" alt="" role="presentation">

<!-- ❌ Avoid: Vague description -->
<img src="chart.png" alt="Chart">

<!-- ❌ Avoid: Missing alt -->
<img src="image.png">
```

### Accessible Forms

```html
<!-- Associated labels -->
<label for="name">Full name:</label>
<input type="text" id="name" name="name" required>

<!-- Field groups -->
<fieldset>
  <legend>Contact information</legend>
  
  <label for="email">Email:</label>
  <input type="email" id="email" name="email" required>
  
  <label for="phone">Phone:</label>
  <input type="tel" id="phone" name="phone">
</fieldset>

<!-- Error messages -->
<label for="age">Age:</label>
<input type="number" id="age" name="age" aria-invalid="true" aria-describedby="age-error">
<span id="age-error" role="alert">Age must be a positive number</span>
```

### Hidden Content

```html
<!-- Hide visually but keep for screen readers -->
<span class="sr-only">Text for screen readers only</span>

<!-- Hide completely -->
<div aria-hidden="true">Hidden decorative content</div>

<style>
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}
</style>
```

---

## 🎨 Color and Contrast

### WCAG Contrast Ratios

| Level | Normal Ratio | Large Ratio | Usage |
|-------|--------------|-------------|-------|
| **AA** | 4.5:1 | 3:1 | Recommended standard |
| **AAA** | 7:1 | 4.5:1 | High level |

### Contrast Testing

```css
/* ✅ Good: Sufficient contrast */
.text-primary {
  color: #000000; /* Black on white = 21:1 */
  background: #ffffff;
}

.text-secondary {
  color: #333333; /* Dark gray on white = 12.6:1 */
  background: #ffffff;
}

/* ❌ Avoid: Insufficient contrast */
.text-low-contrast {
  color: #999999; /* Light gray on white = 2.8:1 */
  background: #ffffff;
}
```

### Non-Color Information

```html
<!-- ✅ Good: Information by color AND icon -->
<div class="status">
  <span class="status-icon" aria-label="Status">✅</span>
  <span>Order confirmed</span>
</div>

<!-- ✅ Good: Information by color AND text -->
<button class="button button--success">
  <span class="sr-only">Success: </span>
  Validate
</button>

<!-- ❌ Avoid: Information only by color -->
<div class="status success"></div> <!-- Red = error, Green = success -->
```

### Dark/Light Mode

```css
/* CSS variables for themes */
:root {
  --color-text: #000000;
  --color-bg: #ffffff;
  --color-primary: #0066cc;
}

@media (prefers-color-scheme: dark) {
  :root {
    --color-text: #ffffff;
    --color-bg: #000000;
    --color-primary: #66b3ff;
  }
}

/* Using variables */
body {
  color: var(--color-text);
  background: var(--color-bg);
}

.button {
  background: var(--color-primary);
  color: var(--color-bg);
}
```

### Colorblindness Testing

```html
<!-- Test with different types of colorblindness -->
<div class="color-test">
  <span class="red">Red</span>
  <span class="green">Green</span>
  <span class="blue">Blue</span>
</div>

<style>
/* Colorblindness simulation */
.color-test.protanopia .red { color: #000000; }
.color-test.deuteranopia .green { color: #000000; }
.color-test.tritanopia .blue { color: #000000; }
</style>
```

---

## 🧪 Testing Tools

### Automated Tools

#### Lighthouse (Chrome DevTools)

```bash
# Lighthouse command line test
npm install -g lighthouse

# Accessibility test
lighthouse https://example.com --only-categories=accessibility

# Complete test
lighthouse https://example.com --view
```

#### axe DevTools

```html
<!-- axe DevTools extension -->
<!-- Automatic WCAG violations test -->
<script>
// axe-core test
axe.run(document, {
  rules: {
    'color-contrast': { enabled: true },
    'keyboard-navigation': { enabled: true },
    'aria-required-attributes': { enabled: true }
  }
}).then(results => {
  console.log('Violations:', results.violations);
});
</script>
```

### Manual Testing Tools

#### Keyboard Navigation

```javascript
// Keyboard navigation test
function testKeyboardNavigation() {
  const focusableElements = document.querySelectorAll(
    'a[href], button, input, select, textarea, [tabindex]:not([tabindex="-1"])'
  );
  
  console.log('Focusable elements:', focusableElements.length);
  
  focusableElements.forEach((element, index) => {
    console.log(`${index + 1}. ${element.tagName} - ${element.textContent || element.value}`);
  });
}
```

#### Contrast Testing

```javascript
// Contrast ratio calculation
function getContrastRatio(color1, color2) {
  const luminance1 = getLuminance(color1);
  const luminance2 = getLuminance(color2);
  
  const lighter = Math.max(luminance1, luminance2);
  const darker = Math.min(luminance1, luminance2);
  
  return (lighter + 0.05) / (darker + 0.05);
}

function getLuminance(color) {
  // Hex to RGB conversion and luminance calculation
  const rgb = hexToRgb(color);
  const [r, g, b] = rgb.map(c => {
    c = c / 255;
    return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
  });
  
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}
```

### Screen Readers for Testing

#### NVDA (Windows)

```bash
# Download NVDA
# https://www.nvaccess.org/download/

# NVDA keyboard shortcuts
# NVDA + Q : Quit
# NVDA + S : Stop speech
# NVDA + H : Read title
# NVDA + K : Read link
```

#### VoiceOver (macOS)

```bash
# Enable VoiceOver
# Cmd + F5

# VoiceOver shortcuts
# Cmd + F5 : Enable/Disable
# Ctrl + Option + A : Announce element
# Ctrl + Option + H : Navigate by heading
```

### Testing Checklist

```markdown
## ✅ Accessibility Testing Checklist

### Automated Tests
- [ ] Lighthouse Accessibility Score > 90
- [ ] axe DevTools : 0 critical violation
- [ ] WAVE : 0 error
- [ ] Contrast Checker : Ratio > 4.5:1

### Manual Tests
- [ ] Complete keyboard navigation
- [ ] Visible focus on all elements
- [ ] Functional screen reader
- [ ] Images with appropriate alt text
- [ ] Forms with labels

### User Tests
- [ ] Test with disabled users
- [ ] Test on different devices
- [ ] Test with slow connection
- [ ] Test without JavaScript
```

---

## 📝 Accessible Forms

### Basic Structure

```html
<form novalidate>
  <fieldset>
    <legend>Personal information</legend>
    
    <div class="form-group">
      <label for="firstname">First name *</label>
      <input type="text" 
             id="firstname" 
             name="firstname" 
             required 
             aria-describedby="firstname-help">
      <small id="firstname-help">Your first name will be displayed publicly</small>
    </div>
    
    <div class="form-group">
      <label for="email">Email *</label>
      <input type="email" 
             id="email" 
             name="email" 
             required 
             aria-invalid="false"
             aria-describedby="email-error">
      <div id="email-error" role="alert" aria-live="polite"></div>
    </div>
    
    <div class="form-group">
      <label for="phone">Phone</label>
      <input type="tel" 
             id="phone" 
             name="phone" 
             pattern="[0-9]{10}"
             aria-describedby="phone-help">
      <small id="phone-help">Format: 0123456789</small>
    </div>
  </fieldset>
  
  <button type="submit">Submit</button>
</form>
```

### Real-time Validation

```javascript
// Accessible validation
function validateField(field) {
  const errorId = field.id + '-error';
  let errorElement = document.getElementById(errorId);
  
  if (!errorElement) {
    errorElement = document.createElement('div');
    errorElement.id = errorId;
    errorElement.setAttribute('role', 'alert');
    errorElement.setAttribute('aria-live', 'polite');
    field.parentNode.appendChild(errorElement);
  }
  
  const isValid = field.checkValidity();
  
  if (!isValid) {
    field.setAttribute('aria-invalid', 'true');
    errorElement.textContent = field.validationMessage;
    field.setAttribute('aria-describedby', errorId);
  } else {
    field.setAttribute('aria-invalid', 'false');
    errorElement.textContent = '';
    field.removeAttribute('aria-describedby');
  }
}

// Listen to changes
document.querySelectorAll('input, select, textarea').forEach(field => {
  field.addEventListener('blur', () => validateField(field));
  field.addEventListener('input', () => validateField(field));
});
```

### Field Groups

```html
<!-- Radio groups -->
<fieldset>
  <legend>Contact preferences</legend>
  
  <div class="radio-group" role="radiogroup" aria-labelledby="contact-pref">
    <input type="radio" id="email-pref" name="contact" value="email">
    <label for="email-pref">Email</label>
    
    <input type="radio" id="phone-pref" name="contact" value="phone">
    <label for="phone-pref">Phone</label>
    
    <input type="radio" id="sms-pref" name="contact" value="sms">
    <label for="sms-pref">SMS</label>
  </div>
</fieldset>

<!-- Checkbox groups -->
<fieldset>
  <legend>Interests</legend>
  
  <div class="checkbox-group">
    <input type="checkbox" id="tech" name="interests" value="tech">
    <label for="tech">Technology</label>
    
    <input type="checkbox" id="sport" name="interests" value="sport">
    <label for="sport">Sports</label>
    
    <input type="checkbox" id="culture" name="interests" value="culture">
    <label for="culture">Culture</label>
  </div>
</fieldset>
```

---

## 🎭 Dynamic Content

### Content Updates

```html
<!-- Live region for updates -->
<div aria-live="polite" aria-atomic="true" id="status-updates">
  <!-- Status updates -->
</div>

<div aria-live="assertive" aria-atomic="false" id="error-messages">
  <!-- Urgent error messages -->
</div>

<script>
// Accessible update
function updateStatus(message, type = 'info') {
  const container = document.getElementById(
    type === 'error' ? 'error-messages' : 'status-updates'
  );
  
  container.textContent = message;
  
  // Clean after 5 seconds
  setTimeout(() => {
    container.textContent = '';
  }, 5000);
}

// Usage example
updateStatus('Data saved successfully');
updateStatus('Error saving data', 'error');
</script>
```

### Accessible Modals

```html
<!-- Accessible modal -->
<div id="modal" 
     role="dialog" 
     aria-labelledby="modal-title" 
     aria-describedby="modal-description"
     aria-modal="true"
     aria-hidden="true">
  
  <div class="modal-content">
    <h2 id="modal-title">Confirm deletion</h2>
    <p id="modal-description">
      Are you sure you want to delete this item? 
      This action is irreversible.
    </p>
    
    <div class="modal-actions">
      <button type="button" id="cancel-btn">Cancel</button>
      <button type="button" id="confirm-btn">Delete</button>
    </div>
    
    <button type="button" 
            class="modal-close" 
            aria-label="Close modal">
      ×
    </button>
  </div>
</div>

<script>
// Modal handling
function openModal() {
  const modal = document.getElementById('modal');
  modal.setAttribute('aria-hidden', 'false');
  modal.style.display = 'block';
  
  // Focus on first button
  document.getElementById('cancel-btn').focus();
  
  // Trap focus in modal
  trapFocus(modal);
}

function closeModal() {
  const modal = document.getElementById('modal');
  modal.setAttribute('aria-hidden', 'true');
  modal.style.display = 'none';
  
  // Restore focus
  document.getElementById('open-modal-btn').focus();
}

// Focus trapping
function trapFocus(element) {
  const focusableElements = element.querySelectorAll(
    'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
  );
  
  const firstElement = focusableElements[0];
  const lastElement = focusableElements[focusableElements.length - 1];
  
  element.addEventListener('keydown', function(e) {
    if (e.key === 'Tab') {
      if (e.shiftKey) {
        if (document.activeElement === firstElement) {
          lastElement.focus();
          e.preventDefault();
        }
      } else {
        if (document.activeElement === lastElement) {
          firstElement.focus();
          e.preventDefault();
        }
      }
    }
    
    if (e.key === 'Escape') {
      closeModal();
    }
  });
}
</script>
```

### Tab Navigation

```html
<!-- Accessible tabs -->
<div class="tabs">
  <div role="tablist" aria-label="Tab navigation">
    <button role="tab" 
            aria-selected="true" 
            aria-controls="panel1"
            id="tab1"
            tabindex="0">
      Tab 1
    </button>
    <button role="tab" 
            aria-selected="false" 
            aria-controls="panel2"
            id="tab2"
            tabindex="-1">
      Tab 2
    </button>
    <button role="tab" 
            aria-selected="false" 
            aria-controls="panel3"
            id="tab3"
            tabindex="-1">
      Tab 3
    </button>
  </div>
  
  <div role="tabpanel" 
       aria-labelledby="tab1" 
       id="panel1">
    Tab 1 content
  </div>
  
  <div role="tabpanel" 
       aria-labelledby="tab2" 
       id="panel2"
       aria-hidden="true">
    Tab 2 content
  </div>
  
  <div role="tabpanel" 
       aria-labelledby="tab3" 
       id="panel3"
       aria-hidden="true">
    Tab 3 content
  </div>
</div>

<script>
// Tab handling
function switchTab(tabId) {
  // Deactivate all tabs
  document.querySelectorAll('[role="tab"]').forEach(tab => {
    tab.setAttribute('aria-selected', 'false');
    tab.setAttribute('tabindex', '-1');
  });
  
  // Hide all panels
  document.querySelectorAll('[role="tabpanel"]').forEach(panel => {
    panel.setAttribute('aria-hidden', 'true');
  });
  
  // Activate selected tab
  const activeTab = document.getElementById(tabId);
  const activePanel = document.getElementById(activeTab.getAttribute('aria-controls'));
  
  activeTab.setAttribute('aria-selected', 'true');
  activeTab.setAttribute('tabindex', '0');
  activePanel.setAttribute('aria-hidden', 'false');
  activeTab.focus();
}

// Keyboard navigation
document.querySelectorAll('[role="tab"]').forEach(tab => {
  tab.addEventListener('keydown', function(e) {
    const tabs = Array.from(document.querySelectorAll('[role="tab"]'));
    const currentIndex = tabs.indexOf(this);
    
    switch(e.key) {
      case 'ArrowRight':
        e.preventDefault();
        const nextIndex = (currentIndex + 1) % tabs.length;
        switchTab(tabs[nextIndex].id);
        break;
      case 'ArrowLeft':
        e.preventDefault();
        const prevIndex = (currentIndex - 1 + tabs.length) % tabs.length;
        switchTab(tabs[prevIndex].id);
        break;
      case 'Home':
        e.preventDefault();
        switchTab(tabs[0].id);
        break;
      case 'End':
        e.preventDefault();
        switchTab(tabs[tabs.length - 1].id);
        break;
    }
  });
});
</script>
```

---

## 📱 Responsive and Mobile

### Accessible Responsive Design

```css
/* Accessible breakpoints */
@media (max-width: 768px) {
  /* Mobile navigation */
  .nav-menu {
    display: none;
  }
  
  .nav-toggle {
    display: block;
  }
  
  /* Larger touch areas */
  .button {
    min-height: 48px;
    min-width: 48px;
  }
  
  /* More readable text */
  body {
    font-size: 16px;
    line-height: 1.5;
  }
}

/* Landscape mode */
@media (orientation: landscape) {
  .modal {
    max-height: 90vh;
    overflow-y: auto;
  }
}
```

### Mobile Navigation

```html
<!-- Accessible mobile navigation -->
<nav role="navigation" aria-label="Main navigation">
  <button class="nav-toggle" 
          aria-expanded="false" 
          aria-controls="nav-menu"
          aria-label="Open menu">
    <span class="hamburger"></span>
  </button>
  
  <ul id="nav-menu" class="nav-menu">
    <li><a href="/">Home</a></li>
    <li><a href="/services">Services</a></li>
    <li><a href="/contact">Contact</a></li>
  </ul>
</nav>

<script>
// Mobile menu handling
const navToggle = document.querySelector('.nav-toggle');
const navMenu = document.querySelector('#nav-menu');

navToggle.addEventListener('click', function() {
  const isExpanded = this.getAttribute('aria-expanded') === 'true';
  
  this.setAttribute('aria-expanded', !isExpanded);
  navMenu.classList.toggle('nav-menu--open');
  
  // Focus on first menu link
  if (!isExpanded) {
    navMenu.querySelector('a').focus();
  }
});
</script>
```

### Touch Gestures

```css
/* Optimized touch areas */
.touch-target {
  min-height: 44px;
  min-width: 44px;
  padding: 12px;
}

/* Spacing between elements */
.touch-list li {
  margin: 8px 0;
}

/* Touch feedback */
.button:active {
  transform: scale(0.98);
  transition: transform 0.1s;
}
```

---

## 🎯 Best Practices

### Development Checklist

```markdown
## ✅ Accessibility Checklist by Phase

### Design Phase
- [ ] Semantic structure defined
- [ ] Heading hierarchy planned
- [ ] Keyboard navigation planned
- [ ] Color contrast verified
- [ ] Touch areas sized

### Development Phase
- [ ] Semantic HTML used
- [ ] Labels associated with forms
- [ ] Alt text for all images
- [ ] Visible focus on all elements
- [ ] ARIA used when necessary

### Testing Phase
- [ ] Automated tests passed
- [ ] Keyboard navigation functional
- [ ] Screen reader tested
- [ ] Contrast verified
- [ ] User tests conducted
```

### Performance Optimizations

```javascript
// Accessible progressive loading
function loadContentAccessibly(url, container) {
  // Show loading indicator
  const loader = document.createElement('div');
  loader.setAttribute('aria-live', 'polite');
  loader.textContent = 'Loading...';
  container.appendChild(loader);
  
  fetch(url)
    .then(response => response.text())
    .then(html => {
      // Remove indicator
      loader.remove();
      
      // Add content
      container.innerHTML = html;
      
      // Announce loading complete
      const announcement = document.createElement('div');
      announcement.setAttribute('aria-live', 'polite');
      announcement.setAttribute('aria-atomic', 'true');
      announcement.textContent = 'Content loaded';
      container.appendChild(announcement);
      
      setTimeout(() => announcement.remove(), 3000);
    })
    .catch(error => {
      loader.remove();
      const errorMsg = document.createElement('div');
      errorMsg.setAttribute('role', 'alert');
      errorMsg.textContent = 'Error loading content';
      container.appendChild(errorMsg);
    });
}
```

### Maintenance and Evolution

```javascript
// Automatic accessibility audit
function accessibilityAudit() {
  const issues = [];
  
  // Check images without alt
  const imagesWithoutAlt = document.querySelectorAll('img:not([alt])');
  imagesWithoutAlt.forEach(img => {
    issues.push(`Image without alt text: ${img.src}`);
  });
  
  // Check links without text
  const linksWithoutText = document.querySelectorAll('a:not([aria-label]):not([aria-labelledby])');
  linksWithoutText.forEach(link => {
    if (!link.textContent.trim()) {
      issues.push(`Link without text: ${link.href}`);
    }
  });
  
  // Check forms without labels
  const inputsWithoutLabels = document.querySelectorAll('input:not([aria-label]):not([aria-labelledby])');
  inputsWithoutLabels.forEach(input => {
    const label = document.querySelector(`label[for="${input.id}"]`);
    if (!label) {
      issues.push(`Field without label: ${input.name || input.id}`);
    }
  });
  
  return issues;
}

// Run audit
console.log('Accessibility issues:', accessibilityAudit());
```

---

## 📚 Resources

### Official Documentation
- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [RGAA 4.1 (France)](https://references.modernisation.gouv.fr/rgaa-accessibilite/)
- [ARIA Authoring Practices](https://www.w3.org/WAI/ARIA/apg/)

### Testing Tools
- [axe DevTools](https://www.deque.com/axe/devtools/) - Browser extension
- [WAVE](https://wave.webaim.org/) - Online test
- [Lighthouse](https://developers.google.com/web/tools/lighthouse) - Chrome audit
- [Contrast Checker](https://webaim.org/resources/contrastchecker/) - Contrast test

### Screen Readers
- [NVDA](https://www.nvaccess.org/) - Windows (free)
- [JAWS](https://www.freedomscientific.com/products/software/jaws/) - Windows (paid)
- [VoiceOver](https://www.apple.com/accessibility/vision/) - macOS (built-in)
- [Orca](https://help.gnome.org/users/orca/) - Linux (free)

### Community and Training
- [WebAIM](https://webaim.org/) - Resources and training
- [A11y Project](https://www.a11yproject.com/) - Community
- [Accessibility Weekly](https://a11yweekly.com/) - Newsletter
- [Inclusive Design Principles](https://inclusivedesignprinciples.org/) - Principles

### Frameworks and Libraries
- [React Aria](https://react-spectrum.adobe.com/react-aria/) - Accessible React components
- [Vue A11y](https://vue-a11y.com/) - Vue.js accessibility
- [Angular CDK A11y](https://material.angular.io/cdk/a11y/overview) - Angular tools
- [Headless UI](https://headlessui.dev/) - Accessible components

---

*This documentation covers the essential aspects of web accessibility according to RAWeb/WCAG standards to create inclusive and compliant websites according to French regulations.*
