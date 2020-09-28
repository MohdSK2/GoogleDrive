# K2 Google Drive JSSP Broker

This project provides a JSSP broker for Google Drive functionality.

## Getting Started

This template requires [Node.js](https://nodejs.org/) v12.14.1+ to run.

Install the dependencies and devDependencies:

```bash
npm install
```

See the documentation for [@k2oss/k2-broker-core](https://www.npmjs.com/package/@k2oss/k2-broker-core)
for more information about how to use the broker SDK package.

### Running Unit Tests

To run the unit tests, run:

```bash
npm test
```

You can also use a development build, for debugging and coverage gutters:

```bash
npm run test:dev
```

You will find the code coverage results in [coverage/index.html](./coverage/index.html).

### Building your bundled JS

When you're ready to build your broker, run the following command

```bash
npm run build
```

You will find the results in the [dist/index.js](./dist/index.js).

### Creating a service type

Once you have a bundled .js file, upload it to your repository (anonymously
accessible) and register the service type using the system SmartObject located
at System > Management > SmartObjects > SmartObjects > JavaScript Service
Provider and run the Create From URL method.

## Contributions

Thank you for you interest to contribute to this JSSP Broker. This section explains some of the things you need to keep in mind when contributing. This will both help you be successful in submitting your contribution, as well as make our lives a bit easier.

### Issue Tracker

Please check if your issue hasn't been reported before by checking the [current issues](https://github.com/k2workflow/GoogleDrive/issues). If your issue already exists then please add extra information or show that you have the same issue/want this feature by adding a `:+1:`.

If your issue is not there, feel free to open a new issue.

### Feature Requests

If you have a feature request that doesn't already exist, then please add one to the list. Please be as detailed as possible. Please remember that we're creating Service Objects with Methods and Properties and that we really can't read your mind. So, state the obvious and also don't be afraid to explain /why/ you need the functionality.

### Filing an issue or bug

If you do have a problem with the broker and want help, then please provide the following information in the issue:

- Version of the broker that you're using
- How you got the JSSP broker
- Reproduction steps - Please explain which service object method you're executing and what the input properties are.
- Expected behavior - explain what you expect to happen.
- Any error messages that you're getting. Really, don't try to skimp on the screenshot or so. Provide as much detail as you can.

### Creating a pull request

If you're lucky enough to be able to add functionality yourself, or fix an issue yourself, then please keep in mind:

- Make a pull request with a clear title. "Fix #1233" is not clear.
- Describe what the fix/feature does.
- Make sure any documentation is updated.
- Make sure there is a test for new functionality. We will reject new service object methods that do not have a test.
- Create the pull request against the master branch.
- If you fix an issue, then please include "Closed #XXX" in the message.

### Coding guidelines

We tend to use VS code. The `.vscode` folder already indicated that. Furthermore we use [prettier](https://prettier.io/) for code formatting. VS code should be configured to format your code when you save your file. Please stick to the default code formatting of prettier.

## License

MIT, found in the [LICENSE](./LICENSE) file.
