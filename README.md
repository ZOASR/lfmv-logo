# lfmv-logo

<p style="text-align: center; filter: drop-shadow(0 0 10px #000a)">
	<img src="./lfmv-logo.svg" width="200" height="auto" >
</p>

This repo contains the source code that generates the logo displayed in this README file and the [website](https://lastfm-viewer.vercel.app/)

Logo animatitions are generated in a css style tag with the help of a deno [Sass](https://sass-lang.com/) compiler

## Quick start:

Make sure you have [deno](https://deno.com/) installed first then run:

```sh
$ git clone https://github.com/ZOASR/lfmv-logo.git
$ cd lfmv-logo
```

```sh
$ deno task dev
```

## Usage:

You need to have an `.svg` file and a `.scss` in the current directory then you can run the script to generate the final `.svg` file:

```sh
$ deno run --allow-write --allow-read --allow-net main.ts sassinput.scss svginput.svg [out.svg]
```
