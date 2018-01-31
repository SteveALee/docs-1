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

## How Can I Deploy and Alias in a Single Command?

Create a [configuration file](/docs/features/configuration) with the keys [alias](/docs/features/configuration#alias-(string|array)) and [name](/docs/features/configuration#name-(string)) similar to this one:

${<Code>{`{
  "name": "my-app",
  "alias": "my-app.now.sh"
}`}</Code>}

Then run the following command:

${<TerminalInput>now && now alias</TerminalInput>}

It will deploy your application under the configured name (eg. \`my-app-hjrehxuuih.now.sh\`) and then alias the latest deployment with the configured alias.

### How Can I Then Remove the Old Deployment?

Note you don't really need to do it, the old deployment will eventually [freeze](/docs/guides/app-lifecycle-and-scalability#instances-&-scaling) and if you keep it it can let you rollback easily by just changing the alias.

But if you still want to do it it's possible using the following command:

${<TerminalInput>now rm my-app --safe --yes</TerminalInput>}

That command will remove all the non aliased deployment of the project with the name \`my-app\`. This can be run after \`now alias\` command to remove the old deployment of the project.

${<TerminalInput>now && now alias && npm run my-app --safe --yes</TerminalInput>}

## How Can I Pick the Region My Application Will Be Deployed to?

For the moment ${<Now color="#000" />} only has support for one region called [SFO](https://sfo.now.sh).

We will eventually enable another region in Europa called [BRU](https://bru.now.sh). And more regions in the future.

## How Can I Change My Account Email Address?

Contact us at [support@zeit.co](mailto:support@zeit.co?subject=Email%20change) from your account email address letting us know what is your desired email address. We will send an email with validations codes similars to \`Sparkling Red-handed Tamarin\` to each address, after receiving a response with the codes we can procede with the change.

## What Are the Hardware Specifications of the Deployment Instances?

Each instance has up to 1GB of RAM and 1 CPU in [any paid plan](/pricing).

For deployments under the OSS plan they have the half of those resources.

The storage limit is defined under the pricing table.

### I Need More Resources, Is There a Way to Configure It?

For the moment there is no way to change that, it is on the roadmap however.

For [enterprise customers](mailto:enterprise@zeit.co?subject=Custom%20Hardware%20Resources) we can offer customizations including better hardware.

## How Can I Update My Deployment Code?

Deployments are immutable, this mean they can not be modified after created, to update your application you need to deploy the new version using the command \`now\`, after that you will get a new unique deployment URL similar to \`my-app-hjrehxuuih.now.sh\`.

This model enable a few interesting benefits

- **Easy rollback**${<br />}
  You can just move your alias to the old deployment to have immediate rollbacks.
- **Staging and Production deployments**${<br />}
  A new deployment gives you a unique URL you can use as staging, share it with co-workers or clients and then after it's confirmed it works you can upgrade it to production with a single command \`now alias\`.
- **Zero-Downtime deployment**${<br />}
  Most technologies will require your server to be restarted (eg. Node.js). Thanks to ${<Now color="#000" />} gives you a new deployment you can wait until the deployment is ready to change the alias and avoid any downtime in the deployment process.

## Can I Run a Database inside Now?

Now deployments **must** expose a [single](http://localhost:5800/docs/deployment-types/node#port-selection) [port](http://localhost:5800/docs/deployment-types/docker#port-selection) running an HTTP or WebSocket server. But thanks to Docker it is possible to run a database in the same container of the HTTP API consuming it.

But note that due the immutability of instances each deploy will reset the database to zero, at the same time each [instance of the same deployment](docs/getting-started/scaling) will have it is own data, and if the deployment freeze (has zero running instances) when it unfreeze the database will be also cleared.

## Can I Transfer a Domain from or to ZEIT Domains?

We are working on a transfer tool to make this process smooth. In the meanwhile you can contact us to [support@zeit.co](mailto:support@zeit.co?subject=Domain%20Transfer) with the domain you want to transfer.

## Can I Use Docker-Compose with Now?

For the moment ${<Now color="#000" />} does not support docker-compose, you can keep an eye to our [open issue in GitHub](https://github.com/zeit/now-cli/issues/294) to now when this is ready.

## Is There a Way to Use HTTP Instead of HTTPS?

There is no way, for the moment, to disable SSL. All the ${<Now color="#000" />} deployments are HTTPS by default.

## How Can I Setup an Environment Variable with an @ at the Beginning of the Value?

For the moment we will always try to replace any environment variable which value start with an \`@\` with a [secret](/docs/features/env-and-secrets), we have [an open issue for this on GitHub](https://github.com/zeit/now-cli/issues/1061).

As a workaround you can setup a secret which value contains the string with a \`@\`.

## Why My Deployment Sometimes Take Too Long to Reply?

Deployments have a [default scale configuration](/docs/getting-started/scaling#default-scaling) which configure it to freeze after a while due to inactivity.

This let you have any amount of deployments without caring about your running instances and they will be unfreezed when a new request comes and keep running fow a while.

This behaviour can be completely avoided using the \`now scale\` command as describe in the link above.

## How Can I Remove a Team?

For the moment it is not possible to remove a team. If you keep it with the [OSS plan](/pricing) it can be safely ignored and you are not going to be charged.

## How Can I Setup a Redirect from www.domain.com to domain.com?

Check our guide on how to setup a redirect

> [Setting up a Redirect with Now](/docs/examples/redirect)

## Can I Run a Bot with Now?

Yes, you can, remember to expose a single port running an HTTP server.

As a recommendation if your bot is working on background before removing it to deploy a new version manually scale it down to zero instances.

${<TerminalInput>now scale my-bot-hjnfyyugps.now.sh 0</TerminalInput>}

This will ensure the bot is not running anymore before you remove it or deployed a new version.

## If I Purchase a Domain with ZEIT Domains Can I Change the Nameservers?

For the moment is not possible to do it via the [Now CLI](/docs/features/now-cli) but you can contact us to [support@zeit.co](mailto:support@zeit.co?subject=Change%20Purchased%20Domain%20Nameserver) with the desired nameservers and after a security verification of the ownership we can do it for you.

## How Can I Avoid the Question about the Deployment Being Public under the Oss Plan?

If you add the \`--public\` option when deploying you will not be asked to confirm the deployment will be public.

${<TerminalInput>now --public</TerminalInput>}

## How Can I Prevent My Deployment to Sleep?

Deployments have a [default scale configuration](/docs/getting-started/scaling#default-scaling) which configure it to freeze after a while due to inactivity.

This behaviour can be completely avoided using the \`now scale\` command as describe in the link above.

`)
