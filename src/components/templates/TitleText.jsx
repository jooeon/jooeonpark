import {MaskText} from "../textEffects/MaskText.jsx";
import PropTypes from "prop-types";

const TitleText = ({phrase}) => {
    return (
        <div className="pt-20 pl-5 md:pt-28 xl:pt-20 xl:pl-10 4xl:pt-36 7xl:pt-40">
            <h1 className="title-text font-nick uppercase text-[4vh] xl:text-[5vw] leading-none">
                <MaskText phrase={phrase} duration={1} delay={0.8}/>
            </h1>
        </div>
    );
};

TitleText.propTypes = {
    phrase: PropTypes.string.isRequired,
};

export default TitleText;