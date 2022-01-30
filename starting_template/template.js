/** @param {NS} ns **/
export async function main(ns) {
	var target = "n00dles";
	while (true) {
		var money_threshold = ns.getServerMaxMoney(target) * 0.75;
		var security_threshold = ns.getServerMinSecurityLevel(target) + 5;
		if (ns.getServerSecurityLevel(target) > security_threshold) {
			await ns.weaken(target);
		} else if (ns.getServerMoneyAvailable(target) < money_threshold) {
			await ns.grow(target);
		} else {
			await ns.hack(target);
		}
	}
}