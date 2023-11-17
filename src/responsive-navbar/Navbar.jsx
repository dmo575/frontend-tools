import bp from "../responsive.js";
import { spawnButtons_stairs } from "./../tools/tools.jsx"
import "./styles_navbar.css";

import { useEffect, useContext } from "react";
import { BreakpointContext } from "../Sandbox.jsx";

// TODO, EXPERIMENT WITH CHANGING POSITION AND HAVING A FIXED DROPDOWN SIZE, ONE BACK BUTTON

function Navbar({buttons, iconRules, levelStyles, folderMode, logo}) {

    const currBp = useContext(BreakpointContext);

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
                { currBp > bp.xs ? spawnButtons_stairs(buttons, folderMode, iconRules, levelStyles) : spawnButtons_slide(buttons)}
            </div>
        </div>
    );
}


export default Navbar;