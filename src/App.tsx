import { BrowserRouter } from "react-router-dom";
import "./styles.css";
import { Router } from "./Router";

export default function App() {
  return (
    <BrowserRouter>
      <Router />
    </BrowserRouter>
  );
}
