import DropdownButton from "./components/DropdownButton";
import "./components/styles_dropdownButton.css";

/** 
     * Abstract:
     * Generates a "staircase" style navbar menu that can contain as many folders and anchors as the root defines.
     * It allows you pass in custom styles for every folder.
     * 
     * Detailed:
     * root:
     *      Either an item or an array of them.
     *      Item object:
     *          title: "string"
     *              - Name to display for the item
     *          children: [Item]
     *              - Folder items only. Used when the item is to act as a folder
     *          callback: function
     *              - A function to call whenever the item is clicked
     *          customStyles:
     *              - {container: "str", button: "str", dropdown: "str"}
     *              - Optional. These styles will replace the default and levelStyles passed.
     *          icon:
     *              - Optional. Will override any icon given by the rules function (if any)
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

export const spawnButtons_stairs = (root, folderMode, iconRules=null, levelStyles=[], zIndexStart=0, _recursionCap=200, _currLevel=0) => {

    if(!root) return null;
    if(_currLevel > _recursionCap) {throw new Error("recursion cap exeeded. You might have a closed dependency loop.")};

    // The first dropdown should appear below to the left of the parent, the other ones at the left of the parent
    // as described in the css classes.
    let dropdownPos = _currLevel == 0 ? "dropdown-pos-bottom-left" : "dropdown-pos-left";

    // is the root is headless, return an array
    if(root.length > 1) {
        return root.map(el => spawnButtons_stairs(el, folderMode, iconRules, levelStyles ,zIndexStart, _recursionCap, _currLevel));
    }

    // used to store children
    const childButtons = [];

    // for each of root's children
    for(let i = 0; i < root.children?.length; i++) {

        // does that child has children?
        if(root.children[i].children) {
            // recursively call spawnButtons on child and add its return to array
            childButtons.push(spawnButtons_stairs(root.children[i], folderMode, iconRules, levelStyles, zIndexStart, _recursionCap, _currLevel+1));
        }
        // child does NOT has any children (this means it's an anchor)
        else {
            // add childless button to array
            childButtons.push( <DropdownButton
                key={`${root.children[i].title}-${_currLevel}`}
                button={root.children[i]}
                dropdownPos={dropdownPos}
                folderMode={folderMode}
                zIndex={zIndexStart + _currLevel}
                rulesIcon={iconRules == null ? "" : iconRules(root.children[i], _currLevel)}
                lvlStyles={levelStyles[_currLevel]}/>
            );
        }
    }

    // return root button
    return(
        <DropdownButton 
        key={`${root.title}-${_currLevel}`}
        button={root}
        dropdownPos={dropdownPos}
        folderMode={folderMode}
        zIndex={zIndexStart + _currLevel}
        rulesIcon={iconRules == null ? "" : iconRules(root, _currLevel)}
        lvlStyles={levelStyles[_currLevel]}>
            {childButtons.map(el => el)}
        </DropdownButton>
    );
};