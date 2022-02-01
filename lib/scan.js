// LibScan v0.2.0 by haxys

/** @param {import("..").NS } ns */
export function get_hosts(ns) {
    /* Scan every host we find, starting from home.
     * Note: This won't find "rogue" systems, if any exist.
     */
    let known_hosts = ["home"];
    for (let index = 0; index < known_hosts.length; index++) {
        let new_hosts = ns.scan(known_hosts[index]).filter(
            x => !known_hosts.includes(x)
        );
        for (const host of new_hosts) {
            known_hosts.push(host);
        }
    }
    return known_hosts;
}