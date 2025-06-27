# Sass Style Organization

This project uses a well-organized Sass structure to maintain clean, scalable, and maintainable styles.

## File Structure

```
src/styles/
├── main.scss           # Main entry point that imports all other files
├── _variables.scss     # All variables (colors, spacing, typography, etc.)
├── _mixins.scss        # Reusable mixins and functions
├── _base.scss          # Base styles (reset, body, container, etc.)
├── _components.scss    # Component-specific styles (buttons, cards, forms, etc.)
├── _layout.scss        # Layout-specific styles (grids, responsive design, etc.)
└── README.md          # This documentation file
```

## Import Order

The files are imported in a specific order in `main.scss`:

1. **Variables** - Must be first so they can be used everywhere
2. **Mixins** - Second so they can use variables and be used by components
3. **Base** - Foundation styles
4. **Components** - Reusable component styles
5. **Layout** - Layout and responsive styles (can override component styles if needed)

## Variables (_variables.scss)

Contains all design tokens organized by category:

### Colors
- **Primary Colors**: `$primary-color`, `$secondary-color`
- **Background Colors**: `$background-color`, `$card-background`
- **Text Colors**: `$text-color`, `$text-light`, `$text-muted`
- **Border Colors**: `$border-color`, `$border-light`
- **Status Colors**: `$success-color`, `$danger-color`, `$warning-color`, `$info-color`
- **Hover States**: `$primary-hover`, `$secondary-hover`, `$danger-hover`

### Typography
- **Font Family**: `$font-family-base`
- **Font Sizes**: `$font-size-sm`, `$font-size-base`, `$font-size-lg`, etc.
- **Font Weights**: `$font-weight-normal`, `$font-weight-medium`, etc.
- **Line Heights**: `$line-height-base`, `$line-height-sm`, `$line-height-lg`

### Spacing
- **Spacing Scale**: `$spacing-xs` (4px) to `$spacing-xxxl` (30px)

### Border Radius
- **Radius Scale**: `$border-radius-sm` (4px) to `$border-radius-max` (50px)

### Shadows
- **Shadow Scale**: `$shadow-sm` to `$shadow-xl`

### Transitions
- **Duration**: `$transition-fast`, `$transition-base`, `$transition-slow`

### Breakpoints
- **Responsive**: `$breakpoint-xs` to `$breakpoint-xl`

## Mixins (_mixins.scss)

Contains reusable mixins organized by category:

### Media Queries
- `@mixin mobile` - For mobile-first responsive design
- `@mixin tablet` - For tablet breakpoints
- `@mixin desktop` - For desktop breakpoints
- `@mixin large-desktop` - For large desktop breakpoints

### Button Mixins
- `@mixin button-base` - Base button styles
- `@mixin button-variant($bg-color, $hover-color)` - Button color variants
- `@mixin button-size($padding-y, $padding-x, $font-size)` - Button size variants

### Card Mixins
- `@mixin card-base` - Base card styles
- `@mixin card-hover` - Card hover effects

### Form Mixins
- `@mixin form-control` - Base form control styles

### Layout Mixins
- `@mixin flex-center` - Center content with flexbox
- `@mixin flex-between` - Space between with flexbox
- `@mixin grid-auto-fit($min-width, $gap)` - Auto-fit grid
- `@mixin grid-auto-fill($min-width, $gap)` - Auto-fill grid

### Typography Mixins
- `@mixin text-truncate` - Truncate text with ellipsis
- `@mixin text-clamp($lines)` - Clamp text to specific number of lines

### Drag and Drop Mixins
- `@mixin draggable` - Make elements draggable
- `@mixin drop-target` - Style drop targets

## Usage Examples

### Using Variables
```scss
.my-component {
  background-color: $primary-color;
  padding: $spacing-lg;
  border-radius: $border-radius-md;
  box-shadow: $shadow-md;
}
```

### Using Mixins
```scss
.my-button {
  @include button-base;
  @include button-variant($success-color);
}

.my-grid {
  @include grid-auto-fill(250px, $spacing-lg);
}

@include tablet {
  .my-component {
    padding: $spacing-sm;
  }
}
```

### Creating New Components
When adding new components, follow this pattern:

```scss
// In _components.scss
.new-component {
  // Use variables for consistency
  background-color: $card-background;
  padding: $spacing-md;
  border-radius: $border-radius-sm;
  
  // Use mixins for common patterns
  @include flex-between;
  
  // Nested selectors for related elements
  &__title {
    font-size: $font-size-lg;
    color: $primary-color;
  }
  
  &--variant {
    background-color: $secondary-color;
  }
  
  // Responsive design
  @include tablet {
    padding: $spacing-sm;
  }
}
```

## Best Practices

1. **Always use variables** instead of hard-coded values
2. **Use mixins** for repeated patterns
3. **Follow the BEM methodology** for class naming
4. **Keep specificity low** - avoid deep nesting
5. **Use semantic variable names** that describe purpose, not appearance
6. **Group related styles** together
7. **Use modern Sass syntax** (`@use` instead of `@import`)
8. **Leverage Sass color functions** like `color.adjust()` for color variations

## Modern Sass Features

This project uses modern Sass features:

- **`@use` instead of `@import`** - Better module system
- **`color.adjust()` instead of `lighten()`/`darken()`** - Modern color functions
- **Explicit imports** - Each file imports what it needs
- **Namespace imports** - `@use "sass:color"` for built-in modules
