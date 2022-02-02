// deploy.js v0.0.4 by haxys

const PACKAGES = {
    /* Define all files necessary
     * for each package to run.
     */
	autoscan: [
		"/lib/meta.js",
		"autoscan.js"
	],
	clusterflock: [
        "/lib/meta.js",
		"/ice/nuke.js",
		"clusterflock.js"
	]
};

const USAGE = (
    "Usage:\n\
    ./deploy.js [package or filename] [hostname]\
    \n \nAvailable Packages:\n    "
    + Object.keys(PACKAGES).join("\n    ")
    + "\n \nNote: Requires root access to host."
);

/** @param {import(".").NS } ns */
export async function main(ns) {
	if (ns.args.length == 2) {
        if (Object.keys(PACKAGES).includes(ns.args[0])) {
            // Send and execute a package.
            await ns.scp(PACKAGES[ns.args[0]], ns.args[1]);
            await ns.exec(ns.args[0] + ".js", ns.args[1]);
        } else {
            // Send and execute a script.
            await ns.scp(ns.args[0], ns.args[1]);
            await ns.exec(ns.args[0], ns.args[1]);
        }
	} else {
		ns.tprintf(USAGE);
	}
}