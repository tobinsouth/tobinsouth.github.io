---
title: How to build an MCP server without going insane
description: A guide on how to build MCP servers and what might go wrong along the way.
layout: post.liquid
date: 2025-09-01
permalink: "/{{ page.fileSlug }}/index.html"
author: Tobin South
---

I spend a lot of time building MCP servers with folks. It's a new protocol, frameworks are constantly changing, and it's often unclear what the right way to build or test things is. Most of the knowledge of how to make them really great is tacit and shared through word of mouth. This is my attempt at writing it down—so here are some thoughts and FAQs on how I like to build servers, up to date as of today.

## Where do I start? (to build a server)

- If you like Python, [FastMCP](https://gofastmcp.com/getting-started/welcome) is the best option, and it comes with its own [hosting platform](https://www.fastmcp.cloud/), which provides WorkOS Authkit support for authentication with zero additional work (simply click “Add Auth” in the cloud deploy). It also has easy [WorkOS Authkit setup](https://gofastmcp.com/integrations/authkit).
- If you like TypeScript, use the [Vercel mcpHandler](https://github.com/vercel/mcp-adapter) wrapper and host on Vercel. The Vercel wrapper is a thin layer on the TypeScript SDK that makes it better for Vercel hosting. You also get to create a website to accompany it. You can use our demo on [mcp.shop](http://mcp.shop) (or see it on GitHub), which is built with this. You could use the core TypeScript SDK instead of the mcpHandler if you want.
- If you want something very simple or standalone (e.g., you don't plan to integrate into an existing build stack), use [Smithery](https://smithery.ai/docs/getting_started/quickstart_build) for a super-quick setup and remote deploy.

## How do I know it worked? (the development testing cycle)

- Do all the following steps, in order, with (1) your unprotected local MCP server, (2) your auth-protected localhost MCP server, and finally (3) your remote-hosted MCP server. Do this and I promise there will be no bugs (for now).
- I always run `npx mcp-remote <URL>` first. This tests that the server connects correctly and will handle any auth flows (and give you better errors than the inspector). It's friendly and will likely address most of your immediate concerns. This is how stdio is used. You may want to run `rm -rf ~/.mcp-auth` to clear the auth state for testing.
- Add it to Cursor / VS Code / your favorite IDE client (not as an `npx mcp-remote`, but as `"url": "http://localhost:<PORT>"`). This will make sure your tool connects (and can be used). These give poor errors but will show you what coverage you have if your tool is exposed correctly.
- MCP Inspector: `npx @modelcontextprotocol/inspector`. Why not the inspector first? It has the strictest controls and will raise errors on completely functional servers. It's great with an unprotected server, but when you use an external, real authorization server, you'll run into CORS errors, which can be painful to debug. Servers that work well with Cursor and Claude often still encounter issues when using the inspector. Use this last to make sure your MCP server is robust in the tail.
- Claude.ai or ChatGPT.com: once the inspector passes, you have auth, and you've deployed to remote, you can start testing with Claude.ai (a key consumer interface). If you need to test your local with this for debugging, use ngrok. ChatGPT.com will require you to have [search and fetch tools](https://platform.openai.com/docs/mcp).

## How do I add auth / API keys?

- Use local servers while you can, and add auth as soon as you want to make it remote. Debugging the vibes is easier locally and unprotected.
- Make the remote OAuth. Everything in the spec assumes that the MCP server is an OAuth-protected resource server. Enterprises, registries, and common clients all assume OAuth.
- ⚠️ Do not roll your own auth; you will regret it in two weeks when the spec changes again.
- API keys are fine for devs and can be a nice DX. This is for `mcp.json` or coding agent stuff, not for production Claude integrations/connectors, where OAuth is a better UX for everyone. If you need persistence, see M2M / async below.
- If you're building a new app, just use Authkit. Just look at our customer list or MCP Night, and you can see why. It just works. Follow the [docs](https://workos.com/docs/authkit/mcp) as the source of truth for setup.
- If you already have an existing product with user management/auth of a different kind, WorkOS offers [Standalone OAuth for MCP](https://workos.com/changelog/standalone-oauth-for-mcp), a simple OAuth proxy tool that handles MCP OAuth and allows you to keep your existing solutions.
- Your server should verify the JWT against both the `iss` (your Authkit domain) and the `aud` (the environment's client ID, e.g., `client_123abc`, the thing they can copy on the API keys page) for added security.

### But I want my MCP to run asynchronously in an agent workflow

- Me too. There are lots of persistent agents I want to have MCP access without user/browser intervention. This is not what DCR and user-consent flows are designed for.
- Instead use M2M auth with client credentials. This is much more secure than API keys for a bunch of reasons and is widely supported across use cases and enterprises. MCP client support may vary for now, but is under discussion in the spec. If you need to run API keys for now in your own workflows, create a custom API key verifier tied to an existing user-management system.

### How does user identity / RBAC interact with MCP?

- MCP is super cool in that you can show different tools to different folks depending on their user role. You can also deeply customize the functionality of the MCP in the same way you can with any web infrastructure.
- When the user connects to MCP, they get a 401/`WWW-Authenticate` request. The step right after is `list_tools`. As a result, the output of `list_tools` is dynamic based on the user. Just wrap the tools with an `if (user.role === ...)` and you can make dynamic MCP servers.
- You can also make tool descriptions (explaining what can be done by the user/Claude) dynamic to the roles.
- Otherwise, normal RBAC on functionality in the code logic also applies here.
- You can also (sort of) dynamically update the MCP server tools at runtime by sending a new `WWW-Authenticate` and changing the tools in the background (e.g., updating the user's role/permissions). This doesn't seem fully supported right now.

### Agent identity?

- This is an ill-defined concept, but at the very least you have a User-Agent or possibly client ID metadata one day. This could allow you to edit the functionality of the MCP server depending on the context where it is deployed.
- You might want to consider workarounds in instances where MCP clients have strict requirements (like ChatGPT forcing you to have search and fetch tools).

## What issues are going to come up?

- CORS. Especially with auth. If Authkit gives you errors, set the Inspector localhost URL in Authentication > Sessions > CORS. You might also need to pass the CORS headers from your server. `import { metadataCorsOptionsRequestHandler } from "mcp-handler"` might also help in TypeScript. Just ask Claude.
- I need to reset my auth state locally: run `rm -rf ~/.mcp-auth`.
- Resource indicators. For your server to authenticate correctly, the auth sessions need to be bound to a resource (the URL of your MCP server that is being connected to). This could be `localhost:<PORT>` or your deployment URL. Sometimes people bind to the server root; sometimes they bind to `<URL>/<transport>` (e.g., `https://mcp.shop/mcp`). You should make your code definition for the deployment URL dynamic or you'll run into random issues. If you need an example of this, look at this [PR](https://github.com/workos/mcp.shop/pull/19) when we first noticed the bug.
- Refresh tokens. Making OAuth not suck and not log you out depends on these via the `offline_access` scope. This is a client-side problem as long as you use a good authorization server. Clients are slowly getting better at supporting this.
- CI/CD or eval. These are both hard and important. It's evolving and I'll add more notes later. You want to add (1) standard auth evals, (2) spoof auth success with tool access checks, (3) vibes-based tool-use evals. This is an evolving science. We have a related E2E auth testing setup [here](https://github.com/workos/next-authkit-example/pull/41).
- JWT templates. Authkit custom JWT templates do not currently apply to auth flows with DCR (Dynamic Client Registration). This is on the roadmap—reach out if you're interested.
- Extra scopes/permissions. Again, we're not supporting these right now in favor of doing more robust user-management logic inside your application.

### Really silly bugs

At some point you might just have no idea what the source of the bug could be. This could be almost anything. Just in case it's useful, here are a series of random bugs that I've seen before.

- Cloudflare or another bot blocker disabling the `Claude` user agent, restricting MCP connections.
- Your AWS VPC is misconfigured.
- Your `/.well-known` endpoints aren't actually accessible.
- There is a bug upstream in one of the SDKs (I often spin up a TS or Python demo with my auth server just to isolate whether auth, the resource server, or the underlying SDK is the source of the issue).

### Refresh tokens (my server keeps logging me out)

- The job of refresh tokens/`offline_access` is to allow short-lived auth tokens to be refreshed. Not all clients handle this well. Similarly, different instances of something like Claude Code might spin up different clients without sharing auth.
- A quick (bad) hack around this is to increase the default expiry time of the auth token (you can do this in the Authkit dashboard).

## I want to use MCP-UI / Elicitations / Resources / more (not just tools)

- These are all incredibly cool extensions on MCP.
- MCP-UI is perhaps the coolest thing in MCP—full stop. It is also incredibly hard to figure out how to do right, especially with respect to Remote DOM. If you want to build with it, you should join the Discord and ask for help.
- Elicitations is an extremely powerful primitive, but is [completely unsupported by most clients](https://modelcontextprotocol.io/clients).
- Resources are the more obvious primitive to use than tools in many cases, but have remarkably [low support across clients](https://modelcontextprotocol.io/clients). Use with care.
- In general, the spec is moving toward a core-plus-extensions model. Be prepared for a world with a lack of feature consistency.

## I want to build a client

- This is tougher than it seems sometimes (even though it shouldn't be).
- Use one of the off-the-shelf frameworks (mcp-use, LangChain, AI SDK) to minimize the pain.
- MCP-UI on the client side seems particularly hard.
- Auth on the client side isn't that hard to do as a first pass, but a lot of care needs to be taken in token handling and refreshing. Again, copy—don't build.

## I want to build an agent / sub-agent / A2A

- MCP is a really nice way to offload a context-processing-heavy task into a subprocess that returns minimal, useful context without polluting the context window. This is the “Context Protocol” vision of MCP and is also my working definition of a context sub-agent (e.g., an MCP call to a process that runs an AI workflow that then returns context).
- If you're running an LLM workflow in your MCP server tool, be careful of timeouts. You might want to think about async tools.

## How do I explain MCP to my boss/mom/arch-nemesis?

- I just say it's the USB-C for AI tools.
- It helps agents connect to other software tools in a standardized way, which facilitates better infrastructure, interoperability, and model post-training.
- It's more than an API wrapper.
- I'll have a post about this soon.
