import { useState } from "react"
import FileContent from "./FileContent"

const FileList =({ filesData }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const handleClick = (file) => {
    filesData.data.map(file => file.isSelected = false);
    file.isSelected = true;
    setSelectedFile(file.name);
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
                              let tdClassName = `tableContent`;
                              let divClassName = `fileRow`;

                              if(file.isSelected) tdClassName += ` selectedRow`;
                              let newRow = <></>;
                              if(file.time > filesData.lastAccessTime) {
                                divClassName += ` newRow`
                                newRow = <div className="newUpload">Newly Uploaded</div>
                              }
                              
                              return (<tr key={index}>
                                <td className={tdClassName} onClick={() => handleClick(file)}><div className={divClassName}>{file.name}{newRow}</div></td>
                              </tr>)
                            }) }
                        </tbody>
                    </table>
                    : <p>There's no file to display</p>)
                  : <p className="error">{filesData.message}</p>
              )
          }
      </div>
      <FileContent fileName={selectedFile}/>
    </>
  )
}

export default FileList;