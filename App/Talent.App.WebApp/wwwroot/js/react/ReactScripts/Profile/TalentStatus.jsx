import React from 'react'
import {Container } from 'semantic-ui-react';
import { SingleInput } from '../Form/SingleInput.jsx';

export default class TalentStatus extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

            status: this.props.status.status || "",
            availableDate: null
                           
        }  
        this.handleChange = this.handleChange.bind(this)
    }
    
    handleChange(event) {
        const name = event.target.name;
        const value = event.target.value;
        const id = event.target.id;
        console.log(value);
        this.setState({
            status: value
        })
        const update = {
            jobSeekingStatus: {
                status: value,
                availableDate: ""
            }
        }
        this.props.saveProfileData(update);

        

    }
    render() {

        this.state.status = this.props.status.status;
        return (
            <Container style={{ paddingTop: '20px', paddingBottom: '20px' }}>
                <React.Fragment>
                    <div>
                        <div className="six wide field" style={{fontWeight: 'Bold'}}>
                            Current Status: 
                        </div>
                        <div className="six wide field">
                            <input
                                type ="radio"
                                //label='Actively looking for a job'
                                name="status"
                                value="Actively looking for a job"
                                checked={this.state.status  === "Actively looking for a job"}
                                onChange={this.handleChange}
                            /> Actively looking for a job

                        </div>
                        <div className="six wide field">
                            <input
                                type="radio"
                                //label='Not looking for a job at the moment'
                                name="status"
                                value="Not looking for a job at the moment"
                               checked={this.state.status === "Not looking for a job at the moment"}
                                onChange={this.handleChange}
                            /> Not looking for a job at the moment

                        </div>
                        <div className="six wide field">
                            <input
                                type="radio"
                               // label='Currently employed but open to offers'
                                name="status"
                                value="Currently employed but open to offers"
                                checked={this.state.status === "Currently employed but open to offers"}
                                onChange={this.handleChange}
                            /> Currently employed but open to offers
                        </div>
                        <div className="six wide field">
                            <input
                                type="radio"
                               // label='Will be avaliable on later date'
                                name="status"
                                value="Will be avaliable on later date"
                               checked={this.state.status === "Will be avaliable on later date"}
                                onChange={this.handleChange}
                            /> Will be avaliable on later date
                        </div>
                    </div>                                                                        
                </React.Fragment>
            </Container>

        )
    }
}