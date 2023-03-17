import '../../index.scss';

function Header() {
    return (
        <div>
            <header className="header">
                <img
                    src="/images/cropped-img.png" // Public
                    className="header__img"
                    alt="Groupomania logo"
                />
            </header>
        </div>
    );
}

export default Header;
