import {MaskText} from "../textEffects/MaskText.jsx";
import PropTypes from "prop-types";
import { twMerge } from 'tailwind-merge'

const TitleText = ({phrase, className = ""}) => {

    return (
        <div className={twMerge(
            "w-fit pl-3 md:pl-6 xl:pl-7 4xl:pl-12 7xl:pl-20 mt-[9vh] md:mt-[12vh] lg:mt-[15vh]",
            className
        )}>
            <h1 className="title-text font-nick uppercase text-fluid-4xl leading-none">
                <MaskText phrase={phrase} duration={1} delay={0.8}/>
            </h1>
        </div>
    )
};

TitleText.propTypes = {
    phrase: PropTypes.string.isRequired,
    className: PropTypes.string,
};

export default TitleText;