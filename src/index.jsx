import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainView from "./components/main-view/main-view";
import MovieView from "./components/movie-view/movie-view";
import "./index.scss";

const App = () => (
  <BrowserRouter>
    <div className="my-flix">
      <Routes>
        <Route path="/" element={<MainView />} />
        <Route path="/movie/:id" element={<MovieView />} />
      </Routes>
    </div>
  </BrowserRouter>
);

// Find the root element in the DOM
const rootElement = document.getElementById("root");

// Create the React root and render the application
if (rootElement) {
  const root = createRoot(rootElement);
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
} else {
  console.error("Failed to find the root element!");
}
