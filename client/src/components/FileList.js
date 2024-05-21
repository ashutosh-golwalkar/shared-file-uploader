import { useState } from "react"
import FileContent from "./FileContent"

const FileList =({ filesData }) => {
  const [selectedFile, setSelectedFile] = useState(null);
    console.log(filesData)

  const handleClick = (fileData) => {
    console.log(fileData);
    setSelectedFile(fileData.name);
  }
  return (
    <>
      <div className='fileList' id='fileList'>
          <h3>Existing File List</h3>
          {
              (filesData.status === 200 ?
                  (filesData.data.length ?
                    <table className='table'>
                        <tbody>
                            { filesData.data.map((file, index) => {
                              return (<tr key={index}>
                                <td className='tableContent' onClick={() => handleClick(file)}>{file.name}</td>
                              </tr>)
                            }) }
                        </tbody>
                    </table>
                    : <p>There's no file to display</p>)
                  : <p>{filesData.message}</p>
              )
          }
      </div>
      <FileContent fileName={selectedFile}/>
    </>
  )
}

export default FileList;