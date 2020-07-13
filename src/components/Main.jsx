import React from 'react';
import {
    BrowserRouter as Router,
    Route,
    Link
} from 'react-router-dom'
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink
} from 'reactstrap';

import './Main.css';
import AccountsContent from'./AccountsContent.jsx';

export default class Main extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            navbarToggle: false
        };
        this.handleNavbarToggle = this.handleNavbarToggle.bind(this);
    }

    render() {
        return (
            <Router>
                <div className={`main bg-faded ${this.state.group}`}>
                    <div className='container'>
                        <Navbar color="faded" light expand="md">
                            <NavbarBrand className='text-info' href="/">Account Keeper</NavbarBrand>
                            <NavbarToggler onClick={this.handleNavbarToggle}/>
                            <Collapse isOpen={this.state.navbarToggle} navbar>
                                <Nav navbar>
                                    <NavItem>
                                        <NavLink tag={Link} to='/'>Accounting</NavLink>
                                    </NavItem>
                                    <NavItem>
                                        <NavLink tag={Link} to='/data'>Data</NavLink>
                                    </NavItem>
                                </Nav>
                                <span className='navbar-text ml-auto'>Test</span>
                            </Collapse>
                        </Navbar>
                    </div>

                    <Route exact path="/" render={() => (
                        <AccountsContent  />
                    )}/>
                    <Route exact path="/data" render={() => (
                        <AccountsContent  />
                    )}/>
                </div>
            </Router>
        );
    }

    handleNavbarToggle() {
        this.setState((prevState, props) => ({
            navbarToggle: !prevState.navbarToggle
        }));
        console.log('toggle ' + this.state.navbarToggle)
    }

    
}