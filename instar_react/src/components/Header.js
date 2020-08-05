import React from 'react';
import { Container } from '@material-ui/core';
import '../style.css';
import UserMenu from './UserMenu';

const Header = (props) => {
    let [search, onChange] = React.useState('')
    return (
        <div className="header header-fixed">
            <Container>
                <div className="header">
                    <div style={{position: 'absolute', top: '50%', left: '0%', transform: 'translateY(-50%)'}}>
                        <a href="/" className="logo" style={{textDecoration: 'none', color: 'black'}}>INSTAR</a>
                    </div>
                    
                    <div className="search" style={{position: 'absolute', top: '50%', left: '50%', transform: 'translateX(-50%) translateY(-50%)'}}>
                        <input 
                            className="input" 
                            type="text" 
                            placeholder="검색"
                            value={search}
                            onChange={(e) => onChange(e.target.value)} />
                    </div>
                    
                    <div style={{position: 'absolute', top: '50%', right: '0%', transform: 'translateY(-50%)'}}>
                        <UserMenu />
                    </div>
                </div>
            </Container>
        </div>
    )
}

export default Header