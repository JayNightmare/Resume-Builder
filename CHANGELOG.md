# Changelog

All notable changes to this project will be documented in this file.

## v0.2.0 - 2026-02-02

### Added

- **Update Notifications**: Added a new notification system to alert users of app updates.
- **Changelog UI**: Implemented a responsive Changelog Popup with a split-view sidebar to navigate version history.
- **Settings**: Added a "What's New" section in the Settings modal with a badge indicator for unseen updates.

## v0.1.0 - 2026-02-02

### Added

- **Skills Editor**: Implemented a new "chip/bubble" interface for adding and managing skills.
- **Migration Logic**: Added automatic migration in `ResumeContext` to convert legacy string-based skills to the new array format.

### Changed

- **Data Structure**: Refactored `skills` data structure from a comma-separated string to an Array for better handling and rendering.
- **Sidebar Template**: Updated the skills section to render skills as styled bubbles/badges instead of a text block.
- **Modern Template**: Updated the skills section to render skills as styled rounded pills/bubbles.
- **Page Generation**: Updated `pageGeneration.js` to specifically handle skills within the sidebar correctly and support the new array structure.

### Fixed

- **Sidebar Template Bug**: Fixed an issue where the skills section was not appearing in the Sidebar template because the page generator couldn't detect the section (missing `data-section` attribute).
