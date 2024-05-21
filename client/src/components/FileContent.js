import axios from 'axios';
import React, { useEffect, useState } from 'react'

function FileContent({ fileName }) {

    const [fileContent, setFileContent] = useState("");
    useEffect(() => getFileContent(), [fileName]);

    const getFileContent = () => {
        if(!fileName) setFileContent("");
        else {
            const URL = `http://${process.env.REACT_APP_SERVER_IP}:${
        process.env.REACT_APP_SERVER_PORT}/api/v1/file-content?name=${fileName}`;
            axios.get(URL)
            .then(response => {
                setFileContent(JSON.stringify(response.data.data, undefined, 4));
            })
            .catch(error => {
                setFileContent("Either file contains Bad JSON or Something went wrong")
            });
        }
    }


  return (
    <div className='fileContentViewer'>
        <h4>File Content : {fileName}</h4>
        <textarea className="fileContentDisplay" value={fileContent} cols="80" rows="20" readOnly/>
    </div>
  )
}

export default FileContent
