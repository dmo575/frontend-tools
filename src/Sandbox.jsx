import { useState, useEffect, createContext } from "react";
import bp from "./responsive.js";
import logo from "./assets/react.svg";

// components
import Navbar from './responsive-navbar/Navbar'

// navbar data
const buttons = [
    {name: "BUtton 1"},
    {name: "BUtton 2"},
    {name: "BUtton 3"},
];



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

        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
        };

    }, []);

    return(
        <BreakpointContext.Provider value={currBp}>
        <Navbar buttons={buttons} logo={logo} menuButtonLogo={logo}/>
        </BreakpointContext.Provider>
    );
}

export default Sandbox;