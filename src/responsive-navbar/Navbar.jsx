import bp from "../responsive.js";
import "./styles.css";

import { useEffect, useContext } from "react";
import { BreakpointContext } from "../Sandbox.jsx";
import DropdownButton from "./DropdownButton.jsx";

function Navbar({buttons, logo, menuButtonLogo}) {

    const currBp = useContext(BreakpointContext);


    /** 
     * Abstract:
     * Generates a "staircase" style navbar menu that can contain as many folders and anchors as the root defines.
     * It allows you pass in custom styles for every folder.
     * 
     * Detailed:
     * root: 
     *      the first parent/s button/s
     *      the object passed must contain the following elements:
     *          -children - an array containing children elements, if any
     *              - an element with this property will be treated as a folder, a button
     *          - title - the name to give to the element/folder/link
     *          - icon (optional) - an icon to be displayed at the left of the item
     * levelStyles:
     *      accepts an array of the object:
     *      - {container: "container styles", "button": "button styles", dropdown: "dropdown styles"}
     *      - these are custom styles to be applied to the DropdownButton component at each level.
     *      - it allows you to customize each level independently
     *  zIndexStart:
     *      - the z index value you want to start with for the main dropdown, each subsequent dropdown will be rendered
     *        at an higher index than its parent.
     * _currLevel:
     *      - used internally by the recursive function, you should not edit this variable as indicated by its lowercase
     *        naming.
     *      - it keeps track of how deep the function is on its recursive calling. Used to figure out what 
     *        z index, custom styles and key to provide to the DropdownButton component.
     */
    const spawnButtons_stairs = (root, levelStyles=["", "test", "test2", "test3"], zIndexStart=0, _currLevel=0) => {

        if(!root) return null;

        // The first dropdown should appear below to the left of the parent, the other ones at the left of the parent
        // as described in the css classes.
        let dropdownClass = _currLevel == 0 ? "dropdown-pos-bottom-left" : "dropdown-pos-left";

        // is the root is headless, return an array
        if(root.length > 1) {
            return root.map(el => spawnButtons_stairs(el, levelStyles ,zIndexStart, _currLevel));
        }

        // used to store children
        const childButtons = [];

        // for each of root's children
        for(let i = 0; i < root.children?.length; i++) {

            // does that child has children?
            if(root.children[i].children) {
                // recursively call spawnButtons on child and add its return to array
                childButtons.push(spawnButtons_stairs(root.children[i], levelStyles, zIndexStart, _currLevel+1));
            }
            // child does NOT has any children (this means it's an anchor)
            else {
                // add childless button to array
                childButtons.push( <DropdownButton 
                    key={`${root.children[i].title}-${_currLevel}`} 
                    title={root.children[i].title} 
                    dropdownClass={dropdownClass} 
                    zIndex={zIndexStart + _currLevel} 
                    customStyles={levelStyles[_currLevel+1]}/> 
                );
            }
        }

        // return root button
        return(
            <DropdownButton 
            key={`${root.title}-${_currLevel}`} 
            title={root.title} 
            dropdownClass={dropdownClass} 
            zIndex={zIndexStart + _currLevel} 
            customStyles={levelStyles[_currLevel]}>
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
                { currBp > bp.xs ? spawnButtons_stairs(buttons,["", "test", "test2", "test3"],2) : spawnButtons_slide(buttons)}
            </div>
        </div>
    );
}


export default Navbar;