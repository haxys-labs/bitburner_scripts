// exec.js v0.0.1 by haxys

/** @param {import("..").NS } ns */
export async function main(ns) {
    let script = ns.args[0];
    let host = ns.args[1];
    let threads = parseInt(ns.args[2]);
    let passed_params = ((ns.args.length > 3)? ns.args.slice(3) : []);
    let params = [script, host, threads, ...passed_params];
    ns.exec(...params);
}