# 🎨 CSS3 - Complete Guide

> **CSS3** is the latest evolution of the Cascading Style Sheets language, offering new features for designing and laying out modern websites with a focus on accessibility and performance.

## 📋 Table of Contents
- [🎯 Reference Tables](#-complete-css3-reference-tables)
- [🚀 Introduction](#-introduction)
- [🟢 Selectors and Basic Properties](#-beginner---selectors-and-basic-properties)
- [🟡 Layout and Responsive](#-intermediate---layout-and-responsive)
- [🟠 Animations and Transitions](#-advanced---animations-and-transitions)
- [🔴 Performance and Accessibility](#-senior---performance-and-accessibility)
- [⚫ Advanced CSS and Modern Techniques](#-expert---advanced-css-and-modern-techniques)
- [📚 Resources](#-resources)

---

## 🎯 Complete CSS3 Reference Tables

### 🎯 CSS Selectors

| Selector | Description | Example | Specificity |
|----------|-------------|---------|-------------|
| **`*`** | All elements | `* { margin: 0; }` | 0,0,0,0 |
| **`element`** | HTML element | `p { color: blue; }` | 0,0,0,1 |
| **`.class`** | Class | `.container { width: 100%; }` | 0,0,1,0 |
| **`#id`** | Identifier | `#header { background: red; }` | 0,1,0,0 |
| **`[attr]`** | Attribute | `[type="text"] { border: 1px solid; }` | 0,0,1,0 |
| **`[attr="value"]`** | Attribute with value | `[href="https://"] { color: green; }` | 0,0,1,0 |
| **`[attr^="value"]`** | Starts with | `[class^="btn-"] { padding: 10px; }` | 0,0,1,0 |
| **`[attr$="value"]`** | Ends with | `[src$=".jpg"] { border: 2px solid; }` | 0,0,1,0 |
| **`[attr*="value"]`** | Contains | `[class*="active"] { font-weight: bold; }` | 0,0,1,0 |
| **`:`** | Pseudo-class | `:hover { background: yellow; }` | 0,0,1,0 |
| **`::`** | Pseudo-element | `::before { content: ""; }` | 0,0,0,1 |
| **` `** | Descendant | `div p { margin: 10px; }` | Combined |
| **`>`** | Direct child | `div > p { color: red; }` | Combined |
| **`+`** | Adjacent sibling | `h1 + p { margin-top: 0; }` | Combined |
| **`~`** | General sibling | `h1 ~ p { color: blue; }` | Combined |

### 🎯 Pseudo-classes

| Pseudo-class | Description | Example | Usage |
|--------------|-------------|---------|-------|
| **`:hover`** | On hover | `a:hover { color: red; }` | User interactions |
| **`:focus`** | On focus | `input:focus { outline: 2px solid blue; }` | Keyboard accessibility |
| **`:active`** | During click | `button:active { transform: scale(0.95); }` | Tactile feedback |
| **`:visited`** | Visited link | `a:visited { color: purple; }` | Navigation |
| **`:link`** | Unvisited link | `a:link { color: blue; }` | Navigation |
| **`:first-child`** | First child | `li:first-child { font-weight: bold; }` | List styling |
| **`:last-child`** | Last child | `li:last-child { border-bottom: none; }` | List styling |
| **`:nth-child(n)`** | Child at position n | `tr:nth-child(even) { background: #f5f5f5; }` | Tables, lists |
| **`:nth-of-type(n)`** | Element of type n | `p:nth-of-type(2) { color: red; }` | Type selection |
| **`:only-child`** | Only child | `div:only-child { margin: 0; }` | Conditional layout |
| **`:empty`** | Empty element | `div:empty { display: none; }` | Conditional hiding |
| **`:not(selector)`** | Negation | `p:not(.special) { color: black; }` | Exclusion |
| **`:disabled`** | Disabled element | `input:disabled { opacity: 0.5; }` | Forms |
| **`:checked`** | Checked element | `input:checked + label { font-weight: bold; }` | Forms |
| **`:valid`** | Valid value | `input:valid { border-color: green; }` | Validation |
| **`:invalid`** | Invalid value | `input:invalid { border-color: red; }` | Validation |
| **`:required`** | Required field | `input:required { border-left: 3px solid red; }` | Forms |
| **`:optional`** | Optional field | `input:optional { border-left: 3px solid green; }` | Forms |

### 🎯 Layout Properties

| Property | Description | Values | Example |
|----------|-------------|--------|---------|
| **`display`** | Display type | `block`, `inline`, `flex`, `grid`, `none` | `display: flex;` |
| **`position`** | Positioning | `static`, `relative`, `absolute`, `fixed`, `sticky` | `position: absolute;` |
| **`top`** | Position from top | `auto`, `px`, `%`, `em` | `top: 10px;` |
| **`right`** | Position from right | `auto`, `px`, `%`, `em` | `right: 20px;` |
| **`bottom`** | Position from bottom | `auto`, `px`, `%`, `em` | `bottom: 0;` |
| **`left`** | Position from left | `auto`, `px`, `%`, `em` | `left: 50%;` |
| **`z-index`** | Stacking order | `auto`, `number` | `z-index: 1000;` |
| **`float`** | Float | `none`, `left`, `right` | `float: left;` |
| **`clear`** | Clear float | `none`, `left`, `right`, `both` | `clear: both;` |
| **`overflow`** | Overflow | `visible`, `hidden`, `scroll`, `auto` | `overflow: hidden;` |
| **`visibility`** | Visibility | `visible`, `hidden`, `collapse` | `visibility: hidden;` |
| **`opacity`** | Opacity | `0` to `1` | `opacity: 0.5;` |

### 🎯 Flexbox

| Property | Description | Values | Example |
|----------|-------------|--------|---------|
| **`flex-direction`** | Element direction | `row`, `row-reverse`, `column`, `column-reverse` | `flex-direction: column;` |
| **`flex-wrap`** | Wrap | `nowrap`, `wrap`, `wrap-reverse` | `flex-wrap: wrap;` |
| **`justify-content`** | Horizontal alignment | `flex-start`, `center`, `flex-end`, `space-between`, `space-around` | `justify-content: center;` |
| **`align-items`** | Vertical alignment | `stretch`, `flex-start`, `center`, `flex-end`, `baseline` | `align-items: center;` |
| **`align-content`** | Content alignment | `stretch`, `flex-start`, `center`, `flex-end`, `space-between` | `align-content: space-between;` |
| **`flex-grow`** | Growth factor | `number` | `flex-grow: 1;` |
| **`flex-shrink`** | Shrink factor | `number` | `flex-shrink: 0;` |
| **`flex-basis`** | Base size | `auto`, `px`, `%`, `em` | `flex-basis: 200px;` |
| **`flex`** | Shorthand | `grow shrink basis` | `flex: 1 0 200px;` |
| **`order`** | Display order | `number` | `order: 2;` |
| **`align-self`** | Individual alignment | `auto`, `flex-start`, `center`, `flex-end` | `align-self: center;` |

### 🎯 Grid

| Property | Description | Values | Example |
|----------|-------------|--------|---------|
| **`display`** | Grid mode | `grid`, `inline-grid` | `display: grid;` |
| **`grid-template-columns`** | Columns | `px`, `%`, `fr`, `auto`, `repeat()` | `grid-template-columns: 1fr 2fr 1fr;` |
| **`grid-template-rows`** | Rows | `px`, `%`, `fr`, `auto`, `repeat()` | `grid-template-rows: 100px 1fr;` |
| **`grid-template-areas`** | Named areas | `"header header" "sidebar main"` | `grid-template-areas: "header header";` |
| **`grid-gap`** | Spacing | `px`, `em` | `grid-gap: 20px;` |
| **`grid-column-gap`** | Column spacing | `px`, `em` | `grid-column-gap: 10px;` |
| **`grid-row-gap`** | Row spacing | `px`, `em` | `grid-row-gap: 15px;` |
| **`justify-items`** | Horizontal alignment | `start`, `end`, `center`, `stretch` | `justify-items: center;` |
| **`align-items`** | Vertical alignment | `start`, `end`, `center`, `stretch` | `align-items: center;` |
| **`justify-content`** | Content alignment | `start`, `end`, `center`, `stretch`, `space-around` | `justify-content: space-around;` |
| **`align-content`** | Content alignment | `start`, `end`, `center`, `stretch`, `space-around` | `align-content: center;` |
| **`grid-column`** | Column position | `1 / 3`, `span 2`, `1 / -1` | `grid-column: 1 / 3;` |
| **`grid-row`** | Row position | `1 / 3`, `span 2`, `1 / -1` | `grid-row: 1 / 3;` |
| **`grid-area`** | Area | `name`, `row-start / col-start / row-end / col-end` | `grid-area: header;` |

### 🎯 Typography

| Property | Description | Values | Example |
|----------|-------------|--------|---------|
| **`font-family`** | Font | `Arial`, `"Times New Roman"`, `serif` | `font-family: Arial, sans-serif;` |
| **`font-size`** | Size | `px`, `em`, `rem`, `%`, `smaller`, `larger` | `font-size: 16px;` |
| **`font-weight`** | Weight | `normal`, `bold`, `100-900` | `font-weight: 700;` |
| **`font-style`** | Style | `normal`, `italic`, `oblique` | `font-style: italic;` |
| **`line-height`** | Line height | `number`, `px`, `em` | `line-height: 1.5;` |
| **`text-align`** | Alignment | `left`, `right`, `center`, `justify` | `text-align: center;` |
| **`text-decoration`** | Decoration | `none`, `underline`, `line-through`, `overline` | `text-decoration: underline;` |
| **`text-transform`** | Transform | `none`, `uppercase`, `lowercase`, `capitalize` | `text-transform: uppercase;` |
| **`letter-spacing`** | Letter spacing | `normal`, `px`, `em` | `letter-spacing: 2px;` |
| **`word-spacing`** | Word spacing | `normal`, `px`, `em` | `word-spacing: 5px;` |
| **`text-shadow`** | Text shadow | `x y blur color` | `text-shadow: 2px 2px 4px rgba(0,0,0,0.5);` |
| **`text-overflow`** | Text overflow | `clip`, `ellipsis` | `text-overflow: ellipsis;` |
| **`white-space`** | Whitespace handling | `normal`, `nowrap`, `pre`, `pre-wrap` | `white-space: nowrap;` |

### 🎯 Colors and Backgrounds

| Property | Description | Values | Example |
|----------|-------------|--------|---------|
| **`color`** | Text color | `#ff0000`, `rgb(255,0,0)`, `red` | `color: #3498db;` |
| **`background-color`** | Background color | `#ff0000`, `rgb(255,0,0)`, `red` | `background-color: #f8f9fa;` |
| **`background-image`** | Background image | `url()`, `linear-gradient()`, `radial-gradient()` | `background-image: url('bg.jpg');` |
| **`background-size`** | Image size | `cover`, `contain`, `px`, `%` | `background-size: cover;` |
| **`background-position`** | Image position | `top`, `center`, `bottom`, `left`, `right` | `background-position: center;` |
| **`background-repeat`** | Repeat | `repeat`, `no-repeat`, `repeat-x`, `repeat-y` | `background-repeat: no-repeat;` |
| **`background-attachment`** | Attachment | `scroll`, `fixed`, `local` | `background-attachment: fixed;` |
| **`background`** | Shorthand | All properties | `background: #f8f9fa url('bg.jpg') no-repeat center;` |
| **`opacity`** | Opacity | `0` to `1` | `opacity: 0.8;` |
| **`box-shadow`** | Box shadow | `x y blur spread color` | `box-shadow: 0 2px 10px rgba(0,0,0,0.1);` |

### 🎯 Borders and Spacing

| Property | Description | Values | Example |
|----------|-------------|--------|---------|
| **`border`** | Border | `width style color` | `border: 1px solid #ccc;` |
| **`border-width`** | Width | `thin`, `medium`, `thick`, `px` | `border-width: 2px;` |
| **`border-style`** | Style | `solid`, `dashed`, `dotted`, `double` | `border-style: solid;` |
| **`border-color`** | Color | `#ff0000`, `rgb(255,0,0)`, `red` | `border-color: #3498db;` |
| **`border-radius`** | Corner radius | `px`, `%` | `border-radius: 10px;` |
| **`margin`** | Outer margin | `px`, `em`, `%`, `auto` | `margin: 20px;` |
| **`padding`** | Inner margin | `px`, `em`, `%` | `padding: 15px;` |
| **`width`** | Width | `px`, `%`, `em`, `auto` | `width: 100%;` |
| **`height`** | Height | `px`, `%`, `em`, `auto` | `height: 200px;` |
| **`max-width`** | Max width | `px`, `%`, `em`, `none` | `max-width: 1200px;` |
| **`max-height`** | Max height | `px`, `%`, `em`, `none` | `max-height: 500px;` |
| **`min-width`** | Min width | `px`, `%`, `em` | `min-width: 300px;` |
| **`min-height`** | Min height | `px`, `%`, `em` | `min-height: 200px;` |

### 🎯 Animations and Transitions

| Property | Description | Values | Example |
|----------|-------------|--------|---------|
| **`transition`** | Transition | `property duration timing-function delay` | `transition: all 0.3s ease;` |
| **`transition-property`** | Property to animate | `all`, `opacity`, `transform` | `transition-property: opacity;` |
| **`transition-duration`** | Duration | `s`, `ms` | `transition-duration: 0.3s;` |
| **`transition-timing-function`** | Timing function | `ease`, `linear`, `ease-in`, `ease-out` | `transition-timing-function: ease-in-out;` |
| **`transition-delay`** | Delay | `s`, `ms` | `transition-delay: 0.1s;` |
| **`animation`** | Animation | `name duration timing-function delay iteration-count direction` | `animation: slideIn 1s ease-in-out;` |
| **`animation-name`** | Animation name | `@keyframes name` | `animation-name: slideIn;` |
| **`animation-duration`** | Duration | `s`, `ms` | `animation-duration: 1s;` |
| **`animation-timing-function`** | Timing function | `ease`, `linear`, `cubic-bezier()` | `animation-timing-function: ease-out;` |
| **`animation-delay`** | Delay | `s`, `ms` | `animation-delay: 0.5s;` |
| **`animation-iteration-count`** | Iteration count | `number`, `infinite` | `animation-iteration-count: 3;` |
| **`animation-direction`** | Direction | `normal`, `reverse`, `alternate` | `animation-direction: alternate;` |
| **`animation-fill-mode`** | Fill mode | `none`, `forwards`, `backwards`, `both` | `animation-fill-mode: forwards;` |
| **`animation-play-state`** | Play state | `running`, `paused` | `animation-play-state: paused;` |

### 🎯 Transformations

| Property | Description | Values | Example |
|----------|-------------|--------|---------|
| **`transform`** | Transformation | `translate()`, `rotate()`, `scale()`, `skew()` | `transform: translateX(50px);` |
| **`transform-origin`** | Origin point | `center`, `top`, `left`, `px`, `%` | `transform-origin: center;` |
| **`perspective`** | 3D perspective | `px`, `none` | `perspective: 1000px;` |
| **`perspective-origin`** | Perspective origin | `center`, `top`, `left`, `px`, `%` | `perspective-origin: center;` |
| **`backface-visibility`** | Backface visibility | `visible`, `hidden` | `backface-visibility: hidden;` |

### 🎯 Media Queries

| Type | Description | Example | Usage |
|------|-------------|---------|-------|
| **`@media screen`** | Screens | `@media screen and (max-width: 768px)` | Responsive design |
| **`@media print`** | Print | `@media print { body { color: black; } }` | Print styles |
| **`@media (min-width)`** | Min width | `@media (min-width: 1024px)` | Desktop |
| **`@media (max-width)`** | Max width | `@media (max-width: 768px)` | Mobile |
| **`@media (orientation)`** | Orientation | `@media (orientation: landscape)` | Portrait/Landscape |
| **`@media (resolution)`** | Resolution | `@media (min-resolution: 2dppx)` | High resolution screens |
| **`@media (prefers-color-scheme)`** | System theme | `@media (prefers-color-scheme: dark)` | Dark mode |

---

## 🚀 Introduction

CSS3 is the latest evolution of the Cascading Style Sheets language, offering new features for designing and laying out modern websites.

### What is CSS3?
CSS3 is a style language that describes the presentation of HTML documents. It allows you to control the appearance, layout, animations, and interactions of web elements separately from content.

### Why choose CSS3?
- **🎨 Modern Design**: New design features
- **📱 Responsive**: Automatic screen adaptation
- **⚡ Performance**: Optimizations and new APIs
- **♿ Accessibility**: Assistive technology support
- **🔄 Animations**: Smooth transitions and animations
- **🌐 Standards**: Web standards compliance
- **📚 Documentation**: Clear and complete specifications

### Accessibility Best Practices
- **Sufficient contrast**: Respect WCAG ratios (4.5:1 for normal text)
- **Relative units**: Use `rem` and `em` to respect user preferences
- **Visible focus**: Ensure keyboard focus is visible
- **Respectful animations**: Respect `prefers-reduced-motion`
- **Non-exclusive colors**: Don't use color alone to convey information

---

## 🟢 Selectors and Basic Properties

### Basic CSS structure

```css
/* CSS comment */

/* Element selector */
body {
    font-family: Arial, sans-serif;
    margin: 0;
    padding: 0;
    background-color: #f8f9fa;
}

/* Class selector */
.container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 20px;
}

/* ID selector */
#header {
    background-color: #3498db;
    color: white;
    padding: 20px;
    text-align: center;
}

/* Descendant selector */
.container p {
    line-height: 1.6;
    margin-bottom: 15px;
}

/* Direct child selector */
.container > h1 {
    color: #2c3e50;
    font-size: 2.5em;
}

/* Adjacent sibling selector */
h1 + p {
    font-style: italic;
    color: #7f8c8d;
}

/* Attribute selector */
input[type="text"] {
    border: 2px solid #bdc3c7;
    padding: 10px;
    border-radius: 5px;
}

/* Pseudo-class */
a:hover {
    color: #e74c3c;
    text-decoration: underline;
}

/* Pseudo-element */
p::first-line {
    font-weight: bold;
    color: #2c3e50;
}
```

### Basic typography

```css
/* Title hierarchy */
h1 {
    font-size: 2.5rem;
    font-weight: 700;
    color: #2c3e50;
    margin-bottom: 1rem;
    line-height: 1.2;
}

h2 {
    font-size: 2rem;
    font-weight: 600;
    color: #34495e;
    margin-bottom: 0.8rem;
    line-height: 1.3;
}

h3 {
    font-size: 1.5rem;
    font-weight: 500;
    color: #34495e;
    margin-bottom: 0.6rem;
    line-height: 1.4;
}

/* Paragraphs */
p {
    font-size: 1rem;
    line-height: 1.6;
    color: #2c3e50;
    margin-bottom: 1rem;
}

/* Links */
a {
    color: #3498db;
    text-decoration: none;
    transition: color 0.3s ease;
}

a:hover {
    color: #2980b9;
    text-decoration: underline;
}

a:focus {
    outline: 2px solid #3498db;
    outline-offset: 2px;
}

/* Lists */
ul, ol {
    margin-bottom: 1rem;
    padding-left: 2rem;
}

li {
    margin-bottom: 0.5rem;
    line-height: 1.5;
}

/* Quotes */
blockquote {
    border-left: 4px solid #3498db;
    padding-left: 1rem;
    margin: 1rem 0;
    font-style: italic;
    color: #7f8c8d;
}

/* Code */
code {
    background-color: #f8f9fa;
    padding: 0.2rem 0.4rem;
    border-radius: 3px;
    font-family: 'Courier New', monospace;
    font-size: 0.9em;
}

pre {
    background-color: #2c3e50;
    color: #ecf0f1;
    padding: 1rem;
    border-radius: 5px;
    overflow-x: auto;
    margin: 1rem 0;
}
```

### Colors and backgrounds

```css
/* Base colors */
.primary {
    background-color: #3498db;
    color: white;
}

.secondary {
    background-color: #95a5a6;
    color: white;
}

.success {
    background-color: #27ae60;
    color: white;
}

.warning {
    background-color: #f39c12;
    color: white;
}

.danger {
    background-color: #e74c3c;
    color: white;
}

/* Gradients */
.gradient-bg {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

.gradient-text {
    background: linear-gradient(45deg, #3498db, #e74c3c);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
}

/* Background images */
.hero-section {
    background-image: url('hero-bg.jpg');
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    background-attachment: fixed;
}

/* Image overlay */
.overlay {
    position: relative;
}

.overlay::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.5);
    z-index: 1;
}

.overlay-content {
    position: relative;
    z-index: 2;
}
```

---

## 🟡 Layout and Responsive

### Flexbox Layout

```css
/* Flex container */
.flex-container {
    display: flex;
    flex-direction: row; /* row, column, row-reverse, column-reverse */
    flex-wrap: wrap; /* nowrap, wrap, wrap-reverse */
    justify-content: center; /* flex-start, center, flex-end, space-between, space-around */
    align-items: center; /* stretch, flex-start, center, flex-end, baseline */
    gap: 20px; /* Spacing between elements */
    min-height: 100vh;
}

/* Flex items */
.flex-item {
    flex: 1; /* flex-grow flex-shrink flex-basis */
    min-width: 200px;
    padding: 20px;
    background-color: #f8f9fa;
    border-radius: 8px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

/* Navigation flex example */
.nav {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem 2rem;
    background-color: #2c3e50;
    color: white;
}

.navorders {
    font-size: 1.5rem;
    font-weight: bold;
}

.nav-menu {
    display: flex;
    list-style: none;
    margin: 0;
    padding: 0;
    gap: 2rem;
}

.nav-menu li a {
    color: white;
    text-decoration: none;
    padding: 0.5rem 1rem;
    border-radius: 4px;
    transition: background-color 0.3s ease;
}

.nav-menu li a:hover {
    background-color: rgba(255, 255, 255, 0.1);
}

/* Card layout with flexbox */
.card-container {
    display: flex;
    flex-wrap: wrap;
    gap: 2rem;
    padding: 2rem;
}

.card {
    flex: 1 1 300px; /* grow shrink basis */
    background: white;
    border-radius: 8px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    overflow: hidden;
    transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.card:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
}

.card-header {
    padding: 1.5rem;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
}

.card-body {
    padding: 1.5rem;
}

.card-footer {
    padding: 1rem 1.5rem;
    background-color: #f8f9fa;
    border-top: 1px solid #e9ecef;
}
```

### Grid Layout

```css
/* Grid container */
.grid-container {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    grid-gap: 2rem;
    padding: 2rem;
}

/* Grid with named areas */
.layout {
    display: grid;
    grid-template-areas: 
        "header header header"
        "sidebar main main"
        "footer footer footer";
    grid-template-columns: 250px 1fr 1fr;
    grid-template-rows: auto 1fr auto;
    min-height: 100vh;
    gap: 1rem;
}

.header {
    grid-area: header;
    background-color: #3498db;
    color: white;
    padding: 1rem;
    text-align: center;
}

.sidebar {
    grid-area: sidebar;
    background-color: #2c3e50;
    color: white;
    padding: 1rem;
}

.main {
    grid-area: main;
    background-color: #ecf0f1;
    padding: 1rem;
}

.footer {
    grid-area: footer;
    background-color: #34495e;
    color: white;
    padding: 1rem;
    text-align: center;
}

/* Responsive grid */
.responsive-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 1rem;
    padding: 1rem;
}

/* Grid with alignment */
.grid-center {
    display: grid;
    place-items: center;
    min-height: 100vh;
}

/* Grid with automatic spacing */
.grid-auto {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    gap: 1rem;
    padding: 1rem;
}
```

### Responsive Design

```css
/* Mobile First Approach */
.container {
    width: 100%;
    padding: 1rem;
    margin: 0 auto;
}

/* Small devices (landscape phones, 576px and up) */
@media (min-width: 576px) {
    .container {
        max-width: 540px;
    }
}

/* Medium devices (tablets, 768px and up) */
@media (min-width: 768px) {
    .container {
        max-width: 720px;
    }
    
    .nav-menu {
        display: flex;
    }
    
    .nav-toggle {
        display: none;
    }
}

/* Large devices (desktops, 992px and up) */
@media (min-width: 992px) {
    .container {
        max-width: 960px;
    }
}

/* Extra large devices (large desktops, 1200px and up) */
@media (min-width: 1200px) {
    .container {
        max-width: 1140px;
    }
}

/* Responsive navigation */
.nav {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem;
}

.nav-toggle {
    display: block;
    background: none;
    border: none;
    font-size: 1.5rem;
    color: white;
    cursor: pointer;
}

.nav-menu {
    display: none;
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    background-color: #2c3e50;
    flex-direction: column;
    padding: 1rem;
}

.nav-menu.active {
    display: flex;
}

@media (min-width: 768px) {
    .nav-toggle {
        display: none;
    }
    
    .nav-menu {
        display: flex;
        position: static;
        flex-direction: row;
        background: none;
        padding: 0;
    }
}

/* Responsive images */
.responsive-img {
    max-width: 100%;
    height: auto;
    display: block;
}

/* Responsive videos */
.responsive-video {
    position: relative;
    width: 100%;
    height: 0;
    padding-bottom: 56.25%; /* 16:9 aspect ratio */
}

.responsive-video iframe {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
}
```

---

## 🟠 Animations and Transitions

### CSS Transitions

```css
/* Basic transition */
.button {
    background-color: #3498db;
    color: white;
    padding: 12px 24px;
    border: none;
    border-radius: 6px;
    cursor: pointer;
    font-size: 16px;
    transition: all 0.3s ease;
}

.button:hover {
    background-color: #2980b9;
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(52, 152, 219, 0.4);
}

.button:active {
    transform: translateY(0);
    box-shadow: 0 2px 6px rgba(52, 152, 219, 0.4);
}

/* Multiple transitions */
.card {
    background: white;
    border-radius: 8px;
    padding: 20px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    transition: 
        transform 0.3s ease,
        box-shadow 0.3s ease,
        background-color 0.3s ease;
}

.card:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
    background-color: #f8f9fa;
}

/* Transition with delay */
.staggered-item {
    opacity: 0;
    transform: translateY(20px);
    transition: 
        opacity 0.6s ease 0.1s,
        transform 0.6s ease 0.1s;
}

.staggered-item.visible {
    opacity: 1;
    transform: translateY(0);
}

/* Width transition */
.progress-bar {
    width: 0%;
    height: 4px;
    background: linear-gradient(90deg, #3498db, #2ecc71);
    transition: width 2s ease-in-out;
}

.progress-bar.animate {
    width: 100%;
}

/* Color transition */
.theme-toggle {
    background-color: #f8f9fa;
    border: 2px solid #dee2e6;
    border-radius: 50px;
    width: 60px;
    height: 30px;
    position: relative;
    cursor: pointer;
    transition: background-color 0.3s ease;
}

.theme-toggle::before {
    content: '';
    position: absolute;
    top: 2px;
    left: 2px;
    width: 22px;
    height: 22px;
    background-color: white;
    border-radius: 50%;
    transition: transform 0.3s ease;
}

.theme-toggle.active {
    background-color: #3498db;
}

.theme-toggle.active::before {
    transform: translateX(30px);
}
```

### CSS Animations

```css
/* Basic keyframes */
@keyframes fadeIn {
    from {
        opacity: 0;
    }
    to {
        opacity: 1;
    }
}

@keyframes slideInFromLeft {
    from {
        transform: translateX(-100%);
        opacity: 0;
    }
    to {
        transform: translateX(0);
        opacity: 1;
    }
}

@keyframes bounce {
    0%, 20%, 50%, 80%, 100% {
        transform: translateY(0);
    }
    40% {
        transform: translateY(-30px);
    }
    60% {
        transform: translateY(-15px);
    }
}

@keyframes pulse {
    0% {
        transform: scale(1);
    }
    50% {
        transform: scale(1.05);
    }
    100% {
        transform: scale(1);
    }
}

@keyframes spin {
    from {
        transform: rotate(0deg);
    }
    to {
        transform: rotate(360deg);
    }
}

/* Using animations */
.fade-in {
    animation: fadeIn 1s ease-in-out;
}

.slide-in {
    animation: slideInFromLeft 0.8s ease-out;
}

.bounce {
    animation: bounce 2s infinite;
}

.pulse {
    animation: pulse 2s infinite;
}

.spinner {
    animation: spin 1s linear infinite;
}

/* Loading animation */
.loading {
    display: inline-block;
    width: 20px;
    height: 20px;
    border: 3px solid #f3f3f3;
    border-top: 3px solid #3498db;
    border-radius: 50%;
    animation: spin 1s linear infinite;
}

/* Text reveal animation */
.text-reveal {
    overflow: hidden;
}

.text-reveal span {
    display: inline-block;
    animation: slideInFromLeft 0.8s ease-out forwards;
    opacity: 0;
}

.text-reveal span:nth-child(1) { animation-delay: 0.1s; }
.text-reveal span:nth-child(2) { animation-delay: 0.2s; }
.text-reveal span:nth-child(3) { animation-delay: 0.3s; }
.text-reveal span:nth-child(4) { animation-delay: 0.4s; }
.text-reveal span:nth-child(5) { animation-delay: 0.5s; }

/* Hamburger menu animation */
.hamburger {
    width: 30px;
    height: 20px;
    position: relative;
    cursor: pointer;
}

.hamburger span {
    display: block;
    height: 3px;
    width: 100%;
    background-color: #333;
    margin: 5px 0;
    transition: all 0.3s ease;
}

.hamburger.active span:nth-child(1) {
    transform: rotate(45deg) translate(5px, 5px);
}

.hamburger.active span:nth-child(2) {
    opacity: 0;
}

.hamburger.active span:nth-child(3) {
    transform: rotate(-45deg) translate(7px, -6px);
}
```

### Advanced animations

```css
/* Particle animation */
@keyframes float {
    0%, 100% {
        transform: translateY(0px);
    }
    50% {
        transform: translateY(-20px);
    }
}

.particle {
    position: absolute;
    width: 4px;
    height: 4px;
    background-color: #3498db;
    border-radius: 50%;
    animation: float 3s ease-in-out infinite;
}

.particle:nth-child(1) { left: 10%; animation-delay: 0s; }
.particle:nth-child(2) { left: 20%; animation-delay: 0.5s; }
.particle:nth-child(3) { left: 30%; animation-delay: 1s; }
.particle:nth-child(4) { left: 40%; animation-delay: 1.5s; }
.particle:nth-child(5) { left: 50%; animation-delay: 2s; }

/* Typing animation */
@keyframes typing {
    from {
        width: 0;
    }
    to {
        width: 100%;
    }
}

@keyframes blink {
    0%, 50% {
        border-color: transparent;
    }
    51%, 100% {
        border-color: #3498db;
    }
}

.typewriter {
    overflow: hidden;
    border-right: 2px solid #3498db;
    white-space: nowrap;
    animation: 
        typing 3s steps(40, end),
        blink 0.75s step-end infinite;
}

/* Morphing animation */
@keyframes morph {
    0% {
        border-radius: 50%;
        transform: rotate(0deg);
    }
    50% {
        border-radius: 0%;
        transform: rotate(180deg);
    }
    100% {
        border-radius: 50%;
        transform: rotate(360deg);
    }
}

.morphing-shape {
    width: 100px;
    height: 100px;
    background: linear-gradient(45deg, #3498db, #e74c3c);
    animation: morph 4s ease-in-out infinite;
}

/* Glitch animation */
@keyframes glitch {
    0% {
        transform: translate(0);
    }
    20% {
        transform: translate(-2px, 2px);
    }
    40% {
        transform: translate(-2px, -2px);
    }
    60% {
        transform: translate(2px, 2px);
    }
    80% {
        transform: translate(2px, -2px);
    }
    100% {
        transform: translate(0);
    }
}

.glitch-text {
    position: relative;
    color: #3498db;
    font-size: 2rem;
    font-weight: bold;
}

.glitch-text::before,
.glitch-text::after {
    content: attr(data-text);
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
}

.glitch-text::before {
    animation: glitch 0.3s infinite;
    color: #e74c3c;
    z-index: -1;
}

.glitch-text::after {
    animation: glitch 0.3s infinite reverse;
    color: #2ecc71;
    z-index: -2;
}
```

---

## 🔴 Performance and Accessibility

### Performance optimization

```css
/* Using will-change for animations */
.animated-element {
    will-change: transform, opacity;
    transform: translateZ(0); /* Force hardware acceleration */
}

/* Avoid expensive reflows */
.optimized-layout {
    contain: layout style paint;
    content-visibility: auto;
}

/* Lazy loading images */
.lazy-image {
    opacity: 0;
    transition: opacity 0.3s;
}

.lazy-image.loaded {
    opacity: 1;
}

/* Using CSS custom properties for themes */
:root {
    --primary-color: #3498db;
    --secondary-color: #2ecc71;
    --text-color: #2c3e50;
    --bg-color: #ffffff;
    --border-radius: 8px;
    --box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    --transition: all 0.3s ease;
}

[data-theme="dark"] {
    --primary-color: #5dade2;
    --secondary-color: #58d68d;
    --text-color: #ecf0f1;
    --bg-color: #2c3e50;
    --box-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
}

.themed-element {
    background-color: var(--bg-color);
    color: var(--text-color);
    border-radius: var(--border-radius);
    box-shadow: var(--box-shadow);
    transition: var(--transition);
}

/* Font optimization */
@font-face {
    font-family: 'CustomFont';
    src: url('font.woff2') format('woff2'),
         url('font.woff') format('woff');
    font-display: swap; /* Improves font rendering */
    font-weight: 400;
    font-style: normal;
}

/* Using font-display for performance */
.optimized-text {
    font-family: 'CustomFont', Arial, sans-serif;
    font-display: swap;
}

/* CSS Grid with subgrid (limited support) */
.grid-container {
    display: grid;
    grid-template-columns: repeat(12, 1fr);
    gap: 1rem;
}

.grid-item {
    grid-column: span 4;
}

/* Using aspect-ratio for containers */
.aspect-ratio {
    aspect-ratio: 16 / 9;
    background-color: #f8f9fa;
}

/* Container queries (limited support) */
@container (min-width: 300px) {
    .card {
        display: flex;
        flex-direction: row;
    }
}
```

### Advanced accessibility

```css
/* Respect user preferences */
@media (prefers-reduced-motion: reduce) {
    *,
    *::before,
    *::after {
        animation-duration: 0.01ms !important;
        animation-iteration-count: 1 !important;
        transition-duration: 0.01ms !important;
    }
}

/* Automatic dark mode */
@media (prefers-color-scheme: dark) {
    :root {
        --bg-color: #1a1a1a;
        --text-color: #ffffff;
        --border-color: #333333;
    }
}

/* High contrast */
@media (prefers-contrast: high) {
    .button {
        border: 2px solid currentColor;
    }
    
    .link {
        text-decoration: underline;
    }
}

/* Enhanced visible focus */
.focusable:focus {
    outline: 3px solid #3498db;
    outline-offset: 2px;
    border-radius: 4px;
}

.focusable:focus:not(:focus-visible) {
    outline: none;
}

.focusable:focus-visible {
    outline: 3px solid #3498db;
    outline-offset: 2px;
}

/* Skip links for keyboard navigation */
.skip-link {
    position: absolute;
    top: -40px;
    left: 6px;
    background: #000;
    color: #fff;
    padding: 8px;
    text-decoration: none;
    z-index: 1000;
    border-radius: 4px;
}

.skip-link:focus {
    top: 6px;
}

/* Screen reader indicators */
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

/* Form validation states */
.form-field:invalid {
    border-color: #e74c3c;
    box-shadow: 0 0 0 2px rgba(231, 76, 60, 0.2);
}

.form-field:valid {
    border-color: #27ae60;
    box-shadow: 0 0 0 2px rgba(39, 174, 96, 0.2);
}

.form-field:required::after {
    content: " *";
    color: #e74c3c;
}

/* Accessible loading indicators */
.loading-spinner {
    display: inline-block;
    width: 20px;
    height: 20px;
    border: 2px solid #f3f3f3;
    border-top: 2px solid #3498db;
    border-radius: 50%;
    animation: spin 1s linear infinite;
}

.loading-spinner::before {
    content: "Loading in progress";
    position: absolute;
    left: -9999px;
}

/* Respectful animations */
.respectful-animation {
    animation: slideIn 0.5s ease-out;
}

@media (prefers-reduced-motion: reduce) {
    .respectful-animation {
        animation: none;
        opacity: 1;
        transform: none;
    }
}

/* Automatic color contrast */
.auto-contrast {
    background-color: #3498db;
    color: white;
}

@media (prefers-contrast: high) {
    .auto-contrast {
        background-color: #000;
        color: #fff;
        border: 2px solid #fff;
    }
}
```

### Advanced techniques

```css
/* CSS Grid with auto-fit and minmax */
.responsive-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 1rem;
    padding: 1rem;
}

/* Flexbox with gap (modern support) */
.flex-gap {
    display: flex;
    gap: 1rem;
    flex-wrap: wrap;
}

/* CSS Grid with named areas */
.layout {
    display: grid;
    grid-template-areas: 
        "header header header"
        "sidebar main main"
        "footer footer footer";
    grid-template-columns: 200px 1fr 1fr;
    grid-template-rows: auto 1fr auto;
    min-height: 100vh;
    gap: 1rem;
}

/* Using clamp() for responsive typography */
.responsive-text {
    font-size: clamp(1rem, 2.5vw, 2rem);
    line-height: clamp(1.4, 1.5, 1.6);
}

/* CSS Grid with subgrid (experimental) */
.grid-container {
    display: grid;
    grid-template-columns: repeat(12, 1fr);
    gap: 1rem;
}

.grid-item {
    display: grid;
    grid-template-columns: subgrid;
    grid-column: span 4;
}

/* Using aspect-ratio */
.video-container {
    aspect-ratio: 16 / 9;
    background: #000;
}

/* Container queries (experimental) */
@container (min-width: 300px) {
    .card {
        display: flex;
        flex-direction: row;
    }
}

/* CSS Scroll Snap */
.scroll-container {
    scroll-snap-type: y mandatory;
    overflow-y: scroll;
    height: 100vh;
}

.scroll-item {
    scroll-snap-align: start;
    height: 100vh;
}

/* CSS Logical Properties */
.logical-properties {
    margin-inline-start: 1rem;
    margin-inline-end: 1rem;
    padding-block-start: 1rem;
    padding-block-end: 1rem;
    border-inline-start: 2px solid #3498db;
}

/* CSS Custom Properties with fallbacks */
.custom-property {
    background-color: var(--bg-color, #ffffff);
    color: var(--text-color, #000000);
    font-size: var(--font-size, 16px);
}

/* CSS Grid with auto-fit and minmax for cards */
.card-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 2rem;
    padding: 2rem;
}

/* Flexbox with order for reordering */
.flex-reorder {
    display: flex;
    flex-direction: column;
}

.flex-reorder .item-1 { order: 2; }
.flex-reorder .item-2 { order: 1; }
.flex-reorder .item-3 { order: 3; }

@media (min-width: 768px) {
    .flex-reorder {
        flex-direction: row;
    }
    
    .flex-reorder .item-1 { order: 1; }
    .flex-reorder .item-2 { order: 2; }
    .flex-reorder .item-3 { order: 3; }
}
```

---

## ⚫ Advanced CSS and Modern Techniques

### Advanced CSS Custom Properties

```css
/* Design system with CSS Custom Properties */
:root {
    /* Primary colors */
    --color-primary-50: #ebf8ff;
    --color-primary-100: #bee3f8;
    --color-primary-200: #90cdf4;
    --color-primary-300: #63b3ed;
    --color-primary-400: #4299e1;
    --color-primary-500: #3182ce;
    --color-primary-600: #2b77cb;
    --color-primary-700: #2c5282;
    --color-primary-800: #2a4365;
    --color-primary-900: #1a365d;
    
    /* Spacing */
    --space-1: 0.25rem;
    --space-2: 0.5rem;
    --space-3: 0.75rem;
    --space-4: 1rem;
    --space-5: 1.25rem;
    --space-6: 1.5rem;
    --space-8: 2rem;
    --space-10: 2.5rem;
    --space-12: 3rem;
    --space-16: 4rem;
    --space-20: 5rem;
    
    /* Typography */
    --font-size-xs: 0.75rem;
    --font-size-sm: 0.875rem;
    --font-size-base: 1rem;
    --font-size-lg: 1.125rem;
    --font-size-xl: 1.25rem;
    --font-size-2xl: 1.5rem;
    --font-size-3xl: 1.875rem;
    --font-size-4xl: 2.25rem;
    
    /* Shadows */
    --shadow-sm: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
    --shadow-base: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
    --shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
    --shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
    --shadow-xl: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
    
    /* Border radius */
    --radius-sm: 0.125rem;
    --radius-base: 0.25rem;
    --radius-md: 0.375rem;
    --radius-lg: 0.5rem;
    --radius-xl: 0.75rem;
    --radius-2xl: 1rem;
    --radius-full: 9999px;
    
    /* Transitions */
    --transition-fast: 150ms ease;
    --transition-base: 250ms ease;
    --transition-slow: 350ms ease;
    
    /* Z-index */
    --z-dropdown: 1000;
    --z-sticky: 1020;
    --z-fixed: 1030;
    --z-modal-backdrop: 1040;
    --z-modal: 1050;
    --z-popover: 1060;
    --z-tooltip: 1070;
}

/* Dark theme */
[data-theme="dark"] {
    --color-primary-50: #1a365d;
    --color-primary-100: #2a4365;
    --color-primary-200: #2c5282;
    --color-primary-300: #2b77cb;
    --color-primary-400: #3182ce;
    --color-primary-500: #4299e1;
    --color-primary-600: #63b3ed;
    --color-primary-700: #90cdf4;
    --color-primary-800: #bee3f8;
    --color-primary-900: #ebf8ff;
}

/* Using custom properties */
.button {
    background-color: var(--color-primary-500);
    color: white;
    padding: var(--space-3) var(--space-6);
    border-radius: var(--radius-md);
    font-size: var(--font-size-base);
    box-shadow: var(--shadow-base);
    transition: var(--transition-base);
    border: none;
    cursor: pointer;
}

.button:hover {
    background-color: var(--color-primary-600);
    box-shadow: var(--shadow-md);
    transform: translateY(-1px);
}

.button:active {
    transform: translateY(0);
    box-shadow: var(--shadow-sm);
}

/* Grid system with custom properties */
.grid-system {
    --grid-columns: 12;
    --grid-gap: var(--space-6);
    --grid-max-width: 1200px;
    
    display: grid;
    grid-template-columns: repeat(var(--grid-columns), 1fr);
    gap: var(--grid-gap);
    max-width: var(--grid-max-width);
    margin: 0 auto;
    padding: 0 var(--space-4);
}

.col-1 { grid-column: span 1; }
.col-2 { grid-column: span 2; }
.col-3 { grid-column: span 3; }
.col-4 { grid-column: span 4; }
.col-6 { grid-column: span 6; }
.col-12 { grid-column: span 12; }

@media (max-width: 768px) {
    .col-1, .col-2, .col-3, .col-4, .col-6 {
        grid-column: span 12;
    }
}
```

### Advanced CSS Grid

```css
/* Grid with auto-fit and minmax for cards */
.card-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 2rem;
    padding: 2rem;
}

/* Grid with named areas and responsive */
.layout {
    display: grid;
    grid-template-areas: 
        "header header header"
        "sidebar main main"
        "footer footer footer";
    grid-template-columns: 200px 1fr 1fr;
    grid-template-rows: auto 1fr auto;
    min-height: 100vh;
    gap: 1rem;
}

@media (max-width: 768px) {
    .layout {
        grid-template-areas: 
            "header"
            "main"
            "sidebar"
            "footer";
        grid-template-columns: 1fr;
    }
}

/* Grid with subgrid (experimental) */
.grid-container {
    display: grid;
    grid-template-columns: repeat(12, 1fr);
    gap: 1rem;
}

.grid-item {
    display: grid;
    grid-template-columns: subgrid;
    grid-column: span 4;
}

/* Grid with auto-fit and aspect-ratio */
.aspect-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 1rem;
}

.aspect-item {
    aspect-ratio: 16 / 9;
    background: linear-gradient(45deg, #3498db, #2ecc71);
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    font-size: 1.5rem;
    font-weight: bold;
}

/* Grid with masonry (experimental) */
.masonry-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    grid-auto-rows: masonry;
    gap: 1rem;
}

.masonry-item {
    break-inside: avoid;
    background: white;
    border-radius: 8px;
    padding: 1rem;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

/* Grid with auto-fit and minmax for images */
.image-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 1rem;
    padding: 1rem;
}

.image-item {
    aspect-ratio: 1;
    overflow: hidden;
    border-radius: 8px;
    position: relative;
}

.image-item img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.3s ease;
}

.image-item:hover img {
    transform: scale(1.05);
}
```

### CSS Container Queries (experimental)

```css
/* Container queries for components */
.card-container {
    container-type: inline-size;
    container-name: card;
}

@container card (min-width: 300px) {
    .card {
        display: flex;
        flex-direction: row;
    }
    
    .card-image {
        width: 40%;
    }
    
    .card-content {
        width: 60%;
        padding: 1rem;
    }
}

@container card (max-width: 299px) {
    .card {
        display: flex;
        flex-direction: column;
    }
    
    .card-image {
        width: 100%;
    }
    
    .card-content {
        width: 100%;
        padding: 1rem;
    }
}

/* Container queries with multiple containers */
.sidebar {
    container-type: inline-size;
    container-name: sidebar;
}

.main-content {
    container-type: inline-size;
    container-name: main;
}

@container sidebar (min-width: 200px) {
    .sidebar-content {
        display: block;
    }
}

@container main (min-width: 600px) {
    .main-content {
        display: grid;
        grid-template-columns: 2fr 1fr;
        gap: 2rem;
    }
}
```

### CSS Scroll Snap

```css
/* Horizontal scroll snap */
.horizontal-scroll {
    display: flex;
    overflow-x: auto;
    scroll-snap-type: x mandatory;
    scroll-behavior: smooth;
    gap: 1rem;
    padding: 1rem;
}

.horizontal-scroll-item {
    flex: 0 0 300px;
    scroll-snap-align: start;
    background: white;
    border-radius: 8px;
    padding: 1rem;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

/* Vertical scroll snap */
.vertical-scroll {
    height: 100vh;
    overflow-y: auto;
    scroll-snap-type: y mandatory;
    scroll-behavior: smooth;
}

.vertical-scroll-section {
    height: 100vh;
    scroll-snap-align: start;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 2rem;
    font-weight: bold;
}

/* Scroll snap with grid */
.grid-scroll {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 1rem;
    overflow: auto;
    scroll-snap-type: both mandatory;
    height: 100vh;
    padding: 1rem;
}

.grid-scroll-item {
    scroll-snap-align: start;
    background: white;
    border-radius: 8px;
    padding: 1rem;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}
```

---

## 📚 Resources

### Official Documentation
- [MDN CSS](https://developer.mozilla.org/en-US/docs/Web/CSS)
- [W3C CSS Specifications](https://www.w3.org/Style/CSS/)
- [CSS Working Group](https://www.w3.org/Style/CSS/current-work)

### Accessibility
- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [WebAIM CSS](https://webaim.org/articles/css/)
- [A11y Project](https://www.a11yproject.com/)

### Tools and validation
- [CSS Validator](https://jigsaw.w3.org/css-validator/)
- [Autoprefixer](https://autoprefixer.github.io/)
- [Can I Use](https://caniuse.com/)

### Learning
- [CSS Tricks](https://css-tricks.com/)
- [CSS Grid Garden](https://cssgridgarden.com/)
- [Flexbox Froggy](https://flexboxfroggy.com/)

---

*Last updated: January 2024*



<div align="center">

[![Retour au Profil](https://img.shields.io/badge/ðŸ _Retour_au_Profil-000000?style=for-the-badge&logo=github&logoColor=white)](../../../../../../../../README.md)

</div>

