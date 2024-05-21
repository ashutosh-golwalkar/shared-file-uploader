import axios from 'axios';
import React, { useEffect, useState } from 'react'
import FileList from './FileList';


function ContentDisplay() {
    const [filesData, setFilesData] = useState([{}]);
    useEffect(() => fetchData(), []);
    
    const fetchData = () => {
      axios.get("http://localhost:4000/api/v1/files")
        .then(response => setFilesData(response.data))
        .catch(error => console.log(error));
        console.log(filesData);
    }
  return (
    <div>
      <FileList filesData={filesData}/>
    </div>
  )
}

export default ContentDisplay
