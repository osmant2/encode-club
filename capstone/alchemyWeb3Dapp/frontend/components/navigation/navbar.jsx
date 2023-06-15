import { ConnectButton } from "@rainbow-me/rainbowkit";
import styles from "../../styles/Navbar.module.css";
export default function Navbar() {
	return (
		<nav className="float-right py-2" >
			<ConnectButton></ConnectButton>
		</nav>
	);
}
