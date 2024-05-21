# NodeJs + Express + React - Shared File Uploader

An application to upload JSON files on a shared network collectively. Any user whose machine is connected on the same network can upload JSON files and view files uploaded by others.
It stores the files on the local storage of the host system and shares the uploaded file details with everyone accessing the network.

## Folder Structure

.
|__ client/
|   |__ src/
|      |__ components/
|          |__ ContentDisplay.js
|          |__ FileList.js
|          |__ Uploader.js
|          |__ FileContent.js
|   
|__ server/
    |__ database/
    |   |__ files/
    |__ src/
    |   |__ controllers/
    |   |   |__ upload.js
    |   |   |__ listFiles.js
    |   |   |__ fileContent.js
    |   |__ middlewares/
    |   |   |__ fileSizeLimiter.js
    |   |   |__ verifyFileType.js
    |   |__ services/
    |   |   |__ fetchFileContent.js
    |   |   |__ fetchFiles.js
    |   |   |__ multiUploader.js
    |   |   |__ uploader.js
    |   |__ utils/
    |       |__ fetchFilesFromDir.js
    |       |__ handleDuplicateFiles.js
    |       |__ logger.js
    |__ app.js


### Execution Steps

**Server Side**
- Navigate to /server folder
- make sure /database/files folder is present
- Execute `npm i` to install node_modules
- Open .env file and make sure the values of PORT and ROOT_IPV4 are valid.
- Ensure that the path mentioned as a DATABASE_PATH is a valid path
- Ensure that the PORT mentioned is open and not in use
- Get the IPV4 of the system by running `ipconfig | findstr /i "ipv4"` on Windows terminal OR `ipconfig getifaddr en0` on Mac
- Replace the value of ROOT_IPV4 with your IP address
- run the server by with `npm start`

**Client Side**
- Navigate to /client folder
- Execute `npm i` to install dependencies
- Open .env file and set value of REACT_APP_SERVER_PORT = 'PORT value set in server .env' and REACT_APP_SERVER_IP = 'ROOT_IPV4 value set in server .env'
- run the server with `npm start`

## API Documentation

### Middlewares

**Verify File Type**
This middleware checks if the uploaded file is of valid file type or not.
The accpeted file types can be updated from ENV by settign comma separated values in `ACCEPTED_FILE_TYPE` variable.
If the mime type of uploaded file doesn't match `ACCEPTED_FILE_TYPE`, the middleware will throw error.

**File Size Limiter**
This middleware checks if the uploaded files are within the configured size limit. You can set a file size limit through .env file, if not set then the default size limit is considered as 4MB.
This middleware has support for multiple files, so the method will look through each file and check for its size.

### API Endpoints

**Get list of uploaded files**
Endpoint - `GET /api/v1/files`
Description - The API uses `fs` module to fetch the list of files from the directory `database/files`. First it uses `fs.readdirSync` to get a list of all the files present in the /database/files folder. Then it looks through each file and executes `fs.statSync` to get the metadata of each file. From the metadata it picks the last modified date of the file, appends in an object with the file name and sends the response to client.

**Upload File**
Endpoint - `POST /api/v1/upload`
Description - `express-fileupload` middleware packages the file and `mv` method to upload the file.
Before uploading the file, a method is called to check for duplicate names.
If a duplicate file is found, the logic increments a number after the file name in order to avoid overriding the file.

**Upload Multiple Files**
Endpoint - `POST /api/v2/upload`
Description - Same `express-fileupload` middleware is used to package the files, and by looping through each file and executing `mv` method, the files are uploaded. Additionally a middleware is attached to the API to check for the file size.

**Get File Content**
Endpoint - `GET /api/v1/file-content`
Description - This API accepts file name as a query parameter and returns the file content as a response. It uses `fs.readFileSync` method internally to read the file contents.


## UI Implementation

To load the UI, react is used as its more scalable and clean to use.

**ContentDisplay**
Initially, `ContentDisplay` component calls the APi to fetch list of uploaded files and stores it in `filesData` state variable.
It also store a `lastAccessTime` variable in local storage which can be used to check the new files which were uploaded since user's last login.
All these details are consolidated in an object and passed to `FileList` component as a prop.

**FileList**
FileList takes the files details from the props object and if the status is 200, renders a list of file names.
It also checks if there's any file whose last modified date is more than the lastAccessTime of the user, if yes then it'll add custom CSS to that element to highlight the row.

An onClick event is added on each row to register a row getting clicked, and once a row is clicked, a `isSelected` flag for that row is set to true and the file name is saved in `selectedFile` state variable.
This component loads `FileContent` component while passing the state variable `selectedFile` to it.

**FileContent**

This component uses `useEffect()` hook to make an API call whenever there's a change in the fileName prop.
After fetching the content, the JSON is stringified and formatted to display on a scrollable textarea.
