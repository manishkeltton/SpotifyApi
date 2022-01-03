import React from 'react'
import { AiOutlineHome } from "react-icons/ai"
import { BiLibrary } from 'react-icons/bi'
import { FiSearch } from "react-icons/fi"
import './sidebar.css'

function Sidebar() {
    return (
        <div className="left-content">
            <ul className="list-group">
                <li><AiOutlineHome color="white" size="2rem" /><span>Home</span></li>
                <li><FiSearch color="white" size="2rem" /><span>Search</span></li>
                <li><BiLibrary color="white" size="2rem" /><span>Library</span></li>
            </ul>
        </div>

    )
}

export default Sidebar
