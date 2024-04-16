import "virtual:uno.css"
import { Outlet, createRootRoute } from "@tanstack/react-router"
import "@unocss/reset/tailwind.css"
import { Suspense, lazy } from "react"

const TanStackRouterDevtools =
	process.env.NODE_ENV === "production"
		? () => null
		: lazy(() =>
				import("@tanstack/router-devtools").then((res) => ({
					default: res.TanStackRouterDevtools,
				})),
			)

export const Route = createRootRoute({
	component: () => (
		<>
			<div un-h="full" un-flex="~" un-text="white">
				<main un-w="full" un-p="4 md:8 lg:16" un-flex="~ col items-center">
					<Outlet />
				</main>
			</div>

			<Suspense>
				<TanStackRouterDevtools position="bottom-right" />
			</Suspense>
		</>
	),
})
