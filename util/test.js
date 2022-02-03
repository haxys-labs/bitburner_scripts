/** @param {NS} ns **/
export async function main(ns) {
    // Basic test file. Just return the args.
	ns.tprint("Args > ", ns.args.join(" "));
}