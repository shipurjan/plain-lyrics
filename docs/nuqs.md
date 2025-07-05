---
title: Adapters
description: Using nuqs in your React framework of choice
---

Since version 2, you can now use nuqs in the following React frameworks, by
wrapping it with a `NuqsAdapter` context provider:

- [Next.js (app router)](#nextjs-app-router)
- [Next.js (pages router)](#nextjs-pages-router)
- [React SPA (eg: with Vite)](#react-spa)
- [Remix](#remix)
- [React Router v6](#react-router-v6)
- [React Router v7](#react-router-v7)

## Next.js

### App router [#nextjs-app-router]

Wrap your `{children}{:ts}` with the `NuqsAdapter{:ts}` component in your root layout file:

```tsx title="src/app/layout.tsx"
// [!code word:NuqsAdapter]
import { NuqsAdapter } from 'nuqs/adapters/next/app'
import { type ReactNode } from 'react'

export default function RootLayout({
  children
}: {
  children: ReactNode
}) {
  return (
    <html>
      <body>
        <NuqsAdapter>{children}</NuqsAdapter>
      </body>
    </html>
  )
}
```

### Pages router [#nextjs-pages-router]

Wrap the `<Component>{:ts}` page outlet with the `NuqsAdapter{:ts}` component in your `_app.tsx` file:

```tsx title="src/pages/_app.tsx"
// [!code word:NuqsAdapter]
import type { AppProps } from 'next/app'
import { NuqsAdapter } from 'nuqs/adapters/next/pages'

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <NuqsAdapter>
      <Component {...pageProps} />
    </NuqsAdapter>
  )
}
```

### Unified (router-agnostic) [#nextjs-unified]

If your Next.js app uses **both the app and pages routers** and the adapter needs
to be mounted in either, you can import the unified adapter, at the cost
of a slightly larger bundle size (~100B).

```tsx
import { NuqsAdapter } from 'nuqs/adapters/next'
```

<br/>

The main reason for adapters is to open up nuqs to other React frameworks:

## React SPA

Example, with Vite:

```tsx title="src/main.tsx"
// [!code word:NuqsAdapter]
import { NuqsAdapter } from 'nuqs/adapters/react'

createRoot(document.getElementById('root')!).render(
  <NuqsAdapter>
    <App />
  </NuqsAdapter>
)
```

Note: because there is no known server in this configuration, the
[`shallow: false{:ts}`](./options#shallow) option will have no effect.

Since `nuqs@2.4.0`, you can specify a flag to perform a full-page navigation when
updating query state configured with `shallow: false{:ts}`, to notify the web server
that the URL state has changed, if it needs it for server-side rendering other
parts of the application than the static React bundle:

```tsx title="src/main.tsx" /fullPageNavigationOnShallowFalseUpdates/
createRoot(document.getElementById('root')!).render(
  <NuqsAdapter fullPageNavigationOnShallowFalseUpdates>
    <App />
  </NuqsAdapter>
)
```

This may be useful for servers not written in JavaScript, like Django (Python),
Rails (Ruby), Laravel (PHP), Phoenix (Elixir) etc...

## Remix

```tsx title="app/root.tsx"
// [!code word:NuqsAdapter]
import { NuqsAdapter } from 'nuqs/adapters/remix'

// ...

export default function App() {
  return (
    <NuqsAdapter>
      <Outlet />
    </NuqsAdapter>
  )
}
```

## React Router v6

```tsx title="src/main.tsx"
// [!code word:NuqsAdapter]
import { NuqsAdapter } from 'nuqs/adapters/react-router/v6'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import App from './App'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />
  }
])

export function ReactRouter() {
  return (
    <NuqsAdapter>
      <RouterProvider router={router} />
    </NuqsAdapter>
  )
}
```

<Callout>

 Only `BrowserRouter` is supported. There may be support for `HashRouter`
 in the future (see issue [#810](https://github.com/47ng/nuqs/issues/810)), but
 support for `MemoryRouter` is not planned.

</Callout>

## React Router v7

```tsx title="app/root.tsx"
// [!code word:NuqsAdapter]
import { NuqsAdapter } from 'nuqs/adapters/react-router/v7'
import { Outlet } from 'react-router'

// ...

export default function App() {
  return (
    <NuqsAdapter>
      <Outlet />
    </NuqsAdapter>
  )
}
```

<Callout type="warn" title="Deprecation notice">
  The generic import `nuqs/adapters/react-router` (pointing to v6)
  is deprecated and will be removed in nuqs@3.0.0.

  Please pin your imports to the specific version,
  eg: `nuqs/adapters/react-router/v6` or `nuqs/adapters/react-router/v7`.

  The main difference is where the React Router hooks are imported from:
  `react-router-dom` for v6, and `react-router` for v7.
</Callout>

## Testing

<Callout>
  Documentation for the `NuqsTestingAdapter{:ts}` is on the [testing page](/docs/testing).
</Callout>

---
title: Basic usage
description: Replacing React.useState with useQueryState
---

import {
  DemoFallback,
  BasicUsageDemo,
  GreetingsPrompt
} from '@/content/docs/parsers/demos'

<Callout title="Prerequisite">
  Have you setup your app with the appropriate [**adapter**](./adapters)? Then you
  are all set!
</Callout>

If you are using `React.useState` to manage your local UI state,
you can replace it with `useQueryState` to sync it with the URL.

```tsx
'use client'

import { useQueryState } from 'nuqs'

export function Demo() {
  const [name, setName] = useQueryState('name')
  return (
    <>
      <input value={name || ''} onChange={e => setName(e.target.value)} />
      <button onClick={() => setName(null)}>Clear</button>
      <p>Hello, {name || 'anonymous visitor'}!</p>
    </>
  )
}
```

<Suspense fallback={<DemoFallback/>}>
  <BasicUsageDemo />
</Suspense>

`useQueryState` takes one required argument: the key to use in the query string.

Like `React.useState`, it returns an array with the value present in the query
string as a string (or `null{:ts}` if none was found), and a state updater function.

Example outputs for our demo example:

| URL          | name value   | Notes                                                             |
| ------------ | ------------ | ----------------------------------------------------------------- |
| `/`          | `null{:ts}`  | No `name` key in URL                                              |
| `/?name=`    | `''{:ts}`    | Empty string                                                      |
| `/?name=foo` | `'foo'{:ts}` ||
| `/?name=2`   | `'2'{:ts}`   | Always returns a string by default, see [Parsers](/docs/parsers) |

<Callout title="Tip">
  Setting `null{:ts}` as a value will remove the key from the query string.
</Callout>

## Default values

When the query string is not present in the URL, the default behaviour is to
return `null{:ts}` as state.

It can make state updating and UI rendering tedious.
Take this example of a simple counter stored in the URL:

```tsx
import { useQueryState, parseAsInteger } from 'nuqs'

export default () => {
  const [count, setCount] = useQueryState('count', parseAsInteger)
  return (
    <>
      <pre>count: {count}</pre>
      <button onClick={() => setCount(0)}>Reset</button>
      {/* handling null values in setCount is annoying: */}
      <button onClick={() => setCount(c => (c ?? 0) + 1)}>+</button>
      <button onClick={() => setCount(c => (c ?? 0) - 1)}>-</button>
      <button onClick={() => setCount(null)}>Clear</button>
    </>
  )
}
```

You can provide a default value as the second argument to `useQueryState` (or
via the `.withDefault{:ts}` builder method on parsers):

```ts
const [search] = useQueryState('search', { defaultValue: '' })
//      ^? string

const [count] = useQueryState('count', parseAsInteger)
//      ^? number | null -> no default value = nullable

const [count] = useQueryState('count', parseAsInteger.withDefault(0))
//      ^? number
```

It makes it much easier to handle state updates:

```tsx
const increment = () => setCount(c => c + 1) // c will never be null
const decrement = () => setCount(c => c - 1) // c will never be null
const clearCount = () => setCount(null) // Remove query from the URL
```

<Callout title="Note">
  The default value is internal to React, it will **not** be written to the
  URL _unless you set it explicitly_ and use the `clearOnDefault: false{:ts}` [option](./options#clear-on-default).
</Callout>

<Callout title="Tip">
  The default value is also returned if the value is _invalid_ for the parser.
</Callout>

<Callout title="Tip">
  Setting the state to `null{:ts}` when a default value is specified:
  1. Clears the query from the URL
  2. Returns the default value as state
</Callout>