# ⚡ Tailwind CSS - Complete Guide

> **Tailwind CSS** is a utility-first CSS framework that allows you to quickly create custom interfaces by composing utility classes directly in HTML.

## 📋 Table of Contents
- [🎯 Reference Tables](#-complete-tailwind-css-reference-tables)
- [🚀 Introduction](#-introduction)
- [🟢 Installation and Basic Classes](#-beginner---installation-and-basic-classes)
- [🟡 Layout and Responsive](#-intermediate---layout-and-responsive)
- [🟠 Customization and Components](#-advanced---customization-and-components)
- [🔴 Optimization and Production](#-senior---optimization-and-production)
- [⚫ Plugins and Architecture](#-expert---plugins-and-architecture)
- [📚 Resources](#-resources)

---

## 🎯 Complete Tailwind CSS Reference Tables

### 🎯 Spacing

| Class | Value | Usage | Example |
|-------|-------|-------|---------|
| **`m-0`** | 0px | No margin | `<div class="m-0">` |
| **`m-1`** | 0.25rem (4px) | Small margin | `<div class="m-1">` |
| **`m-2`** | 0.5rem (8px) | Normal margin | `<div class="m-2">` |
| **`m-4`** | 1rem (16px) | Medium margin | `<div class="m-4">` |
| **`m-8`** | 2rem (32px) | Large margin | `<div class="m-8">` |
| **`p-0`** | 0px | No padding | `<div class="p-0">` |
| **`p-1`** | 0.25rem (4px) | Small padding | `<div class="p-1">` |
| **`p-4`** | 1rem (16px) | Medium padding | `<div class="p-4">` |
| **`px-4`** | 1rem horizontal | Horizontal padding | `<div class="px-4">` |
| **`py-2`** | 0.5rem vertical | Vertical padding | `<div class="py-2">` |
| **`mt-4`** | 1rem top | Top margin | `<div class="mt-4">` |
| **`mb-2`** | 0.5rem bottom | Bottom margin | `<div class="mb-2">` |
| **`ml-auto`** | auto left | Right alignment | `<div class="ml-auto">` |
| **`-m-4`** | -1rem | Negative margin | `<div class="-m-4">` |

### 🎯 Colors

| Class | Description | Usage | Example |
|-------|-------------|-------|---------|
| **`text-blue-500`** | Blue text | Text color | `<p class="text-blue-500">` |
| **`bg-red-500`** | Red background | Background color | `<div class="bg-red-500">` |
| **`border-green-500`** | Green border | Border color | `<div class="border-green-500">` |
| **`text-gray-900`** | Dark gray text | Dark text | `<p class="text-gray-900">` |
| **`bg-white`** | White background | Light background | `<div class="bg-white">` |
| **`bg-black`** | Black background | Dark background | `<div class="bg-black">` |
| **`text-transparent`** | Transparent text | Gradient effects | `<span class="text-transparent">` |
| **`bg-gradient-to-r`** | Horizontal gradient | Gradients | `<div class="bg-gradient-to-r from-blue-500 to-purple-500">` |

### 🎯 Typography

| Class | Value | Usage | Example |
|-------|-------|-------|---------|
| **`text-xs`** | 0.75rem (12px) | Very small text | `<p class="text-xs">` |
| **`text-sm`** | 0.875rem (14px) | Small text | `<p class="text-sm">` |
| **`text-base`** | 1rem (16px) | Normal text | `<p class="text-base">` |
| **`text-lg`** | 1.125rem (18px) | Large text | `<p class="text-lg">` |
| **`text-xl`** | 1.25rem (20px) | Very large text | `<p class="text-xl">` |
| **`text-2xl`** | 1.5rem (24px) | Medium title | `<h2 class="text-2xl">` |
| **`text-4xl`** | 2.25rem (36px) | Large title | `<h1 class="text-4xl">` |
| **`font-thin`** | 100 | Thin font | `<p class="font-thin">` |
| **`font-normal`** | 400 | Normal font | `<p class="font-normal">` |
| **`font-bold`** | 700 | Bold font | `<p class="font-bold">` |
| **`italic`** | italic | Italic | `<em class="italic">` |
| **`tracking-tight`** | -0.025em | Tight spacing | `<p class="tracking-tight">` |
| **`leading-tight`** | 1.25 | Tight line height | `<p class="leading-tight">` |
| **`text-center`** | center | Centered text | `<p class="text-center">` |
| **`text-left`** | left | Left-aligned text | `<p class="text-left">` |
| **`text-right`** | right | Right-aligned text | `<p class="text-right">` |
| **`uppercase`** | uppercase | Uppercase | `<p class="uppercase">` |
| **`lowercase`** | lowercase | Lowercase | `<p class="lowercase">` |
| **`capitalize`** | capitalize | First uppercase | `<p class="capitalize">` |

### 🎯 Layout

| Class | Description | Usage | Example |
|-------|-------------|-------|---------|
| **`container`** | Responsive container | Main container | `<div class="container mx-auto">` |
| **`flex`** | Flexbox | Flexible layout | `<div class="flex">` |
| **`grid`** | CSS Grid | CSS grid | `<div class="grid">` |
| **`block`** | Display block | Block element | `<div class="block">` |
| **`inline-block`** | Display inline-block | Inline-block element | `<span class="inline-block">` |
| **`hidden`** | Display none | Hide | `<div class="hidden">` |
| **`w-full`** | width: 100% | Full width | `<div class="w-full">` |
| **`h-screen`** | height: 100vh | Screen height | `<div class="h-screen">` |
| **`max-w-md`** | max-width: 28rem | Medium max width | `<div class="max-w-md">` |
| **`min-h-screen`** | min-height: 100vh | Min screen height | `<div class="min-h-screen">` |

### 🎯 Flexbox

| Class | Description | Usage | Example |
|-------|-------------|-------|---------|
| **`flex-row`** | flex-direction: row | Horizontal direction | `<div class="flex flex-row">` |
| **`flex-col`** | flex-direction: column | Vertical direction | `<div class="flex flex-col">` |
| **`justify-start`** | justify-content: flex-start | Horizontal start | `<div class="flex justify-start">` |
| **`justify-center`** | justify-content: center | Horizontal center | `<div class="flex justify-center">` |
| **`justify-between`** | justify-content: space-between | Space between | `<div class="flex justify-between">` |
| **`items-start`** | align-items: flex-start | Vertical start | `<div class="flex items-start">` |
| **`items-center`** | align-items: center | Vertical center | `<div class="flex items-center">` |
| **`flex-wrap`** | flex-wrap: wrap | Wrap | `<div class="flex flex-wrap">` |
| **`gap-4`** | gap: 1rem | Spacing between elements | `<div class="flex gap-4">` |

### 🎯 Grid

| Class | Description | Usage | Example |
|-------|-------------|-------|---------|
| **`grid-cols-1`** | 1 column | 1 column grid | `<div class="grid grid-cols-1">` |
| **`grid-cols-2`** | 2 columns | 2 column grid | `<div class="grid grid-cols-2">` |
| **`grid-cols-3`** | 3 columns | 3 column grid | `<div class="grid grid-cols-3">` |
| **`grid-cols-4`** | 4 columns | 4 column grid | `<div class="grid grid-cols-4">` |
| **`col-span-2`** | Span 2 columns | Element spanning 2 columns | `<div class="col-span-2">` |
| **`gap-4`** | gap: 1rem | Grid spacing | `<div class="grid gap-4">` |

### 🎯 Positioning

| Class | Description | Usage | Example |
|-------|-------------|-------|---------|
| **`static`** | position: static | Normal position | `<div class="static">` |
| **`relative`** | position: relative | Relative position | `<div class="relative">` |
| **`absolute`** | position: absolute | Absolute position | `<div class="absolute">` |
| **`fixed`** | position: fixed | Fixed position | `<div class="fixed">` |
| **`sticky`** | position: sticky | Sticky position | `<div class="sticky">` |
| **`top-0`** | top: 0 | Top position | `<div class="absolute top-0">` |
| **`right-0`** | right: 0 | Right position | `<div class="absolute right-0">` |
| **`inset-0`** | top/right/bottom/left: 0 | All positions 0 | `<div class="absolute inset-0">` |
| **`z-10`** | z-index: 10 | Stacking index | `<div class="z-10">` |

### 🎯 Borders

| Class | Description | Usage | Example |
|-------|-------------|-------|---------|
| **`border`** | border: 1px solid | Simple border | `<div class="border">` |
| **`border-2`** | border: 2px solid | Thick border | `<div class="border-2">` |
| **`border-t`** | border-top: 1px | Top border | `<div class="border-t">` |
| **`border-r`** | border-right: 1px | Right border | `<div class="border-r">` |
| **`border-gray-300`** | Gray color | Gray border | `<div class="border border-gray-300">` |
| **`rounded`** | border-radius: 0.25rem | Rounded corners | `<div class="rounded">` |
| **`rounded-lg`** | border-radius: 0.5rem | Very rounded corners | `<div class="rounded-lg">` |
| **`rounded-full`** | border-radius: 9999px | Circle | `<div class="rounded-full">` |

### 🎯 Effects

| Class | Description | Usage | Example |
|-------|-------------|-------|---------|
| **`shadow`** | box-shadow | Light shadow | `<div class="shadow">` |
| **`shadow-lg`** | Large box-shadow | Large shadow | `<div class="shadow-lg">` |
| **`opacity-50`** | opacity: 0.5 | Semi-transparent | `<div class="opacity-50">` |
| **`hover:shadow-lg`** | Shadow on hover | Hover effect | `<div class="hover:shadow-lg">` |

### 🎯 Responsive Design

| Prefix | Breakpoint | Usage | Example |
|--------|------------|-------|---------|
| **`sm:`** | 640px | Small screens | `<div class="sm:text-xl">` |
| **`md:`** | 768px | Medium screens | `<div class="md:flex">` |
| **`lg:`** | 1024px | Large screens | `<div class="lg:grid-cols-4">` |
| **`xl:`** | 1280px | Very large screens | `<div class="xl:w-1/2">` |
| **`2xl:`** | 1536px | Extra wide screens | `<div class="2xl:container">` |

---

## 🚀 Introduction

Tailwind CSS is a utility-first CSS framework that transforms the way you develop web interfaces by providing predefined classes to quickly build custom designs.

### What is Tailwind CSS?
Tailwind CSS is a CSS framework that provides low-level utility classes for building custom interfaces directly in HTML, without writing custom CSS.

### Why choose Tailwind CSS?
- **⚡ Speed**: Ultra-fast development
- **🎨 Flexibility**: Complete customization
- **📦 Optimized size**: Built-in PurgeCSS
- **♿ Accessibility**: Classes for accessibility
- **📱 Responsive**: Mobile-first design
- **🔧 Extensible**: Custom plugins and themes
- **🚀 Performance**: Automatic optimizations
- **💪 Maintainability**: Design consistency

### Best Practices
- **Reusable components**: Create components to avoid duplication
- **Custom classes**: Use `@apply` for repetitions
- **Design system**: Configure colors and spacing in `tailwind.config.js`
- **PurgeCSS**: Enable purge in production
- **Accessibility**: Use `sr-only` and ARIA classes

---

## 🟢 Installation and Basic Classes

### Installation with NPM

```bash
# Initialize a Node.js project
npm init -y

# Install Tailwind CSS
npm install -D tailwindcss postcss autoprefixer

# Create configuration file
npx tailwindcss init
```

### Basic configuration

```javascript
// tailwind.config.js
module.exports = {
  content: [
    "./src/**/*.{html,js,jsx,ts,tsx}",
    "./public/**/*.html"
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
```

```css
/* styles.css */
@tailwind base;
@tailwind components;
@tailwind utilities;
```

### Basic example

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Tailwind CSS - Example</title>
    <link href="output.css" rel="stylesheet">
</head>
<body class="bg-gray-100">
    <!-- Header -->
    <header class="bg-white shadow">
        <div class="container mx-auto px-4 py-6">
            <h1 class="text-3xl font-bold text-gray-900">My Website</h1>
        </div>
    </header>
    
    <!-- Main Content -->
    <main class="container mx-auto px-4 py-8">
        <!-- Card -->
        <div class="bg-white rounded-lg shadow-md p-6 mb-4">
            <h2 class="text-2xl font-semibold text-gray-800 mb-4">Welcome</h2>
            <p class="text-gray-600 leading-relaxed">
                This is an example card created with Tailwind CSS.
                Utility classes allow for quick styling.
            </p>
        </div>
        
        <!-- Button -->
        <button class="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
            Click me
        </button>
    </main>
</body>
</html>
```

---

## 🟡 Layout and Responsive

### Responsive Navigation

```html
<nav class="bg-gray-800">
    <div class="container mx-auto px-4">
        <div class="flex justify-between items-center py-4">
            <!-- Logo -->
            <div class="text-white text-xl font-bold">
                Logo
            </div>
            
            <!-- Desktop Menu -->
            <div class="hidden md:flex space-x-6">
                <a href="#" class="text-gray-300 hover:text-white transition">Home</a>
                <a href="#" class="text-gray-300 hover:text-white transition">Services</a>
                <a href="#" class="text-gray-300 hover:text-white transition">Contact</a>
            </div>
            
            <!-- Mobile Menu Button -->
            <button class="md:hidden text-white">
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
                </svg>
            </button>
        </div>
        
        <!-- Mobile Menu -->
        <div class="md:hidden pb-4">
            <a href="#" class="block text-gray-300 hover:text-white py-2">Home</a>
            <a href="#" class="block text-gray-300 hover:text-white py-2">Services</a>
            <a href="#" class="block text-gray-300 hover:text-white py-2">Contact</a>
        </div>
    </div>
</nav>
```

### Responsive Grid

```html
<div class="container mx-auto px-4 py-8">
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <!-- Card 1 -->
        <div class="bg-white rounded-lg shadow-md overflow-hidden">
            <img src="image1.jpg" alt="Image" class="w-full h-48 object-cover">
            <div class="p-6">
                <h3 class="text-xl font-semibold mb-2">Title 1</h3>
                <p class="text-gray-600">Card description</p>
            </div>
        </div>
        
        <!-- Card 2 -->
        <div class="bg-white rounded-lg shadow-md overflow-hidden">
            <img src="image2.jpg" alt="Image" class="w-full h-48 object-cover">
            <div class="p-6">
                <h3 class="text-xl font-semibold mb-2">Title 2</h3>
                <p class="text-gray-600">Card description</p>
            </div>
        </div>
        
        <!-- Card 3 -->
        <div class="bg-white rounded-lg shadow-md overflow-hidden">
            <img src="image3.jpg" alt="Image" class="w-full h-48 object-cover">
            <div class="p-6">
                <h3 class="text-xl font-semibold mb-2">Title 3</h3>
                <p class="text-gray-600">Card description</p>
            </div>
        </div>
    </div>
</div>
```

### Accessible Form

```html
<form class="max-w-lg mx-auto bg-white p-8 rounded-lg shadow-md">
    <!-- Name -->
    <div class="mb-4">
        <label for="name" class="block text-gray-700 font-semibold mb-2">
            Name *
        </label>
        <input 
            type="text" 
            id="name" 
            name="name" 
            required
            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            aria-describedby="name-help">
        <p id="name-help" class="mt-1 text-sm text-gray-500">
            Your full name
        </p>
    </div>
    
    <!-- Email -->
    <div class="mb-4">
        <label for="email" class="block text-gray-700 font-semibold mb-2">
            Email *
        </label>
        <input 
            type="email" 
            id="email" 
            name="email" 
            required
            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
    </div>
    
    <!-- Message -->
    <div class="mb-6">
        <label for="message" class="block text-gray-700 font-semibold mb-2">
            Message
        </label>
        <textarea 
            id="message" 
            name="message" 
            rows="4"
            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"></textarea>
    </div>
    
    <!-- Button -->
    <button 
        type="submit"
        class="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg transition duration-200">
        Send
    </button>
</form>
```

---

## 🟠 Customization and Components

### Advanced Configuration

```javascript
// tailwind.config.js
module.exports = {
  content: [
    "./src/**/*.{html,js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#eff6ff',
          100: '#dbeafe',
          500: '#3b82f6',
          900: '#1e3a8a',
        },
        secondary: '#64748b',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        heading: ['Poppins', 'sans-serif'],
      },
      spacing: {
        '128': '32rem',
        '144': '36rem',
      },
      borderRadius: {
        '4xl': '2rem',
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
  ],
}
```

### Using @apply

```css
/* styles.css */
@layer components {
  .btn {
    @apply px-4 py-2 rounded font-semibold transition duration-200;
  }
  
  .btn-primary {
    @apply btn bg-blue-500 text-white hover:bg-blue-600;
  }
  
  .btn-secondary {
    @apply btn bg-gray-500 text-white hover:bg-gray-600;
  }
  
  .card {
    @apply bg-white rounded-lg shadow-md p-6;
  }
  
  .input-field {
    @apply w-full px-4 py-2 border border-gray-300 rounded-lg 
           focus:outline-none focus:ring-2 focus:ring-blue-500;
  }
}
```

---

## 🔴 Optimization and Production

### Production Configuration

```javascript
// tailwind.config.js
module.exports = {
  content: [
    "./src/**/*.{html,js,jsx,ts,tsx}",
  ],
  safelist: [
    'bg-red-500',
    'text-3xl',
    'lg:text-4xl',
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
```

### PostCSS Configuration

```javascript
// postcss.config.js
module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
    ...(process.env.NODE_ENV === 'production' ? { cssnano: {} } : {})
  }
}
```

---

## ⚫ Plugins and Architecture

### Custom Plugin

```javascript
// tailwind.config.js
const plugin = require('tailwindcss/plugin')

module.exports = {
  plugins: [
    plugin(function({ addUtilities, addComponents, e, config }) {
      // Add custom utilities
      addUtilities({
        '.rotate-135': {
          transform: 'rotate(135deg)',
        },
      })
      
      // Add custom components
      addComponents({
        '.btn-custom': {
          padding: '.5rem 1rem',
          borderRadius: '.25rem',
          fontWeight: '600',
        }
      })
    })
  ]
}
```

---

## 📚 Resources

### Official Documentation
- [Tailwind CSS](https://tailwindcss.com/)
- [Tailwind UI](https://tailwindui.com/)
- [Headless UI](https://headlessui.com/)

### Tools
- [Tailwind CSS IntelliSense](https://marketplace.visualstudio.com/items?itemName=bradlc.vscode-tailwindcss)
- [Play CDN](https://tailwindcss.com/docs/installation/play-cdn)

### Community
- [Tailwind Components](https://tailwindcomponents.com/)
- [Tailwind Toolbox](https://www.tailwindtoolbox.com/)

---

*Last updated: January 2024*
