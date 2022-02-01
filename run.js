/* run.js by haxys
 * Trigger the launch of the bitburner automation suite.
 * The goal is to automate everything in bitburner from ground zero.
 */

const SPLASH = "\
                     _\n\
 _ __ _   _ _ __    (_)___\n\
| '__| | | | '_ \\   | / __|\n\
| |  | |_| | | | |_ | \\__ \\\n\
|_|   \\__,_|_| |_(_)/ |___/\n\
 v0.0.1 by haxys  |__/\
";

/** @param {import(".").NS } ns */
export async function main(ns) {
    async function grab(filename) {
        const base_url = "https://raw.githubusercontent.com/haxys-labs/bitburner_scripts/main";
        await ns.wget(base_url + filename, filename, "home");
    }
    // The files are hosted on GitHub.

    ns.tprintf(SPLASH);
    
    // Retrieve the latest manifest file.
    await grab("MANIFEST.txt");
    let manifest = ns.read("MANIFEST.txt").split("\n");

    // Retrieve all other necessary files.
    for (filename of manifest) {
        if (filename[0] != "#") {
            await grab(filename);
        }
    }

    // Remove manifest file.
    ns.rm("MANIFEST.txt", "home");
}