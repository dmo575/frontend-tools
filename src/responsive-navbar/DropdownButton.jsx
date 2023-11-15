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

function DropdownButton({title, children, dropdownClass, zIndex, customStyles}) {

    return(
        <div className="button-container">
            <button className={`navbar-button ${customStyles}`}><img className="navbar-button-img" src={children?.length > 0 ? folderIcon : anchorIcon } alt="" />{title}</button>
            {
                children?.length > 0 && (
                <div className={`dropdown ${dropdownClass}`} style={{zIndex: zIndex}}>
                    { children?.map(el => el) }
                </div>)
            }
        </div>
    );
}

export default DropdownButton;