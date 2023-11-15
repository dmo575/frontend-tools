import bp from "../responsive.js";
import "./styles.css";

import { useEffect, useContext } from "react";
import { BreakpointContext } from "../Sandbox.jsx";
import DropdownButton from "./DropdownButton.jsx";

function Navbar({buttons, logo, menuButtonLogo}) {

    const currBp = useContext(BreakpointContext);


    // levelStyles contains an array of styles, each index should define the styles to be applied
    // to buttons at that nesting level (0 means head/heads, 1 means first gen children, 2 second
    // gen children, etc...)
    const spawnButtons_stairs = (root, dropdownLevel=0, levelStyles=["", "test", "test2", "test3"]) => {

        if(!root) return null;

        // depending on the nesting level, we assign a different position 
        // and z-index to this element's dropdown
        let dropdownClass;
        if(dropdownLevel == 0) {
            dropdownClass = "dropdown-pos-bottom-left";
        }
        else if(dropdownLevel % 2 == 0) {
            dropdownClass = "dropdown-pos-left";// change left to right to make it a downwards zig-zag stairs
        }
        else {
            dropdownClass = "dropdown-pos-left";
        }

        // this makes this function compatible with headless graphs
        if(root.length > 1) {
            return root.map(el => spawnButtons_stairs(el, dropdownLevel));
        }

        // used to store children
        const childButtons = [];

        // for each of root's children
        for(let i = 0; i < root.children?.length; i++) {

            // does that child has children ?
            if(root.children[i].children) {
                // recursively call spawnButtons on child and add its return to array
                childButtons.push(spawnButtons_stairs(root.children[i], dropdownLevel+1));
            }
            // child does NOT has any children (this means it's an anchor)
            else {
                // add childless button to array
                childButtons.push( <DropdownButton key={`${root.children[i].title}-${dropdownLevel}`} title={root.children[i].title} dropdownClass={dropdownClass} zIndex={dropdownLevel} customStyles={levelStyles[dropdownLevel+1]}/> );
            }
        }

        // return root button
        return(
            <DropdownButton key={`${root.title}-${dropdownLevel}`} title={root.title} dropdownClass={dropdownClass} zIndex={dropdownLevel} customStyles={levelStyles[dropdownLevel]}>
                {childButtons.map(el => el)}
            </DropdownButton>
        );
    };

    const spawnButtons_slide = (btns) => {

        if(!btns) return null;
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
                { currBp > bp.xs ? spawnButtons_stairs(buttons) : spawnButtons_slide(buttons)}
            </div>
        </div>
    );
}


export default Navbar;