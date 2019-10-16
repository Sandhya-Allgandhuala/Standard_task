/* Certificate section */
import React from 'react';
import Cookies from 'js-cookie';
import { Table, Form, Button, Icon, Confirm, Container } from "semantic-ui-react";
import { ChildSingleInput } from '../Form/SingleInput.jsx';

export default class Certificate extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            certification: {
                CertificationName: "",
                CertificationFrom: "",
                CertificationYear:""
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
        const certificationData = Object.assign({}, this.props.certificateData)
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
        const certificationData = Object.assign({}, this.props.certificateData)
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

        console.log(this.state.certification)
        const Certification = Object.assign({}, this.state.certification)
        var updatecertification = {
            certifications : [Certification]
        }
        this.props.updateProfileData(updatecertification)

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
                                            label="Certification"
                                            name="CertificationName"
                                            value={this.state.certification.CertificationName}
                                            controlFunc={this.handleChange}
                                            maxLength={80}
                                        />

                                        <ChildSingleInput
                                            inputType="text"
                                            label="From"
                                            name="CertificationFrom"
                                            value={this.state.certification.CertificationFrom}
                                            controlFunc={this.handleChange}
                                            maxLength={80}
                                        />
                                    </div>
                                    <div className='two fields'>
                                        <ChildSingleInput
                                            inputType="text"
                                            label="Year"
                                            name="CertificationYear"
                                            value={this.state.certification.CertificationYear}
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
                                        <Table.HeaderCell>Certification</Table.HeaderCell>
                                        <Table.HeaderCell>From</Table.HeaderCell>
                                        <Table.HeaderCell>Year</Table.HeaderCell>
                                        <Table.HeaderCell><button type="button" className="ui teal button right floated" onClick={this.openAdd}><i className="plus icon"></i>AddNew</button></Table.HeaderCell>
                                    </Table.Row>
                                </Table.Header>
                                <Table.Body>
                                    {//this.props.certificateData.map(record => (
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

