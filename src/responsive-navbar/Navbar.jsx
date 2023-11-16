import bp from "../responsive.js";
import "./styles_navbar.css";

import { useEffect, useContext } from "react";
import { BreakpointContext } from "../Sandbox.jsx";
import DropdownButton from "./DropdownButton.jsx";

// TODO, EXPERIMENT WITH CHANGING POSITION AND HAVING A FIXED DROPDOWN SIZE, ONE BACK BUTTON


const root_folder1 = {
    title: "First folder",
}
const root_folder2 = {
    title: "Second folder"
}

const someAnchor1 = {
    title: "Some anchor"
}
const someAnchor2 = {
    title: "Another one"
}
const someAnchor3 = {
    title: "Hello"
}
const someAnchor4 = {
    title: "Hello23"
}
const someAnchor5 = {
    title: "Hello44"
}

const lvl1_folder1 = {
    title: "folder_11"
}
const lvl1_folder2 = {
    title: "folder_12"
}

const lvl2_folder1 = {
    title: "folder_21"
}

const lvl2_folder2 = {
    title: "folder_22"
}

root_folder1.children = [someAnchor1, someAnchor2, someAnchor3, lvl1_folder1, lvl1_folder2]
lvl1_folder1.children = [someAnchor1, lvl2_folder1, someAnchor2, someAnchor3, lvl2_folder2, someAnchor4]
lvl1_folder2.children = [someAnchor5, someAnchor1, someAnchor4, someAnchor2]
lvl2_folder1.children = [someAnchor3]
lvl2_folder2.children = [];

root_folder2.children = [someAnchor1, someAnchor2, someAnchor3];



function Navbar({buttons=[root_folder1, root_folder2], logo, menuButtonLogo}) {

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
     *          - icons (optional) - an object containing icons to use:
     *              - {root_folder: "src", root_anchor: "src", folder: "src", anchor: "src"}
     * levelStyles:
     *      accepts an array of the object:
     *      - {container: "container styles", "button": "button styles", dropdown: "dropdown styles"}
     *      - these are custom styles to be applied to the DropdownButton component at each level.
     *      - it allows you to customize each level independently
     *  zIndexStart:
     *      - the z index value you want to start with for the main dropdown, each subsequent dropdown will be rendered
     *        at an higher index than its parent.
     * _recursionCap:
     *      - If the function calls itself more than the specified count, it will throw an error.
     *      - this detects closed dependency loops between the element's relationship structure
     * _currLevel:
     *      - used internally by the recursive function, you should not edit this variable as indicated 
     *        by its lowercase naming.
     *      - it keeps track of how deep the function is on its recursive calling. Used to figure out what 
     *        z index, custom styles and key to provide to the DropdownButton component.
     * 
     */

    const spawnButtons_stairs = (root, levelStyles=["", {container: "test", dropdown: "test"}, {button: "test2", dropdown: "test22",container: ""}], zIndexStart=0, _recursionCap=200, _currLevel=0) => {

        if(!root) return null;
        if(_currLevel > _recursionCap) {throw new Error("recursion cap exeeded. You might have a closed dependency loop.")};

        // The first dropdown should appear below to the left of the parent, the other ones at the left of the parent
        // as described in the css classes.
        let dropdownPos = _currLevel == 0 ? "dropdown-pos-bottom-left" : "dropdown-pos-left";

        // is the root is headless, return an array
        if(root.length > 1) {
            return root.map(el => spawnButtons_stairs(el, levelStyles ,zIndexStart, _recursionCap, _currLevel));
        }

        // used to store children
        const childButtons = [];

        // for each of root's children
        for(let i = 0; i < root.children?.length; i++) {

            // does that child has children?
            if(root.children[i].children) {
                // recursively call spawnButtons on child and add its return to array
                childButtons.push(spawnButtons_stairs(root.children[i], levelStyles, zIndexStart, _recursionCap, _currLevel+1));
            }
            // child does NOT has any children (this means it's an anchor)
            else {
                // add childless button to array
                childButtons.push( <DropdownButton 
                    key={`${root.children[i].title}-${_currLevel}`} 
                    title={root.children[i].title} 
                    dropdownPos={dropdownPos} 
                    zIndex={zIndexStart + _currLevel} 
                    customStyles={levelStyles[_currLevel]}/> 
                );
            }
        }

        // return root button
        return(
            <DropdownButton 
            key={`${root.title}-${_currLevel}`} 
            title={root.title} 
            dropdownPos={dropdownPos} 
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
        <div className="navbar-cont">
            <div className="navbar-logo-cont">
                <img className="navbar-logo" src={logo} alt="logo image"/>
            </div>
            <div className="navbar-buttons-cont">
                { currBp > bp.xs ? spawnButtons_stairs(buttons) : spawnButtons_slide(buttons)}
            </div>
        </div>
    );
}


export default Navbar;