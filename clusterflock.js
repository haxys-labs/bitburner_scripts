const SPLASH = "\
  ___ _         _           ___ _         _   \n\
 / __| |_  _ __| |_ ___ _ _| __| |___  __| |__\n\
| (__| | || (_-<  _/ -_) '_| _|| / _ \\/ _| / /\n\
 \\___|_|\\_,_/__/\\__\\___|_| |_| |_\\___/\\__|_\\_\\\n\
  by haxys                            v0.1.1\
";

/** @param {import(".").NS } ns */
export async function main(ns) {

    async function get_task() {
        // Await a new assignment.
        while(true) {
            let new_task = ns.readPort(1);
            if (new_task != "NULL PORT DATA"){
                return JSON.parse(new_task);
            } else {
                await ns.asleep(1000);
            }
        }
    }

    function del(filename, hostname) {
        ns.run("/util/rm.js", 1, filename, hostname);
    }

    ns.tprintf(SPLASH);
    while(true){
        const task = await get_task();
        switch (task.type) {
            case "TEST":
                ns.tprintf("Test message: %s", task.message);
                continue;
            case "DELETE":
                del(task.filename, task.hostname);
                continue;
            case "NUKABLE":
                for (const target of task.hosts) {
                    ns.run("/ice/nuke.js", 1, target);
                }
                continue;
            default:
                ns.tprintf("Unknown task: %s", JSON.stringify(task));
        }
    }
}
