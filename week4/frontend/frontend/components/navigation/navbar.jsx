import { ConnectButton } from "@rainbow-me/rainbowkit";

export default function Navbar() {
	return (
		<nav className="">
			<div className="flex justify-end px-6 py-6">
				<ConnectButton></ConnectButton>
			</div>
		</nav>
	);
}
