import {
  isRouteErrorResponse,
  Link,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "react-router";

import type { Route } from "./+types/root";
import "./app.css";

export const links: Route.LinksFunction = () => [
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: "anonymous",
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap",
  },
  {
    rel: "icon",
    href: "/logo.svg",
    type: "image/svg+xml",
  },
];

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
        {/* <script
          crossOrigin="anonymous"
          src="//unpkg.com/react-scan/dist/auto.global.js"
        ></script> */}
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return <Outlet />;
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  let errorType: "NOT_FOUND" | "ERROR" = "NOT_FOUND";
  let errorMsg = "Something somewhere somehow went very wrong.";
  const isError = import.meta.env.DEV && error && error instanceof Error;

  if (isRouteErrorResponse(error)) {
    if (error.status === 404) {
      errorType = "NOT_FOUND";
    } else {
      errorType = "ERROR";
      errorMsg = error.statusText || errorMsg;
    }
  } else if (isError) {
    errorType = "ERROR";
    errorMsg = error.message;
    console.error(error.stack);
  }

  const NotFound = () => {
    return (
      <>
        <h1 className="text-content-tertiary text-9xl">
          4<span className="text-content-secondary">0</span>4
        </h1>
        <p>
          Sorry, page not found. Return to{" "}
          {
            <Link
              to="/"
              className="text-content-tertiary hover:text-content-secondary underline"
            >
              homepage
            </Link>
          }
        </p>
      </>
    );
  };

  const AppError = () => {
    return (
      <>
        <h1 className="text-content-tertiary text-9xl">
          Err<span className="text-content-secondary">o</span>r
        </h1>
        <p className="">{errorMsg}</p>
      </>
    );
  };

  return (
    <main className="grid h-full w-full">
      <section className="space-y-[24px] place-self-center text-center">
        {errorType === "NOT_FOUND" ? <NotFound /> : <AppError />}
      </section>
    </main>
  );
}
