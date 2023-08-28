oclif-hello-world
=================

oclif example Hello World CLI

[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
[![Version](https://img.shields.io/npm/v/oclif-hello-world.svg)](https://npmjs.org/package/oclif-hello-world)
[![CircleCI](https://circleci.com/gh/oclif/hello-world/tree/main.svg?style=shield)](https://circleci.com/gh/oclif/hello-world/tree/main)
[![Downloads/week](https://img.shields.io/npm/dw/oclif-hello-world.svg)](https://npmjs.org/package/oclif-hello-world)
[![License](https://img.shields.io/npm/l/oclif-hello-world.svg)](https://github.com/oclif/hello-world/blob/main/package.json)

<!-- toc -->
* [Usage](#usage)
* [Commands](#commands)
<!-- tocstop -->
# Usage
<!-- usage -->
```sh-session
$ npm install -g wti-node
$ wti COMMAND
running command...
$ wti (--version)
wti-node/0.0.0 darwin-x64 node-v14.17.0
$ wti --help [COMMAND]
USAGE
  $ wti COMMAND
...
```
<!-- usagestop -->
# Commands
<!-- commands -->
* [`wti hello PERSON`](#wti-hello-person)
* [`wti hello world`](#wti-hello-world)
* [`wti help [COMMAND]`](#wti-help-command)
* [`wti plugins`](#wti-plugins)
* [`wti plugins:inspect PLUGIN...`](#wti-pluginsinspect-plugin)
* [`wti plugins:install PLUGIN...`](#wti-pluginsinstall-plugin)
* [`wti plugins:link PLUGIN`](#wti-pluginslink-plugin)
* [`wti plugins:uninstall PLUGIN...`](#wti-pluginsuninstall-plugin)
* [`wti plugins update`](#wti-plugins-update)

## `wti hello PERSON`

Say hello

```
USAGE
  $ wti hello [PERSON] -f <value>

ARGUMENTS
  PERSON  Person to say hello to

FLAGS
  -f, --from=<value>  (required) Whom is saying hello

DESCRIPTION
  Say hello

EXAMPLES
  $ oex hello friend --from oclif
  hello friend from oclif! (./src/commands/hello/index.ts)
```

_See code: [dist/commands/hello/index.ts](https://github.com/Kyero/wti-node/blob/v0.0.0/dist/commands/hello/index.ts)_

## `wti hello world`

Say hello world

```
USAGE
  $ wti hello world

DESCRIPTION
  Say hello world

EXAMPLES
  $ oex hello world
  hello world! (./src/commands/hello/world.ts)
```

## `wti help [COMMAND]`

Display help for wti.

```
USAGE
  $ wti help [COMMAND] [-n]

ARGUMENTS
  COMMAND  Command to show help for.

FLAGS
  -n, --nested-commands  Include all nested commands in the output.

DESCRIPTION
  Display help for wti.
```

_See code: [@oclif/plugin-help](https://github.com/oclif/plugin-help/blob/v5.1.11/src/commands/help.ts)_

## `wti plugins`

List installed plugins.

```
USAGE
  $ wti plugins [--core]

FLAGS
  --core  Show core plugins.

DESCRIPTION
  List installed plugins.

EXAMPLES
  $ wti plugins
```

_See code: [@oclif/plugin-plugins](https://github.com/oclif/plugin-plugins/blob/v2.1.0/src/commands/plugins/index.ts)_

## `wti plugins:inspect PLUGIN...`

Displays installation properties of a plugin.

```
USAGE
  $ wti plugins:inspect PLUGIN...

ARGUMENTS
  PLUGIN  [default: .] Plugin to inspect.

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Displays installation properties of a plugin.

EXAMPLES
  $ wti plugins:inspect myplugin
```

## `wti plugins:install PLUGIN...`

Installs a plugin into the CLI.

```
USAGE
  $ wti plugins:install PLUGIN...

ARGUMENTS
  PLUGIN  Plugin to install.

FLAGS
  -f, --force    Run yarn install with force flag.
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Installs a plugin into the CLI.

  Can be installed from npm or a git url.

  Installation of a user-installed plugin will override a core plugin.

  e.g. If you have a core plugin that has a 'hello' command, installing a user-installed plugin with a 'hello' command
  will override the core plugin implementation. This is useful if a user needs to update core plugin functionality in
  the CLI without the need to patch and update the whole CLI.

ALIASES
  $ wti plugins add

EXAMPLES
  $ wti plugins:install myplugin 

  $ wti plugins:install https://github.com/someuser/someplugin

  $ wti plugins:install someuser/someplugin
```

## `wti plugins:link PLUGIN`

Links a plugin into the CLI for development.

```
USAGE
  $ wti plugins:link PLUGIN

ARGUMENTS
  PATH  [default: .] path to plugin

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Links a plugin into the CLI for development.

  Installation of a linked plugin will override a user-installed or core plugin.

  e.g. If you have a user-installed or core plugin that has a 'hello' command, installing a linked plugin with a 'hello'
  command will override the user-installed or core plugin implementation. This is useful for development work.

EXAMPLES
  $ wti plugins:link myplugin
```

## `wti plugins:uninstall PLUGIN...`

Removes a plugin from the CLI.

```
USAGE
  $ wti plugins:uninstall PLUGIN...

ARGUMENTS
  PLUGIN  plugin to uninstall

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Removes a plugin from the CLI.

ALIASES
  $ wti plugins unlink
  $ wti plugins remove
```

## `wti plugins update`

Update installed plugins.

```
USAGE
  $ wti plugins update [-h] [-v]

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Update installed plugins.
```
<!-- commandsstop -->
