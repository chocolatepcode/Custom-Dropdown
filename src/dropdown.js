/**
 * Custom Dropdown Implementation
 * A fully accessible, interactive dropdown component
 */

class CustomDropdown {
    constructor(dropdownElement) {
        this.dropdown = dropdownElement;
        this.toggle = dropdownElement.querySelector('.dropdown-toggle');
        this.menu = dropdownElement.querySelector('.dropdown-menu');
        this.items = dropdownElement.querySelectorAll('.dropdown-item');
        this.placeholder = this.toggle.querySelector('.dropdown-placeholder');
        this.selectedValueDisplay = document.getElementById('selectedValue');
        
        this.selectedItem = null;
        this.isOpen = false;
        
        this.init();
    }
    
    init() {
        // Toggle dropdown on click
        this.toggle.addEventListener('click', (e) => {
            e.preventDefault();
            this.toggleDropdown();
        });
        
        // Handle item selection
        this.items.forEach(item => {
            item.addEventListener('click', () => {
                this.selectItem(item);
            });
            
            // Keyboard navigation for items
            item.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    this.selectItem(item);
                }
            });
        });
        
        // Close dropdown when clicking outside
        document.addEventListener('click', (e) => {
            if (!this.dropdown.contains(e.target) && this.isOpen) {
                this.closeDropdown();
            }
        });
        
        // Keyboard accessibility
        this.toggle.addEventListener('keydown', (e) => {
            this.handleKeydown(e);
        });
        
        // Set initial ARIA attributes
        this.toggle.setAttribute('aria-expanded', 'false');
        this.toggle.setAttribute('aria-haspopup', 'listbox');
        this.menu.setAttribute('role', 'listbox');
        
        this.items.forEach((item, index) => {
            item.setAttribute('role', 'option');
            item.setAttribute('tabindex', '-1');
            item.setAttribute('aria-selected', 'false');
        });
    }
    
    toggleDropdown() {
        if (this.isOpen) {
            this.closeDropdown();
        } else {
            this.openDropdown();
        }
    }
    
    openDropdown() {
        this.isOpen = true;
        this.dropdown.classList.add('open');
        this.toggle.setAttribute('aria-expanded', 'true');
        
        // Focus first item or selected item
        const selectedItem = this.menu.querySelector('.selected');
        if (selectedItem) {
            selectedItem.focus();
        } else if (this.items.length > 0) {
            this.items[0].focus();
        }
    }
    
    closeDropdown() {
        this.isOpen = false;
        this.dropdown.classList.remove('open');
        this.toggle.setAttribute('aria-expanded', 'false');
    }
    
    selectItem(item) {
        // Remove selected state from previous item
        if (this.selectedItem) {
            this.selectedItem.classList.remove('selected');
            this.selectedItem.setAttribute('aria-selected', 'false');
        }
        
        // Set new selected item
        this.selectedItem = item;
        item.classList.add('selected');
        item.setAttribute('aria-selected', 'true');
        
        // Update toggle text
        const text = item.textContent.replace(' ✓', '').trim();
        this.placeholder.textContent = text;
        this.placeholder.classList.remove('dropdown-placeholder');
        this.placeholder.classList.add('dropdown-selected');
        
        // Update selected value display
        const value = item.dataset.value;
        this.selectedValueDisplay.textContent = value;
        
        // Close dropdown
        this.closeDropdown();
        
        // Return focus to toggle
        this.toggle.focus();
        
        // Dispatch custom event for external listeners
        this.dropdown.dispatchEvent(new CustomEvent('dropdown:select', {
            detail: {
                value: value,
                text: text
            }
        }));
    }
    
    handleKeydown(e) {
        switch (e.key) {
            case 'Enter':
            case ' ':
                e.preventDefault();
                this.toggleDropdown();
                break;
            case 'Escape':
                if (this.isOpen) {
                    e.preventDefault();
                    this.closeDropdown();
                }
                break;
            case 'ArrowDown':
                e.preventDefault();
                if (!this.isOpen) {
                    this.openDropdown();
                } else {
                    this.focusNextItem();
                }
                break;
            case 'ArrowUp':
                e.preventDefault();
                if (this.isOpen) {
                    this.focusPrevItem();
                }
                break;
        }
    }
    
    focusNextItem() {
        const items = Array.from(this.items);
        const currentIndex = items.findIndex(item => item === document.activeElement);
        const nextIndex = (currentIndex + 1) % items.length;
        items[nextIndex].focus();
    }
    
    focusPrevItem() {
        const items = Array.from(this.items);
        const currentIndex = items.findIndex(item => item === document.activeElement);
        const prevIndex = (currentIndex - 1 + items.length) % items.length;
        items[prevIndex].focus();
    }
    
    getValue() {
        return this.selectedItem ? this.selectedItem.dataset.value : null;
    }
    
    getText() {
        return this.selectedItem ? this.selectedItem.textContent.replace(' ✓', '').trim() : null;
    }
    
    reset() {
        if (this.selectedItem) {
            this.selectedItem.classList.remove('selected');
            this.selectedItem.setAttribute('aria-selected', 'false');
            this.selectedItem = null;
        }
        
        this.placeholder.textContent = 'Select an option';
        this.placeholder.classList.remove('dropdown-selected');
        this.placeholder.classList.add('dropdown-placeholder');
        
        this.selectedValueDisplay.textContent = 'None';
    }
}

// Initialize dropdown when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    const dropdownElement = document.getElementById('dropdown');
    if (dropdownElement) {
        window.customDropdown = new CustomDropdown(dropdownElement);
    }
});