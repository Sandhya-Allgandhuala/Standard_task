/* Experience section */
import React from 'react';
import Cookies from 'js-cookie';
import { Table, Form, Button, Icon, Confirm, Container } from "semantic-ui-react";
import { ChildSingleInput } from '../Form/SingleInput.jsx';
import DatePicker from "react-datepicker";
import moment from 'moment';

export default class Experience extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            experience: {
                company: "",
                position: "",
                responsibilities: "",
                start: "",
                end: ""
            },
            editedIndex: -1,
            company: "",
            position: "",
            responsibilities: "",
            start: "",
            end: "",
            showAddSection: false
        }

        this.handleChange = this.handleChange.bind(this)
        this.saveContact = this.saveContact.bind(this)
        this.openAdd = this.openAdd.bind(this)

        this.closeAdd = this.closeAdd.bind(this)

    };


    handleChange(event) {
        const data = Object.assign({}, this.state.experience)

        data[event.target.name] = event.target.value,
            this.setState({
                experience: data
            })

    }

    openAdd() {
        const ExperienceData = Object.assign({}, this.props.experienceData)
        this.setState({
            showAddSection: true,
            company: "",
            position: "",
            responsibilities: "",
            start: "",
            end: ""
        })
    }

    closeAdd() {
        this.setState({
            showAddSection: false,
        })
    };

    editComponent(index) {

        var oldexperience = Object.assign([], this.props.experienceData)
        var company = oldexperience[index].company;
        var position = oldexperience[index].position;
        var responsibilities = oldexperience[index].responsibilities;
        var start = oldexperience[index].start;
        var end = oldexperience[index].end;
        //var startdate = new Date(start);
        //startdate.toDateString();

        var enddate = new Date(end);
        var enddate1 = enddate.toDateString();

        this.setState({
            company: company,
            position: position,
            responsibilities: responsibilities,
            start: start,
            end: enddate1,
            editedIndex: index
        });
    }

    cancelEdit() {
        this.setState({
            editedIndex: -1,
            company: "",
            position: "",
            responsibilities: "",
            start: "",
            end: "",
        })
    }

    updateLanguage(index) {
        console.log("updateComponent", index)
        var oldexperience = Object.assign([], this.props.experienceData)
        oldexperience[index].company = this.state.company;
        oldexperience[index].position = this.state.position;
        oldexperience[index].start = this.state.start;
        oldexperience[index].end = this.state.end;
        oldexperience[index].responsibilities = this.state.responsibilities;
        console.log("newexperience", oldexperience)
        var updateexperience = {
            experience: oldexperience
        }
        this.props.updateProfileData(updateexperience)
        this.setState({
            editedIndex: -1,
            company: "",
            position: "",
            responsibilities: "",
            start: "",
            end: "",
        })
    }

    saveContact() {
        console.log("state", this.state.experience)
        console.log("props", this.props.experienceData)
        var oldexperience = Object.assign([], this.props.experienceData)
        var newrecord = Object.assign({}, this.state.experience)
        if (newrecord.company == "" || newrecord.position == "" || newrecord.responsibilities == "" || newrecord.start == "" || newrecord.end == "") {
            TalentUtil.notification.show("Please fill the details", "error", null, null)
        }
        else {
            oldexperience.push(newrecord);
            var updateexperience = {
                experience: oldexperience
            }
            this.props.updateProfileData(updateexperience)
            this.closeAdd();
        }


    }

    Deleteexperience(recordToDelete) {
        const updatedexperience = this.props.experienceData.filter(record => record.id != recordToDelete.id);
        var updateexperience = {
            experience: updatedexperience
        }
        this.props.updateProfileData(updateexperience)
    }

    handleCompanyChange(event) {

        this.setState({
            company: event.target.value
        })
    }

    handlepositionChange(event) {
        this.setState({
            position: event.target.value
        })
    }

    handlestartChange(event) {

        this.setState({
            start: event.target.value
        })
    }

    handleendChange(event) {
        this.setState({
            end: event.target.value
        })
    }

    handleresponsibilitiesChange(event) {

        this.setState({
            responsibilities: event.target.value
        })
    }


    render() {

        let { editedIndex } = this.state;
        let deleteBtn = record => (
            <i className="delete icon" onClick={() => this.Deleteexperience(record)}>

            </i>
        );

        let editBtn = index => (
            <i className="pencil icon" onClick={() => this.editComponent(index)}>

            </i>
        );
        let updateBtn = index => (
            <button type="button" className="ui blue basic button" onClick={() => this.updateLanguage(index)}>
                Update
            </button>
        );
        let cancelBtn = (
            <button type="button" className="ui red basic button" onClick={() => this.cancelEdit()}>
                Cancel
            </button>
        );
        let editcompany = (

            <div>
                <ChildSingleInput
                    inputType="text"
                    label="Company"
                    name="company"
                    value={this.state.company}
                    controlFunc={(event) => this.handleCompanyChange(event)}
                    maxLength={15}
                    errorMessage="length should be maximum 15 characters"
                /></div>
        );
        let editposition = (<div>
            <ChildSingleInput
                inputType="text"
                label="Position"
                name="position"
                value={this.state.position}
                controlFunc={(event) => this.handlepositionChange(event)}

                maxLength={15}
                errorMessage="length should be maximum 15 characters"
            />
        </div>
        );

        let editstart = (

            <div>
                <ChildSingleInput
                    inputType="date"
                    label="StartDate"
                    name="start"
                    value={this.state.start}

                    controlFunc={(event) => this.handlestartChange(event)}
                    maxLength={80}
                    errorMessage=" "
                />

            </div>
        );
        let editend = (
            <div>

                <ChildSingleInput
                    inputType="date"
                    label="EndDate"
                    name="end"
                    value={this.state.end}
                    controlFunc={(event) => this.handleendChange(event)}
                    maxLength={80}
                    errorMessage="length should be maximum 80 characters"
                />
            </div>
        );

        let editresponsibilities = (
            <div>
                <ChildSingleInput
                    inputType="text"
                    label="Responsibilities"
                    name="responsibilities"
                    value={this.state.responsibilities}
                    controlFunc={(event) => this.handleresponsibilitiesChange(event)}
                    maxLength={30}
                    errorMessage="length should be maximum 30 characters"
                />
            </div>
        );

        return (
            <Container style={{ paddingTop: '20px', paddingBottom: '20px' }}>
                <React.Fragment>
                    <div className='ui six wide column'>
                        {
                            this.state.showAddSection ?
                                <div className='ui four wide column' style={{ paddingBottom: '20px' }}>
                                    <div className='two fields'>
                                        <ChildSingleInput
                                            inputType="text"
                                            label="Company"
                                            name="company"
                                            value={this.state.experience.company}
                                            controlFunc={this.handleChange}
                                            maxLength={15}
                                            errorMessage="length should be maximum 15 characters"
                                        />

                                        <ChildSingleInput
                                            inputType="text"
                                            label="Position"
                                            name="position"
                                            value={this.state.experience.position}
                                            controlFunc={this.handleChange}
                                            maxLength={15}
                                            errorMessage="length should be maximum 15 characters"
                                        />
                                    </div>
                                    <div className='two fields'>
                                        <ChildSingleInput
                                            inputType="date"
                                            label="StartDate"
                                            name="start"
                                            value={this.state.experience.start}
                                            controlFunc={this.handleChange}
                                            maxLength={80}
                                            errorMessage=""
                                        />
                                        <ChildSingleInput
                                            inputType="date"
                                            label="EndDate"
                                            name="end"
                                            value={this.state.experience.end}
                                            controlFunc={this.handleChange}
                                            maxLength={80}
                                            errorMessage=""
                                        />
                                    </div>
                                    <ChildSingleInput
                                        inputType="text"
                                        label="Responsibilities"
                                        name="responsibilities"
                                        value={this.state.experience.responsibilities}
                                        controlFunc={this.handleChange}
                                        maxLength={30}
                                        errorMessage="length should be maximum 30 characters"
                                    />
                                    <button type="button" className="ui teal button" onClick={this.saveContact}>Save</button>
                                    <button type="button" className="ui button" onClick={this.closeAdd}>Cancel</button>

                                </div>
                                : null
                        }
                        <div className="ui sixteen wide column">
                            <Table striped>
                                <Table.Header>
                                    <Table.Row>
                                        <Table.HeaderCell>Company</Table.HeaderCell>
                                        <Table.HeaderCell>Position</Table.HeaderCell>
                                        <Table.HeaderCell>StartDate</Table.HeaderCell>
                                        <Table.HeaderCell>EndDate</Table.HeaderCell>
                                        <Table.HeaderCell>Responsibilities</Table.HeaderCell>
                                        <Table.HeaderCell>
                                            <button type="button" className="ui teal button right floated" onClick={this.openAdd}><i className="plus icon"></i>AddNew</button></Table.HeaderCell>
                                    </Table.Row>
                                </Table.Header>
                                <Table.Body>
                                    {this.props.experienceData.map(record => {
                                        return (
                                            <Table.Row key={record.id}>
                                                <Table.Cell>
                                                    {this.props.experienceData.indexOf(record) === editedIndex
                                                        ? editcompany
                                                        : record.company}
                                                </Table.Cell>
                                                <Table.Cell>
                                                    {this.props.experienceData.indexOf(record) === editedIndex
                                                        ? editposition
                                                        : record.position}
                                                </Table.Cell>
                                                <Table.Cell>
                                                    {this.props.experienceData.indexOf(record) === editedIndex
                                                        ? editstart
                                                        : moment(record.start).format("MMM Do YYYY")}
                                                </Table.Cell>
                                                <Table.Cell>
                                                    {this.props.experienceData.indexOf(record) === editedIndex
                                                        ? editend
                                                        : moment(record.end).format("MMM Do YYYY")}
                                                </Table.Cell>
                                                <Table.Cell>{this.props.experienceData.indexOf(record) === editedIndex
                                                    ? editresponsibilities
                                                    : record.responsibilities}
                                                </Table.Cell>
                                                <Table.Cell className="right aligned">
                                                    {this.props.experienceData.indexOf(record) === editedIndex
                                                        ? updateBtn(this.props.experienceData.indexOf(record))
                                                        : editBtn(this.props.experienceData.indexOf(record))}
                                                    {this.props.experienceData.indexOf(record) === editedIndex
                                                        ? cancelBtn
                                                        : deleteBtn(record)}
                                                </Table.Cell>
                                            </Table.Row>
                                        );
                                    })}
                                </Table.Body>
                            </Table>
                        </div>
                    </div>
                </React.Fragment>
            </Container>
        )
    }
}
