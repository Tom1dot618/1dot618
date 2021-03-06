## Create svelte-kit app

npm init svelte@next 1dot618

cd 1dot618
npm install (or pnpm install, etc)
git init && git add -A && git commit -m "Initial commit" (optional)
npm run dev -- --open

## Netlify

npm install -D @sveltejs/adapter-netlify@next

## svelte.config.js

# netlify adapter

import adapter from '@sveltejs/adapter-netlify';

export default {
kit: {
adapter: adapter()
}
};

# edge functions

export default {
kit: {
adapter: adapter({
edge: true
})
}
};

# Netlify.toml

[build]
command = "npm run build"
publish = "build"

# local dev

npm install netlify-cli -g

netlify
netlify login

config.json location: Library/Preferences/netlify/config.json
NETLIFY_AUTH_TOKEN (personal acces token)

netlify --telemetry-disable
netlify --telemetry-enable

netlify init
netlify init --manual

netlify dev
netlify dev --live

netlify build
netlify build --dry
netlify build --context deploy-preview

netlify deploy
netlify deploy --dir=\_site --functions=functions
netlify deploy --prod

netlify link
netlify unlink
NETLIFY_SITE_ID (ENV)

DEBUG=\* netlify deploy

netlify help
netlify help deploy
netlify help sites:create

git push Push to your git repository to trigger new site builds
netlify open Open the Netlify admin URL of your site

# Netlify docs

https://docs.netlify.com/integrations/frameworks/sveltekit/
https://github.com/sveltejs/kit/tree/master/packages/adapter-netlify
https://docs.netlify.com/cli/get-started/#run-a-local-development-environment

# functions

npm install @netlify/functions

##planetscale
brew install planetscale/tap/pscale
brew install mysql-client

scoop update pscale
$env:path += ";C:\Program Files\MySQL\MySQL Server 8.0\bin"

pscale --help
pscale version

# create-svelte

Everything you need to build a Svelte project, powered by [`create-svelte`](https://github.com/sveltejs/kit/tree/master/packages/create-svelte).

## Creating a project

If you're seeing this, you've probably already done this step. Congrats!

```bash
# create a new project in the current directory
npm init svelte

# create a new project in my-app
npm init svelte my-app
```

## Developing

Once you've created a project and installed dependencies with `npm install` (or `pnpm install` or `yarn`), start a development server:

```bash
npm run dev

# or start the server and open the app in a new browser tab
npm run dev -- --open
```

## Building

To create a production version of your app:

```bash
npm run build
```

You can preview the production build with `npm run preview`.

> To deploy your app, you may need to install an [adapter](https://kit.svelte.dev/docs/adapters) for your target environment.
