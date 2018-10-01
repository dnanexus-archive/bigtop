This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).

## Introduction

BigTop aims to demonstrate some of the potential of virtual reality for scientific visualization by providing an easy way for scientists and science enthusiasts to become immersed in their data. This provides several key advantages over more traditional 2D visualization methods, such as:

  * A greater field upon which to render data, making navigation faster and more intuitive than entering genomic coordinates in a browser.
  * Makes locating points of interest easier, as the user retains a greater sense of their body-relative location.
  * Potential for more natural methods of interacting with data.

## Quick Start

### Requirements

To build, this project only requires that you have `npm` 6+ installed on your machine.

To view, you must have built the project, but the resulting files can be placed anywhere. Viewing requires a browser that supports WebXR, such as the latest version of Chrome or Firefox. For Chrome, you may need to enable some experimental extensions:

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

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.

Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.

You will also see any lint errors in the console.

### `npm run build`

Builds the app for production to the `build` folder.

The build is minified and the filenames include the hashes.
