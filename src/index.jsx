import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom"; // Import necessary router components
import MainView from "./components/main-view/main-view";
import MovieView from "./components/movie-view/movie-view";
import "./index.scss"; // Import custom SCSS styles

// Define the App component with routing
const App = () => (
  <BrowserRouter>
    <div className="my-flix">
      <Routes>
        {/* Define routes */}
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
