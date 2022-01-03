import React from 'react'
import { FaSpotify } from "react-icons/fa";
import { BiUserCircle } from "react-icons/bi"
import './header.css';


function Header() {
    return (
        <div>
            <div className="header">
                <div className="left-header">
                    <FaSpotify /><span className="text-spot">Spotify</span>
                </div>
                <div className="right-header">
                    <BiUserCircle />
                </div>
            </div>
        </div>
    )
}

export default Header
