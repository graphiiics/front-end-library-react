import React from 'react';
import './styles/Header.css';

class Header extends React.Component {
    render(){
        return (
        <div className="header">
            <h1>Library by @Graphiiics</h1>
            <span>Logo</span>
        </div>
        );
    }
}

export default Header;