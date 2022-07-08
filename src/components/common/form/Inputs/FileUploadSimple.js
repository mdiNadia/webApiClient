import React from 'react';


const FileUploadSimple = ({ lable, value, setValue }) => {
   
    return (
        <div className="form-group">
            <label> {lable} </label>
            <input type='file' className="form-control"
                onChange={(e) => {
                    setValue(e.target.files[0]);
                    // onChangeFunction(e.target.file[0]);
                }}
            />
        </div>

    )
}

export default FileUploadSimple;
