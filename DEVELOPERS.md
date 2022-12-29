
## Quick start

```
git clone
npm install
npm run build
```

## Background

This project started following the documentation from [makecode.microbit.org/extensions/build-your-own](https://makecode.microbit.org/extensions/build-your-own). The documentation referenced was specifically:

 * Getting started: [here](https://makecode.com/extensions/getting-started)
 * Building your own extension: [here](https://makecode.com/extensions/getting-started/vscode)
 * Command line tool: [here](https://makecode.com/cli)

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
