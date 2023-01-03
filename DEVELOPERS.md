
## Quick start

To get started in a local development environment use

```bash
# setup a makecode development environment
git clone https://github.com/aogriffiths/microbit-makecode-dev-environment
cd microbit-makecode-dev-environment
npm install

# clone this project into your local projects
mkdir projects
cd projects
git clone https://github.com/aogriffiths/pxt-neopixel-extras
# link to the examples projects so the makecode editor can serve them
ln -s ./pxt-neopixel-extras/projects/* .

# run the makecode editor
cd ..
npm run serve &

```

This will open the makecode editor in your browser, but by default it will start serving projects fro your local storage. To access projects in the project folder created above add `?ws=fs` too the URL as follows [http:\\localhost:3232/index.html?ws=fs]().

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
