import {MaskText} from "../textEffects/MaskText.jsx";
import PropTypes from "prop-types";
import { twMerge } from 'tailwind-merge'

const TitleText = ({phrase, className = ""}) => {

    return (
        <div className={twMerge(
            "w-fit pt-20 pl-3 md:pt-28 md:pl-6 xl:pt-28 xl:pl-7 3xl:pt-28 4xl:pt-36 4xl:pl-12 7xl:pt-52 7xl:pl-20",
            className
        )}>
            <h1 className="title-text font-nick uppercase text-[5vh] md:text-[6vh] xl:text-[5vw] leading-none">
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