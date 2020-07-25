import React from 'react';
import AccountsForm from './AccountsForm.jsx'
import { Button } from 'reactstrap';
import './ExpandedButton.css'
//import CalendarModal from './CalendarModal';
import CalendarPopover from './CalendarPopover';
export default class ExpandedButton extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            toggle: false
        };
        this.toggleButton = this.toggleButton.bind(this);
    }
    
    render() {
        return (
            <div id="expanded-container">
                <div id = "expanded-button-bar">
                <Button id = "expanded-button" onClick = { this.toggleButton }  color="info">
                    <i className="fas fa-plus"></i>
                </Button>{' '}
                <CalendarPopover />
                </div>
                
                <AccountsForm closed = {this.state.toggle ? "" : "-closed"} addItem = {this.props.callback}/>
            </div>
        ) ;
        
    }

    toggleButton(){
        this.setState(
            (prevState) => { return {toggle: !prevState.toggle};}
        );
    }

    
}