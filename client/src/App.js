import React from 'react'
import ContentDisplay from './components/ContentDisplay';
import Uploader from './components/Uploader';

function App() {
  return (
    <div className='container'>
      <Uploader />
      <ContentDisplay />
    </div>
  )
}

export default App
