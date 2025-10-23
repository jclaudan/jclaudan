# 🌐 HTML5 - Complete Guide

> **HTML5** is the latest version of the standard markup language used to structure web content. It introduces new semantic elements and enhanced APIs, making it easier to create accessible and performant websites.

## 📋 Table of Contents
- [🎯 Reference Tables](#-complete-html5-reference-tables)
- [🚀 Introduction](#-introduction)
- [🟢 Structure and Basic Elements](#-beginner---structure-and-basic-elements)
- [🟡 Semantics and Accessibility](#-intermediate---semantics-and-accessibility)
- [🟠 Forms and APIs](#-advanced---forms-and-apis)
- [🔴 Performance and SEO](#-senior---performance-and-seo)
- [⚫ Web Components and PWA](#-expert---web-components-and-pwa)
- [📚 Resources](#-resources)

---

## 🎯 Complete HTML5 Reference Tables

### 🎯 Semantic Elements

| Element | Description | Usage | Accessibility |
|---------|-------------|-------|---------------|
| **`<header>`** | Page or section header | Navigation, logo, main title | Landmark for screen readers |
| **`<nav>`** | Navigation section | Main menu, breadcrumbs, pagination | Main navigation identified |
| **`<main>`** | Unique main content | Main page content | Main entry point |
| **`<section>`** | Thematic section | Grouping related content | Clear hierarchical structure |
| **`<article>`** | Standalone content | Blog post, news, comment | Reusable content |
| **`<aside>`** | Complementary content | Sidebar, ads, notes | Secondary content |
| **`<footer>`** | Page footer | Contact info, copyright | End information |
| **`<figure>`** | Multimedia content | Image, diagram, code | Illustrative content |
| **`<figcaption>`** | Figure caption | Image description | Textual alternative |
| **`<time>`** | Date and time | Timestamp, events | Temporal information |
| **`<mark>`** | Highlighted text | Search, importance | Highlighting |
| **`<progress>`** | Progress bar | Download, task | Progress state |
| **`<meter>`** | Range measurement | Score, percentage | Measured value |

### 🎯 Structure Elements

| Element | Description | Attributes | Usage |
|---------|-------------|-----------|-------|
| **`<div>`** | Generic container | `class`, `id`, `data-*` | Grouping without semantics |
| **`<span>`** | Generic inline | `class`, `id`, `data-*` | Inline styling |
| **`<p>`** | Paragraph | `class`, `id` | Structured text |
| **`<br>`** | Line break | None | Line return |
| **`<hr>`** | Horizontal separator | `class`, `id` | Thematic separation |
| **`<pre>`** | Preformatted text | `class`, `id` | Code, poetry |
| **`<code>`** | Inline code | `class`, `id` | Code in text |
| **`<blockquote>`** | Long quote | `cite` | External quote |
| **`<q>`** | Short quote | `cite` | Inline quote |

### 🎯 Heading Elements

| Element | Description | Accessibility |
|---------|-------------|---------------|
| **`<h1>`** | Main title | Unique page title |
| **`<h2>`** | Subtitle | Main section |
| **`<h3>`** | Sub-subtitle | Sub-section |
| **`<h4>`** | Level 4 title | Section detail |
| **`<h5>`** | Level 5 title | Sub-detail |
| **`<h6>`** | Level 6 title | Minor detail |

### 🎯 List Elements

| Element | Description | Attributes | Usage |
|---------|-------------|-----------|-------|
| **`<ul>`** | Unordered list | `class`, `id` | Bullet list |
| **`<ol>`** | Ordered list | `type`, `start`, `reversed` | Numbered list |
| **`<li>`** | List item | `value` (ol) | List item |
| **`<dl>`** | Definition list | `class`, `id` | Glossary |
| **`<dt>`** | Definition term | None | Word to define |
| **`<dd>`** | Definition | None | Explanation |

### 🎯 Table Elements

| Element | Description | Attributes | Accessibility |
|---------|-------------|-----------|---------------|
| **`<table>`** | Table | `border`, `cellpadding`, `cellspacing` | Tabular structure |
| **`<caption>`** | Table caption | None | Table description |
| **`<thead>`** | Table header | None | Column headers |
| **`<tbody>`** | Table body | None | Main data |
| **`<tfoot>`** | Table footer | None | Summary, totals |
| **`<tr>`** | Table row | None | Data row |
| **`<th>`** | Header cell | `colspan`, `rowspan`, `scope` | Column/row header |
| **`<td>`** | Data cell | `colspan`, `rowspan` | Cell data |
| **`<colgroup>`** | Column group | `span` | Column styling |
| **`<col>`** | Column | `span` | Column styling |

### 🎯 Form Elements

| Element | Description | Attributes | Type |
|---------|-------------|-----------|------|
| **`<form>`** | Form | `action`, `method`, `enctype` | Form container |
| **`<input>`** | Input field | `type`, `name`, `value`, `required` | User input |
| **`<textarea>`** | Text area | `rows`, `cols`, `maxlength` | Multi-line text |
| **`<select>`** | Dropdown list | `name`, `multiple`, `size` | Option selection |
| **`<option>`** | Selection option | `value`, `selected` | Select choice |
| **`<optgroup>`** | Option group | `label` | Option grouping |
| **`<button>`** | Button | `type`, `disabled` | User action |
| **`<label>`** | Label | `for` | Field-label association |
| **`<fieldset>`** | Field group | None | Logical grouping |
| **`<legend>`** | Group legend | None | Fieldset title |
| **`<datalist>`** | Suggestion list | None | Autocomplete |
| **`<output>`** | Calculation result | `for` | Form result |

### 🎯 HTML5 Input Types

| Type | Description | Validation | Example |
|------|-------------|------------|---------|
| **`text`** | Simple text | None | Name, first name |
| **`email`** | Email address | Email format | user@example.com |
| **`url`** | URL | URL format | https://example.com |
| **`tel`** | Phone number | None | +33 1 23 45 67 89 |
| **`password`** | Password | None | Hidden text |
| **`number`** | Number | Numeric value | 42, 3.14 |
| **`range`** | Slider | Range of values | 0-100 |
| **`date`** | Date | Date format | 2024-01-15 |
| **`time`** | Time | Time format | 14:30 |
| **`datetime-local`** | Date and time | Datetime format | 2024-01-15T14:30 |
| **`month`** | Month | Month format | 2024-01 |
| **`week`** | Week | Week format | 2024-W03 |
| **`color`** | Color | Color value | #ff0000 |
| **`file`** | File | Valid file | image.jpg |
| **`checkbox`** | Checkbox | Boolean | true/false |
| **`radio`** | Radio button | Single selection | Option A/B/C |
| **`submit`** | Submit | Form submission | Send |
| **`reset`** | Reset | Reset to zero | Clear |
| **`button`** | Generic button | Custom action | Click |
| **`hidden`** | Hidden field | Hidden value | CSRF token |

### 🎯 Multimedia Elements

| Element | Description | Attributes | Usage |
|---------|-------------|-----------|-------|
| **`<img>`** | Image | `src`, `alt`, `width`, `height` | Static images |
| **`<video>`** | Video | `src`, `controls`, `autoplay` | Video content |
| **`<audio>`** | Audio | `src`, `controls`, `loop` | Audio content |
| **`<source>`** | Media source | `src`, `type` | Alternative format |
| **`<track>`** | Subtitle track | `src`, `kind`, `srclang` | Subtitles, descriptions |
| **`<canvas>`** | Drawing area | `width`, `height` | 2D graphics |
| **`<svg>`** | Vector graphics | `width`, `height`, `viewBox` | Vector images |
| **`<iframe>`** | Embedded frame | `src`, `width`, `height` | External content |
| **`<embed>`** | Embedded content | `src`, `type` | External plugin |
| **`<object>`** | Multimedia object | `data`, `type` | External content |
| **`<param>`** | Object parameter | `name`, `value` | Object configuration |

### 🎯 Global Attributes

| Attribute | Description | Values | Usage |
|-----------|-------------|--------|-------|
| **`id`** | Unique identifier | Unique text | CSS/JS reference |
| **`class`** | CSS classes | Class list | Styling and selection |
| **`style`** | Inline style | Inline CSS | Direct styling |
| **`title`** | Element title | Text | Tooltip |
| **`lang`** | Language | ISO code | Content language |
| **`dir`** | Direction | `ltr`, `rtl` | Reading direction |
| **`tabindex`** | Tab order | Number | Keyboard navigation |
| **`accesskey`** | Keyboard shortcut | Character | Quick access |
| **`contenteditable`** | Editable | `true`, `false` | Editable content |
| **`draggable`** | Drag and drop | `true`, `false` | Draggable element |
| **`hidden`** | Hidden | None | Invisible element |
| **`spellcheck`** | Spell checking | `true`, `false` | Auto-correction |
| **`translate`** | Translation | `yes`, `no` | Auto-translation |

### 🎯 ARIA Attributes

| Attribute | Description | Values | Accessibility |
|-----------|-------------|--------|---------------|
| **`role`** | Semantic role | `button`, `dialog`, `menu` | Element role |
| **`aria-label`** | Accessible label | Text | Short description |
| **`aria-labelledby`** | Label reference | Element ID | External label |
| **`aria-describedby`** | Description | Element ID | Detailed description |
| **`aria-expanded`** | Expansion state | `true`, `false` | Expanded content |
| **`aria-hidden`** | Hidden from readers | `true`, `false` | Decorative element |
| **`aria-required`** | Required field | `true`, `false` | Validation |
| **`aria-invalid`** | Invalid value | `true`, `false` | Error state |
| **`aria-live`** | Dynamic region | `polite`, `assertive` | Real-time updates |
| **`aria-atomic`** | Atomic update | `true`, `false` | Complete update |

### 🎯 Metadata Elements

| Element | Description | Attributes | Usage |
|---------|-------------|-----------|-------|
| **`<head>`** | Document header | None | Metadata |
| **`<title>`** | Page title | None | Tab title |
| **`<meta>`** | Metadata | `name`, `content`, `charset` | Page information |
| **`<link>`** | External link | `rel`, `href`, `type` | CSS, icons, preloading |
| **`<style>`** | Inline CSS | `type`, `media` | Styles in page |
| **`<script>`** | JavaScript | `src`, `type`, `async` | JavaScript code |
| **`<noscript>`** | No JS content | None | Alternative without JavaScript |
| **`<base>`** | Base URL | `href`, `target` | Relative URL |

---

## 🚀 Introduction

HTML5 is the fifth and latest major version of the HTML markup language. It brings many improvements in terms of semantics, accessibility, performance, and multimedia features.

### What is HTML5?
HTML5 is a markup language that structures web page content. It introduces new semantic elements, advanced JavaScript APIs, and integrated multimedia features, while maintaining compatibility with previous versions.

### Why choose HTML5?
- **🎯 Semantics**: Elements with clear meaning
- **♿ Accessibility**: Native support for assistive technologies
- **📱 Responsive**: Automatic adaptation to screens
- **🎨 Multimedia**: Native audio/video support
- **⚡ Performance**: Optimizations and new APIs
- **🔒 Security**: Protection against XSS attacks
- **🌐 Standards**: Web standards compliance
- **📚 Documentation**: Clear and complete specifications

### Accessibility Best Practices
- **Semantic structure**: Use `<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<footer>`
- **Title hierarchy**: Use `<h1>` to `<h6>` logically
- **Text equivalents**: Add descriptive `alt` attributes to images
- **Keyboard navigation**: Ensure all elements are keyboard accessible
- **Sufficient contrast**: Respect WCAG contrast ratios
- **Appropriate labels**: Associate labels with form fields

---

## 🟢 Structure and Basic Elements

### Basic HTML5 document structure

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>My Website</title>
    <meta name="description" content="Description of my website">
    <link rel="stylesheet" href="styles.css">
</head>
<body>
    <header>
        <h1>Main Title</h1>
        <nav>
            <ul>
                <li><a href="#home">Home</a></li>
                <li><a href="#services">Services</a></li>
                <li><a href="#contact">Contact</a></li>
            </ul>
        </nav>
    </header>
    
    <main>
        <section id="home">
            <h2>Welcome</h2>
            <p>Main page content.</p>
        </section>
    </main>
    
    <footer>
        <p>&copy; 2024 My Website. All rights reserved.</p>
    </footer>
</body>
</html>
```

### Basic text elements

```html
<!-- Hierarchical titles -->
<h1>Main Title (once per page)</h1>
<h2>Section subtitle</h2>
<h3>Sub-subtitle</h3>

<!-- Paragraphs and text -->
<p>This is a normal text paragraph.</p>
<p><strong>Bold text</strong> and <em>italic text</em>.</p>
<p><mark>Highlighted text</mark> and <del>strikethrough text</del>.</p>

<!-- Quotes -->
<blockquote cite="https://example.com">
    <p>This is a long quote from an external source.</p>
</blockquote>
<p>As said <q>short quote</q> in the text.</p>

<!-- Code -->
<pre><code>
function hello() {
    console.log("Hello World!");
}
</code></pre>
<p>Use <code>console.log()</code> to display text.</p>
```

### Lists and navigation

```html
<!-- Unordered list -->
<ul>
    <li>First item</li>
    <li>Second item</li>
    <li>Third item</li>
</ul>

<!-- Ordered list -->
<ol>
    <li>First step</li>
    <li>Second step</li>
    <li>Third step</li>
</ol>

<!-- Definition list -->
<dl>
    <dt>HTML</dt>
    <dd>HyperText Markup Language</dd>
    <dt>CSS</dt>
    <dd>Cascading Style Sheets</dd>
</dl>

<!-- Navigation -->
<nav aria-label="Main navigation">
    <ul>
        <li><a href="#home" aria-current="page">Home</a></li>
        <li><a href="#services">Services</a></li>
        <li><a href="#contact">Contact</a></li>
    </ul>
</nav>
```

---

## 🟡 Semantics and Accessibility

### Advanced semantic structure

```html
<article>
    <header>
        <h1>Article title</h1>
        <p class="meta">
            By <author>John Doe</author> on 
            <time datetime="2024-01-15">January 15, 2024</time>
        </p>
    </header>
    
    <section>
        <h2>Introduction</h2>
        <p>Article introduction...</p>
    </section>
    
    <section>
        <h2>Main content</h2>
        <p>Article content...</p>
        
        <figure>
            <img src="image.jpg" alt="Image description">
            <figcaption>Image caption</figcaption>
        </figure>
    </section>
    
    <aside>
        <h3>Related articles</h3>
        <ul>
            <li><a href="article1.html">Article 1</a></li>
            <li><a href="article2.html">Article 2</a></li>
        </ul>
    </aside>
    
    <footer>
        <p>Keywords: <mark>HTML5</mark>, <mark>Accessibility</mark></p>
    </footer>
</article>
```

### Accessible forms

```html
<form action="/submit" method="post" novalidate>
    <fieldset>
        <legend>Personal information</legend>
        
        <div class="form-group">
            <label for="name">Name *</label>
            <input type="text" id="name" name="name" required 
                   aria-describedby="name-help">
            <div id="name-help" class="help-text">
                Your full name
            </div>
        </div>
        
        <div class="form-group">
            <label for="email">Email *</label>
            <input type="email" id="email" name="email" required
                   aria-describedby="email-help email-error">
            <div id="email-help" class="help-text">
                We will never share your email
            </div>
            <div id="email-error" class="error-text" role="alert">
                Please enter a valid email address
            </div>
        </div>
        
        <div class="form-group">
            <label for="message">Message</label>
            <textarea id="message" name="message" rows="5" 
                      aria-describedby="message-help"></textarea>
            <div id="message-help" class="help-text">
                Describe your request in detail
            </div>
        </div>
    </fieldset>
    
    <fieldset>
        <legend>Preferences</legend>
        
        <div class="form-group">
            <fieldset>
                <legend>Newsletter</legend>
                <input type="radio" id="newsletter-yes" name="newsletter" value="yes">
                <label for="newsletter-yes">Yes, I want to receive the newsletter</label>
                
                <input type="radio" id="newsletter-no" name="newsletter" value="no">
                <label for="newsletter-no">No, thank you</label>
            </fieldset>
        </div>
        
        <div class="form-group">
            <input type="checkbox" id="conditions" name="conditions" required>
            <label for="conditions">
                I accept the <a href="conditions.html" target="_blank">terms of use</a> *
            </label>
        </div>
    </fieldset>
    
    <button type="submit">Send</button>
    <button type="reset">Clear</button>
</form>
```

### Accessible tables

```html
<table>
    <caption>Product prices by category</caption>
    <thead>
        <tr>
            <th scope="col">Product</th>
            <th scope="col">Category</th>
            <th scope="col">Price excl. tax</th>
            <th scope="col">Price incl. tax</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <th scope="row">Laptop</th>
            <td>Computing</td>
            <td>800€</td>
            <td>960€</td>
        </tr>
        <tr>
            <th scope="row">Smartphone</th>
            <td>Mobile</td>
            <td>400€</td>
            <td>480€</td>
        </tr>
    </tbody>
    <tfoot>
        <tr>
            <th scope="row" colspan="3">Total</th>
            <td>1440€</td>
        </tr>
    </tfoot>
</table>
```

---

## 🟠 Forms and APIs

### Advanced forms with validation

```html
<form id="registration" novalidate>
    <fieldset>
        <legend>Account creation</legend>
        
        <!-- Username with real-time validation -->
        <div class="form-group">
            <label for="username">Username *</label>
            <input type="text" id="username" name="username" 
                   pattern="[a-zA-Z0-9_]{3,20}" 
                   title="3-20 alphanumeric characters and underscores"
                   required aria-describedby="username-help username-error">
            <div id="username-help" class="help-text">
                3-20 characters, letters, numbers and underscores only
            </div>
            <div id="username-error" class="error-text" role="alert"></div>
        </div>
        
        <!-- Email with validation -->
        <div class="form-group">
            <label for="email">Email *</label>
            <input type="email" id="email" name="email" 
                   required aria-describedby="email-help email-error">
            <div id="email-help" class="help-text">
                We will send you a confirmation email
            </div>
            <div id="email-error" class="error-text" role="alert"></div>
        </div>
        
        <!-- Password with strength indicator -->
        <div class="form-group">
            <label for="password">Password *</label>
            <input type="password" id="password" name="password" 
                   minlength="8" required 
                   aria-describedby="password-help password-strength">
            <div id="password-help" class="help-text">
                Minimum 8 characters with uppercase, lowercase and numbers
            </div>
            <div id="password-strength" class="strength-meter" role="progressbar" 
                 aria-valuenow="0" aria-valuemin="0" aria-valuemax="100"></div>
        </div>
        
        <!-- Password confirmation -->
        <div class="form-group">
            <label for="confirm-password">Confirm password *</label>
            <input type="password" id="confirm-password" name="confirm-password" 
                   required aria-describedby="confirm-error">
            <div id="confirm-error" class="error-text" role="alert"></div>
        </div>
        
        <!-- Birth date -->
        <div class="form-group">
            <label for="birthdate">Birth date</label>
            <input type="date" id="birthdate" name="birthdate" 
                   max="2010-01-01" min="1900-01-01"
                   aria-describedby="birthdate-help">
            <div id="birthdate-help" class="help-text">
                You must be at least 14 years old
            </div>
        </div>
        
        <!-- Phone with international format -->
        <div class="form-group">
            <label for="phone">Phone</label>
            <input type="tel" id="phone" name="phone" 
                   pattern="[0-9+\-\s\(\)]{10,20}"
                   placeholder="+33 1 23 45 67 89"
                   aria-describedby="phone-help">
            <div id="phone-help" class="help-text">
                International format accepted
            </div>
        </div>
        
        <!-- Website -->
        <div class="form-group">
            <label for="website">Website</label>
            <input type="url" id="website" name="website" 
                   placeholder="https://example.com"
                   aria-describedby="website-help">
            <div id="website-help" class="help-text">
                Complete URL with http:// or https://
            </div>
        </div>
        
        <!-- Experience level -->
        <div class="form-group">
            <label for="experience">Experience level</label>
            <select id="experience" name="experience">
                <option value="">Select your level</option>
                <optgroup label="Beginner">
                    <option value="0-1">0-1 years</option>
                </optgroup>
                <optgroup label="Intermediate">
                    <option value="2-5">2-5 years</option>
                </optgroup>
                <optgroup label="Advanced">
                    <option value="6-10">6-10 years</option>
                    <option value="10+">10+ years</option>
                </optgroup>
            </select>
        </div>
        
        <!-- Skills with datalist -->
        <div class="form-group">
            <label for="skills">Technical skills</label>
            <input list="skills-list" id="skills" name="skills" 
                   multiple aria-describedby="skills-help">
            <datalist id="skills-list">
                <option value="HTML5">
                <option value="CSS3">
                <option value="JavaScript">
                <option value="Python">
                <option value="Java">
                <option value="React">
                <option value="Vue.js">
                <option value="Node.js">
            </datalist>
            <div id="skills-help" class="help-text">
                Type to search or select from the list
            </div>
        </div>
        
        <!-- Progress bar -->
        <div class="form-group">
            <label for="progress">Satisfaction level</label>
            <input type="range" id="progress" name="progress" 
                   min="0" max="100" value="50" step="10"
                   aria-describedby="progress-value">
            <output id="progress-value" for="progress">50%</output>
        </div>
        
        <!-- Preferred color -->
        <div class="form-group">
            <label for="color">Preferred color</label>
            <input type="color" id="color" name="color" value="#3498db">
        </div>
    </fieldset>
    
    <div class="form-actions">
        <button type="submit">Create account</button>
        <button type="reset">Clear</button>
        <button type="button" id="preview">Preview</button>
    </div>
</form>
```

### HTML5 API - Geolocation

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Geolocation</title>
</head>
<body>
    <h1>Geolocation</h1>
    
    <button id="getLocation">Get my position</button>
    <button id="watchLocation">Watch my position</button>
    <button id="stopWatch">Stop watching</button>
    
    <div id="location-info">
        <p><strong>Latitude:</strong> <span id="latitude">-</span></p>
        <p><strong>Longitude:</strong> <span id="longitude">-</span></p>
        <p><strong>Accuracy:</strong> <span id="accuracy">-</span> meters</p>
        <p><strong>Altitude:</strong> <span id="altitude">-</span> meters</p>
        <p><strong>Speed:</strong> <span id="speed">-</span> m/s</p>
    </div>
    
    <div id="map" style="width: 100%; height: 400px; border: 1px solid #ccc;"></div>
    
    <script>
        let watchId = null;
        
        document.getElementById('getLocation').addEventListener('click', getCurrentPosition);
        document.getElementById('watchLocation').addEventListener('click', startWatching);
        document.getElementById('stopWatch').addEventListener('click', stopWatching);
        
        function getCurrentPosition() {
            if (!navigator.geolocation) {
                alert('Geolocation is not supported by this browser.');
                return;
            }
            
            const options = {
                enableHighAccuracy: true,
                timeout: 10000,
                maximumAge: 300000 // 5 minutes
            };
            
            navigator.geolocation.getCurrentPosition(
                showPosition,
                showError,
                options
            );
        }
        
        function startWatching() {
            if (!navigator.geolocation) {
                alert('Geolocation is not supported by this browser.');
                return;
            }
            
            const options = {
                enableHighAccuracy: true,
                timeout: 10000,
                maximumAge: 0
            };
            
            watchId = navigator.geolocation.watchPosition(
                showPosition,
                showError,
                options
            );
        }
        
        function stopWatching() {
            if (watchId) {
                navigator.geolocation.clearWatch(watchId);
                watchId = null;
            }
        }
        
        function showPosition(position) {
            document.getElementById('latitude').textContent = position.coords.latitude;
            document.getElementById('longitude').textContent = position.coords.longitude;
            document.getElementById('accuracy').textContent = position.coords.accuracy;
            document.getElementById('altitude').textContent = position.coords.altitude || 'Not available';
            document.getElementById('speed').textContent = position.coords.speed || 'Not available';
            
            // Display on a map (requires a maps API)
            updateMap(position.coords.latitude, position.coords.longitude);
        }
        
        function showError(error) {
            let message = '';
            switch(error.code) {
                case error.PERMISSION_DENIED:
                    message = 'Geolocation access denied by user.';
                    break;
                case error.POSITION_UNAVAILABLE:
                    message = 'Geolocation information unavailable.';
                    break;
                case error.TIMEOUT:
                    message = 'Geolocation request timed out.';
                    break;
                default:
                    message = 'An unknown error occurred.';
                    break;
            }
            alert('Geolocation error: ' + message);
        }
        
        function updateMap(lat, lng) {
            // Here you can integrate a maps API like Google Maps or OpenStreetMap
            console.log(`Position: ${lat}, ${lng}`);
        }
    </script>
</body>
</html>
```

---

## 🔴 Performance and SEO

### Metadata optimization

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    
    <!-- Basic metadata -->
    <title>My Website - SEO Optimized Title</title>
    <meta name="description" content="SEO optimized description of 150-160 characters">
    <meta name="keywords" content="keyword1, keyword2, keyword3">
    <meta name="author" content="Your Name">
    
    <!-- Open Graph / Facebook -->
    <meta property="og:type" content="website">
    <meta property="og:url" content="https://example.com/">
    <meta property="og:title" content="Title for social networks">
    <meta property="og:description" content="Description for social networks">
    <meta property="og:image" content="https://example.com/image.jpg">
    <meta property="og:image:width" content="1200">
    <meta property="og:image:height" content="630">
    <meta property="og:site_name" content="My Website">
    <meta property="og:locale" content="en_US">
    
    <!-- Twitter Card -->
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:url" content="https://example.com/">
    <meta name="twitter:title" content="Twitter Title">
    <meta name="twitter:description" content="Twitter Description">
    <meta name="twitter:image" content="https://example.com/image.jpg">
    <meta name="twitter:creator" content="@youraccount">
    
    <!-- Technical metadata -->
    <meta name="robots" content="index, follow">
    <meta name="googlebot" content="index, follow">
    <meta name="theme-color" content="#3498db">
    <meta name="msapplication-TileColor" content="#3498db">
    <meta name="apple-mobile-web-app-capable" content="yes">
    <meta name="apple-mobile-web-app-status-bar-style" content="default">
    <meta name="apple-mobile-web-app-title" content="My App">
    
    <!-- Canonical URL -->
    <link rel="canonical" href="https://example.com/current-page">
    
    <!-- Favicons -->
    <link rel="icon" type="image/x-icon" href="/favicon.ico">
    <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png">
    <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png">
    <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png">
    <link rel="manifest" href="/site.webmanifest">
    
    <!-- Preload critical resources -->
    <link rel="preload" href="/fonts/main.woff2" as="font" type="font/woff2" crossorigin>
    <link rel="preload" href="/css/critical.css" as="style">
    <link rel="preload" href="/js/main.js" as="script">
    
    <!-- DNS Prefetch -->
    <link rel="dns-prefetch" href="//fonts.googleapis.com">
    <link rel="dns-prefetch" href="//cdn.example.com">
    
    <!-- Critical inline styles -->
    <style>
        /* Critical CSS for initial render */
        body { font-family: Arial, sans-serif; margin: 0; }
        .header { background: #3498db; color: white; padding: 1rem; }
    </style>
    
    <!-- Non-critical styles -->
    <link rel="stylesheet" href="/css/main.css" media="print" onload="this.media='all'">
    <noscript><link rel="stylesheet" href="/css/main.css"></noscript>
</head>
<body>
    <!-- Page content -->
</body>
</html>
```

### JSON-LD structure for SEO

```html
<!-- Structured data JSON-LD -->
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "My Website",
  "url": "https://example.com",
  "description": "Description of my website",
  "publisher": {
    "@type": "Organization",
    "name": "My Company",
    "logo": {
      "@type": "ImageObject",
      "url": "https://example.com/logo.png"
    }
  },
  "potentialAction": {
    "@type": "SearchAction",
    "target": "https://example.com/search?q={search_term_string}",
    "query-input": "required name=search_term_string"
  }
}
</script>

<!-- Article with structured data -->
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "Article title",
  "description": "Article description",
  "image": "https://example.com/article-image.jpg",
  "author": {
    "@type": "Person",
    "name": "John Doe",
    "url": "https://example.com/author/john-doe"
  },
  "publisher": {
    "@type": "Organization",
    "name": "My Website",
    "logo": {
      "@type": "ImageObject",
      "url": "https://example.com/logo.png"
    }
  },
  "datePublished": "2024-01-15",
  "dateModified": "2024-01-15",
  "mainEntityOfPage": {
    "@type": "WebPage",
    "@id": "https://example.com/article"
  }
}
</script>
```

---

## ⚫ Web Components and PWA

### Custom Web Components

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Web Components</title>
    <style>
        /* Styles for custom component */
        custom-button {
            --button-color: #3498db;
            --button-hover: #2980b9;
            --button-text: white;
        }
        
        custom-button button {
            background-color: var(--button-color);
            color: var(--button-text);
            border: none;
            padding: 10px 20px;
            border-radius: 4px;
            cursor: pointer;
            font-size: 16px;
            transition: background-color 0.3s;
        }
        
        custom-button button:hover {
            background-color: var(--button-hover);
        }
        
        custom-button button:disabled {
            opacity: 0.6;
            cursor: not-allowed;
        }
    </style>
</head>
<body>
    <h1>Custom Web Components</h1>
    
    <!-- Using custom component -->
    <custom-button 
        text="Click me" 
        variant="primary" 
        disabled="false"
        onclick="handleClick()">
    </custom-button>
    
    <custom-button 
        text="Disabled button" 
        variant="secondary" 
        disabled="true">
    </custom-button>
    
    <script>
        // Custom component definition
        class CustomButton extends HTMLElement {
            constructor() {
                super();
                this.attachShadow({ mode: 'open' });
            }
            
            static get observedAttributes() {
                return ['text', 'variant', 'disabled'];
            }
            
            connectedCallback() {
                this.render();
            }
            
            attributeChangedCallback(name, oldValue, newValue) {
                if (oldValue !== newValue) {
                    this.render();
                }
            }
            
            render() {
                const text = this.getAttribute('text') || 'Button';
                const variant = this.getAttribute('variant') || 'primary';
                const disabled = this.getAttribute('disabled') === 'true';
                const onclick = this.getAttribute('onclick');
                
                this.shadowRoot.innerHTML = `
                    <button 
                        class="${variant}" 
                        ${disabled ? 'disabled' : ''}
                        ${onclick ? `onclick="${onclick}"` : ''}>
                        ${text}
                    </button>
                `;
            }
        }
        
        // Register component
        customElements.define('custom-button', CustomButton);
        
        // Click handler function
        function handleClick() {
            alert('Button clicked!');
        }
    </script>
</body>
</html>
```

### Service Worker for PWA

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>PWA - Progressive Web App</title>
    
    <!-- PWA Manifest -->
    <link rel="manifest" href="/manifest.json">
    
    <!-- PWA Meta tags -->
    <meta name="theme-color" content="#3498db">
    <meta name="apple-mobile-web-app-capable" content="yes">
    <meta name="apple-mobile-web-app-status-bar-style" content="default">
    <meta name="apple-mobile-web-app-title" content="My PWA">
    
    <!-- PWA Icons -->
    <link rel="apple-touch-icon" href="/icons/icon-192x192.png">
    <link rel="icon" type="image/png" sizes="192x192" href="/icons/icon-192x192.png">
    <link rel="icon" type="image/png" sizes="512x512" href="/icons/icon-512x512.png">
    
    <style>
        body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 20px;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            min-height: 100vh;
        }
        
        .container {
            max-width: 800px;
            margin: 0 auto;
            text-align: center;
        }
        
        .install-prompt {
            background: rgba(255, 255, 255, 0.1);
            padding: 20px;
            border-radius: 10px;
            margin: 20px 0;
            display: none;
        }
        
        .install-btn {
            background: #3498db;
            color: white;
            border: none;
            padding: 10px 20px;
            border-radius: 5px;
            cursor: pointer;
            font-size: 16px;
        }
        
        .status {
            margin: 20px 0;
            padding: 10px;
            background: rgba(255, 255, 255, 0.1);
            border-radius: 5px;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>🚀 My PWA</h1>
        <p>A Progressive Web App with HTML5</p>
        
        <div class="install-prompt" id="installPrompt">
            <h3>Install the application</h3>
            <p>Install this application on your device for a better experience!</p>
            <button class="install-btn" id="installBtn">Install</button>
            <button class="install-btn" id="dismissBtn">Later</button>
        </div>
        
        <div class="status" id="status">
            <h3>Application status</h3>
            <p id="connectionStatus">Checking connection...</p>
            <p id="serviceWorkerStatus">Checking Service Worker...</p>
        </div>
        
        <div class="features">
            <h3>PWA Features</h3>
            <ul style="text-align: left; max-width: 400px; margin: 0 auto;">
                <li>✅ Device installation</li>
                <li>✅ Offline functionality</li>
                <li>✅ Push notifications</li>
                <li>✅ Background synchronization</li>
                <li>✅ Native interface</li>
            </ul>
        </div>
    </div>
    
    <script>
        // PWA installation handling
        let deferredPrompt;
        const installPrompt = document.getElementById('installPrompt');
        const installBtn = document.getElementById('installBtn');
        const dismissBtn = document.getElementById('dismissBtn');
        
        // Listen to beforeinstallprompt event
        window.addEventListener('beforeinstallprompt', (e) => {
            e.preventDefault();
            deferredPrompt = e;
            installPrompt.style.display = 'block';
        });
        
        // Handle install button click
        installBtn.addEventListener('click', async () => {
            if (deferredPrompt) {
                deferredPrompt.prompt();
                const { outcome } = await deferredPrompt.userChoice;
                console.log(`Installation ${outcome}`);
                deferredPrompt = null;
                installPrompt.style.display = 'none';
            }
        });
        
        // Hide prompt
        dismissBtn.addEventListener('click', () => {
            installPrompt.style.display = 'none';
        });
        
        // Check if app is already installed
        window.addEventListener('appinstalled', () => {
            console.log('PWA installed successfully');
            installPrompt.style.display = 'none';
        });
        
        // Connection handling
        function updateConnectionStatus() {
            const status = navigator.onLine ? 'Online' : 'Offline';
            document.getElementById('connectionStatus').textContent = `Connection: ${status}`;
        }
        
        window.addEventListener('online', updateConnectionStatus);
        window.addEventListener('offline', updateConnectionStatus);
        updateConnectionStatus();
        
        // Service Worker registration
        if ('serviceWorker' in navigator) {
            navigator.serviceWorker.register('/sw.js')
                .then(registration => {
                    console.log('Service Worker registered:', registration);
                    document.getElementById('serviceWorkerStatus').textContent = 
                        'Service Worker: Active';
                })
                .catch(error => {
                    console.log('Service Worker error:', error);
                    document.getElementById('serviceWorkerStatus').textContent = 
                        'Service Worker: Error';
                });
        } else {
            document.getElementById('serviceWorkerStatus').textContent = 
                'Service Worker: Not supported';
        }
        
        // Notification handling
        function requestNotificationPermission() {
            if ('Notification' in window) {
                Notification.requestPermission().then(permission => {
                    if (permission === 'granted') {
                        new Notification('PWA installed!', {
                            body: 'The application has been installed successfully.',
                            icon: '/icons/icon-192x192.png'
                        });
                    }
                });
            }
        }
        
        // Request notification permission after installation
        installBtn.addEventListener('click', requestNotificationPermission);
    </script>
</body>
</html>
```

---

## 📚 Resources

### Official Documentation
- [MDN HTML5](https://developer.mozilla.org/en-US/docs/Web/HTML)
- [W3C HTML5 Specification](https://www.w3.org/TR/html52/)
- [HTML5 Doctor](http://html5doctor.com/)

### Accessibility
- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [WebAIM](https://webaim.org/)
- [A11y Project](https://www.a11yproject.com/)

### Tools and validation
- [W3C Markup Validator](https://validator.w3.org/)
- [Lighthouse](https://developers.google.com/web/tools/lighthouse)
- [axe DevTools](https://www.deque.com/axe/devtools/)

### Learning
- [HTML5 Tutorial](https://www.w3schools.com/html/)
- [HTML5 Rocks](https://www.html5rocks.com/)
- [Can I Use](https://caniuse.com/)

---

*Last updated: January 2024*



<div align="center">

[![Retour au Profil](https://img.shields.io/badge/ðŸ _Retour_au_Profil-000000?style=for-the-badge&logo=github&logoColor=white)](../../../../../../../../README.md)

</div>

