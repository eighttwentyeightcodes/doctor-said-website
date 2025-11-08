# Design System Quick Reference Guide

## 🎨 Color Palette

### Primary Colors (Acıbadem Navy Theme)
```css
--primary-color: #002D74;      /* Main brand navy */
--primary-dark: #001F4D;       /* Darker navy for hovers */
--secondary-color: #0D5C91;    /* Mid-tone navy */
--accent-color: #002D74;       /* CTA buttons */
--wine-red-light: #4F86C6;     /* Light blue accents */
```

### Text Colors
```css
--dark-color: #334155;         /* Headings (slate gray) */
--text-color: #475569;         /* Body text (medium slate) */
--muted-text: #64748b;         /* Secondary text */
--white-text: #ffffff;         /* Text on dark backgrounds */
```

### Background Colors
```css
--light-color: #ffffff;        /* Pure white */
--light-gray: #f8fafc;         /* Section backgrounds */
--border-color: #e2e8f0;       /* Borders and dividers */
```

---

## ✍️ Typography

### Font Families
```css
/* Elegant serif for headings and names */
--font-family-elegant: 'Playfair Display', Georgia, serif;

/* Calligraphy for titles and subtitles */
--font-family-calligraphy: 'Cormorant Garamond', Georgia, serif;

/* Sans-serif for body text */
--font-family-headings: 'Poppins', sans-serif;
--font-family-body: 'Inter', sans-serif;
```

### Usage Guidelines

#### Doctor Names & Main Titles
```css
font-family: var(--font-family-elegant);
font-weight: 700;
letter-spacing: -0.02em;
```

#### Subtitles & Professional Titles
```css
font-family: var(--font-family-calligraphy);
font-style: italic;
font-weight: 600;
letter-spacing: 0.02em;
```

#### Section Headings
```css
font-family: var(--font-family-elegant);
font-weight: 700;
letter-spacing: -0.01em;
```

#### Body Text
```css
font-family: var(--font-family-body);
font-size: 1.1rem;
line-height: 1.8;
color: var(--text-color);
```

---

## 📐 Spacing System

### Standard Spacing Scale
```css
--spacing-1: 0.25rem;   /* 4px */
--spacing-2: 0.5rem;    /* 8px */
--spacing-3: 0.75rem;   /* 12px */
--spacing-4: 1rem;      /* 16px */
--spacing-6: 1.5rem;    /* 24px */
--spacing-8: 2rem;      /* 32px */
--spacing-12: 3rem;     /* 48px */
--spacing-16: 4rem;     /* 64px */
```

### Section Padding
- **Desktop**: `4rem 0` (64px top/bottom)
- **Tablet**: `3rem 0` (48px top/bottom)
- **Mobile**: `2rem 0` (32px top/bottom)

---

## 🎭 Visual Effects

### Shadows
```css
/* Light shadow for cards */
box-shadow: 0 2px 12px rgba(0, 45, 116, 0.08);

/* Medium shadow for elevated elements */
box-shadow: 0 4px 20px rgba(0, 45, 116, 0.12);

/* Strong shadow for important CTAs */
box-shadow: 0 8px 32px rgba(0, 45, 116, 0.25);

/* Hover elevation */
box-shadow: 0 6px 20px rgba(0, 45, 116, 0.15);
```

### Border Radius
```css
--border-radius-sm: 8px;      /* Small elements */
--border-radius-md: 12px;     /* Cards */
--border-radius-lg: 16px;     /* Large cards */
--border-radius-xl: 24px;     /* Images */
--border-radius-full: 50px;   /* Pills/badges */
```

### Transitions
```css
/* Standard transition */
transition: all 0.3s ease;

/* Smooth transform */
transition: transform 0.5s cubic-bezier(0.4, 0, 0.2, 1);

/* Fast interaction */
transition: all 0.2s ease;
```

---

## 🖼️ Component Patterns

### Hero Section
```css
.hero h1 {
    font-family: var(--font-family-elegant);
    font-size: clamp(2.5rem, 5vw, 3.5rem);
    color: var(--dark-color);
    letter-spacing: -0.02em;
}
```

### Service Cards
```css
.service-card {
    background: white;
    border-radius: 16px;
    padding: 2.5rem;
    box-shadow: 0 4px 20px rgba(0, 45, 116, 0.12);
    transition: all 0.3s ease;
}

.service-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 32px rgba(0, 45, 116, 0.2);
}
```

### Buttons
```css
/* Primary CTA */
.btn-primary {
    background: var(--primary-color);
    color: var(--white-text);
    padding: 1rem 2rem;
    border-radius: 50px;
    box-shadow: 0 4px 15px rgba(0, 45, 116, 0.3);
}

.btn-primary:hover {
    background: var(--primary-dark);
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(0, 45, 116, 0.4);
}
```

### Achievement Badges
```css
.achievement-item {
    display: flex;
    align-items: center;
    gap: 1rem;
    padding: 1.25rem;
    background: linear-gradient(135deg, 
        rgba(0, 45, 116, 0.05), 
        rgba(0, 45, 116, 0.02));
    border-radius: 12px;
    border-left: 4px solid var(--primary-color);
}
```

---

## 📱 Responsive Breakpoints

```css
/* Large Desktop */
@media (min-width: 1200px) { }

/* Desktop */
@media (max-width: 1200px) { }

/* Tablet */
@media (max-width: 1024px) {
    /* Single column layouts */
    /* Adjusted font sizes */
}

/* Mobile */
@media (max-width: 768px) {
    /* Stacked layouts */
    /* Full-width elements */
    /* Larger touch targets */
}

/* Small Mobile */
@media (max-width: 480px) {
    /* Minimal padding */
    /* Simplified navigation */
}
```

---

## 🎯 Best Practices

### DO ✅
- Use elegant fonts for doctor names and titles
- Apply navy theme consistently
- Add hover effects to interactive elements
- Use semantic HTML
- Maintain proper heading hierarchy
- Test on multiple devices
- Optimize images before upload

### DON'T ❌
- Use pure black (#000000)
- Mix too many font families
- Overuse animations
- Ignore accessibility
- Skip responsive testing
- Use inline styles
- Forget alt text on images

---

## 🔧 Common Modifications

### Change Primary Color
```css
:root {
    --primary-color: #YOUR_COLOR;
    --primary-dark: #DARKER_SHADE;
}
```

### Adjust Font Sizes
```css
.hero h1 {
    font-size: clamp(MIN, PREFERRED, MAX);
}
```

### Modify Spacing
```css
.section {
    padding: var(--spacing-16) 0;
}
```

### Update Shadow Intensity
```css
.card {
    box-shadow: 0 Xpx Ypx rgba(0, 45, 116, ALPHA);
}
```

---

## 📚 Resources

### Fonts
- [Playfair Display](https://fonts.google.com/specimen/Playfair+Display)
- [Cormorant Garamond](https://fonts.google.com/specimen/Cormorant+Garamond)
- [Poppins](https://fonts.google.com/specimen/Poppins)
- [Inter](https://fonts.google.com/specimen/Inter)

### Tools
- [Color Contrast Checker](https://webaim.org/resources/contrastchecker/)
- [Google Fonts](https://fonts.google.com/)
- [Can I Use](https://caniuse.com/)

### Documentation
- Main styles: `style.css`
- Enhancements: `style-enhancements.css`
- Updates summary: `DESIGN_UPDATES_SUMMARY.md`

---

**Quick Start:**
1. Use `var(--primary-color)` for brand elements
2. Apply `font-family: var(--font-family-elegant)` to names
3. Add `font-family: var(--font-family-calligraphy)` to subtitles
4. Use navy-tinted shadows: `rgba(0, 45, 116, alpha)`
5. Test responsiveness at 1024px, 768px, and 480px

---

**Version:** 2.0  
**Last Updated:** November 6, 2025
