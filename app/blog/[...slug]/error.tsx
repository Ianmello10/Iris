"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useEffect } from "react";

export default function ErrorBoundary({
	error,
}: {
	error: Error & { digest?: string };
	reset: () => void;
}) {
	useEffect(() => {
		console.error(error);
	}, [error]);

	return (
		<div className="w-full min-h-screen flex flex-col items-center">
			<h2 className="text-4xl font-bold mt-12">{error.message}</h2>

			<Link className="mt-10" href={"/"}>
				<Button>Go to home</Button>
			</Link>
		</div>
	);
}
