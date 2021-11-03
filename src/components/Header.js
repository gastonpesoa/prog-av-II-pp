import React, { Component } from 'react'
import Titulo from './Titulo';

class Header extends Component {
    render() {
        return (
            <header>
                <Titulo>CRUD DE MASCOTAS</Titulo>
            </header>
        )
    }
}

export default Header;