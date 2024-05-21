import axios from 'axios';
import React, { useEffect, useState } from 'react'
import FileList from './FileList';


function ContentDisplay() {
    const [filesData, setFilesData] = useState([{}]);
    useEffect(() => fetchData(), []);
    
    const fetchData = () => {
      const URL = `http://${process.env.REACT_APP_SERVER_IP}:${
        process.env.REACT_APP_SERVER_PORT}/api/v1/files`;
      axios.get(URL)
        .then(response => {
          for(let file of response.data.data) {
            file.isSelected = false;
          }
          const lastAccessTime = handleLastAccessTime();
          response.data.lastAccessTime = lastAccessTime;
          setFilesData(response.data)
        })
        .catch(error => setFilesData(error.response.data));
    }

    const handleLastAccessTime = () => {
      let lastAccessTime = localStorage.getItem("LAST_ACCESS_TIME") || 0;
      localStorage.setItem("LAST_ACCESS_TIME", new Date().getTime());
      return lastAccessTime;
    }
  return (
    <div className='flex-container'>
      <FileList filesData={filesData}/>
    </div>
  )
}

export default ContentDisplay
