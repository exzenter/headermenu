/**
 * Dropdown Controller for Header Dropdown Menu Block
 */

class DropdownController {
    constructor() {
        this.openDropdown = null;
        this.hoverTimers = {};
        this.init();
    }

    init() {
        document.addEventListener('DOMContentLoaded', () => {
            const triggers = document.querySelectorAll('.header-dropdown-trigger');

            triggers.forEach(trigger => {
                const id = trigger.dataset.dropdownId;
                if (!id) return;

                const dropdown = document.querySelector(`.header-dropdown-content[data-dropdown-block-id="${id}"]`);
                if (!dropdown) return;

                this.setupTrigger(trigger, dropdown);
            });

            // Global listeners
            document.addEventListener('click', (e) => this.handleClickOutside(e));
            document.addEventListener('keydown', (e) => this.handleKeydown(e));
            window.addEventListener('resize', () => this.handleResize()); // Debounce in prod recommended
        });
    }

    setupTrigger(trigger, dropdown) {
        // Click Handler
        trigger.addEventListener('click', (e) => {
            e.stopPropagation();
            this.toggleDropdown(trigger, dropdown);
        });

        // Key Handler (Enter/Space)
        trigger.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                e.stopPropagation();
                this.toggleDropdown(trigger, dropdown);
            }
        });

        // Hover Handler
        if (trigger.dataset.hoverEnabled === 'true') {
            const delay = parseInt(trigger.dataset.hoverDelay || 200);

            trigger.addEventListener('mouseenter', () => this.handleMouseEnter(trigger, dropdown, delay));
            trigger.addEventListener('mouseleave', () => this.handleMouseLeave(trigger, dropdown, delay));

            dropdown.addEventListener('mouseenter', () => this.handleMouseEnter(trigger, dropdown, delay));
            dropdown.addEventListener('mouseleave', () => this.handleMouseLeave(trigger, dropdown, delay));
        }
    }

    toggleDropdown(trigger, dropdown) {
        const isOpen = dropdown.classList.contains('is-open');

        if (isOpen) {
            this.close(trigger, dropdown);
        } else {
            this.open(trigger, dropdown);
        }
    }

    open(trigger, dropdown) {
        // Close others first
        this.closeAll();

        dropdown.classList.add('is-open');
        trigger.setAttribute('aria-expanded', 'true');

        this.positionDropdown(trigger, dropdown);
        this.openDropdown = { trigger, dropdown };
    }

    close(trigger, dropdown) {
        dropdown.classList.remove('is-open');
        trigger.setAttribute('aria-expanded', 'false');

        if (this.openDropdown && this.openDropdown.dropdown === dropdown) {
            this.openDropdown = null;
        }
    }

    closeAll() {
        if (this.openDropdown) {
            this.close(this.openDropdown.trigger, this.openDropdown.dropdown);
        }
    }

    handleMouseEnter(trigger, dropdown, delay) {
        const id = trigger.dataset.dropdownId;

        // Clear existing close timer if any
        if (this.hoverTimers[id]) {
            clearTimeout(this.hoverTimers[id]);
            this.hoverTimers[id] = null;
        }

        if (!dropdown.classList.contains('is-open')) {
            this.open(trigger, dropdown);
        }
    }

    handleMouseLeave(trigger, dropdown, delay) {
        const id = trigger.dataset.dropdownId;

        this.hoverTimers[id] = setTimeout(() => {
            this.close(trigger, dropdown);
        }, delay);
    }

    handleClickOutside(e) {
        if (!this.openDropdown) return;

        const { trigger, dropdown } = this.openDropdown;

        if (!trigger.contains(e.target) && !dropdown.contains(e.target)) {
            this.close(trigger, dropdown);
        }
    }

    handleKeydown(e) {
        if (e.key === 'Escape') {
            this.closeAll();
        }
    }

    handleResize() {
        if (this.openDropdown) {
            this.positionDropdown(this.openDropdown.trigger, this.openDropdown.dropdown);
        }
    }

    positionDropdown(trigger, dropdown) {
        // Reset styles first to get natural dimensions
        dropdown.style.left = '';
        dropdown.style.right = '';
        dropdown.style.transform = '';

        // Ensure we are working with clean state
        dropdown.classList.remove('force-right-align', 'force-left-align');

        const triggerRect = trigger.getBoundingClientRect();
        const dropdownRect = dropdown.getBoundingClientRect();
        const viewportWidth = window.innerWidth;
        const positionPref = dropdown.dataset.positionPreference || 'left';

        // Base positioning logic
        if (positionPref === 'center') {
            // Center logic: Move to center of trigger, then shift back by half dropdown width
            // We use JS calculation for 'left' instead of transform to allow easier collision detection later if needed,
            // but transform is smoother. Let's start with left offset relative to trigger.

            // Trigger center relative to viewport
            const triggerCenter = triggerRect.left + (triggerRect.width / 2);
            // Desired left position
            let targetLeft = triggerCenter - (dropdownRect.width / 2);

            // Since dropdown is likely absolutely positioned relative to a parent (or body?), 
            // we need to know the context. 
            // Assumption: The dropdown is inserted in DOM near trigger or we are setting fixed/absolute coordinates relative to viewport?
            // "Dropdown Content Block muss im DOM direkt nach dem Trigger platziert sein" -> It's a sibling.
            // If parent is relative, we need coordinates relative to parent.
            // BUT, usually in these blocks, we might just want to use simple alignment if the parent is the container.

            // However, the request says "position left center right is not working".
            // Let's assume standard CSS relative to the trigger's container is what's happening.
            // If we just use CSS transforms:
            dropdown.style.left = '50%';
            dropdown.style.transform = 'translateX(-50%)';
            // Note: This assumes parent is the trigger wrapper or they share a relative parent.
            // If that fails, we might need more complex calculation. Let's try this standard approach first.

        } else if (positionPref === 'right') {
            dropdown.style.right = '0';
            dropdown.style.left = 'auto';
        } else {
            // Left (Default)
            dropdown.style.left = '0';
            dropdown.style.right = 'auto';
        }

        // Re-measure to check overflow after applying preferred style
        // We might need a small delay or just check strictly based on rects again?
        // Let's calculate expected rectangles based on the preference to avoid layout thrashing if possible,
        // but 'getBoundingClientRect' is reliable.
        const currentRect = dropdown.getBoundingClientRect();

        // 1. Check Right Overflow
        if (currentRect.right > viewportWidth) {
            // Too far right, force align to right of viewport (or container)
            // If it was 'left' or 'center', switch to right aligned
            dropdown.classList.add('force-right-align');
            // Reset the center transform if we had it
            if (positionPref === 'center') {
                dropdown.style.left = 'auto';
                dropdown.style.transform = 'none';
                dropdown.style.right = '0'; // Align to right edge of container
            }
        }

        // 2. Check Left Overflow
        if (currentRect.left < 0) {
            // Too far left (e.g. center aligned on leftmost element)
            dropdown.classList.add('force-left-align');
            if (positionPref === 'center') {
                dropdown.style.left = '0';
                dropdown.style.transform = 'none';
            }
        }
    }
}

new DropdownController();
