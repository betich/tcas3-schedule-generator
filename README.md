# Next.js App

This is project was bootstrapped with [betich's](https://github.com/betich/next-boilerplate) Next.js boilerplate template.

![Code Structure](https://user-images.githubusercontent.com/28398789/132000250-328bdc52-2036-4d1c-825c-c23aaff3defa.png)

## Instructions

Below are ways to start your project with this boilerplate.

1. Use `degit` to clone the repo
```bash
npx degit betich/next-boilerplate your-app-name
cd your-app-name
git branch -m master main
npm i
```

2. Clone the repo with git
```bash
git clone https://github.com/betich/next-boilerplate your-app-name
cd your-app-name
npm i
```

## Features

1. Typescript alias paths

```ts
import { Header } from "@components/Main"
import { User } from "@types"
```

We've added alias paths for
- `src/@types` => `@types`
- `src/components` => `@components`
- `src/styles` => `@styles`
- `src/elements` => `@elements`
- `src/utils` => `@utils`

2. Prettier

Prettier is a popular code formatting tool. You can customise how prettier works by editing the `.prettierrc` file.

## Optional

1. sass/scss
```bash
npm i sass -D
```
Next.js will do the rest for you.
