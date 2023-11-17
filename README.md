# About

This is a place where I will be adding different reusable tools and components to make websites.

## Structure of the project:
I am using Vitejs and Reactjs.

```
src/
└── assets/
    ├── responsive-navbar/
    ├── some-other-high-level-component/
    ├── tools/
    │   ├── tools.jsx
    │   │   ^ A bunch of custom functions that let me build more complex components.
    │   └── components/
    │       ^ Here I will place tool Components that I use as building blocks for other higher level components.
    ├── main.jsx
    │   ^ root of the project.
    ├── responsive.js
    │   ^ An object containing breakpoints for screen sizes that I will be using for high level components.
    └── Sandbox.jsx
        ^ Contains a React Context that passes the current breakpoint state.
```

## Components:

### Responsive Navbar:
A responsive navbar that features a **highly customizable** button dropdown menu where you can have buttons and folders.

- The Button dropdown menu is the highlight of the navbar, which you can use independently from it:
    - It comes with a default style, but you can override it in many ways.
    - You can have custom styles per level of depth of the menu.
    - You can have inidividual styles for each item, replacing the previously mentioned.
    - You can pass in a function that takes in a button and a depth level and returns a custom image src for each item's icon. Ideal for assigning icons based on conditions of each button.
    - You can have custom icons for each element that replace the ones just mentioned. Ideal for assigning a unique icon specifficaly to one button.
    - The styles are separated into three parts: container, button, dropdown. This allows you to combine general styling and custom styling for each element.
    - You can pass a function to be called whenever a button is clicked.
    - You can decide if the folders should open on hover or on click.
    - You can customize where the dropdowns will open in relation to their parent element with up to 8 diferent places (or do it custom).
- Due to the dropdown menu being so customizable, you can actually modify it to create an in-place multi-level menu (which is what the navbar uses on smaller screens)
- Any custom styling you add, it is recommended that you place it inside the ***styles_dropdownButton.css***, at the end of the file.
- Please note that any custom styling is meant to MODIFY the default one, not replace it. The way it works is:
    - Default styling is the base
    - Level styling modifies default styling
    - Individual styling REPLACES level styling as the style to MODIFY default styling.
    - Since styling added is separated into **container**, **button** and **dropdown**. You can combine default, level and individual styles together that way. For example you can have one level styling for the dropdown and one individual styling for the button element of one of the items. This means that for that speciffic button, the styling used for the container will be the default, the one for the dropdown will be the level one and the one for the button element will be the individual one.
    - You can also just go into ***styles_dropdownMenu.css*** and modify the default yourself.