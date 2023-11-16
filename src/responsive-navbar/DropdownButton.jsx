/**
 * Defines a dropdown item.
 * The item can be a Button or an anchor.
 * 
 * Button: has its own dropdown with children.
 * Anchor: no dropdown (it has it but its empty), is a link to another route.
 */

const anchorIcon = "https://api.iconify.design/gg:external.svg";
const folderIcon = "https://api.iconify.design/material-symbols:arrow-left-rounded.svg";
const folderIconDown = "https://api.iconify.design/material-symbols:arrow-drop-down-rounded.svg";

function DropdownButton({title, children, dropdownPosClass, zIndex, customStyles}) {

    // handles showing folder content on click, if selected
    const showFolderOnClick = (event) => {
    
        const dropdown = event.target.parentNode.querySelector(".dropdown");

        dropdown.style.display = "block";

        const clear = () => {

            dropdown.style.display = "";
            dropdown.removeEventListener("mouseout", clear);
            event.target.removeEventListener("mouseout", clear);
        }

        dropdown.addEventListener("mouseout", clear);
        event.target.addEventListener("mouseout", clear);
    };


    return(
        <div className={`dd-item-cont ${customStyles["container"]}`}>
            <button onClick={showFolderOnClick} className={`dd-button ${customStyles["button"]}`}><img src={children?.length > 0 ? folderIcon : anchorIcon } alt="" />{title}</button>
            {
                children?.length > 0 && (
                <div className={`dropdown ${dropdownPosClass} ${customStyles["dropdown"]}`} style={{zIndex: zIndex}}>
                    { children?.map(el => el) }
                </div>)
            }
        </div>
    );
}

export default DropdownButton;