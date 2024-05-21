import axios from 'axios';
import React, { useEffect, useState } from 'react'

function FileContent({ fileName }) {

    const [fileContent, setFileContent] = useState("");
    useEffect(() => getFileContent(), [fileName]);

    console.log("FileName - ", fileName)
    const getFileContent = () => {
        console.log("File content re-rendered", fileName)
        if(!fileName) setFileContent("");
        else {
            const URL = `http://localhost:4000/api/v1/file-content?name=${fileName}`;
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
        <h3>File Content</h3>
        <textarea className="fileContentDisplay" value={fileContent} cols="60" rows="20" />
    </div>
  )
}

export default FileContent
