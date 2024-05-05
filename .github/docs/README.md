# Social Repo - Project Details

## Project Overview

**Social Repo** is a browser extension which simplify your process of filling out forms and applications by storing users' social media profile links.

All the details regarding the project are listed here.
If you are here, you might be interested in contributing to the project. 🎉

You can go through the following sections to get an idea about the project and then read the [contribution guidelines](CONTRIBUTING) to get started.

## Table of Contents

1. [Design](#design)
    - [Front panel](#front-panel)
    - [Full layout](#full-layout)
2. [Logo](#logo)
3. [Social links data](#social-links-data)
4. [Color Theme](#color-theme)
5. [Technical Features](#technical-features)
    - [Tech Stack](#tech-stack)
    - [Features](#features)

## Design

### Front panel

![Front panel](../../design/Front%20Panel.jpg)

### Full layout

![Full layout](../../design/Social%20Repo.jpg)

## Logo

Logo is yet to made, currently using the default icon.
![Logo](../../assets/logo.png)

## Social links data

We need all major social media handle url prefixes and their respective icons.

-   All the social media handle url prefixes should be stored in [`social-links.json`](../../social-links.json) file.
-   All the icons should be stored in [`icons`](../../assets/icons/) folder.
-   Icons should be of minimum `128x128` and maximum `256x256` resolution.
-   Icons must be in `png` format and transparent background.
-   Icons should be named as `social-media-name.png` (e.g. `twitter.png`, `github.png`, `instagram.png`, etc...).

## Color Theme

Color theme is yet to be decided and will be same as the logo color theme.

## Technical Features

### Tech Stack

-   HTML
-   CSS
-   JavaScript

### Features

As seen in [layout](#full-layout), the features are as follows:

1. **Draggable Icons**: Users can rearrange the social media icons by dragging and dropping based on their preference.
2. **Drag button**: Users can drag the icons by clicking on the drag button.
3. **Settings button**: Users can click on settings button, which will open a settings panel where they can update their social handles.
    - There can be a search bar, in which users can search for the social media handle they want to update.
4. **Save button**: Under settings, there will be a save button which will save the updated social media handles.
5. **Attribution**: Where should we give the attribution of our project? 🤔 Keeping in mind, that it doesn't overwhelm the UI.
6. **Dark mode**: Under settings, we can have a dark mode feature, where users can switch between light and dark mode.
7. **Social media containers**: Containers of icons should be clickable and should copy the social handle URL link to clipboard.
    - It should show a confirmation that the link has been copied.
    - It should also paste the link in the **focused** input field.
8. **Command Prefix**: Users can use a command which can replace the social media handle with the respective URL link.
    - For example, if user types `\twitter`, it should replace with `https://twitter.com/username`.
    - This feature can be enabled/disabled under settings.
    - Also the prefix can be changed.
    - It should only works for input & textarea fields.

> Additional features or change in features are welcome by raising issue. 🤗
