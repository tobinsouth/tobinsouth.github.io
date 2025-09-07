---
title: How to build an MCP server without going insane
description: A guide on how to build MCP servers and what might go wrong along the way. 
layout: post.liquid
date: 2025-09-01
permalink: "/{{ page.fileSlug }}/index.html"
author: Tobin South
---

I spend a lot of time building MCP servers with folks. It's a new protocol, frameworks are constantly changing, and it's often unclear what the right way to build or test things are. Here are some thoughts & FAQs on how I like to build servers up to date as of today.

## Where do I start? (to build a server)

- If you like Python, [FastMCP](https://gofastmcp.com/getting-started/welcome) is the best option, and it comes with its own [hosting platform](https://www.fastmcp.cloud/), which provides WorkOS Authkit support for authentication with zero additional work (simply click 'Add Auth' in the cloud deploy).
- If you like TypeScript, use the [Vercel mcpHandler](https://github.com/vercel/mcp-adapter) wrapper and host on Vercel. You also get to create a website to accompany it. You can use our demo on [mcp.shop](http://mcp.shop) (or see on Github), which is built with this. You could use the core TypeScript SDK instead of the mcpHandler if you want.
- If you just want it to be something very simple or standalone (e.g., don't plan to integrate into an existing build stack) use [smithery](https://smithery.ai/docs/getting_started/quickstart_build) for a super quick setup & remote deploy.

## How do I know it worked?

- I always run `npx mcp-remote <URL>` first. This tests that the server connects correctly and will handle any auth flows (and give you better errors than the inspector).
- Add it to Cursor / VS Code / your favorite client. These give bad errors but will show you what coverage you have if your tool is exposed correctly.
- Why not the inspector? `npx @modelcontextprocotol/inspector` is great with an unprotected server, but when you use an external real Authorization Server, you'll run into CORS errors, which can be painful to debug. Servers that work well with Cursor and Claude often still encounter issues when using the inspector. Use this last to make sure your MCP server is robust in the tail.

## How do I add auth / API keys?

- Use local servers while you can, and add auth as soon as you want to make it remote.
- ⚠️ Do not roll your own auth; you will regret it in 2 weeks when the spec changes again.
- API keys are fine for devs and can be a nice DX. This is for mcp.json or coding agent stuff, not for production Claude integrations/connectors, where OAuth is a better UX for everyone.
- If you're building a new app, just use Authkit. Just look at our customer list or MCP Night, and you can see why. It just works.
- If you already have an existing product with user management / auth of a different kind, WorkOS offers MCP Connect, a simple OAuth proxy tool that handles MCP OAuth and allows you to keep your existing solutions

## How does user identity / RBAC interact with MCP
- MCP is super cool in that you can show different tools to different folks depending on their user role. You can also deeply customize the functionality of the MCP in the same way you can with any web infrastructure.


## What issues are gonna come up?

- **CORS.** Especially with Auth. If Authkit gives you errors, set the inspector localhost URL in Authentication > Sessions > CORS. You might also need to pass the CORS headers from your server. Ask Claude.
- I need to **reset my auth state** locally: do `rm -rf ~/.mcp-auth`
- **Resource indicators.** For your server to authenticate correctly, the auth sessions need to be bound to a resource (the URL of your MCP server that is being connected to). This could be `localhost:<port>` or your deployment URL. Sometimes, people bind to the server root; sometimes, they bind to `<URL>/[transport]` (e.g., `https://mcp.shop/mcp`). You should make your code definition for the deployment URL dynamic or you'll run into random issues.
- **Refresh tokens.** Making OAuth not suck and not log you out depends on these via the `offline_access` scope. This is a client-side problem as long as you use a good Authorization Server. Clients are slowly getting better at supporting this.
- **CI/CD or Eval.** These are both hard and important. It's evolving and I'll add more notes in later.
- **JWT Templates:** Authkit Custom JWT templates do not currently apply to auth flows with DCR (Dynamic Client Registration). This is on the roadmap and reach out if you're interested.

## Really silly bugs

At some point you might just have no idea what the source of the bug could be. This could be almost anything. Just in case it's useful, here are a series of random bugs that I've seen before.

- Cloudflare or another bot blocker disabling the `Claude` user agent restricting MCP connections.
- Your AWS VPC is misconfigured.
- Your `/.well-known` endpoints aren't actually accessible.
- There is a bug upstream in one of the SDKs (I often spin up a TS or Python demo with my auth server just to isolate if auth, the resource server, or the underlying SDK is the source of the issue.)

## I want to build a client

- This is tougher than it seems sometimes (even though it shouldn't be).
- Use one of the off-the-shelf frameworks (mcp-use, langchain, ai0sdk) to minimize the pain.

## I want to build an agent / sub-agent / A2A

- MCP is a really nice way to offload a context-processing-heavy task into a subprocess that returns minimal useful context without polluting the context window. This is the Context Protocol vision of MCP and is also my working definition of a context sub-agent (e.g., an MCP call to a process that runs an AI workflow that then returns context).
- If you're running an LLM workflow in your MCP server tool, be careful of timeouts. You might want to think about async tools.

## How do I explain MCP to my boss/mum/arch-nemesis?

- I just say it's the USB-C tool for AI.
- It helps agents connect to other software tools in a standardized way, which facilitates better infrastructure, interoperability, and model post-training.
- It's more than an API wrapper.
- I'll have a post about this soon.
