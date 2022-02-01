import { scrape_hosts } from "/lib/meta";

/* Scraper v0.0.1 by haxys
 * Extract all useful information from all hosts
 * in order to prevent excessive script memory
 */

/** @param {import(".").NS } ns */
export async function main(ns) {
    await save_scraped_hosts(ns, scrape_hosts(ns));
}

async function save_scraped_hosts(ns, scraped_hosts) {
    await ns.write("servers.txt", JSON.stringify(scraped_hosts), "w");
    if (ns.getHostname() != "home") {
        await ns.scp("servers.txt", "home");
        ns.rm("servers.txt");
    }
}
