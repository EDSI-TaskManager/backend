# Task Manager API

## Description

> Employee task management app built with [NestJS](https://github.com/nestjs/nest) framework.

#
## Project Setup
<br>

## Other required software

- [MySQL Database](https://dev.mysql.com/downloads/installer/)
  - Add MySQL Workbench during installation (Recommended).

## Installation

```bash
# NestJS CLI
$ npm install -g @nestjs/cli

$ npm install
```

## Running the app

```bash
# development
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Documentation
- [NestJS Docs](https://docs.nestjs.com/)
- Swagger
  - http[]()://localhost:3000/swagger

***

## Coding Conventions

- Language
  - Only English.
- Style Guide
  - Respect the ESLint configurations.
  - [Prettier extension for VSCode](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode) recommended to follow formatting rules.

***

## Branch Guide

- Develop
  -

  - Development branch.
  - All WIP (Work In Progress) features must be pushed to this branch.

- Staging
  -

  - Branch for staging environment. Automatic deploy to Heroku.
  - Merge from Develop: finished implemented features.

- Master
  -

  - Branch for production environment. Automatic deploy to Heroku.
  - Merge from Staging: must be made from a Pull Request from Staging branch only.

***

## License

Nest is [MIT licensed](LICENSE).
