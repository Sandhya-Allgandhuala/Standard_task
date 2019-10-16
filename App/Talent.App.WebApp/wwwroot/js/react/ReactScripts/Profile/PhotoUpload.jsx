/* Photo upload section */
import React, { Component } from 'react';
import Cookies from 'js-cookie';

export default class PhotoUpload extends Component {

    constructor(props) {
        super(props);
       // const photourl = Object.assign({}, this.props.imageId);
        this.state = {
           
            file: '',
            imagePreviewUrl: "",
            ishidden: false,


        };

        this.imageClick = this.imageClick.bind(this)
        this.renderEdit = this.renderEdit.bind(this)

    };
    imageClick() {
        document.getElementById('files').click();
       
        return false;

    }

    _handleSubmit(e) {        
        var cookies = Cookies.get('talentAuthToken');      
         console.log('handle uploading-', this.state.file);        
        var formData = new FormData()
        formData.append('file', this.state.file)        
        $.ajax({
            url: 'http://localhost:60290/profile/profile/updateProfilePhoto',
            headers: {
                'Authorization': 'Bearer ' + cookies,                                 
            },
            type: "POST",           
            data: formData,            
            processData: false,
            contentType: false,
            success: function (res) {
                console.log(res)
                if (res.success == true) {
                    TalentUtil.notification.show("Profile photo updated sucessfully", "success", null, null)
                    document.getElementById('upload').style.display = 'none';
                } else {
                    TalentUtil.notification.show("Profile did not update successfully", "error", null, null)
                }

            }.bind(this),
            error: function (res, a, b) {
                console.log(res)
                console.log(a)
                console.log(b)
            }
        })
    }

    _handleImageChange(e) {
        e.preventDefault();
        let reader = new FileReader();
        let file = e.target.files[0];
        console.log("files", file)

        let filename = file.name;
        reader.onloadend = () => {
            this.setState({
                ishidden: true,
                file: file,
                imagePreviewUrl: reader.result,


            });
        }
        //console.log('filenamet', filename);
        
            reader.readAsDataURL(file)
       

    }
    render() {
        let image = this.props.imageId;
        //console.log(image);
        return (
            image == null ? this.renderEdit() : <div><img className="ui small bordered circular image" src={image} /></div>
        )
    }
    renderEdit() {        
        let { imagePreviewUrl } = this.state;       
        let $imagePreview = null;
        if (imagePreviewUrl) {
            $imagePreview = (<img className="ui small bordered circular image" src={imagePreviewUrl} />);
        } else {
            $imagePreview = (<div className="previewText">Please select an Image for Preview</div>);
        }
        return (
            <div className="previewComponent">
                {this.state.ishidden ?
                    <div className="imgPreview">
                        <div style={{ paddingBottom: '20px' }}>
                            {$imagePreview}
                        </div>
                        <div>
                            <button className="submit Button ui teal button"
                                type="button" id="upload"
                                onClick={(e) => this._handleSubmit(e)}><i className=" upload icon"></i>Upload</button>
                        </div>
                    </div>
                    : <div className="ui medium image right floated">
                        <i className="huge camera retro icon circular" onClick={this.imageClick}></i>
                        <div onSubmit={(e) => this._handleSubmit(e)} className="right floated">
                            <input label="file" style={{ display: 'none' }}
                                id="files" ref="upload" type="file" accept="image/*"
                                onChange={(e) => this._handleImageChange(e)} />
                        </div>
                    </div>

                }
            </div>
        )


    }
}
