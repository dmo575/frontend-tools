
function DropdownButton({title, children, dropdownClass}) {

    return(
        <div className="button-container">
            <button className="navbar-button">{title}</button>
            <div className={`dropdown ${dropdownClass}`}>
                { children?.map(el => el) }
            </div>
        </div>
    );
}

export default DropdownButton;