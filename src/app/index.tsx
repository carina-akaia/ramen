import { createFileRoute } from "@tanstack/react-router"
import { APP_NAME } from "~/common/config"

export const Route = createFileRoute("/")({
	component: () => <Page />,
})

function Page() {
	return (
		<div
			un-rounded="xl"
			un-p="8"
			un-bg="gradient-linear gradient-from-fuchsia gradient-via-black gradient-to-fuchsia"
		>
			<h1 className="prose" un-text="xl">{`Welcome to ${APP_NAME}!`}</h1>
		</div>
	)
}
