import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { CatProvider } from './context/cat.context';
import Home from './pages/Home';
import SingleCat from './pages/SingleCat';

function App() {
    return (
        <BrowserRouter>
            <CatProvider>
                <div className="Home">
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/:id" element={<SingleCat />} />
                    </Routes>
                </div>
            </CatProvider>
        </BrowserRouter>
    );
}

export default App;
