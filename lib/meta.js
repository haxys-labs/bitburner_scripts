// LibMeta v0.0.2 by haxys

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
