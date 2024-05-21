import axios from 'axios';
import React, { useState } from 'react'

function Uploader() {

    const uploadMultipleFiles = (files) => {
        const URL = `http://localhost:4000/api/v2/upload`;
        const formData = new FormData();
        for(let key in files) {
            formData.append(files[key].name, files[key]);
        }
        axios.post(URL, formData)
            .then(response => {
                console.log(response);
                window.location.reload();
            })
            .catch(error => console.log(error))
    }

  return (
    <div className='fileUploader'>
        <h3>File Uploader</h3>
        <form className='uploaderForm'>
            <label htmlFor="uploaderLabel">File Upload</label>
            <label htmlFor="uploadedFile" className="uploaderLabel">New File Chooser</label>
            <input type="file" className="uploadedFile" accept="application/json" 
                multiple onChange={ (e) => {uploadMultipleFiles(e.target.files)} }/>
        </form>
    </div>
  )
}

export default Uploader;
