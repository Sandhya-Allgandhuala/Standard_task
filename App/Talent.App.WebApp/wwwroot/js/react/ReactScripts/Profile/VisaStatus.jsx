import React from 'react'
import { ChildSingleInput } from '../Form/SingleInput.jsx';
import { Form, Checkbox, Container, Radio } from 'semantic-ui-react';

export default class VisaStatus extends React.Component {
    constructor(props) {
        super(props)
        this.state = {

            visaStatus: this.props.visaStatus,
                visaExpiryDate : this.props.visaExpiryDate,           
                
           
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleExpiry = this.handleExpiry.bind(this);
        this.saveData = this.saveData.bind(this);

    }
    handleExpiry(event) {
       // const data = Object.assign({}, this.state.visaExpiryDate)
        const data = event.target.value 
       // const name = event.target.name;
        //const value = event.target.value;
        console.log(data);
        const id = event.target.id;
        this.setState({            
            visaExpiryDate: data
        })
    }

    saveData() {

        const update = {
            visaStatus: this.state.visaStatus,
            visaExpiryDate: this.state.visaExpiryDate
        }
        this.props.saveProfileData(update);
    }
 

    handleChange(event) {
        const name = event.target.name;
        const value = event.target.value;
        const id = event.target.id;
        console.log(value);             
        if (value == "Citizen" || value == "Permanent Resident" || value == "") {
            document.getElementById('expiry').style.display = 'none';
            this.setState({
                visaStatus: value
            })
            const update = {
                visaStatus: value,
                visaExpiryDate: ""
            }
            this.props.saveProfileData(update);            
        }
        
        else {
            document.getElementById('expiry').style.display = 'inline';
            this.setState({             
                visaStatus: value
            })
            

        }
        

    }

    render() {
        
        return (
            
            <Container style={{ paddingTop: '20px', paddingBottom: '20px' }}>
                <React.Fragment>
                    <div >
                        
                        <div className="inline field" >
                            
                            <select className="ui right labeled dropdown six wide field"                    
                                id="Visatype"
                                onChange={this.handleChange}
                                value={this.state.visaStatus}
                                name="visaStatus">
                                <option value={this.props.visaStatus} >{this.props.visaStatus}</option>
                                <option value="Citizen" >Citizen</option>
                                <option value="Permanent Resident">Permanent Resident</option>
                                <option value="Work Visa">Work Visa</option>
                                    <option value="Student Visa">Student Visa</option>
                                </select>

                            <span style={{ display: 'none' }} id="expiry"> 
                                
                                <input className="six wide field"
                                type="date"
                                name="visaExpiryDate"
                                value={this.state.visaExpiryDate}
                                onChange={this.handleExpiry}
                                    />
                                
                                <button type="button" className="ui teal button" onClick={this.saveData}>Save</button>
                             </span>


                        </div>
                   </div>
                </React.Fragment>
            </Container>
        )
      
    }
}