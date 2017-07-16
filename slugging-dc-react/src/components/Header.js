import React, {Component} from 'react'
import {NavLink} from "react-router-dom"
import '../css/Header.css'

class Header extends Component {
    render() {
        return (

            <div className="header">
              <NavLink exact to="/" className="item" activeClassName="active" >Slugging DC</NavLink>
              <NavLink to="/about" className="item" activeClassName="active" >About</NavLink>
              <NavLink to="/stations" className="item" activeClassName="active" >Slug Lines</NavLink>
              <NavLink to="/need-a-ride" className="item" activeClassName="active" >Need A Ride?</NavLink>
              <NavLink to="/contact-us" className="item" activeClassName="active" >Contact Us</NavLink>
            </div>

        );
    }
}

export default Header;
