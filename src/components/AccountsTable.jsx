import React from 'react';
import { Table } from 'reactstrap';

import './AccountsTable.css';

export default class AccountsTable extends React.Component {
    constructor(props) {
        super(props);
        let initItems = this.props.getAccountsData("2020-07-01","2020-07-19");
        let initTotal = 0;
        for(let i = 0; i < initItems.length; i++)
            initTotal += initItems[i].amount;
        
        this.state = {
            items: initItems,
            total: initTotal
        };
        this.createNewItem = this.createNewItem.bind(this);
    }

    render() {
        let tableItems = this.state.items;
        tableItems = tableItems.map(i => this.createNewItem(i));
        return (
            <Table id = "accounts-table"  hover >
                <thead>
                    <tr>
                        <th>消費品項</th>
                        <th>金額</th>
                        <th>日期</th>
                        
                    </tr>
                </thead>
                <tbody>
                    {tableItems}
                </tbody>
                <tfoot>
                    <tr>
                        <td >總額</td>
                        <td id = "amount">{parseFloat(this.state.total).toFixed(2)}</td>
                        <td ></td>
                        
                    </tr>
                </tfoot>
            </Table>
        );
    }
    componentDidUpdate(prevProps) {
        //Don't forget to compare props
        if (this.props.newItem !== prevProps.newItem) {
          this.addNewItem(this.props.newItem);
        }
    }

    addNewItem(newItem){
        this.setState((prevState) => {
            for(let i = 0; i < prevState.items.length; i++){
                if(newItem.date <= prevState.items[i].date){
                    prevState.items.splice(i, 0, newItem);// inserts newItem at index i
                    break;
                }
                /*
                else if(newItem.date === prevState.items[i].date){
                    if(newItem.key <= prevState.items[i].key){
                        prevState.items.splice(i, 0, newItem);// inserts newItem at index i
                        break;
                    }else{
                        prevState.items.push(newItem);
                        break;
                    }
                }
                else{
                    prevState.items.push(newItem);
                    break;
                }*/
            }
            return { 
                items: prevState.items ,
                total: prevState.total + newItem.amount
            };
        },()=>{
            console.log(this.state.items);
        });
        
    }

    createNewItem(newItem){
        return (
            <tr key = {newItem.key}> 
                <td>{newItem.consumption}</td>
                <td id = "amount">{parseFloat(newItem.amount).toFixed(2)}</td>
                <td>{newItem.date}</td>
            </tr>
        );
        
    }
    

    
}