// send.js v0.0.2 by haxys
// Usage: ./util/send.js [hostname] [filename(s)]

/** @param {import("..").NS } ns */
export async function main(ns) {
    // Send something somewhere.
    let files = ns.args.slice(1);
    let destination = ns.args[0];
    await ns.scp(files, destination);
}