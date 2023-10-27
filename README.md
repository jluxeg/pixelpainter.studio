# pixelpainter.studio v0.1

[Try pixelpainter.studio now!](https://pixelpainter.studio)

pixelpainter.studio is a free responsive browser-based tool for designing and downloading pixel art images for use anywhere on anything. There are no users, databases, or cookies; files are saved to your browser/device via `localStorage`. Meaning you can download and run pixelpainter.studio locally on your desktop by opening `/dist/index.html` in a browser, when you have no access to internet.

![pixelpainter.studio website screenshot](/sample/screenshot.png?raw=true "pixelpainter.studio website screenshot")

## The Tools

Tools with an associated keyboard shortcut have the key listed after their name.
- Paintbrush `b`: Colors target pixels with the active painting color.
- Paint Bucket `g`: Fills an unbroken area of pixels with the active painting color.
	- (note: it may take a second to process larger areas.)
- Eraser `e`: Clears target pixels of color.
- Color Replace `f`: Changes *all* pixels of the same color to the active painting color.
- Eyedropper `i`: Sets the active painting color to the color of the target pixel. Reverts to previous tool after use.

### Other Buttons

- Undo `ctrl/cmd + z`: Undoes the previous painting action, up to 20 of the most recent actions.
- Redo `shift + ctrl/cmd + z`: Redoes the previously undid painting action.
- Clear Canvas: Removes color from all pixels, clears the undo and redo states, and empties the filename input.
- Toggle Grid `t`: Shows/hides the grid overlay display.


## File Actions

- Filename Input: Accepts letters, numbers, and hyphens. Spaces will be replaced with hyphens. If left empty, the default value used will be the current unix timestamp.
- Save Progress `ctrl/cmd + s`: Uses the value from filename input to save the current canvas in `localStorage`. Files are structured as a string of color codes.
	- *How many files can I save?* This is between you and your god. During testing the big 4 browsers were handling 100+ files fine, however your results may vary.
	- *I don't have localStorage* You won't be able to save your progress, but you can still paint and download.
- Download JPG/PNG: Saves the current artwork to your device in the selected file format as `pps_<filename input>`.
	- *What dimensions will my file be?* Currently the image size will be determined by the canvas size on your screen. The [roadmap](ROADMAP.md) has plans for custom dimension sizes.
- Load (file): Loads a previously saved artwork from `localStorage`. Fills filename input with the saved file name.
- Delete (file): Permanently deletes the save file from your browser/device `localStorage`.


## Issues or Improvements

Did you run into a bug? Or do you have an idea to make pixelpainter.studio better? Submit your feedback to the [issues tab](https://github.com/jluxeg/pixelpainter.studio/issues) in GitHub. When you create a new Issue, a template will be loaded. It will guide you through collecting and providing the information needed to investigate.

A couple things before submitting an issue:
1. Please check if your issue is a duplicate first, and if so, make sure to comment on the existing issue instead.
2. Make sure you are only describing one bug/feature per issue submitted.

### Known Issues

- Android Chrome (e.g. Pixel 5 Chrome 117) displays sporadic artifact lines between `.pixel` elements in downloaded image files.


## Contributing

See the [CONTRIBUTING doc](CONTRIBUTING.md) for information on how to contribute and setup a local development environment.\
You can see everyone who has contributed so far, [here](CONTRIBUTORS.md).


## Acknowledgements

- pixelpainter.studio v0.1 is built using jQuery
- [html-to-image](https://github.com/bubkoo/html-to-image) is from [崖 @bubkoo](https://github.com/bubkoo)
- [download](https://github.com/rndme/download) is from [dandavis @rndme](https://github.com/rndme)
- buttons were inspired by [pixel-borders](https://github.com/NigelOToole/pixel-borders) from [Nigel O Toole @NigelOToole](https://github.com/NigelOToole)
- font is [Silkscreen](https://fonts.google.com/specimen/Silkscreen) by [Jason Kottke](https://github.com/jkottke)
- tool icons were made in pixelpainter.studio based off [Font Awesome](https://fontawesome.com/) icons
- PR and Issue templates were made with [open-source-templates](https://github.com/TalAter/open-source-templates) by [Tal Ater @TalAter](https://github.com/TalAter)


## Background

**Inspiration:** After seeing my kids play a few paint-by-number pixel style apps, I wondered how a freeform browser painting tool could work.

**Goal:** To make something that my kids can enjoy and be a helpful tool for artists/designers.

**Alternative projects:**
- [https://kully.github.io/pixel-paint/](https://kully.github.io/pixel-paint/) - fast tools, neat select and copy ability
- [https://makepixelart.com/](https://makepixelart.com/) - has some really cool tools, simple layer setup
- [https://dinopixel.com/](https://dinopixel.com/) - online community, simple animation focus
- [https://www.piskelapp.com/](https://www.piskelapp.com/) - good tool focused around making sprite animations
- [https://www.pixilart.com/draw](https://www.pixilart.com/draw) - if you need a full fledge editor equipped with animation capabilities

*This project was not created to fulfill any sort of course requirement/exercise for a program or institution.*


## License

Copyright (C) 2023 Justin Ludwig. All files are released with the AGPL 3 License

This program is free software: you can redistribute it and/or modify it under the terms of the GNU Affero General Public License as published by the Free Software Foundation, version 3.

This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU Affero General Public License for more details.

You should have received a copy of the GNU Affero General Public License along with this program. If not, see <https://www.gnu.org/licenses/agpl-3.0.html>.
