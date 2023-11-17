
function DropdownButton({button, children, dropdownPos, zIndex, lvlStyles, rulesIcon="", folderMode="click"}) {

    // check that the folderMode is correct
    if(folderMode != "hover" && folderMode != "click") {throw new Error(`folderMode must be set to "hover" or "click". Currently set to "${folderMode}"`)};

    // calculate whether to use level styles or individual styles for the container, button and dropdown
    let customStyles = {
        container: button.customStyles?.container || lvlStyles?.container, 
        button: button.customStyles?.button || lvlStyles?.button,
        dropdown: button.customStyles?.dropdown || lvlStyles?.dropdown
    }

    // handles showing folder content on click
    const showFolderOnClick = (event) => {
    
        event.target.parentNode.classList.add("dd-item-cont-click-enabled");

        const clear = () => {

            event.target.parentNode.classList.remove("dd-item-cont-click-enabled");
            event.target.parentNode.removeEventListener("mouseout", clear);
        }

        event.target.parentNode.addEventListener("mouseout", clear);
        button.callback?.();
    };


    return(
        <div className={`dd-item-cont-${folderMode} ${customStyles["container"]}`}>
            <button onClick={folderMode == "click" ? showFolderOnClick : button.callback} className={`dd-button ${customStyles["button"]}`}><img className="dd-button-img" src={button.icon || rulesIcon} alt="" />{button.title}</button>
            {
                children?.length > 0 && (
                <div className={`dropdown ${dropdownPos} ${customStyles["dropdown"]}`} style={{zIndex: zIndex}}>
                    { children?.map(el => el) }
                </div>)
            }
        </div>
    );
}

export default DropdownButton;