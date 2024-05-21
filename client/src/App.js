import React from 'react'
import FileList from './components/FileList';
import Uploader from './components/Uploader';

function App() {
  return (
    <div className='container'>
      <Uploader />
      <FileList />
      {/* {filesData} */}
    </div>
  )
}

export default App
