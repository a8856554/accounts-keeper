import React from 'react';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';

import './AccountsForm.css';

export default class AccountsForm extends React.Component {
    constructor(props) {
        super(props);
        this._inputElement = {};
        this.state = {
            bg: "init",
            itemName: "",
            cost: 0,
            date: "",
            tag: "",
            items: {}
        };
        
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.inputExist = this.inputExist.bind(this);
        this.clearInputElement = this.clearInputElement.bind(this);
    }
    
    render() {
        return (
            <Form id ={`AccountsForm${this.props.closed}`} onSubmit={this.handleSubmit} inline>
                    <FormGroup>
                        <Label for="exampleItemName" hidden>ItemName</Label>
                        <Input type="text" name="itemName" id="AccountsInput" innerRef={el => {this._inputElement.itemName = el}} onChange={this.handleInputChange } placeholder="消費品項" />
                    </FormGroup>
                    {' '}
                    <FormGroup>
                        <Label for="exampleCost" hidden>Cost</Label>
                        <Input type="number" name="cost" id="AccountsInput" min="0.00" step="0.01" innerRef={el => {this._inputElement.cost = el}} onChange={this.handleInputChange } placeholder="金額" />
                    </FormGroup>
                    {' '}
                    <FormGroup>
                        <Label for="exampleDate" hidden>Date</Label>
                        <Input type="date" name="date" id="AccountsInput" innerRef={el => {this._inputElement.date = el}} onChange={this.handleInputChange } placeholder="日期" />
                    </FormGroup>
                    {' '}
                    <FormGroup id = "TagFormGroup">
                        <Label for="exampleTag" hidden>Tag</Label>
                        <Input type="text" name="tag" id="TagInput"  innerRef={el => {this._inputElement.tag = el}} onChange={this.handleInputChange } placeholder="Tag" />
                    </FormGroup>
                    {' '}
                    <Button color="info" id="AccountsSubmit" innerRef={el => {this._inputElement.submit = el}}>Submit</Button>
            </Form>
        )
    }

    handleInputChange(e) {
        let value = e.target.value;
        if(e.target.name === "cost") {
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
                    itemName: prevState.itemName,
                    cost: prevState.cost,
                    date: prevState.date,
                    tag: prevState.tag,
                    key: Date.now()
                };
                this.clearInputElement();
                this.props.addItem(newItem);
                return { 
                    items: newItem,
                    itemName: "",
                    cost: 0,
                    date: "",
                    tag: ""
                };
            });
        }
        else{
            console.log("Please fill the form.");
        }
        
        
    }

    inputExist(){
        let exist = true;
         
        if(this.state.itemName === "")
            exist = false;
        if(this.state.cost === 0)
            exist = false;
        if(this.state.date === "")
            exist = false;
        return exist;
    }

    clearInputElement(){
        this._inputElement.itemName.value = "";
        this._inputElement.cost.value = 0;
        this._inputElement.date.value = "";
        this._inputElement.tag.value = "";
        //this._inputElement.submit.block = true;
    }
    
}