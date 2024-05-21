import React, { useState, useEffect } from 'react';
import axios from 'axios';

function FileList() {
    
    const [filesData, setFilesData] = useState([{}]);
    useEffect(() => fetchData(), []);
    const fetchData = () => {

      axios.get("http://localhost:4000/api/v1/files")
        .then(response => setFilesData(response.data))
        .catch(error => console.log(error));
    }

    const renderTableData = (data) => {
      console.log("RENDER FUNCTION")
      console.log(data)
      return (
        <tr>
          <td>{ data.name }</td>
        </tr>
      )
    }
    const variable = "ASD"
  return (
    <div className='fileList' id='fileList'>
        <h3>Existing File List</h3>
        {
            (filesData.status === 200 ?
                <table className='table'>
                    <tbody>
                        { filesData.data.map((file, index) => {
                          return (<tr key={index}>
                            <td className='tableContent'>{file.name}</td>
                          </tr>)
                        }) }
                    </tbody>
                </table>   
                : <p>{filesData.message}</p>
            )
        }
    </div>
  )
}

export default FileList;