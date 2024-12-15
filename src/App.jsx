import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Index from "./Index.jsx";
import Work from "./Work.jsx";
import Archive from "./Archive.jsx";
import About from "./About.jsx";

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/work" element={<Work />} />
                <Route path="/archive" element={<Archive />} />
                <Route path="/about" element={<About />} />
            </Routes>
        </Router>
    );
};

export default App;
