/* rm.js v0.0.1 by haxys
 * Remove a file.
 */

/** @param {NS} ns **/
export async function main(ns) {
	try {
		ns.rm(ns.args[0]);
	} catch (error){
		ns.tprintf("Error: %s", error);
	}
}