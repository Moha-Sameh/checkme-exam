**CHECK ME Code Challenge**

1. Dependencies

   - csv
   - express
   - multer

2. Task Evaluation

   - [x] EndPoint: localhost:8000/generate-files
   - [x] Receive files
   - [x] Validate incoming file extension
   - [x] Validate file size
   - [x] Generate file 0_file_name
   - [x] Generate file 1_file_name

3. Instructions to run the application

   - Command line
   - docker-compose up

4. Request against EndPoint

   - Endpoint accepts form-data
   - Key: file
   - Value: upload csv file

5. Response
   - If success, status: 200
     - Response body: {success: true}
   - If fail, status: 400
     - Response body: {success: false}
