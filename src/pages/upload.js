import Breadcrumb from "../components/BreadCrumb";

function UpLoad(){
    return(
        <div className="container">
        <Breadcrumb title={"Carregar"}/>
        <div className="section-fiin dados-do-consultor">
            <div className="row justify-content-center">
                <div className="col-lg-8">
                    <form className="form-fiin form-box-style">
                        <div className="section-head">
                            <h1 className="section-title">Carregar</h1>
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt .</p>
                        </div>
                        <div className="upload-box">
                            <label className="upload-item on-upload">
                                <input type="file" name="upload"/>
                                <span className="icon-upload"></span>
                                <span className="upload-box-text">Drag & Drop or <span>Choose file</span> to upload</span>
                                <span className="upload-format">PDF or SVG</span>
                            </label>
                            <div className="upload-progress">
                                <div className="upload-progress-info">
                                    <span className="icon-note"></span>
                                    <div className="upload-file-info">
                                        <h3 className="upload-file-name">Lorem ipsum dolor sit amet.PDF</h3>
                                        <span className="upload-file-size">432 KB</span> . <span className="upload-file-time">2 seconds left</span>
                                    </div>
                                    <div className="upload-close-percent ms-auto">
                                        <button type="button" className="upload-close"><span className="icon-close"></span></button>
                                        <span className="upload-percent">44%</span>
                                    </div>
                                </div>
                                <div className="upload-progress-line">
                                    <span className="upload-progress-percent" style={{width: "40%"}}></span>
                                </div>
                            </div>
                        </div>

                        <div className="upload-or"><span>OR</span></div>
                        
                        <div className="form-field-fiin">
                            <label for="last-name">Import from URL</label>
                            <input type="text" name="lastname" id="last-name" placeholder="Add file URL"/>
                            <button type="button">Upload</button>
                        </div>
                        <div className="footer-form-fiin">
                            <button type="button" className="btn-cancel" name="cancel">Cancel</button>
                            <button type="submit" className="btn-fiin" name="submit">Import</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
    )
}
export default UpLoad