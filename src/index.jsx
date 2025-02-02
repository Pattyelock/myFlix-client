import { createRoot } from "react-dom/client";
feature/bootstrap-styling

import { MainView } from "./components/main-view/main-view";
import Container from "react-bootstrap/Container";

import "bootstrap/dist/css/bootstrap.min.css";
import "./index.scss";

const App = () => {
  return (
    <Container>
      <MainView />
    </Container>
  );
};

const container = document.querySelector("#root");
const root = createRoot(container);
root.render(<App />);

import "./index.scss";
import MainView from "./components/main-view/main-view";

// Find the root element in the DOM
const container = document.getElementById("root");
const root = createRoot(container);

const MyFlix = () => (
  <React.StrictMode>
    <MainView />
  </React.StrictMode>
);

root.render(<MyFlix />);
