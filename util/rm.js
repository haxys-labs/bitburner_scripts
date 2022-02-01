/* rm.js v0.1.0 by haxys
 * Remove a file.
 */

/** @param {NS} ns **/
export async function main(ns) {
	if (ns.args.length == 0) {
		ns.tprintf("Usage: rm.js [filename] [hostname]");
	} else {
		const filename = ns.args[0];
		if (ns.args.length > 1) {
			const hostname = ns.args[1];
			ns.rm(filename, hostname);
		} else {
			ns.rm(filename);
		}
	}
}