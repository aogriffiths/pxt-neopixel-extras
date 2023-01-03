
## Quick start

To get started in a local development environment use

```
# setup a makecode development environment
git clone https://github.com/aogriffiths/microbit-makecode-dev-environment
cd microbit-makecode-dev-environment
npm install

# clone this project into your local projects
cd projects
git clone https://github.com/aogriffiths/pxt-neopixel-extras
# link to the examples projects so the makecode editor can serve them
ln -s ./pxt-neopixel-extras/projects/* .

cd ..
npm run serve &
```

This will start the makecode editor  on your localhost but it will be using browser localstorage to store projects by default. To access projects in your projects directory you will need to add `?ws=fs` to the URL. For example [http://localhost:3232/index.html?ws=fs]()

## Background

This project started following the documentation from [makecode.microbit.org/extensions/build-your-own](https://makecode.microbit.org/extensions/build-your-own). The documentation referenced was specifically:

 * Getting started in [getting-started](https://makecode.com/extensions/getting-started)
 * Building your own extension in [getting-started/vscode](https://makecode.com/extensions/getting-started/vscode)
 * Command line tool in [cli](https://makecode.com/cli)
 * Full documentation in [defining-blocks](https://makecode.com/defining-blocks)

## Development history

Instead of installing pxt globally, it is installed for this project only. Originally as follows:

```
npm init
npm install pxt
```

So developers now just need:

```
# to install pxt (and all other project dependencies):
npm install

# to run pxt commands:
npx pxt ....
```

The steps from "Building your own extension" were then followed:
```
npx pxt target microbit
pxt extract HEXFILE
pxt build
```
