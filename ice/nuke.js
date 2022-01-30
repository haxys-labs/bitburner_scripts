import { get_tools_owned } from "/lib/meta";

// nuke.js v0.1.1 by haxys

/** @param {import("..").NS } ns */
export async function main(ns) {
    let target = ns.args[0];
    // Open all possible ports.
    for (const tool of get_tools_owned(ns)) {
        switch (tool) {
            case "BruteSSH.exe":
                await ns.brutessh(target);
                continue;
            case "FTPCrack.exe":
                await ns.ftpcrack(target);
                continue;
            case "HTTPWorm.exe":
                await ns.httpworm(target);
                continue;
            case "relaySMTP.exe":
                await ns.relaysmtp(target);
                continue;
            case "SQLInject.exe":
                await ns.sqlinject(target);
                continue;
        }
    }
    // Hack the planet!
    await ns.nuke(target);
    ns.toast("☢ " + target + " nuked!");
}