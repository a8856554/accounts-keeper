import React from 'react';
import AccountsForm from './AccountsForm.jsx'
import { Button } from 'reactstrap';
import './ExpandedButton.css'
export default class ExpandedButton extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            toggle: false
        };
        this.toggleButton = this.toggleButton.bind(this);
    }
    
    render() {
        return this.state.toggle ? 
        (
            <div id="expanded-container">
                <Button id = "expanded-button" onClick = { this.toggleButton }  color="info">
                    <i className="fas fa-plus"></i>
                </Button>{' '}
                <AccountsForm closed = "" addItem = {this.props.callback}/>
            </div>
        ) :
        (
            <div id="expanded-container">
                <Button id = "expanded-button" onClick = { this.toggleButton }  color="info">
                    <i className="fas fa-plus"></i>
                </Button>{' '}
                <AccountsForm closed = "-closed" addItem = {this.props.callback}/>
            </div>
        ) ;
    }

    toggleButton(){
        this.setState(
            (prevState) => { return {toggle: !prevState.toggle};}
        );
    }

    
}