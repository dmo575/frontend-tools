import { useState, useEffect, createContext } from "react";
import bp from "./responsive.js";
import logo from "./assets/react.svg";

// components
import Navbar from './responsive-navbar/Navbar.jsx'
import * as navbar_demo from "./responsive-navbar/navbar_demo.js"


// contains current breakpoint as the state "currBp"
export const BreakpointContext = createContext();

function Sandbox() {

    const [currBp, setBp] = useState(null);


    useEffect(() => {
        
        // updates currBp state, triggering a re-render
        const handleResize = () => {

            if(window.innerWidth < bp.sm && currBp != bp.xs) {setBp(bp.xs)}
            else if(window.innerWidth >= bp.sm && window.innerWidth < bp.md && currBp != bp.sm) {setBp(bp.sm)}
            else if(window.innerWidth >= bp.md && window.innerWidth < bp.lg && currBp != bp.md) {setBp(bp.md)}
            else if(window.innerWidth >= bp.lg && window.innerWidth < bp.xl && currBp != bp.lg) {setBp(bp.lg)}
            else if(window.innerWidth >= bp.xl && window.innerWidth < bp.xxl && currBp != bp.xl) {setBp(bp.xl)}
            else if(window.innerWidth >= bp.xxl && currBp != bp.xxl) {setBp(bp.xxl)}
        };

        handleResize();
        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
        };

    }, []);

    return(
        <BreakpointContext.Provider value={currBp}>
        <Navbar buttons={navbar_demo.root} folderMode={"hover"} iconRules={navbar_demo.rules} levelStyles={[]} logo={logo} menuButtonLogo={logo}/>
        </BreakpointContext.Provider>
    );
}

export default Sandbox;