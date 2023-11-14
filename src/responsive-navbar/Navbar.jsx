import bp from "../responsive.js";
import "./styles.css";

import { useEffect, useContext } from "react";
import { BreakpointContext } from "../Sandbox.jsx";
import DropdownButton from "./DropdownButton.jsx";

function Navbar({buttons, logo, menuButtonLogo}) {

    const currBp = useContext(BreakpointContext);

    /**
     * TODO:
     * 
     * Have the func take as children all the buttons, and as an argument the mobile menu button that is to encapsule the children
     * if we go mobile.
     * 
     */


    const spawnButtons = (root, dropdownLevel=0) => {

        if(!root) return null;

        let dropdownClass;

        if(dropdownLevel == 0) {
            dropdownClass = "dropdown-pos-bottom-left";
        }
        else if(dropdownLevel % 2 == 0) {
            dropdownClass = "dropdown-pos-right";
        }
        else {
            dropdownClass = "dropdown-pos-left";
        }


        // this makes this function compatible with headless graphs
        if(root.length > 1) {
            return root.map(el => spawnButtons(el, dropdownLevel));
        }

        // used to store children
        const childButtons = [];

        // for each of root's children
        for(let i = 0; i < root.children?.length; i++) {

            // does that child has children ?
            if(root.children[i].children) {
                // recursively call spawnButtons on child and add its return to array
                childButtons.push(spawnButtons(root.children[i], dropdownLevel+1));
            }
            // child does NOT has any children (this means it's an anchor)
            else {
                // add childless button to array
                childButtons.push( <DropdownButton key={`${root.children[i].title}-${dropdownLevel}`} title={root.children[i].title} dropdownClass={dropdownClass}/> );
            }
        }

        // return root button
        return(
            <DropdownButton key={`${root.title}-${dropdownLevel}`} title={root.title} dropdownClass={dropdownClass}>
                {childButtons.map(el => el)}
            </DropdownButton>
        );
    };

    const spawnButtonsOnMenu = (btns) => {

        if(!btns) return null;

        // TODO: return a dropdown button with the buttons as the items.
        return(
            <>
            This is mobile now
            </>
        );
    };

    return(
        <div className="navbar">
            <div className="logo-div">
                <img className="navbar-logo" src={logo} alt="logo image"/>
            </div>
            <div className="buttons-div">
                {/* if mobile: renders the menu button with items as children - else: renders children */}
                { currBp > bp.xs ? spawnButtons(buttons) : spawnButtonsOnMenu(buttons)}
            </div>
        </div>
    );
}

/*
spawnDropdown(buttons)
 */

export default Navbar;