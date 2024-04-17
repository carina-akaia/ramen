import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { RouterProvider, createRouter } from "@tanstack/react-router"
import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import { routeTree } from "./app.gen"

export const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			staleTime: 300000,
			refetchOnReconnect: true,
		},
	},
})

const appRouter = createRouter({ routeTree })

declare module "@tanstack/react-router" {
	interface Register {
		router: typeof appRouter
	}
}

createRoot(
	document.getElementById("root") ?? document.body.appendChild(document.createElement("div")),
).render(
	<StrictMode>
		<QueryClientProvider client={queryClient}>
			<RouterProvider router={appRouter} />
		</QueryClientProvider>
	</StrictMode>,
)
