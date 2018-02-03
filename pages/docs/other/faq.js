import markdown from 'markdown-in-js'
import withDoc, { components } from '../../../lib/with-doc'

import { sergio } from '../../../lib/data/team'
import Now from '../../../components/now/now'
import { Code } from '../../../components/text/code'
import { TerminalInput } from '../../../components/text/terminal'

// prettier-ignore
export default withDoc({
  title: 'Frequently Asked Questions',
  date: '30 Jan 2018',
  authors: [sergio],
  editUrl: 'pages/docs/other/faq.js',
})(markdown(components)`

## How do I deploy and alias in a single command?

Create a [configuration file](/docs/features/configuration) with the keys [alias](/docs/features/configuration#alias-(string|array)) and [name](/docs/features/configuration#name-(string)) similar to this one:

${<Code>{`{
  "name": "my-app",
  "alias": "my-app.now.sh"
}`}</Code>}

Then run the following command:

${<TerminalInput>now && now alias</TerminalInput>}

It will deploy your application under the configured name and then alias the latest deployment with the configured alias.

### How do I remove the old deployment?

Note that you do not really need to do it, the old deployment will eventually [freeze](/docs/guides/app-lifecycle-and-scalability#instances-&-scaling) and, if you keep it, it can let you rollback easily by just changing the alias.

But if you still want to do it it is possible using the following command:

${<TerminalInput>now rm my-app --safe --yes</TerminalInput>}

The command will remove all the non aliased deployment of the project with the name \`my-app\`. This can be run after \`now alias\` command to remove the previous deployment of the project.

${<TerminalInput>now && now alias && npm run my-app --safe --yes</TerminalInput>}

## How do I pick the deployment region(s) for my application?

For the moment ${<Now color="#000" />} only has support for one region called [SFO](https://sfo.now.sh).

We will eventually enable another region in Europe called [BRU](https://bru.now.sh). And more regions in the future.

## How do I change my account's email address?

Contact us at [support@zeit.co](mailto:support@zeit.co?subject=Email%20change) from your account email address letting us know what is your desired email address. We will send an email with validations codes similars to \`Sparkling Red-handed Tamarin\` to each address, after receiving a response with the codes we can procede with the change.

## What are the hardware specifications of the deployment instances?

Each instance has up to 1GB of RAM and 1 CPU in [any paid plan](/pricing).

For deployments under the OSS plan they have half of those resources.

The storage limit is defined under the pricing table.

### How do I allocate more resources for my application?

For the moment there is no way to change that, it is on the roadmap however.

For [enterprise customers](mailto:enterprise@zeit.co?subject=Custom%20Hardware%20Resources) we can offer customizations including better hardware.

## How do I update my deployment's files or code?

Deployments are immutable, this mean they can not be modified after created, to update your application you need to deploy the new version using the command \`now\`, after that you will get a new unique deployment URL similar to \`my-app-hjrehxuuih.now.sh\`.

This model enable a few interesting benefits

- **Easy rollback**${<br />}
  You can just move your alias to the old deployment to have immediate rollbacks.
- **Staging and Production deployments**${<br />}
  A new deployment gives you a unique URL you can use as staging, share it with co-workers or clients and then after it is confirmed it works you can upgrade it to production with a single command, \`now alias\`.
- **Zero-Downtime deployment**${<br />}
  Most technologies will require your server to be restarted (eg. Node.js). Thanks to ${<Now color="#000" />} gives you a new deployment you can wait until the deployment is ready to change the alias and avoid any downtime in the deployment process.

## Can I run a database on the Now platform?

Now deployments **must** expose a [single](http://localhost:5800/docs/deployment-types/node#port-selection) [port](http://localhost:5800/docs/deployment-types/docker#port-selection) running an HTTP or WebSocket server. But thanks to Docker it is possible to run a database in the same container of the HTTP API consuming it.

Note that due the immutability of deployments there are many cases where you will lose the data of your database.

- A new deployment will have a newly created database from the ground.
- Each [instance of the same deployment](docs/getting-started/scaling) will have it is own data.
- If the deployment freeze (has zero running instances) when it unfreeze the database will be also cleared.

We recommend you to run your database in any hosted DB service, you can [ask our community for recommendations](/chat).

## Can I transfer domains into/out of ZEIT Domains?

We are working on a transfer tool to make this process smooth. In the meanwhile you can contact us to [support@zeit.co](mailto:support@zeit.co?subject=Domain%20Transfer) with the domain you want to transfer.

## Can I use docker-compose with Now?

For the moment ${<Now color="#000" />} does not support docker-compose, you can keep an eye to our [open issue in GitHub](https://github.com/zeit/now-cli/issues/294) to now when this is ready.

## How do I disable HTTPS and just use HTTP instead?

There is no way, for the moment, to disable SSL. All the ${<Now color="#000" />} deployments are HTTPS by default.

## How do I specify an environment variable with a value that starts with \`@\`?

For the moment we will always try to replace any environment variable which value start with an \`@\` with a [secret](/docs/features/env-and-secrets), we have [an open issue for this on GitHub](https://github.com/zeit/now-cli/issues/1061).

As a workaround you can setup a secret which value contains the string with a \`@\`.

## Why does my deployment have occasionally long response times?

Deployments have a [default scale configuration](/docs/getting-started/scaling#default-scaling) which configure it to freeze after a while due to inactivity.

This let you have any amount of deployments without caring about your running instances and they will be unfreezed when a new request comes and keep running fow a while.

This behaviour can be completely avoided using the \`now scale\` command as describe in the link above.

## Can I remove or delete a team?

For the moment it is not possible to remove a team. If you keep it with the [OSS plan](/pricing) it can be safely ignored and you are not going to be charged.

## How do I create a redirection from www.mysite.com to mysite.com?

Check our guide on how to setup a redirect

> [Setting up a Redirect with Now](/docs/guides/redirect)

## Can I run a bot with Now?

Yes, you can, remember to expose a single port running an HTTP server.

As a recommendation if your bot is working on background before removing it to deploy a new version manually scale it down to zero instances.

${<TerminalInput>now scale my-bot-hjnfyyugps.now.sh 0</TerminalInput>}

This will ensure the bot is not running anymore before you remove it or deployed a new version.

## How do I change the nameservers of a domain purchasedwith ZEIT Domains?

For the moment is not possible to do it via the [Now CLI](/docs/features/now-cli) but you can contact us to [support@zeit.co](mailto:support@zeit.co?subject=Change%20Purchased%20Domain%20Nameserver) with the desired nameservers and after a security verification of the ownership we can do it for you.

## How can I avoid the question about the deployment being public under the OSS plan?

If you add the \`--public\` option when deploying you will not be asked to confirm the deployment will be public.

${<TerminalInput>now --public</TerminalInput>}

## How do I prevent my deployment to sleep?

Check [Why does my deployment have occasionally long response times?](/docs/other/faq#why-does-my-deployment-have-occasionally-long-response-times)

## If I need a special invoice how do I get it?

We send a receipt via email for every transaction made via your card. For special invoicing requests, please contact us at [support@zeit.co](support@zeit.co?subject=Invoice) with the following information:

- Company name
- Billing contact (full name)
- Address
- Contact phone number
- VAT number (if applicable)
- Any additional information you may require

Please note that we can only honor special invoicing requests that come from the personal account's email address or, in the event the request pertains to a team, the team owner's email address.

## How do I remove or delete my account?

Contact us to [support@zeit.co](support@zeit.co?subject=Remove%20account) from the account's email address.

## How many levels of subdomain can I use?

You can define up to 10 levels of subdomains for a custom domain you own. For \`.now.sh\` domains you can only use one level.

## How do I make my deployments private?

All the deployments made with a paid account or team are private by default.

### Why do I still see the source code of my deployment if they are private?

If you are logged in [zeit.co](/login) you can still access the source when going to \`/_src\`.

## Is it possible to host WordPress to Now Platform?

Check our WordPress example repository.

> [https://github.com/now-examples/wordpress](https://github.com/now-examples/wordpress)

## Is it possible to host Ghost to Now Platform?

Check our Ghost example repository.

> [https://github.com/now-examples/ghost](https://github.com/now-examples/ghost)

## How do I add my deployments to a list of whitelisted IP addresses?

The IP addresses of ${<Now color="#000" />} deployments are too dynamic and for that reason we don't provide a list of them.

Our recommendation when connecting to external services (eg. a database) is to use a strong password and SSL.

## How do I setup an email for my domain purchased with Now Domains?

${<Now color="#000" />} doesn't provide you with an email server for your custom domains. You can use [\`now dns\`](/docs/features/dns) to setup MX records pointing to any external service.

## How can I setup basic HTTP authentication for my deployment?

Any HTTP authentication should be implemented inside the deployment code

For static sites you can use [zeit/serve](https://github.com/zeit/serve) with the \`--auth\` flag.

## How do I use private npm modules or GitHub repositories?

You can read how to use private npm modules on our guide:

> [Using Private npm Dependencies](/docs/features/private-npm)

For private GitHub repositories you can follow the GitHub guide on:

> [Easier builds and deployments using Git over HTTPS and OAuth](https://github.com/blog/1270-easier-builds-and-deployments-using-git-over-https-and-oauth)

## Is it possible to reuse an existing alias?

Yes, you can use \`now alias\` to move an existing alias from a deployment to another the same way you use it to assign it the first time.

Note that you can not use an alias already used by another user until they remove it.

`)
