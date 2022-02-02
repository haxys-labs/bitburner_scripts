import { get_hackable_hosts, get_nukable_hosts } from "/lib/meta";

/* AutoScan v0.2.2 by haxys
 * Automate BitBurner activities.
 */

/** @param {import(".").NS } ns */
export async function main(ns) {
    await let_run_script_die();
    await event_loop();

    async function event_loop() {
        while (true) {
            await launch_nukes();
            await hack_the_planet();
            await ns.asleep(1000);
        }
    }

    async function hack_the_planet() {
        // Attack all possible targets.
        process_hosts("HACKABLE", get_hackable_hosts(ns));
    }

    async function launch_nukes() {
        // Nuke all possible targets.
        process_hosts("NUKABLE", get_nukable_hosts(ns));
    }

    async function let_run_script_die() {
        await ns.asleep(500);
        if (ns.fileExists("run.js", "home")) {
            const message = {
                type: "DELETE",
                filename: "run.js",
                hostname: "home"
            };
            await send_message_to_c2(message);
        }
    }

    async function process_hosts(message, hosts) {
        if (hosts.length > 0) {
            send_hosts_to_c2(message, hosts);
        }
    }

    async function send_hosts_to_c2(msg_type, target_hosts) {
        const message = {
            type: msg_type,
            hosts: target_hosts
        };
        await send_message_to_c2(message);
    }

    async function send_message_to_c2(message) {
        let json_msg = JSON.stringify(message);
        await ns.writePort(1, json_msg);
    }
}