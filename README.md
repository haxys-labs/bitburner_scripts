# BitBurner Scripts

This repo collects the scripts I've written for [BitBurner](https://danielyxie.github.io/bitburner/).

For license information, read the LICENSE file.

## Packages

The `deploy.js` script is capable of deploying script packages to other hosts. The following packages have been created:

* `clusterflock` - A utility for managing a distributed automation suite.
    * Works with `autoscan` to automatically nuke available hosts.
    * Requires `ice/nuke.js`.
* `autoscan` - A utility for scanning networks for actionable hosts.
    * Detects nukable hosts, reporting them to `clusterflock`.
    * Requires `lib/meta.js` and `lib/scan.js`.

These packages are intended to be run as daemons.

## Scripts

Besides the more complex deployable packages, this repository also includes useful tools.

* `netscan.js` - Reveals owned, hackable, and nukable hosts.
    * Requires `lib/meta.js` and `lib/scan.js`.
* `deploy.js` - Deploys and executes packages and scripts on remote hosts.

## Ice

"Ice" are tools which execute a specific action on a specific host.

* `ice/hack.js` - Hack the target to steal money.
* `ice/grow.js` - Grow the target's money.
* `ice/nuke.js` - Run `NUKE.exe` on the target.
* `ice/weak.js` - Weaken the target.

## Libraries

The files in the `lib` directory provide useful functions for other scripts.

* `lib/meta.js` - Functions for gathering general info.
    * `get_tools_owned(ns)` - Get a list of all port-opening tools currently owned.
* `lib/scan.js` - Functions for finding targets.
    * `get_hosts(ns)` - Get a list of all hosts in the game.
    * `get_owned_hosts(ns)` - Get a list of hosts allowing code execution.
    * `get_hackable_hosts(ns)` - Get a list of hosts that can be hacked for money.
    * `get_nukable_hosts(ns)` - Get a list of hosts which are ready to be nuked for root.

## Utilities

* `util/writeport.js` - Used for testing `clusterflock`.