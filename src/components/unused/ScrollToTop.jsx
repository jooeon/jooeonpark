import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import PropTypes from "prop-types";

const ScrollToTop = (props) => {
    const location = useLocation();
    useEffect(() => {
        window.scrollTo({top: 0, left: 0, behavior: 'smooth' });
    }, [location]);

    return <>
        {props.children}
    </>
};

// PropTypes validation
ScrollToTop.propTypes = {
    children: PropTypes.node.isRequired,
};

export default ScrollToTop;