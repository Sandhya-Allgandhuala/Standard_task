/* Self introduction section */
import React, { Component } from 'react';
import Cookies from 'js-cookie'
import { ChildSingleInput } from '../Form/SingleInput.jsx'

export default class SelfIntroduction extends React.Component {
    constructor(props) {
        super(props)

        this.state = {

            summary: this.props.summary || "",
            description: this.props.description || ""

        },


            this.handleChangeDescription = this.handleChangeDescription.bind(this)
        this.handleChangeSummary = this.handleChangeSummary.bind(this)
        this.saveContact = this.saveContact.bind(this)

    };

    handleChangeDescription(event) {
        const data = Object.assign({}, this.state.description)
        data[event.target.name] = event.target.value
        this.setState({
            description: data
        })
        this.props.updateWithoutSave(data);
    }

    handleChangeSummary(event) {

        const data = Object.assign({}, this.state.summary)
        data[event.target.name] = event.target.value
        this.setState({
            summary: data
        })
        this.props.updateWithoutSave(data);
    }

    saveContact() {
        const data = Object.assign({}, this.state.summary)
        const data2 = Object.assign({}, this.state.description)
        //console.log(this.state.Introduction)

        var updatedata = {
            data, data2
        }
        console.log("updatedata", updatedata)
        this.props.updateProfileData(updatedata)

    }



    render() {

        const SummaryLimit = 150;

        const characterLimit = 600;



        return (
            <React.Fragment>
                <div className="ui sixteen wide column">
                    <div className="field">
                        <textarea maxLength={SummaryLimit}
                            name="summary"
                            rows={2}
                            placeholder="Please provide a Short Summary about yourself."
                            value={this.props.summary}
                            onChange={this.handleChangeSummary} >
                        </textarea>

                    </div>
                </div>
                <span>Summary must be no more than 150 characters</span>
                <div className="ui sixteen wide column">
                    <div className="field" >
                        <textarea
                            maxLength={characterLimit}
                            minLength={150}
                            name="description"
                            placeholder=" Please tell us about any hobbies, additional expertise, or anything else you’d like to add."
                            value={this.props.description}
                            onChange={this.handleChangeDescription}
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











