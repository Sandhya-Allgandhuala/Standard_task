/* Skill section */
import React from 'react';
import Cookies from 'js-cookie';
import { Table, Form, Button, Icon, Confirm, Container } from "semantic-ui-react";

export default class Skill extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
           // Addnewskill: [],
            
            Skills: {
                id: this.props.skillData.id,
                name: this.props.skillData.name,
                level: this.props.skillData.level
            },
            editedIndex: -1,
            Level: '',
            Name: '',                      
            showEditSection: false,
            showAddSection: false
        }

        this.handleChange = this.handleChange.bind(this)
        this.saveContact = this.saveContact.bind(this)
        this.openAdd = this.openAdd.bind(this)
        this.closeAdd = this.closeAdd.bind(this)
        
        
    };
    editComponent(index) {
        var oldskills = Object.assign([], this.props.skillData)
        var name = oldskills[index].name;
        var level = oldskills[index].level;
        this.setState({
            Name: name,
            Level: level,
            editedIndex: index
        });
    }

    cancelEdit() {
        this.setState({
            Name: "",
            Level: "",
            editedIndex: -1
        })
    };
    handleChange(event) {
        const data = Object.assign({}, this.state.Skills)
         data[event.target.name] = event.target.value,
             this.setState({
                 Skills: data
        })
    }

    openAdd() {
        const SkillData = Object.assign({}, this.props.SkillData)
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
        console.log(this.state.Skills)
        var oldskill = Object.assign([], this.props.skillData)
        var newrecord = Object.assign({}, this.state.Skills)
        oldskill.push(newrecord);
        var updateskill = {
            skills: oldskill
        }        
        this.props.updateProfileData(updateskill)
        this.closeAdd();
       
    }

    updateskill(index) {
        console.log("updateComponent", index)
        var oldSkills = Object.assign([], this.props.skillData)
        oldSkills[index].name = this.state.Name;
        oldSkills[index].level = this.state.Level;
        console.log("newskills", oldSkills)
        var updateskill = {
            skills : oldSkills
        }
        this.props.updateProfileData(updateskill)
        this.setState({
            Name: "",
            Level: "",
            editedIndex: -1
        })
    };

    DeleteSkill(recordToDelete) {
        const updatedSkill = this.props.skillData.filter(record => record.id != recordToDelete.id);
        var updateskill = {
            skills: updatedSkill
        }
        this.props.updateProfileData(updateskill)
    }

    handlenameChange(event) {

        this.setState({
            Name: event.target.value
        })
    }

    handlelevelChange(event) {
        this.setState({
            Level: event.target.value
        })
    }



    render() {
        let { editedIndex } = this.state;
        let deleteBtn = record => (
            <i className="delete icon" onClick={() => this.DeleteSkill(record)}>

            </i>
        );

        let editBtn = index => (
            <i className="pencil icon" onClick={() => this.editComponent(index)}>

            </i>
        );
        let updateBtn = index => (
            <button type="button" className="ui blue basic button" onClick={() => this.updateskill(index)}>
                Update
            </button>
        );
        let cancelBtn = (
            <button type="button" className="ui red basic button" onClick={() => this.cancelEdit()}>
                Cancel
            </button>
        );
        let editlevel =(

            <div>
                <select className="ui fluid" name="Level"
                    onChange={(event) => this.handlelevelChange(event)}
                    value={this.state.Level} >
                    <option value="" >Select Level</option>
                    <option value="Beginner">Beginner</option>
                    <option value="Intermediate">Intermediate</option>
                    <option value="Expert">Expert</option>
                </select></div>
        );
        let editname =(<div>

            <input className="ui fluid" type="text" name="Name" value={this.state.Name}
                onChange={(event) => this.handlenameChange(event)}
                placeholder="Add Language" /></div>
        );

        return (            
            <Container style={{ paddingTop: '20px', paddingBottom: '20px' }}>               
                <React.Fragment>                  
                        <div>
                        {
                            this.state.showAddSection ?
                                <div style={{ paddingBottom: '20px' }}>
                                    <div className="inline field">
                                        <input className="six wide field" type="text" name="name" value={this.state.Skills.name}
                                            onChange={this.handleChange} placeholder="Add Skill" id="languages" />

                                        <select name="level" className="six wide field"
                                            onChange={this.handleChange} >
                                            <option value="" >Select Level</option>
                                            <option value="Beginner">Beginner</option>
                                            <option value="Intermediate">Intermediate</option>
                                            <option value="Expert">Expert</option>                                          
                                        </select>
                                                                            
                                        <button type="button" className="ui button right floated" onClick={this.closeAdd}>Cancel</button>
                                        <button type="button" className="ui teal button right floated" onClick={this.saveContact}>Save</button>
                                    </div>
                                </div>
                                : null
                        }
                        <div className="ui sixteen wide column" >
                                    <Table striped>
                                        <Table.Header>
                                            <Table.Row>
                                                <Table.HeaderCell>Skills</Table.HeaderCell>
                                                <Table.HeaderCell>Level</Table.HeaderCell>

                                        <Table.HeaderCell><button type="button" className="ui teal button right floated" onClick={this.openAdd}><i className="plus icon"></i>AddNew</button></Table.HeaderCell>
                                            </Table.Row>
                                        </Table.Header>
                                <Table.Body>
                                    {this.props.skillData.map(record => {
                                        return (
                                            <Table.Row key={record.id}>
                                                <Table.Cell className="six wide field">
                                                    {this.props.skillData.indexOf(record) === editedIndex
                                                        ? editname
                                                        : record.name}
                                                </Table.Cell>
                                                <Table.Cell className="six wide field">
                                                    {this.props.skillData.indexOf(record) === editedIndex
                                                        ? editlevel
                                                        : record.level}
                                                </Table.Cell>
                                                <Table.Cell className="right aligned">
                                                    {this.props.skillData.indexOf(record) === editedIndex
                                                        ? updateBtn(this.props.skillData.indexOf(record))
                                                        : editBtn(this.props.skillData.indexOf(record))}
                                                    {this.props.skillData.indexOf(record) === editedIndex
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
