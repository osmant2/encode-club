import styles from "../styles/Home.module.css";
import MainComponent from "../components/MainComponent";
import Navbar from "../components/navigation/navbar";

export default function Home() {
  return (
    <div>
      <main id="main" className="h-full bg-gray-200">
        <MainComponent></MainComponent>
      </main>
    </div>
  );
}
