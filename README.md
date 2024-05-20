# NodeJs + Express + EJS - Shared File Uploader

An application to upload JSON files on a shared network coleltively.
It stores the files on the local storage of the host system and shares the uploaded file details with everyone accessing the network.

Mainstream modules used are
- **Express:** A quick and robust module of NodeJS to start an HTTP server
- **EJS:** Renders the landing page and accepts Environment variables
- **Express-fileupload:** A well supported and maintained module which provides features like middleware, providing an inbuilt method to upload the file.
- **winston:** A standard module for logging.

### Execution Steps

- Execute `npm i` from root folder to install node_modules
- Open .env file and make sure the values of PORT and ROOT_IPV4 are valid.
- Ensure that the path mentioned as a DATABASE_PATH is a valid path
- Ensure that the PORT mentioned is open and not in use
- Get the IPV4 of the system by running `ipconfig | findstr /i "ipv4"` on Windows terminal OR `ipconfig getifaddr en0` on Mac
- Replace the value of ROOT_IPV4 with your IP address
- run the server by with `npm start`
- Render the webpage using URL `<IP>:<PORT>`

## API Documentation

### Middlewares

**Verify File Type**
This middleware checks if the uploaded file is of valid file type or not.
The accpeted file types can be updated from ENV by settign comma separated values in `ACCEPTED_FILE_TYPE` variable.
If the mime type of uploaded file doesn't match `ACCEPTED_FILE_TYPE`, the middleware will throw error.


### API Endpoints

**Get list of uploaded files**
Endpoint - `GET /api/v1/files`
Description - The API uses `fs` module to fetch the list of files from the directory `database/files`

**Upload File**
Endpoint - `POST /api/v1/upload`
Description - `express-fileupload` middleware packages the file and `mv` method to upload the file.
Before uploading the file, a method is called to check for duplicate names.
If a duplicate file is found, the logic increments a number after the file name in order to avoid overriding the file.

## UI Implementation

EJS file is used for rendering the UI because it accepts the environtment variable from the express ENV variable.
Since the IP changes as per the system running the application, instead of making changes 10 different places if more APIs are added, its better to configure in `.env` and import it everywhere.

### Load list of Files

On `window.onload` fetchFilesList method is called which will make an API call to `/api/v1/files` to fetch a list of files.
After getting the response, if the list is empty then show an informative message, else insert the files into `table tag`

### Upload File

The input type 'file' is hidden using CSS to give the uploading button a look of a button.
Once the file is selected, the `/api/v1/upload` API is called.