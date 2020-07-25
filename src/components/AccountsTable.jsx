import React from 'react';
import { Table } from 'reactstrap';

import './AccountsTable.css';
import {addAccountItem, getAccountsData} from '../api/accounts-keeper-api.js';
export default class AccountsTable extends React.Component {
    constructor(props) {
        super(props);
        //let initItems = this.props.getAccountsData("2020-07-01","2020-07-19");
        
        let initItems = [];
        let initTotal = 0;
        
        this.state = {
            items: initItems,
            total: initTotal,
            expandedRows : []
        };
        this.createNewItem = this.createNewItem.bind(this);
        
    }

    render() {
        let tableItems = this.state.items;
        //tableItems = tableItems.map(i => this.createNewItem(i));
        
     
            tableItems = tableItems.map(
                (i)=>{
                    if(this.state.expandedRows.includes(i.key)){
                        return this.createNewItem(i).concat( this.expandTagItem(i));
                    }
                    else{ return this.createNewItem(i)}
                }
            );
        
        
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
                        <td id = "cost">{parseFloat(this.state.total).toFixed(2)}</td>
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
    componentDidMount(){
        this.setAccountsDatalist("2020-07-01","2020-07-19");
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
                */
                else if( i === prevState.items.length - 1 ){
                    prevState.items.push(newItem);
                    break;
                }
            }
            if(prevState.items.length === 0)
                prevState.items.splice(0, 0, newItem);
            return { 
                items: prevState.items ,
                //total: prevState.total + newItem.cost
            };
        },()=>{
            
            addAccountItem(newItem)
            .then(()=>{
                this.setAccountsDatalist("2020-07-01","2020-07-19");
            });
            
            console.log("add new item " + newItem);
        });
        
    }

    createNewItem(newItem){
        return [
            <tr onClick={(e) => this.handleRowClick(newItem.key)} key = {newItem.key}> 
                <td>{newItem.itemName}</td>
                <td id = "cost">{parseFloat(newItem.cost).toFixed(2)}</td>
                <td>{newItem.date}</td>
            </tr>
        ];
    }
    expandTagItem(newItem){
        return [
            <tr key = {`expand-rows-${newItem.key}`}> 
                <td>{newItem.tag}</td>
            </tr>
        ];
    }
    handleRowClick(rowKey) {
        const currentExpandedRows = this.state.expandedRows;
        const isRowCurrentlyExpanded = currentExpandedRows.includes(rowKey);
        
        const newExpandedRows = isRowCurrentlyExpanded ? 
			currentExpandedRows.filter(id => id !== rowKey) : 
			currentExpandedRows.concat(rowKey);
        
        this.setState({expandedRows : newExpandedRows} );
       
        console.log(`Click table item ${rowKey}`);
    }

    caculateSum(array){
        let total = 0;
        for(let i = 0; i < array.length; i++)
            total += array[i].cost;
        return total;
    }
    setAccountsDatalist(startDate, endDate){
        return this.props.getAccountsData(startDate, endDate)
        .then(updatedItems => {
            this.setState(
                (prevState)=>{
                    return{
                        total: this.caculateSum(updatedItems),
                        items: updatedItems
                    };
                }
            );
            
        })
        .then(() => {
            console.log(this.state);
        })
        .catch(err => {
            console.error('Error getting items data', err);
        });
    }
    
}