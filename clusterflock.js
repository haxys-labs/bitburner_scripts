const SPLASH = " \n\
  ___ _         _           ___ _         _   \n\
 / __| |_  _ __| |_ ___ _ _| __| |___  __| |__\n\
| (__| | || (_-<  _/ -_) '_| _|| / _ \\/ _| / /\n\
 \\___|_|\\_,_/__/\\__\\___|_| |_| |_\\___/\\__|_\\_\\\n\
  by haxys                            v0.2.5\
";

const SLEEP_DELAY = 1.0; // Seconds between peek checks.

/** @param {import(".").NS } ns */
export async function main(ns) {
    const hackable_hostfile = "/data/hackable_hosts.txt";

    ns.tprint(SPLASH);
    while(true){
        const task = await peek_task();
        await process_task(task);
        pop_task();
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

    async function process_task(task) {
        let func = get_function(task.type);
        await func(task);

        function get_function(task_type) {
            // Return the appropriate function to handle the given task.
            const task_functions = {
                DELETE: task_delete,
                HACKABLE: task_hackable,
                NUKABLE: task_nukable,
                TEST: task_test,
                DEFAULT: task_default
            };
            if (Object.keys(task_functions).includes(task_type)) {
                return task_functions[task_type];
            }
            return task_functions["DEFAULT"];
        }
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
    
    async function task_delete(task) {
        ns.run("/util/rm.js", 1, task.filename, task.hostname);
    }
    
    async function task_hackable(task) {
        let hackable_hosts = read_list(hackable_hostfile);
        hackable_hosts = unique(
            hackable_hosts.concat(task.hosts)
        );
        await write_list(hackable_hostfile, hackable_hosts);
    }
    
    async function task_nukable(task) {
        for (const target of task.hosts) {
            ns.run("/ice/nuke.js", 1, target);
        }
    }

    async function task_test(task) {
        ns.tprint("Test message: %s", task.message);
    }

    async function task_default(task) {
        ns.tprint("Unknown task: %s", JSON.stringify(task));
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
