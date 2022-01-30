import { get_tools_owned } from "/lib/meta";

// LibScan v0.1.1 by haxys

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

export function get_owned_hosts(ns) {
    /* All owned hosts, including:
     *  - home
     *  - rooted
     *  - purchased
     */
    return get_hosts(ns).filter(
        x => ns.hasRootAccess(x)
    );
}

export function get_hackable_hosts(ns) {
    /* Hosts able to be hack()'d. They should:
     *  - be rooted
     *  - not be our home system
     *  - have money
     */
    return get_owned_hosts(ns).filter(
        x => (
            x != "home"
            && (ns.getServerMoneyAvailable(x) > 0)
        )
    );
}

export function get_nukable_hosts(ns) {
    /* Nuking a host requires:
     *  - we don't already have root
     *  - we have an adequate hacking level
     *  - we can open enough ports
     */
    return get_hosts(ns).filter(
        x => (
            !get_owned_hosts(ns).includes(x)
            && (
                ns.getHackingLevel()
                >= ns.getServerRequiredHackingLevel(x)
            ) && (
                get_tools_owned(ns).length
                >= ns.getServerNumPortsRequired(x)
            )
        )
    );
}