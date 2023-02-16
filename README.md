##  Notey - Note Taking App
Notey is a note taking app that allows you to write note digitally.

### App Demo

<div align="center">
<img width="1000" src="https://user-images.githubusercontent.com/77315624/217710631-bff6a5c2-3df4-4830-871c-671b42c2bca8.gif" />
</div>

### Features
- Sign in & Sign up authentication
- Complete note CRUD functionality
- Dynamic dropdown position

### Tools used
- MERN stack (MongoDB, Express, React, Node)
- JSON Web Token
- Redux Toolkit for state management
- Tailwind CSS

</br>

### How to run the app locally
After you clone this repository to your machine. Next step is:

1. Go to both client and server directory and install the necessary dependencies by executing 

  ```
    npm install
  ``` 
  
  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;or, if you're using yarn

  ```
    yarn install
  ```
2. Env variables

  **&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;For client directory:**

  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;```REACT_APP_TINYMCE_API_KEY=```

  **&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;For server directory:**

  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;```SALT_ROUNDS=```

  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;```ATLAS_URI=```

  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;```SECRET_SIGNATURE=```

  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;```SMTP_EMAIL=```

  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;```APP_NAME=Notey```

  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;```SENDINBLUE_API_KEY=```


3. Start the server by going to the server directory then execute
  ```
    npm run dev
  ```
4. Start the front-end by going to the client directory then execute
  ```
    npm start
  ```
  Now you can go to the http://localhost:3000 in your web browser and enjoy with the application



