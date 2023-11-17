
const anchorIcon = "https://api.iconify.design/gg:external.svg";
const folderIcon = "https://api.iconify.design/material-symbols:arrow-left-rounded.svg";
const folderIconDown = "https://api.iconify.design/material-symbols:arrow-drop-down-rounded.svg";

// helps to easily assign icons to each of the buttons
export const rules = (button, lvl) => {
    if(button.children?.length > 0) {
        return lvl == 0 ? folderIconDown : folderIcon;
    }
    return anchorIcon;
}


const default1 = {
    title: "This is",
}
const default2 = {
    title: "the default",
    callback: () => { console.log("anchor 2 callback")}
}
const default3 = {
    title: "styling",
    callback: () => { 
        console.log("anchor 3 callback.");
        window.open("https://www.google.com", "_blank");
    }
}

const folder3 = {
    title: "folder3",
    children: []
}

const folder2 = {
    title: "folder2",
    children: [],
    customStyles: {container: "", button: "test4", dropdown:""}
}


const defaultFolder2 = {
    title: "Nested folder",
    children: [default1, default2, default3]
}
const defaultFolder = {
    title: "default",
    children: [default1, default2, default3, defaultFolder2]
}


export const root = defaultFolder;