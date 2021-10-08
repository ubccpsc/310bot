# CPSC 310 2021W1 Discord ⊥ (`\bot`)

Known as `@\bot` in our Discord server.

All PRs merged to main go live instantly!
So if you'd like a new bot feature in this discord, add it yourself :eyes:

## Features

### Commands
In all examples below, the prefix has been set to `$`

#### `$help <commandName>?`
Displays the list of commands.
Optionally adding a command name
will make the bot respond with details about the named command.

Example:
```
$help prefix
```

#### `$prefix <newPrefix>`
Updates the prefix which bot will listen to for executing commands.

This prefix should be a single, non-alphanumeric character,
and it should not be one of `@`, `/`, or `#`.

Example:
```
$prefix !
!help
```

#### `$ban <word>` and `$unban`
Bans a word. If someone says this word, they get reassigned to a timeout role for 5 minutes.
The second command unbans the currently banned word.

These commands can only be used by course staff.

Example:
```
$ban an*me
$unban
```

##### `$banned`
This command can be used by everyone to see what word if any is currently banned.

#### `$whobanned`
This command can be used by everyone to see the username of the person who has
requested to ban the current banned world.

#### `$makefunny`
Deepfries a PNG image. Call with the PNG image attached.  

### Other
- **Mention**: Mentioning the bot in a message to a server channel will have it reply to you with usage instructions

## Development

### Contributing
To contribute just make a PR into the `main` branch!

1. Click `Fork` button in the top right of the [GitHub page](https://github.com/ubccpsc/310bot-2021W)
2. Develop your feature and push to your fork
3. Click the `Pull requests` tab and then the `New pull request` in your fork
4. Set the base repo and branch to be `ubccpsc/310bot-2021W` and `main`
5. Click `Create pull request`

### Requirements
- [Node 16](https://nodejs.org/en/)
- [Yarn](https://classic.yarnpkg.com/en/docs/install)

### Configuring Your Environment
- Create a `.env` file and put it in the root directory of the project.
  - This file should _never_ be committed to version control.
- Copy `.env.sample` to the new `.env` file.
- Modify as necessary to your environment.

### Scripts
- **`yarn install`**: Gathers all dependencies. This should be run at the start of development on a new clone in the root.
- **`yarn build`**: Compiles the `.ts` files to `.js` files in the `dist/` dir.
- **`yarn lint`**: Lints the `src/` files.
- **`yarn start`**: Runs the bot.
- **`yarn watch`**: Runs the bot and restarts it if any files are changed.

### API
To create a Listener or Command:
1. Create a file in either the [`src/listeners`](./src/listeners) or [`src/commands`](./src/commands) directory
2. Import the type `Listener` or `Command` from `"@ubccpsc310/bot-base"`
3. Create a `default export` which is of type `Listener` or `Command`

Additionally, available to you is the function `getDatabase()` which provides an object for storing arbitrary JSON in arbitrary tables.

More information is found in the `bot-base` documentation.

See also
- [Discord.js](https://discord.js.org/)
- [bot-base](https://www.npmjs.com/package/@ubccpsc310/bot-base)
