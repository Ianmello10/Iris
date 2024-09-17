import { ImageResponse } from "next/og";

export function GET(request: Request) {

    const url = new URL(request.url);

	const title =  url.searchParams.get('title') || "Iris - Simple and Flexible Blog Template";

	return new ImageResponse(
		<div tw="flex flex-col w-full h-full items-center justify-center bg-white">
			<div tw="flex flex-col   w-full py-12 px-4 md:items-center justify-center p-8">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="82"
					height="82"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					stroke-width="2"
					stroke-linecap="round"
					stroke-linejoin="round"
					className="lucide lucide-flower"
				>
					<circle cx="12" cy="12" r="3" />
					<path d="M12 16.5A4.5 4.5 0 1 1 7.5 12 4.5 4.5 0 1 1 12 7.5a4.5 4.5 0 1 1 4.5 4.5 4.5 4.5 0 1 1-4.5 4.5" />
					<path d="M12 7.5V9" />
					<path d="M7.5 12H9" />
					<path d="M16.5 12H15" />
					<path d="M12 16.5V15" />
					<path d="m8 8 1.88 1.88" />
					<path d="M14.12 9.88 16 8" />
					<path d="m8 16 1.88-1.88" />
					<path d="M14.12 14.12 16 16" />
					<g>
						<title> </title>
					</g>
				</svg>
				<h2 tw="flex flex-col text-4xl font-bold tracking-tight text-center">
					{title}
				</h2>
			</div>
		</div>,
		{
			width: 1200,
			height: 630,
		},
	);
}
