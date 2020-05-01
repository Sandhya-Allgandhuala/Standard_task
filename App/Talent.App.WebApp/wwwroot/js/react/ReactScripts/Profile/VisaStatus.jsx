import React from 'react'
import { ChildSingleInput } from '../Form/SingleInput.jsx';
import { Form, Checkbox, Container, Radio } from 'semantic-ui-react';
import DatePicker from 'react-datepicker';
import moment from 'moment';
export default class VisaStatus extends React.Component {
    constructor(props) {
        super(props)
        this.state = {

            visaStatus: this.props.visaStatus,
            visaExpiryDate: this.props.visaExpiryDate,


        }
        this.handleChange = this.handleChange.bind(this);
        this.handleExpiry = this.handleExpiry.bind(this);
        this.handleChangeDate = this.handleChangeDate.bind(this);
        this.saveData = this.saveData.bind(this);

    }
    handleChangeDate(date, name) {

        var data = Object.assign({}, this.props.visaExpiryDate);
        var startdata = date
        this.setState({
            visaExpiryDate: startdata
        })
        data[name] = date;
        var updateData = {
            target: { name: "visaExpiryDate", value: data }
        }
        this.props.updateProfileData(data);

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

            this.setState({
                visaStatus: value
            })
            const update = {
                visaStatus: value,
                visaExpiryDate: "",
            }
            this.props.saveProfileData(update);
        }

        else {
            const update = {
                visaStatus: value
            }
            this.props.updateProfileData(update);
            this.setState({
                visaStatus: value
            })


        }


    }

    render() {
        const { visaExpiryDate } = this.props;

        return (



            <Container style={{ paddingTop: '20px', paddingBottom: '20px' }} className="inline field">
                <React.Fragment>
                    <div className="inline field">
                        {this.props.visaStatus == "Citizen" || this.props.visaStatus == "" || this.props.visaStatus == "Permanent Resident"
                            ?

                            <div className="inline field" >
                                Visa Type
                                <br />
                                <select className="ui right labeled dropdown four wide field"
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



                            </div>
                            : <div className="content item" >
                                <div>
                                    Visa Type
                                <select className="ui right labeled dropdown four wide field"
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
                                </div>

                                <div>
                                    Visa Expiry<br />
                                    <DatePicker

                                        selected={moment(visaExpiryDate).isValid() ? moment(visaExpiryDate) : null}
                                        onChange={(date) => this.handleChangeDate(date, "visaExpiryDate")}


                                    />
                                </div>
                                <div>
                                    <button type="button" className="ui teal button" onClick={this.saveData}>Save</button>
                                </div>


                            </div>}
                    </div>
                </React.Fragment>
            </Container>
        )

    }
}