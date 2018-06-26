import React from "react"
import { NavLink } from 'react-router-dom'

import Header from "./ui/Header"
import Navbar from "./ui/Navbar"
import NavbarHeader from "./ui/NavbarHeader"
import NavbarCollapse from "./ui/NavbarCollapse";
import NavbarNav from "./ui/NavbarNav";

const activeClassName= "active"

const MainMenu = () =>
    <Header>
        <Navbar>
            <NavbarHeader />
            <NavbarCollapse>
                <NavbarNav>
                    <li><NavLink to="/" index={true} activeClassName={activeClassName}>Check-in</NavLink></li>
                    <li><NavLink to="/products" activeClassName={activeClassName}>Point of Sale</NavLink></li>
                </NavbarNav>                
            </NavbarCollapse>
        </Navbar>
    </Header>

export default MainMenu