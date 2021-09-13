# Air Quality in India

## Installation

`npm install`

Please use this command to install all the necessary packages in order to either run this app in a DEV environment or building the app into a '<ROOT>/dist' directory.

## Running in DEV environment

`npm run dev`
This command is used to run the app while developing and making changes to the existing codebase. It utilises Webpack Dev Server behind in the scene. However I have also configured Webpack to build a reasonable static based web app that could be run on pretty much any server.


## Build & Serve

`npm run build`

This command is used to build a local static based web app, ready for production. Simply copy and paste the <root>/dist directory into an S3 or similar basic static servers to run the app.

`npm run serve`

However, you could also run the local build app locally on your machine, to run and test it prior to deployment to the actual server.

## Tests

`npm run test`

I have added a few simple Jest based tests, however I unfortunately didn't find the time to complete the Jest side of the app, however you could get the idea of the setup and configs.


# UI

I have tried to keep things as per requirements, and the achieved results are pretty self-explanatory and it supports:
- Switching language from English to Hindi and vice-versa
- Sorting data by the city name, most and least polluted cities
- Basic mobile version when viewport matches mobile size resolution

However there are number of features that are yet missing and I wish I had more time to finish them, however I think this should be enough to give you an idea of how do go about and organise project from scratch and how I tackle and approach different sections of the app.

I have number of side projects that I am happy to share those with you.

Thank you
