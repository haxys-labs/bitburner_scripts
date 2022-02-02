const SPLASH = "\
  ___ _         _           ___ _         _   \n\
 / __| |_  _ __| |_ ___ _ _| __| |___  __| |__\n\
| (__| | || (_-<  _/ -_) '_| _|| / _ \\/ _| / /\n\
 \\___|_|\\_,_/__/\\__\\___|_| |_| |_\\___/\\__|_\\_\\\n\
  by haxys                            v0.2.3\
";

const SLEEP_DELAY = 1.0; // Seconds between peek checks.

/** @param {import(".").NS } ns */
export async function main(ns) {
    ns.tprintf(SPLASH);
    while(true){
        await process_tasks();
    }

    async function peek_task() {
        // Await a new assignment.
        let new_task = ns.peek(1);
        while (new_task == "NULL PORT DATA") {
            await ns.asleep(SLEEP_DELAY * 1000);
            new_task = ns.peek(1);
        }
        return JSON.parse(new_task);
    }

    function pop_task() {
        // Clear the completed task from the queue.
        ns.readPort(1);
    }

    async function process_tasks() {
        const task = await peek_task();
        switch (task.type) {
            case "DELETE":
                ns.run("/util/rm.js", 1, task.filename, task.hostname);
                break;
            case "HACKABLE":
                ns.tprint("Hackable - ", task.hosts);
                break;
            case "NUKABLE":
                for (const target of task.hosts) {
                    ns.run("/ice/nuke.js", 1, target);
                }
                break;
            case "TEST":
                ns.tprintf("Test message: %s", task.message);
                break;
            default:
                ns.tprintf("Unknown task: %s", JSON.stringify(task));
        }
        pop_task();
    }
}
