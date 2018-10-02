This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).

## Introduction

BigTop aims to demonstrate some of the potential of virtual reality for scientific visualization by providing an easy way for scientists and science enthusiasts to become immersed in their data. This provides several key advantages over more traditional 2D visualization methods, such as:

  * A greater field upon which to render data, making navigation faster and more intuitive than entering genomic coordinates in a browser.
  * Makes locating points of interest easier, as the user retains a greater sense of their body-relative location.
  * Potential for more natural methods of interacting with data.

## Quickest Start

This can be viewed in a compatible browser on [GitHub Pages](https://dnanexus.github.io/bigtop/build/index.html)

## Quick Start

### Requirements

To build, this project only requires that you have [npm](https://www.npmjs.com/get-npm) 6+ installed on your machine.

To view, you must have built the project, but the resulting files can be placed anywhere. Viewing requires a browser that supports WebXR, such as the latest version of [Chrome](https://www.google.com/chrome/) or [Firefox](https://www.mozilla.org/en-US/firefox/). For Chrome, you may need to enable some experimental extensions:

  * #enable-gamepad-extensions
  * #enable-webvr
  * #webxr
  * #webxr-gamepad-support
  * #oculus-vr

To view in virtual reality, you need a compatible VR headset. This has been tested with Oculus Rift.

### Installation and Building

After cloning the repository, execute the following steps:

  1. `npm install` to install the required libraries
  1. `npm run build` to build and package the project's files
  1. Navigate to the `build` directory and launch `index.html` to view

## Navigation

This project can be viewed either in a compatible browser or in VR. If you have VR hardware connected to your computer, you will see a "View in VR" button with goggles in the lower right corner: click it to enter VR mode, and hit Escape on the keyboard when you're done.

### In the Browser

To navigate in the browser, you can use the mouse to rotate your view by holding the left button and moving the mouse. You can also move along the ground by using either WASD controls or the arrow keys.

To get info on a point, position the reticle over the point in question and wait for a second. The point will then highlight and show its information panel.

### In Virtual Reality

In VR, you can walk around and examine points up close. When staring at a point, you'll notice there are two light horizontal lines in the center of your vision. Position the point of interest directly between them and stare at the point for a second in order to select it. This can take some practice; we recommend starting with a large point close to you, and then attempting points further away from you.

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in development mode.

Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.

You will also see any lint errors in the console.

### `npm run build`

Builds the app for production and places files in the `build` folder.

The build is minified and the filenames include the hashes.

## About DNAnexus

DNAnexus provides a global network for sharing and management of genomic data and tools to accelerate genomics. The DNAnexus cloud-based platform is optimized to address the challenges of security, scalability, and collaboration for organizations that are pursuing genomic-based approaches to health in the clinic and in the research lab. The DNAnexus team is made up of experts in computational biology, cloud computing, and machine learning who work with organizations to tackle some of the most exciting opportunities in human health, making it easier--and in many cases feasible--to work with genomic data.

If you're interested in joining the DNAnexus team, check out our [job listings](https://www.dnanexus.com/careers)!
