import React from 'react'
import Cookies from 'js-cookie'
import { error } from 'util';
import { Progress } from 'semantic-ui-react'


export default class VideoUpload extends React.Component {
    constructor(props) {
        super(props)

        this.maxLength = 100 * 1024 * 1024; // 100MB - arbitary choice
        this.fileTypes = ['video/mp4']
        this.state = {

            file: '',
            videoPreviewUrl: "",
            ishidden: false,


        };

        this.imageClick = this.imageClick.bind(this)
       // this.renderEdit = this.renderEdit.bind(this)
     
    }

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
            url: 'http://localhost:60290/profile/profile/updateTalentVideo',
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
        reader.readAsDataURL(file)
    }
    //render() {
    //    let video = this.props.videoName;
    //    //console.log(image);
    //    return (
    //        video == "null" ? this.renderEdit() : <div><img className="ui small bordered circular image" src={video} /></div>
    //    )
    //}
    //renderEdit() {
    render() {
        let { videoPreviewUrl } = this.state;
        let $videoPreview = null;
        if (videoPreviewUrl) {
            $videoPreview = (<img className="ui small bordered circular image" src={videoPreviewUrl} />);
        } else {
            $videoPreview = (<div className="previewText">Please select an Image for Preview</div>);
        }
        return (
            <div className="previewComponent">
                {this.state.ishidden ?
                    <div className="imgPreview">
                        <div style={{ paddingBottom: '20px' }}>
                            {$videoPreview}
                        </div>
                        <div>
                            <button className="submit Button ui teal button"
                                type="button" id="upload"
                                onClick={(e) => this._handleSubmit(e)}><i className=" upload icon"></i>Upload</button>
                        </div>
                    </div>
                    : <div className="ui medium image right floated">
                        <i className="huge video circular" onClick={this.imageClick}></i>
                        <div onSubmit={(e) => this._handleSubmit(e)} className="right floated">
                            <input label="file" 
                                id="files" ref="upload" type="file" accept="video/*"
                                onChange={(e) => this._handleImageChange(e)} />
                        </div>
                    </div>

                }
            </div>
        )
        
    }
}