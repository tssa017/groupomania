// This will be a default import
function Button({ buttonText, className, onClick }) {
    return (
        <button className={className} onClick={onClick}>
            {buttonText}
        </button>
    );
}

export default Button;
