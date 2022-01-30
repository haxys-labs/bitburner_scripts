// weak.js v0.0.1 by haxys

/** @param {NS} ns **/
export async function main(ns) {
	await ns.weaken(ns.args[0]);
}