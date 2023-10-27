# Roadmap

The following updates are listed in no particular order.

## Known Issues

- Android Chrome (e.g. Pixel 5 Chrome 117) displays sporadic artifact lines between `.pixel` elements in downloaded image files


## Planned Additions

- More colors
	- Either append them to the current color list, or create tabs to switch between the default and user palettes
	- New color swatch square to open a color input for users to add new colors to their palette either with the UI or hex code
	- Custom colors are saved to `pps_userPalette` in `localStorage`
	- Ability to name colors?
	- Ability to delete colors
- Multi-finger tap support for touchscreens
	- 2 finger tap canvas for undo
	- 3 finger tap canvas for redo
- Light/day display mode
	- UI to select mode
	- Setup preferences as `pps_userPreferences` in `localStorage` to save selection
	- Auto-detect initial preference from device settings
	- Currently a beta is included in the stylesheet. Add the `light` class to the `#pixelpainterstudio` element to check it out
- Option to choose downloaded image dimensions
	- UI to input size: Min 32px(grid size), Max 2-4000px? Constrained to squares
	- Initial value based on current canvas area size?
	- Refactor downloading to use a new separate offscreen canvas area sized to input (currently uses the onscreen canvas)
	- *May* address current known issue for Android
- Pixelate an uploaded image into the canvas for editing
	- Address current css for applying background-colors to pixels
		- Continue adding new style rules per data-color
		- Or possibly using only js to add background color on a per pixel basis (doing this feels a little slower while painting)
	- Button to upload an image
	- After upload, a modal opens with inputs to position and size the image within canvas area
	- Modal includes options to preview, or pixelate immediately
	- Function to create new image based off viewable canvas area, rasterizing to grid size (32x32)
		- Fires for preview or pixelate commands
		- Preview only display this image
		- Changing the position or size after a preview dumps this image
	- Loop through rasterized image pixels and apply color to corresponding `.pixel` element
		- Fires only with pixelate command
		- Dumps the original and rasterized images
		- Closes the modal


## Possible Additions

- Hold the `e` key down to temporarily switch to the eraser tool while key is down
- New brush/eraser sizes and/or shapes
	- UI to adjust/choose
	- Larger square brushes, possibly between 2x2 and 8x8
		- Odd numbers can use the target pixel as the brush center
		- Where would the target pixel be for even numbers?
	- '+' pattern brush?
- Mirror painting tool
	- UI to engage
	- Paints the horizontal opposite pixel of the target pixel
- Retro theme option (purely because I was having fun with it)
	- UI to select theme
	- Add selection to `localStorage` preferences
	- Currently a beta is included in the stylesheet. Add the `retro` class to the `#pixelpainterstudio` element to check it out
- Opacity levels for colors
	- UI to select
	- May need to backwards update saving to include opacity
	- All tools receive opacity data for use as well
	- Change target pixels to current color and opacity selection, or introduce color/opacity mixing?
- Dodge and burn tools similar to photoshop to lighten or darken the color of the target pixel
- More grid size options
	- UI to select size
	- Save grid size when saving progress
	- Load grid size when loading file
	- 16x16
		- great for favicon creation
	- 64x64 
		- In testing, desktop Chrome could *usually* handle a 64x64 grid when downloading images, but other browsers could not
		- So creating a *possible* option depending on device and browser, would need js checks for device and browser
		- Otherwise different options or resources for `html-to-image.js` will have to be tested.
- Autosave functionality
	- Saves to a single `localStorage` item
	- Updates every 5(?) minutes if the canvas has changed and is not blank
	- Dumped after actually saving the work?
	- Upon opening site, loads the last autosave if there is one
	- Option to load it on command?
	- Dump when clearing canvas?
- iOS and Android app versions
	- Possibly using Ionic framework
- Option to crop unpainted pixels when downloading
- Ability to 'stack' saved files on canvas?
	- Can then save reusable objects as a file to load in a layer-like fashion overtop the current painting progress
	- Adds to the undo states
- Selecting and moving pixels
	- Use the painting tools to make a selection vs dragging a marque over an area
	- Add toggle above tools to switch between painting and selection modes
	- Add keyboard shortcut for `m` to switch between these modes
	- Create a move tool to move selection from target to new placement target
	- Selection could then be used for more than just moving, e.g. painting only within
	- UI to turn off the selection when done, shortcut `ctrl/cmd + d`
- Export/Import save files
- Random active color on pageload?


## Areas For Improvement

- Speed up paintbucket time for larger areas
	- decently fast, but the 'working...' overlay doesn't always display on mobile, would need to figure this out as well
- Speed up the time it takes for downloading
	- Could prepare the download canvas at intervals or after painting actions, but preparing on demand is more efficient
	- If preparing after each action could then be used for autosaves instead of an interval
- A better icon to use for the color replace tool
	- Couldn't find an extremely suitable option yet
	- The current one could be mistaken for a selection tool or something else
- Remove jQuery in favor of vanilla js
	- Initially included as a tool to help new coders work with the project, also I like it. But jQuery is starting to fall by the wayside
	- Browser incompatibilities have improved over the years, making the current functionality easier to transfer to vanilla
- Split scripts.js into focused component files as the file gets bigger
- Add more useful colors to the default palette
	- HTML colors can be sporadic between hues, giving some many options and others few
- Landscape phone layout styles could be tighter
- Solution for beforeunload for ios devices to prevent refreshes or page navigation from losing progress

