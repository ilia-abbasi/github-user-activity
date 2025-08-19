# github user activity
**The project assignment for roadmap.sh**

This program uses github API to retrieve information about a user.

The information consists of events, ID and emails. Events are actions that a user takes,
e.g. pushing commits, opening or closing issues, creating repositories etc. This
program does not yet show all the events, but they will be added later.
ID is the unique number for each account on github. Emails are the emails connected to
each commit that has been made by that user.

## Installation

1. Clone the repository:
   ```sh
   git clone https://github.com/ilia-abbasi/github-user-activity.git
   cd github-user-activity
   ```

You must have **Node.js** and **NPM** already installed.

## Usage

- Run with:
   ```sh
   npm run start username
   ```

- Use `h` or `help` flag to get a list of options:
  ```sh
  npm run start h
  ```

- Use `v` or `verbose` flag for verbose mode:
  ```sh
  npm run start username v
  ```

- Use `s` or `save` flag to save the results in the `logs/` directory:
  ```sh
  npm run start username s
  ```

- You are allowed to use multiple flags:
  ```sh
  npm run start username v s
  ```

## Dependencies

There are no dependencies, but:
The source code is formatted with [Prettier](https://prettier.io/).

---

github-user-activity is licensed under the [GPL-3.0 license](https://github.com/ilia-abbasi/github-user-activity/blob/main/LICENSE).
