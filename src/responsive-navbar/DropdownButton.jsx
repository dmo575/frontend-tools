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

function DropdownButton({title, children, dropdownPos, zIndex, customStyles, icon, folderMode="hover"}) {

    if(folderMode != "hover" && folderMode != "click") {throw new Error(`folderMode must be set to "hover" or "click".`)};

    //TODO::: GIVE THE OPTION FOR FLODER INTERACTION CLICK OR HOVER
    // ALSO, REMEMBER TRIPLE-10 MEETING TODAY
    // handles showing folder content on click, if selected
    const showFolderOnClick = (event) => {
    
        event.target.parentNode.classList.add("dd-item-cont-click-enabled");

        const clear = () => {

            event.target.parentNode.classList.remove("dd-item-cont-click-enabled");
            event.target.parentNode.removeEventListener("mouseout", clear);
        }

        event.target.parentNode.addEventListener("mouseout", clear);
    };


    return(
        <div className={`dd-item-cont-${folderMode} ${customStyles["container"]}`}>
            <button onClick={folderMode == "click" ? showFolderOnClick: null} className={`dd-button ${customStyles["button"]}`}><img className="dd-button-img" src={children?.length > 0 ? folderIcon : anchorIcon } alt="" />{title}</button>
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