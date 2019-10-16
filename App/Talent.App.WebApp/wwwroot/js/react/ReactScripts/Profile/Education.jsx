/* Education section */
import React from 'react';
import Cookies from 'js-cookie';
import { default as Countries } from '../../../../../wwwroot/util/jsonFiles/countries.json'
import { Form, Checkbox, Container, Radio, Table } from 'semantic-ui-react';
import { ChildSingleInput } from '../Form/SingleInput.jsx';

export default class Education extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            education: {
                Country: "",
                InstituteName: "",
                Title: "",
                Degree: "",
                YearOfGraduation: ""
            },
            showAddSection: false
        }
        this.handleChange = this.handleChange.bind(this)
        this.saveContact = this.saveContact.bind(this)
        this.openAdd = this.openAdd.bind(this)
        this.closeAdd = this.closeAdd.bind(this)
        this.openEdit = this.openEdit.bind(this)
    };

    openEdit() {
        const EducationData = Object.assign({}, this.props.educationData)
        this.setState({
            showAddSection: true,
        })
    }

    handleChange(event) {
        const data = Object.assign({}, this.state.certification)
        data[event.target.name] = event.target.value,
            this.setState({
                certification: data
            })
    }

    openAdd() {
        const Data = Object.assign({}, this.props.educationData)
        this.setState({
            showAddSection: true,
        })
    }

    closeAdd() {
        this.setState({
            showAddSection: false,
        })
    }

    saveContact() {
        console.log(this.state.education)
        const Certification = Object.assign({}, this.state.education)
        var updateeducation = {
            education: [education]
        }
        this.props.updateProfileData(updateeducation)
    }

    render() {
        return (
            <Container style={{ paddingTop: '20px', paddingBottom: '20px' }}>
                <React.Fragment>
                    <div>
                        {
                            this.state.showAddSection ?
                                <div className='ui four wide column' style={{ paddingBottom: '20px' }}>
                                    <div className='two fields'>
                                        <ChildSingleInput
                                            inputType="text"
                                            label="Country"
                                            name="Country"
                                            value={this.state.education.Country}
                                            controlFunc={this.handleChange}
                                            maxLength={80}
                                        />

                                        <ChildSingleInput
                                            inputType="text"
                                            label="InstituteName"
                                            name="InstituteName"
                                            value={this.state.education.InstituteName}
                                            controlFunc={this.handleChange}
                                            maxLength={80}
                                        />
                                    </div>
                                    <div className='two fields'>
                                        <ChildSingleInput
                                            inputType="text"
                                            label="Title"
                                            name="Title"
                                            value={this.state.education.Title}
                                            controlFunc={this.handleChange}
                                            maxLength={80}
                                        />
                                        <ChildSingleInput
                                            inputType="text"
                                            label="Degree"
                                            name="Degree"
                                            value={this.state.education.Degree}
                                            controlFunc={this.handleChange}
                                            maxLength={80}
                                        />

                                    </div>
                                    <div className='two fields'>
                                        <ChildSingleInput
                                            inputType="text"
                                            label="YearOfGraduation"
                                            name="YearOfGraduation"
                                            value={this.state.education.YearOfGraduation}
                                            controlFunc={this.handleChange}
                                            maxLength={80}
                                        />
                                    </div>
                                    <button type="button" className="ui teal button" onClick={this.saveContact}>Save</button>
                                    <button type="button" className="ui button" onClick={this.closeAdd}>Cancel</button>
                                </div>
                                : null
                        }
                        <div className="ui sixteen wide column" >
                            <Table striped>
                                <Table.Header>
                                    <Table.Row>
                                        <Table.HeaderCell>Country</Table.HeaderCell>
                                        <Table.HeaderCell>Institute Name</Table.HeaderCell>
                                        <Table.HeaderCell>Title</Table.HeaderCell>
                                        <Table.HeaderCell>Degree</Table.HeaderCell>
                                        <Table.HeaderCell>Year Of Graduation</Table.HeaderCell>
                                        <Table.HeaderCell><button type="button" className="ui teal button right floated" onClick={this.openAdd}><i className="plus icon"></i>AddNew</button></Table.HeaderCell>
                                    </Table.Row>
                                </Table.Header>
                                <Table.Body>
                                    {//this.props.educationData.map(record => (
                                        //  <Table.Row key={record.id}>
                                        //     <Table.Cell>{record.CertificationName}</Table.Cell>
                                        //     <Table.Cell>{record.CertificationFrom}</Table.Cell>
                                        //     <Table.Cell>{record.CertificationYear}</Table.Cell>
                                        //    <Table.Cell className="right aligned">
                                        //        <i className="pencil icon" onClick={this.openEdit}></i>
                                        //        <i className="delete icon"></i>
                                        //    </Table.Cell>
                                        // </Table.Row>
                                        // ))
                                    }
                                </Table.Body>
                            </Table>
                        </div>
                    </div>
                </React.Fragment>
            </Container>
        )
    }
}





























































