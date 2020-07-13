import React from 'react';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';

import './AccountsForm.css';

export default class AccountsForm extends React.Component {
    constructor(props) {
        super(props);
        this._inputElement = {};
        this.state = {
            bg: "init",
            consumption: "",
            amount: 0,
            date: "",
            items: {}
        };
        
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.inputExist = this.inputExist.bind(this);
        this.clearInputElement = this.clearInputElement.bind(this);
    }

    render() {
        return (
            <Form id="AccountsForm" onSubmit={this.handleSubmit} inline>
              <FormGroup>
                <Label for="exampleConsumption" hidden>Consumption</Label>
                <Input type="text" name="consumption" id="AccountsInput" innerRef={el => {this._inputElement.consumption = el}} onChange={this.handleInputChange } placeholder="消費品項" />
              </FormGroup>
              {' '}
              <FormGroup>
                <Label for="exampleAmount" hidden>Amount</Label>
                <Input type="number" name="amount" id="AccountsInput" min="0.00" step="0.01" innerRef={el => {this._inputElement.amount = el}} onChange={this.handleInputChange } placeholder="金額" />
              </FormGroup>
              {' '}
              <FormGroup>
                <Label for="exampleDate" hidden>Date</Label>
                <Input type="date" name="date" id="AccountsInput" innerRef={el => {this._inputElement.date = el}} onChange={this.handleInputChange } placeholder="日期" />
              </FormGroup>
              {' '}
              <Button color="info" id="AccountsSubmit" innerRef={el => {this._inputElement.submit = el}}>Submit</Button>
            </Form>
          );
    }

    handleInputChange(e) {
        let value = e.target.value;
        if(e.target.name === "amount") {
            value = parseFloat(value);
        }
        this.setState(
            {
                [e.target.name] : value
            }
        );
    }

    handleSubmit(e) {
        e.preventDefault(); // To prevent web page from refreshing
        if(this.inputExist()){  
            this.setState((prevState) => {
                let newItem = {
                    consumption: prevState.consumption,
                    amount: prevState.amount,
                    date: prevState.date,
                    key: Date.now()
                };
                this.clearInputElement();
                this.props.addItem(newItem);
                return { 
                    items: newItem,
                    consumption: "",
                    amount: 0,
                    date: ""
                };
            });
        }
        else{
            console.log("Please fill the form.");
        }
        
        
    }

    inputExist(){
        let exist = true;
         
        if(this.state.consumption === "")
            exist = false;
        if(this.state.amount === 0)
            exist = false;
        if(this.state.date === "")
            exist = false;
        return exist;
    }

    clearInputElement(){
        this._inputElement.consumption.value = "";
        this._inputElement.amount.value = 0;
        this._inputElement.date.value = "";
        this._inputElement.submit.block = true;
    }
    
}