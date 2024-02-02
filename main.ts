import sass from "https://deno.land/x/denosass/mod.ts";

const sassFileName: string | null = Deno.args[0];
const svgFileName: string | null = Deno.args[1];
const outFileName: string | "out.svg" = Deno.args[2] ? Deno.args[2] : "out.svg";
const watcher = Deno.watchFs("./", {
	recursive: false,
});

if (
	Deno.args.length < 2 ||
	!(
		sassFileName.match(/.*\.scss/g) &&
		svgFileName.match(/.*\.svg/g) &&
		outFileName.match(/.*\.svg/g)
	)
) {
	console.error(`Usage: main.ts sassinput.scss svginput.svg [out.svg]`);
	Deno.exit(0);
}

//  Check if files exist
try {
	await Deno.stat(sassFileName);
	await Deno.stat(svgFileName);
} catch (error) {
	if (error instanceof Deno.errors.NotFound) console.error(error.stack);
	Deno.exit(0);
}

const compileFile = async () => {
	if (sassFileName && svgFileName) {
		const sassFile = await Deno.readTextFile(sassFileName);
		const svgFile = await Deno.readTextFile(svgFileName);
		const compiler = sass(sassFile, {
			style: "expanded",
		});
		const css = compiler.to_string();
		const indentedCss =
			typeof css == "string" ? css.replaceAll(/^(.+)$/gm, "    $1") : css;
		const svgText = svgFile.replace(
			/(<\/svg>)/g,
			`
  <style>
${indentedCss}
  </style>
$1`
		);
		Deno.writeTextFile(outFileName, svgText);
	}
};
compileFile();

for await (const event of watcher) {
	if (
		event.kind == "modify" &&
		(event.paths.includes(`${Deno.cwd()}\\./${sassFileName}`) ||
			event.paths.includes(`${Deno.cwd()}\\./${svgFileName}`))
	) {
		console.log(
			`%cfile change: %c${event.paths} %cchanged`,
			`color: yellow; fontweight: bold`,
			`color: green;text-decoration: underline; fontweight: bold`,
			`color: #222; fontweight: bold`
		);
		compileFile();
	}
}
