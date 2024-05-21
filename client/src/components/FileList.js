import React, { useState, useEffect } from 'react'

function FileList() {
    
    const [filesData, setFilesData] = useState([{}]);
    useEffect(() => fetchData(), []);
    const fetchData = () => {
      fetch("http://localhost:4000/api/v1/files")
        .then(response => response.json())
        .then(response => {
          console.log(response);
          setFilesData(response);
        })
    }

    const renderTableData = (data) => {
      console.log("RENDER FUNCTION")
      return (
        <tr>
          <td>{ data }</td>
        </tr>
      )
    }

  return (
    <div className='fileList' id='fileList'>
        <h3>Existing File List</h3>
        {
            (filesData.status === 200 ?
                <table>
                    <tbody>
                        { filesData.map(renderTableData) }
                    </tbody>
                </table>   
                : <p>{filesData.message}</p>
            )
        }
    </div>
  )
}

export default FileList;