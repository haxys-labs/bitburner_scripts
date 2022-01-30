/* WritePort v0.0.2
 * by haxys
 * 
 * WritePort was written to test ClusterFlock.
 */

const USAGE = "\
Usage:\n\
    ./writeport.js [channel] [message type] [message string]\n\
Example:\n\
    ./writeport.js 1 \"TEST\" \"TEST MESSAGE\"\n\
";

/** @param {import("..").NS } ns */
export async function main(ns) {
    if (ns.args.length != 3) {
        ns.tprintf(USAGE);
    } else {
        let channel = parseInt(ns.args[0]);
        if (isNaN(channel)) {
            ns.tprintf(USAGE);
            return;
        }
        let message = JSON.stringify(
            {
                type: ns.args[1],
                message: ns.args[2]
            }
        )
        ns.writePort(channel, message);
    }
}