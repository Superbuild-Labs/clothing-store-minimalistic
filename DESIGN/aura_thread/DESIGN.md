---
name: Aura & Thread
colors:
  surface: '#faf9f6'
  surface-dim: '#dbdad7'
  surface-bright: '#faf9f6'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f4f3f1'
  surface-container: '#efeeeb'
  surface-container-high: '#e9e8e5'
  surface-container-highest: '#e3e2e0'
  on-surface: '#1a1c1a'
  on-surface-variant: '#4f4445'
  inverse-surface: '#2f312f'
  inverse-on-surface: '#f2f1ee'
  outline: '#807475'
  outline-variant: '#d2c3c4'
  surface-tint: '#70585b'
  primary: '#70585b'
  on-primary: '#ffffff'
  primary-container: '#fadadd'
  on-primary-container: '#765e61'
  inverse-primary: '#debfc2'
  secondary: '#655d58'
  on-secondary: '#ffffff'
  secondary-container: '#ece0d9'
  on-secondary-container: '#6b635d'
  tertiary: '#735a36'
  on-tertiary: '#ffffff'
  tertiary-container: '#ffdcae'
  on-tertiary-container: '#79603a'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#fbdbde'
  primary-fixed-dim: '#debfc2'
  on-primary-fixed: '#281719'
  on-primary-fixed-variant: '#574144'
  secondary-fixed: '#ece0d9'
  secondary-fixed-dim: '#cfc4be'
  on-secondary-fixed: '#201a16'
  on-secondary-fixed-variant: '#4d4540'
  tertiary-fixed: '#ffddb0'
  tertiary-fixed-dim: '#e2c195'
  on-tertiary-fixed: '#281800'
  on-tertiary-fixed-variant: '#594320'
  background: '#faf9f6'
  on-background: '#1a1c1a'
  surface-variant: '#e3e2e0'
typography:
  display-lg:
    fontFamily: Noto Serif
    fontSize: 48px
    fontWeight: '400'
    lineHeight: '1.1'
    letterSpacing: -0.02em
  headline-md:
    fontFamily: Noto Serif
    fontSize: 32px
    fontWeight: '400'
    lineHeight: '1.2'
    letterSpacing: -0.01em
  headline-sm:
    fontFamily: Noto Serif
    fontSize: 24px
    fontWeight: '400'
    lineHeight: '1.3'
    letterSpacing: '0'
  body-lg:
    fontFamily: Manrope
    fontSize: 18px
    fontWeight: '400'
    lineHeight: '1.6'
    letterSpacing: '0'
  body-md:
    fontFamily: Manrope
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.5'
    letterSpacing: '0'
  body-sm:
    fontFamily: Manrope
    fontSize: 14px
    fontWeight: '400'
    lineHeight: '1.5'
    letterSpacing: 0.01em
  label-caps:
    fontFamily: Manrope
    fontSize: 12px
    fontWeight: '600'
    lineHeight: '1.2'
    letterSpacing: 0.1em
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  unit: 4px
  xs: 4px
  sm: 8px
  md: 16px
  lg: 24px
  xl: 48px
  xxl: 80px
  container-max: 1280px
  gutter: 24px
---

## Brand & Style

This design system is built upon the principles of **Editorial Minimalism**. It is designed to evoke a sense of quiet confidence, exclusivity, and tactile softness. The target audience values slow fashion, artisanal quality, and a "less is more" lifestyle.

The UI should feel like a high-end physical lookbook. We utilize expansive whitespace to allow product photography to breathe, creating a calm, unhurried browsing experience. The visual language avoids digital-native trends like heavy blurs or aggressive shadows, opting instead for a flat, layered aesthetic that relies on color blocks and fine-line detailing. Every interaction should feel intentional and graceful.

## Colors

The palette is rooted in soft, skin-tone adjacent neutrals that create a warm, inviting atmosphere. 

- **Off-white (#FAF9F6)** serves as the primary canvas for all backgrounds to reduce eye strain and provide a premium feel compared to pure white.
- **Warm Beige (#F5E9E2)** is used for structural sections, containers, and secondary backgrounds to create subtle depth.
- **Peach (#FADADD)** acts as our soft highlight, used for gentle call-outs or decorative elements.
- **Muted Gold (#C8A97E)** is reserved for high-value accents, iconography, and subtle borders to signify luxury.
- **Soft Charcoal (#2F2F2F)** provides necessary legibility for typography and high-contrast UI elements, used sparingly to maintain the "soft" aesthetic.

## Typography

The typography strategy relies on the contrast between the timeless, literary feel of **Noto Serif** and the modern, architectural precision of **Manrope**.

- **Headlines:** Use Noto Serif for all high-level headers. It should feel authoritative but gentle.
- **Body:** Use Manrope for general reading. Its balanced proportions ensure clarity even at small sizes.
- **Letter Spacing:** Headlines benefit from slight tightening to feel cohesive, while labels and small caps utilize generous tracking to imply luxury and airiness.

## Layout & Spacing

This design system uses a **Fixed Grid** approach for desktop (12 columns) and a fluid layout for mobile. 

The rhythm is dictated by "Generous Whitespace." Do not be afraid of large gaps; they represent the physical space of a luxury boutique. Vertical spacing between sections should lean towards the `xxl` (80px) range to clearly delineate editorial content. Grids should use wide gutters to maintain the "airy" feel.

## Elevation & Depth

We avoid traditional drop shadows to maintain a clean, editorial aesthetic. Depth is instead achieved through:

1.  **Tonal Layering:** Using Warm Beige surfaces on top of Off-white backgrounds.
2.  **Fine Outlines:** 1px borders in Muted Gold or very light gray (#E5E5E5) to define boundaries without adding visual weight.
3.  **Flat Stacking:** Elements like cards do not "float." They sit flat on the surface, distinguished only by color change or a hairline stroke.
4.  **Selective Dimming:** Overlays should use a very low opacity Charcoal to maintain visibility of the underlying content.

## Shapes

The shape language is sophisticated and restrained. While sharp corners feel too aggressive for "soft elegance," overly rounded corners feel too "tech-friendly." 

A **Soft (0.25rem)** radius is the standard for buttons and input fields. This provides a subtle "human" touch to the geometric layout while maintaining the crispness of a printed fashion magazine.

## Components

- **Buttons:** Primary buttons use a Soft Charcoal background with Off-white text. Secondary buttons are outlined with 1px Muted Gold. Hover states should involve a gentle color shift rather than a shadow.
- **Input Fields:** Minimalist design—bottom-only borders or very light full-box strokes. Labels use the `label-caps` style for a professional look.
- **Thin Line Icons:** Icons must be 1px weight, monochromatic (Soft Charcoal or Gold), and never filled.
- **Cards:** Used for product listings. No borders or shadows by default; the product image fills the width, with Noto Serif typography centered below.
- **Chips:** Used for sizes or categories. Simple rectangles with the `Soft` roundedness and a Warm Beige background.
- **Navigation:** A clean, centered top-bar with generous padding and high-contrast typography. Use a "ghost" style for inactive links.