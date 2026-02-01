# Header Dropdown Menu Block Plugin

A professional WordPress block plugin adding a **Trigger Block** and a **Dropdown Content Block** designed for complex header menus. 

## Features
- **Zero Layout Shift**: Dropdown content renders as an overlay (absolute positioning) in the frontend.
- **Visual Editor Support**: Fully editable in Gutenberg with a relative layout for easy content management.
- **Linkable Blocks**: Connect Triggers to Content via unique IDs.
- **Customizable**: Control position (left/center/right), offsets, hover behavior, and animations.
- **Smart Delays**: Instant open on hover, with a configurable delay before closing to prevent accidental closures.

## Installation
1. Upload the plugin folder to `wp-content/plugins/`.
2. Activate "Header Dropdown Menu Block" in plugins menu.

## Usage
1. **Add Dropdown Content**:
   - Insert a "Dropdown Content" block.
   - Note the **Block ID** (or specific one, e.g., `my-menu`).
   - Add your content (Columns, Navigation, Images) inside it.
   - Configure "Max Width" and "Position" (Left, Center, Right) in sidebar.
   - **Preview Mode**: Toggle "Preview Mode (Overlay)" in the sidebar to visualize how the dropdown floats over other content directly in the editor.

2. **Add Trigger**:
   - Insert a "Dropdown Trigger" block where you want the menu button (e.g., in a Header Row).
   - Enter text (e.g., "Products").
   - In Sidebar Settings > Dropdown Settings, enter the **Dropdown ID** from step 1 (e.g., `my-menu`).
   - Enable "Hover Open" if desired.

## Developer Notes
- **Styling**: Styles are separated into `style.css` (frontend) and `editor.css` (editor fixes).
- **Z-Index**: Default z-index is 999. Override `.header-dropdown-content` in your theme if needed.
- **Architecture**: multi-entry Webpack build.

## Build
```bash
npm install
npm run build
```
