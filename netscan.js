import { get_owned_hosts, get_hackable_hosts, get_nukable_hosts } from "/lib/meta";

const SPLASH = "\
     __     _   __                 \n\
  /\\ \\ \\___| |_/ _\\ ___ __ _ _ __  \n\
 /  \\/ / _ \\ __\\ \\ / __/ _` | '_ \\ \n\
/ /\\  /  __/ |__\\ \\ (_| (_| | | | |\n\
\\_\\ \\/ \\___|\\__\\__/\\___\\__,_|_| |_|\n\
  by haxys                 v0.1.2\
";

/** @param {import(".").NS } ns */
export async function main(ns) {
    function print_hosts(hosts) {
        for (const host of hosts) {
            ns.tprintf("🖥   %s", host);
        }
    }
    const owned_hosts = get_owned_hosts(ns);
    const hackable_hosts = get_hackable_hosts(ns);
    const nukable_hosts = get_nukable_hosts(ns);
    ns.tprintf(SPLASH);
    ns.tprintf("Owned Hosts:");
    print_hosts(owned_hosts);
    ns.tprintf(" \nHackable Hosts:")
    print_hosts(hackable_hosts);
    ns.tprintf(" \nNukable Hosts:");
    print_hosts(nukable_hosts);
}
