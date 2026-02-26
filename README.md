# Custom Dropdown

A custom dropdown menu component built with HTML, CSS, and JavaScript.

## Overview

This project implements an interactive custom dropdown menu that allows users to select an item from a list. The dropdown features:

- **Default state**: Displays a placeholder text "Select an option"
- **Open state**: Reveals all available options with smooth animations
- **Selected state**: Shows the chosen item with visual highlighting

The implementation demonstrates DOM manipulation, event handling, and creating responsive, interactive elements with JavaScript.

## Features

- Clean, modern UI design
- Smooth open/close animations
- Keyboard navigation support (Arrow keys, Enter, Escape)
- Click-outside-to-close functionality
- ARIA attributes for accessibility
- Custom event dispatching for integration
- Programmatic API (getValue, getText, reset methods)

## Project Structure

```
custom-dropdown/
├── index.html         # Main HTML file with dropdown structure
├── src/
│   ├── styles.css    # CSS styling for dropdown states
│   └── dropdown.js   # JavaScript dropdown functionality
├── tests/            # Test files (placeholder)
├── dropdown.png      # Mockup reference image
├── README.md         # Project overview
└── .gitignore        # Git ignore policy
```

## Usage

1. Open `index.html` in a web browser
2. Click on the dropdown to reveal options
3. Click on an option to select it
4. The selected value will be displayed below the dropdown

### Keyboard Navigation

- **Enter / Space**: Open/close dropdown
- **Arrow Down**: Move to next option
- **Arrow Up**: Move to previous option
- **Escape**: Close dropdown

### Programmatic API

```javascript
// Get the selected value
const value = window.customDropdown.getValue();

// Get the selected text
const text = window.customDropdown.getText();

// Reset the dropdown
window.customDropdown.reset();

// Listen for selection changes
document.getElementById('dropdown').addEventListener('dropdown:select', (e) => {
    console.log('Selected:', e.detail.value, e.detail.text);
});
```

## Source

Based on [roadmap.sh Custom Dropdown Project](https://roadmap.sh/projects/custom-dropdown)