import React from 'react';

import './AccountsContent.css';
import AccountsForm from './AccountsForm.jsx'
import AccountsTable from './AccountsTable.jsx'
import {addAccountItem, getAccountsData} from '../api/accounts-keeper-api.js';
import ExpandedButton from './ExpandedButton.jsx';

export default class AccountsContent extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            bg: "init",
            item: {}
        };
        this.addAccountItem = this.addAccountItem.bind(this);
        this.getAccountsData = this.getAccountsData.bind(this);
    }
    
    render() {
        
        return (
            <div className={`account-content-bg ${this.state.bg}`}>
                <div className={`account-content`}>
                    <div className={`ceiling`}></div>
                    <ExpandedButton callback = {this.addAccountItem}/>
                    <AccountsTable newItem = {this.state.item} getAccountsData = {this.getAccountsData}/>
                </div>
            </div>
        );
    }

    getAccountsData(startDate, endDate){
        return getAccountsData(startDate, endDate);
    }

    addAccountItem(newItem){
        this.setState( { item: newItem } );
        //accounts-keeper-api.js
        addAccountItem( newItem );
    }

    
}