import bp from "../responsive.js";
import "./styles.css";

import { useEffect, useContext } from "react";
import { BreakpointContext } from "../Sandbox.jsx";

function Navbar({buttons, logo, menuButtonLogo}) {

    const currBp = useContext(BreakpointContext);

    /**
     * TODO:
     * 
     * Have the func take as children all the buttons, and as an argument the mobile menu button that is to encapsule the children
     * if we go mobile.
     * 
     */


    const spawnButtons = (btns) => {

        if(!btns) return null;

        return btns.map((el, index) => {
            return(
                <button className="navbar-button" key={`navbar-button-${index}`}>{el.name}</button>
            );
        });
    };

    const spawnMenuButton = (btns) => {
        // TODO: return a dropdown button with the buttons as the items.
        return "This is mobile now";
    };

    return(
        <div className="navbar">
            <div className="logo-div">
                <img className="navbar-logo" src={logo} alt="logo image"/>
            </div>
            <div className="buttons-div">
                { currBp > bp.xs ? spawnButtons(buttons) : spawnMenuButton(buttons)}
            </div>
        </div>
    );
}

export default Navbar;