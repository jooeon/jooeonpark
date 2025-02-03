import PropTypes from 'prop-types';

const ExternalLinkButton = ({ href, children, className = '', ...props }) => (
    <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={`inline-block px-4 py-1
            text-customWhite dark:text-customBlack bg-customBlack dark:bg-customWhite rounded-full hover:opacity-80
            ${className}`}
        {...props}
    >
        {children}
    </a>
);

ExternalLinkButton.propTypes = {
    href: PropTypes.string.isRequired,
    children: PropTypes.node.isRequired,
    className: PropTypes.string,
};

export default ExternalLinkButton;
