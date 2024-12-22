import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Index from "./Index.jsx";
import Art from "./Art.jsx";
import Steps from "./projects/Steps.jsx";
// import Archive from "./Archive.jsx";
import About from "./About.jsx";

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/Art" element={<Art />} />
                <Route path="/steps" element={<Steps />} />
                {/*<Route path="/archive" element={<Archive />} />*/}
                <Route path="/about" element={<About />} />
            </Routes>
        </Router>
    );
};

export default App;
