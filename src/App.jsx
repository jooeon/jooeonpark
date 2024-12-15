import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Index from "./Index.jsx";
import Showcase from "./Showcase.jsx";
import Archive from "./Archive.jsx";
import About from "./About.jsx";

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/showcase" element={<Showcase />} />
                <Route path="/archive" element={<Archive />} />
                <Route path="/about" element={<About />} />
            </Routes>
        </Router>
    );
};

export default App;
