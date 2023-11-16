import { useState, useEffect, createContext } from "react";
import bp from "./responsive.js";
import logo from "./assets/react.svg";

// components
import Navbar from './responsive-navbar/Navbar.jsx'

// navbar data
const  child1a = {title: "Child1_A", href: "www.google.com", target: "_blank"};
const  child1b = {title: "Child1_B", href: "www.youtube.com", target: "_blank"};
const  child1a1 = {title: "Child1_A1", href: "www.google.com", target: "_blank"};
const  child1a2 = {title: "Child1_A2", href: "www.google.com", target: "_blank"};
const  child1a3 = {title: "Child1_A3", href: "www.google.com", target: "_blank"};
const  child1a4 = {title: "Child1_A4", href: "www.google.com", target: "_blank"};
const  child1a5 = {title: "Child1_A5", children: [child1a, child1a1, child1a2,child1a3,child1a4]};
const  child1c = {title: "Child1_C", children: [child1a, child1a5, child1a1, child1a2, child1a3, child1a4]};
const buttons = [
    {title: "Button1", children: [child1a, child1c, child1b], mode_default: "left", align_default: "center", mode_sm: "left", align_sm: "center"},
    {title: "Button2", href: "www.google.com", target: "_blank"},
    {title: "Button3", href: "www.youtube.com", target: "_blank"},
];

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
        <Navbar logo={logo} menuButtonLogo={logo}/>
        </BreakpointContext.Provider>
    );
}

export default Sandbox;