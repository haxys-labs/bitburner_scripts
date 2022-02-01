import { get_hosts } from "/lib/scan";

// LibMeta v0.1.0 by haxys

/** @param {import(".").NS } ns */
export function get_tools_owned(ns) {
    const available_tools = [
        "BruteSSH.exe",
        "FTPCrack.exe",
        "HTTPWorm.exe",
        "relaySMTP.exe",
        "SQLInject.exe"
    ];
    return available_tools.filter(
        x => ns.fileExists(x, "home")
    );
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

export function scrape_hosts(ns) {
    let scraped_hosts = {};
    for (const host of get_hosts(ns)) {
        const server = ns.getServer(host);
        let host_data = {
            cpuCores: server.cpuCores,
            minDifficulty: server.minDifficulty,
            moneyMax: server.moneyMax,
            numOpenPortsRequired: server.numOpenPortsRequired,
            requiredHackingSkill: server.requiredHackingSkill,
            serverGrowth: server.serverGrowth
        };
        scraped_hosts[host] = host_data;
    }
    return scraped_hosts;
}