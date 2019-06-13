import React from 'react';
import './styles/Header.css';
import logo from '../images/logo.svg';
import { Link } from 'react-router-dom';


class Header extends React.Component {
    render(){
        return (
        <div className="header">
            <div className="container-fluid">
                <Link className="header__brand" to="/">
                    <img className="header__brand-logo" src={logo} alt="Logo"/>
                    <span className="font-weight-bold">Library</span>
                </Link>
            </div>
        </div>
        );
    }
}

export default Header;