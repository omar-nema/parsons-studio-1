Mockup link: https://www.figma.com/proto/FBfbI0GgJ4Fwm3LEnaSPPW/Studio-1?page-id=0%3A1&node-id=2%3A29&viewport=241%2C48%2C0.26&scaling=min-zoom

For my technical exploration, I decided to work with Webgazer.js instead of the Smithsonian API. My Smithsonian API requirements should be relatively simple - as I will just pull one piece of artwork and store it. I'll be using Webgazer for eye-tracking which is much more complicated.

I pulled in the Webgazer script to a new web project and studied how it works by logging a bunch of items to the console.

Here's what I've learned so far: Webgazer calibrates using clicks and mouse movements - so a calibration sequence will be needed before using it. After calibration, the user's eye tracking position can be accessed with a function. So I will have to run this function continuously, and store x and y coordinates in some sort of file. I will have thousands of coordinates so I need to think of a way to do this without overloading memory. The data will essentially be a series of {time: xx, x position: xx, y position: xx}.

To analyze the data, I will need to manually break down a piece of artwork, and define 'regions' for all of its elements. I can then look at each user's results