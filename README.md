# BitBurner Scripts

This repo collects the scripts I've written for [BitBurner](https://danielyxie.github.io/bitburner/).

For license information, read the LICENSE file.

## Beginner Template

The `starting_template/template.js` file is a starting JavaScript file for getting started with BitBurner scripting.

## ClusterFlock

The `ClusterFlock` suite is designed to automate as much as possible from ground zero. To launch, download and execute `install.js`, which will take care of the rest:

```
wget https://raw.githubusercontent.com/haxys-labs/bitburner_scripts/main/install.js install.js
./install.js
```

## Packages

The `deploy.js` script is capable of deploying script packages to other hosts. The following packages have been created:

* `clusterflock` - A utility for automating the BitBurner game.
    * Requires `ice/nuke.js` and `lib/meta.js`.

These packages are intended to be run as daemons.

## Scripts

Besides the more complex deployable packages, this repository also includes useful tools.

* `deploy.js` - Deploys and executes packages and scripts on remote hosts.
* `netscan.js` - Reveals owned, hackable, and nukable hosts.
    * Requires `lib/meta.js`.

## Ice

"Ice" are tools which execute a specific action on a specific host.

* `ice/exec.js` - Execute a script on a target host.
* `ice/hack.js` - Hack the target to steal money.
* `ice/grow.js` - Grow the target's money.
* `ice/nuke.js` - Run `NUKE.exe` on the target.
    * Requires `lib/meta.js`.
* `ice/weak.js` - Weaken the target.

## Libraries

The files in the `lib` directory provide useful functions for other scripts.

* `lib/meta.js` - Functions for gathering general info.
    * `get_hosts(ns)` - Get a list of all hosts in the game.
    * `get_hackable_hosts(ns)` - Get a list of hosts that can be hacked for money.
    * `get_nukable_hosts(ns)` - Get a list of hosts which are ready to be nuked for root.
    * `get_owned_hosts(ns)` - Get a list of hosts allowing code execution.
    * `get_tools_owned(ns)` - Get a list of all port-opening tools currently owned.
    * `scrape_hosts(ns)` - Retrieve all static data about all hosts in the network.

## Utilities

* `util/rm.js` - A script encapsulation of the `ns.rm()` function.
* `util/send.js` - Send files to a target host.
* `util/sscrape.js` - Used to scrape static data for all servers in the game.
* `util/writeport.js` - Used for testing `clusterflock`.