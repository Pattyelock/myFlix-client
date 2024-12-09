import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainView from './components/main-view/main-view';
import MovieView from './components/movie-view/movie-view';
import './index.scss';

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

ReactDOM.render(<App />, document.getElementById('root'));
