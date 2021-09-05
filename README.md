# CPSC 310 2021W1 Discord ⊥ (`\bot`)

Known as `@\bot` in our Discord server.

All PRs merged to main go live instantly!
So if you've like a new bot feature in this discord, add it yourself :eyes:

## Contributing

To contribute just make a PR into the `main` branch!

1. Click `Fork` button in the top right of the [GitHub page](https://github.com/jyoo980/310bot-2021W)
2. Develop your feature and push to your fork
3. Click the `Pull requests` tab and then the `New pull request` in your fork
4. Set the base repo and branch to be `ubccpsc/310bot-2021W` and `main`
5. Click `Create pull request`

## API

To create a Listener or Command:
1. Create a file in either the [`src/listeners`](./src/listeners) or [`src/commands`](./src/commands) directory
2. Import the type `Listener` or `Command` from `"@ubccpsc310/bot-base"`
3. Create a `default export` which is of type `Listener` or `Command`

Additionally, available to you is the function `getDatabase()` which provides an object for storing arbitrary JSON in arbitrary tables.

More information is found in the `bot-base` documentation.

See also
- [Discord.js](https://discord.js.org/)
- [bot-base](https://www.npmjs.com/package/@ubccpsc310/bot-base)
