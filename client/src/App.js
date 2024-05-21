import React from 'react'
import ContentDisplay from './components/ContentDisplay';
import FileList from './components/FileList';
import Uploader from './components/Uploader';
import FileContent from './components/FileContent';

function App() {
  return (
    <div className='container'>
      <Uploader />
      <ContentDisplay />
      {/* <FileList /> */}
    </div>
  )
}

export default App
