# Contributing

We openly welcome contributions as open source is always better as a team effort. We simply ask that all contributors start by reading this guide.

## Table of Contents

*   [Development](#development)
    *   [Getting Started](#getting-started)
    *   [Testing](#testing)
*   [Pull Requests](#pull-requests)
*   [License](#license)

## Development

### Getting Started

The first thing you'll need to do is [fork this project][fork-repo]. Once that is complete you can run the following script in the directory in which you want to clone this project, replacing `<USERNAME>` with the Github username in which you forked this repository under.

**HTTPS**

```bash
git clone https://github.com/<USERNAME>/vmdom.git
cd vmdom
git remote add upstream https://github.com/dogma-io/vmdom.git
```

**SSH**

```bash
git clone git@github.com:<USERNAME>/vmdom.git
cd vmdom
git remote add upstream git@github.com:dogma-io/vmdom.git
```

Once you've cloned the project with one of the above you can run either `yarn install` or `npm install` from the root project directory, depending on which package manager you prefer. At this point you are ready to begin running tests and hacking away to add awesome new features or fix any bugs you come across.

### Testing

To run the entire test suite simply run the following command:

**npm**

```bash
npm test
```

**yarn**

```bash
yarn test
```

> Note: This command runs linting, type checking, and unit tests. If you want to just run one of these you can use the below commands:

**npm**

```bash
$(npm bin)/lintly # linting
$(npm bin)/flow # type checking
$(npm bin)/jest # unit tests
```

**yarn**

```bash
yarn run lintly # linting
yarn run flow # type checking
yarn run jest # unit tests
```

After you've run the test suite you can view the code coverage by running:

```bash
open coverage/lcov-report/index.html
```

## Pull Requests

Pull requests should be kept as small as possible, fixing a single bug or adding a single piece of functionality. If you plan to address multiple bugs or add multiple features please submit each one in a separate pull request. Before you submit a pull request make sure you adhere to these guidelines:

1.  If you are fixing a bug you should add tests that fail without the fix applied and pass with the fix applied.
2.  If you are adding new functionality you should add full test coverage of the new functionality as well as update the docs as necessary.
3.  Before your pull request is landed all commits in your pull request should be squashed into a single commit.
4.  If this is your first contribution to the project make sure to add yourself to the [contributors section of the package.json][package-contributors].

## License

By contributing to this project, you agree that your contributions will be licensed under this project's [MIT license](LICENSE.md).

[fork-repo]: https://github.com/dogma-io/vmdom#fork-destination-box
[package-contributors]: https://docs.npmjs.com/files/package.json#people-fields-author-contributors
