import React, { useEffect, useState } from "react";
import Logo from '../assets/logo.png'; 
import { Link } from "react-router-dom";

function Header() {
  return (
    <div className="header ">
      <Link to="/">
        <img src={Logo} alt="logo" className="logo" />
      </Link>  
    </div>     
  );
}
export default Header;
