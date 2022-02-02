/* run.js by haxys
 * Install and launch the ClusterFlock automation suite.
 */

const SPLASH = "\
                     _\n\
 _ __ _   _ _ __    (_)___\n\
| '__| | | | '_ \\   | / __|\n\
| |  | |_| | | | |_ | \\__ \\\n\
|_|   \\__,_|_| |_(_)/ |___/\n\
 v0.1.1 by haxys  |__/\
";
const BASE_URL = "https://raw.githubusercontent.com/haxys-labs/bitburner_scripts/main/";

/** @param {import(".").NS } ns */
export async function main(ns) {
    ns.tprintf(SPLASH);
    ns.tprintf("Installing ClusterFlock...");
    await install_clusterflock();

    ns.tprintf("Cleaning up files...");
    del("MANIFEST.txt");
    await ns.asleep(200);

    ns.tprintf("Launching ClusterFlock...");
    ns.run("clusterflock.js");
    await ns.asleep(800);

    ns.tprintf("Launching AutoScan...");
    ns.run("autoscan.js");
    ns.tprintf("Installation complete!");

    function del(filename) {
        ns.run("/util/rm.js", 1, filename);
    }

    async function download(filename) {
        await ns.wget(
            BASE_URL + filename,
            (filename.includes("/")? "/" + filename : filename),
            "home"
        );
    }

    async function get_manifest() {
        // Retrieve, read, clean, return.
        await download("MANIFEST.txt");
        let manifest = ns.read("MANIFEST.txt").split("\n");
        return manifest;
    }

    async function install_clusterflock() {
        for (const filename of await get_manifest()) {
            if (filename[0] != "#") { // The manifest can contain comments.
                await download(filename);
            }
        }
    }
}