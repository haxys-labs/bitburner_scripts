const SPLASH = " \n\
  ___ _         _           ___ _         _   \n\
 / __| |_  _ __| |_ ___ _ _| __| |___  __| |__\n\
| (__| | || (_-<  _/ -_) '_| _|| / _ \\/ _| / /\n\
 \\___|_|\\_,_/__/\\__\\___|_| |_| |_\\___/\\__|_\\_\\\n\
  by haxys                            v0.2.4\
";

const SLEEP_DELAY = 1.0; // Seconds between peek checks.

/** @param {import(".").NS } ns */
export async function main(ns) {
    const hackable_hostfile = "/data/hackable_hosts.txt";

    ns.tprint(SPLASH);
    while(true){
        await process_tasks();
    }

    async function peek_task() {
        // Await a new assignment.
        let new_task = ns.peek(1);
        while (new_task == "NULL PORT DATA") {
            await take_a_nap();
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
                let hackable_hosts = read_list(hackable_hostfile);
                hackable_hosts = unique(
                    hackable_hosts.concat(task.hosts)
                );
                await write_list(hackable_hostfile, hackable_hosts);
                break;
            case "NUKABLE":
                for (const target of task.hosts) {
                    ns.run("/ice/nuke.js", 1, target);
                }
                break;
            case "TEST":
                ns.tprint("Test message: %s", task.message);
                break;
            default:
                ns.tprint("Unknown task: %s", JSON.stringify(task));
        }
        pop_task();
    }

    function read_list(filename) {
        try {
            let contents = ns.read(filename);
            let items = contents.split("\n").filter(
                x => x.length > 0
            );
            return items;
        } catch (error) {
            ns.tprint("Error reading file: ", filename);
            return [];
        }
    }

    async function take_a_nap() {
        await ns.asleep(SLEEP_DELAY * 1000);
    }

    function unique(data_list) {
        let unique_list = [];
        for (const item of data_list) {
            if (!unique_list.includes(item)) {
                unique_list.push(item);
            }
        }
        return unique_list;
    }

    async function write_list(filename, data_list) {
        let contents = data_list.join("\n");
        await ns.write(filename, contents, "w");
    }
}
