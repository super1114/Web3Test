import "./App.css";
import MintPage from "./pages/Mint";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <>
      <MintPage></MintPage>
      <ToastContainer />
    </>
  );
}

export default App;
