## Introduction

BigTop demonstrates some of the potential of virtual reality for scientific visualization by providing an easy way for scientists and science enthusiasts to become immersed in their data. This provides several key advantages over more traditional 2D visualization methods, such as:

  * Provides a greater field for data display, making navigation faster and more intuitive than entering genomic coordinates in a browser.
  * Makes locating points of interest easier, as the user retains a greater sense of their body-relative location.
  * Opens potential for more natural methods of interacting with data.
  
While BigTop is meant for examining large genomic data sets such as those found in GWAS studies, in reality it can be used to visualize any data set that contains genomic location, p-value, and a factor that can be quantified between 0 and 1 (usually frequency of an attribute's expression in a cohort).

## Quickest Start

This can be viewed in Chrome or Firefox on [GitHub Pages](https://dnanexus.github.io/bigtop/build/)

## Quick Start

### Requirements

To build, this project only requires that you have [npm](https://www.npmjs.com/get-npm) 6+ installed on your machine.

Viewing requires a browser that supports WebXR, such as the latest version of [Chrome](https://www.google.com/chrome/) or [Firefox](https://www.mozilla.org/en-US/firefox/). For Chrome, you may need to enable some experimental extensions:

  * [#enable-gamepad-extensions](chrome://flags#enable-gamepad-extensions)
  * [#enable-webvr](chrome://flags#enable-webvr)
  * [#webxr](chrome://flags#webxr)
  * [#webxr-gamepad-support](chrome://flags#webxr-gamepad-support)
  * [#oculus-vr](chrome://flags#oculus-vr)

To view in virtual reality, you need a compatible VR headset. This has been tested with the Oculus Rift, Oculus Quest, HTC Vive, and Google Daydream. Note that because of the reduced processing power of Oculus Quest and Google Daydream devices, your experience browsing your data will be heavily impacted (both devices have mobile-class graphics processors, and update very slowly; this may cause nausea for some users).

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

If you want to clear the selected point, hit the Escape key.

### In Virtual Reality

In VR, you can walk around and explore your data. Your right-hand controller will project a laser that can be used to select points: simply aim the laser at a point and pull the trigger on the controller to get info on it. Your left controller will present a virtual hand; this currently does nothing, but you can use it to wave or give a thumbs-up to your data.

If you want to clear the selected point, use the B button on an Oculus controller, or up on the trackpad of a Vive controller.

## Configuration

You can configure certain aspects of how the world renders by passing in query parameters at the end of the URL, e.g. `index.html?stats&points=5000`. The following parameters are supported:

  * `data`: This determines where the data is loaded from. This should be a URI-encoded string pointing to a JSON resource containing all the points to be rendered. If this parameter is not provided, a sample dataset from the GIANT GWAS study will be loaded.

  * `chr`: (Default homo sapiens) This determines where the chromosome info is loaded from. It should be a URI-encoded string pointing to a JSON file where chromosomes should be represented by an array of objects containing the following keys (see public/data/homo_sampiens_chrInfo.json for guidance):
    * `label`: the name of the chromosome
    * `size`: the size of the chromosome
    * `color`: an HTML color (hex, RGBA, or any other valid representation)

  * `cyto`: (Default homo sapiens) This determines where the cytoband info is loaded from. It should be a URI-encoded string pointing to a JSON file which is an array of objects representing each color band. The objects should each contain the following keys (see public/data/homo_sapiens_cytobands.json):
    * `chrom`: The chromosome label, which should match a `label` value in the chromosome file
    * `start`: The starting location of the stain region
    * `end`: The ending location of the stain region
    * `label`: The commonly-known name of the stain region (e.g. "p35.3")
    * `stain`: The stain level in this region: one of [`gneg`, `gpos25`, `gpos50`, `gpos75`, `gpos100`, `acen`, `gvar`, `stalk`]

  * `datasets`: Rather than specifying three files in the URL, you can conglomerate them into one large JSON file. This file should be an array with one object containing the keys `chromosomes`, `cytobands`, and `data`, the values of each of which should correcpond to the contents of the above three files. In the future we aim to support loading multiple datasets this way (by allowing the array to be longer than one object), but for the moment this is merely a shortcut to replace specifying the three files above.

  * `lefty`: If this parameter is present, regardless of its value, the controllers will be switched to a left-handed configuration (laser pointer on the left, hand avatar on the right).

  * `stats`: If this parameter is present, regardless of its value, then a stats window will be displayed in the upper left of the screen when not in VR mode.

  * `room.height`: Adjust the apparent height of the room, in meters. (Default: 10)

  * `room.radius`: Adjust the apparent radius of the room, in meters (note this is radius, not diameter, so the room will stretch this far in either direction from the initial vantage point). (Default: 10)

  * `p`: Adjust the p-value cutoff for displaying points. Any points falling below the p-values cutoff will be rendered as semi-transprent blobs on the ground. This can be given as a floating-point value (e.g. 0.0) or in log notation (e.g. 1e-5). (Default: 1e-7)

  * `gene`: Highlight any points whose gene name contains the given text, case-insensitive. E.g. "br" and "BRC" will both match the genes BRCA1 and BRCA2.

  * `rsid`: Highlight points with the given rsID value. This must be a normal rsID identifier that starts with "rs", and is case-sensitive.

  * `points`: Define the maximum number of points from the dataset to render. Giving no value will render all points in the given dataset. Points will be selected from most significant p-value to least significant, e.g. `points=100` will render the 100 most significant points. (Default: unlimited)

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

This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).
