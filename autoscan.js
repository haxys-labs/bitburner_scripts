import { get_nukable_hosts } from "/lib/meta";

/* AutoScan v0.1.2
 * by haxys
 * 
 * Nuke hosts that haven't been nuked.
 * More to come.
 */

/** @param {import(".").NS } ns */
export async function main(ns) {
    async function send_hosts_to_c2(msg_type, target_hosts) {
        const message = {
            type: msg_type,
            hosts: target_hosts
        };
        let json_msg = JSON.stringify(message);
        await ns.writePort(1, json_msg);
    }

    async function launch_nukes() {
        // Nuke all possible targets.
        send_hosts_to_c2("NUKABLE", get_nukable_hosts(ns));
    }

    // Give run.js time to die.
    await ns.asleep(500);
    if(ns.fileExists("run.js","home")) {
        const message = {
            type: "DELETE",
            filename: "run.js",
            hostname: "home"
        }
        let json_msg = JSON.stringify(message);
        await ns.writePort(1, json_msg);
    }
    // Execute main loop.
    while(true) {
        await launch_nukes();
        await ns.asleep(1000);
    }
}