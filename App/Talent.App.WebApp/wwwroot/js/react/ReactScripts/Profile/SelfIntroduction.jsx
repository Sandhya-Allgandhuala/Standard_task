/* Self introduction section */
import React, { Component } from 'react';
import Cookies from 'js-cookie'
import { ChildSingleInput } from '../Form/SingleInput.jsx'

export default class SelfIntroduction extends React.Component {
    constructor(props) {
        super(props);
       

        this.state = {
            Introduction: {
                summary: this.props.summary || "",
                description: this.props.description || ""
            }
        };
        
        
        
        this.handleChange = this.handleChange.bind(this)
        this.saveContact = this.saveContact.bind(this)
    };
    
    handleChange(event) {
        const data = Object.assign({}, this.state.Introduction)
        data[event.target.name] = event.target.value
        this.setState({
            Introduction: data
        })
    }

    saveContact() {
       
        console.log(this.state.Introduction)
        const data = Object.assign({}, this.state.Introduction)
        this.props.updateProfileData(data)
        
    }



    render() {
        
        const SummaryLimit = 150;

        const characterLimit = 600;
        
       

        return (
            <React.Fragment>
                <div className="ui sixteen wide column">
                    <div className="field">    
                        <input
                            type="text"
                            maxLength={SummaryLimit}
                            placeholder="Please provide a Short Summary about yourself."
                            name="summary"
                            value={this.state.Introduction.summary}
                            onChange={this.handleChange}  />                        
                    </div>
                </div>
                <span>Summary must be no more than 150 characters</span>
                <div className="ui sixteen wide column">
                    <div className="field" >
                        <textarea
                            maxLength={characterLimit}
                            name="description"
                           placeholder=" Please tell us about any hobbies, additional expertise, or anything else you’d like to add."
                            value={this.state.Introduction.description}
                            onChange={this.handleChange} 
                        />
                      
                    </div>
                    
                    <span>Description must be between 150-600 characters</span>
                    <div>
                        <button type="button" className="ui right floated teal button" onClick={this.saveContact}>
                            Save </button>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}











