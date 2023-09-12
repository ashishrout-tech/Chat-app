# Chat-app
<b>Login Page using auth0</b> <br />
<img src="https://github.com/ashishrout-tech/Chat-app/assets/77796540/859f1122-0a8c-45ad-9aaf-d404545a87d0" width="400" /> <br />

<b>Join any room or create a new room</b> <br />
<img src="https://github.com/ashishrout-tech/Chat-app/assets/77796540/edb0f7eb-a2e4-44c9-9f13-0e3656d53369" width="800" /> <br />

<b>Continue Chatting. All Chats will be stored in server for each room, so that you can continue even after logging out</b> <br />
<img src="https://github.com/ashishrout-tech/Chat-app/assets/77796540/48d4c02f-d0c7-4113-b72e-72dd01619126" width="1300" />

<br /> <br />




 Little bit about this app:

The app allows users to create chat rooms and engage in real-time communication with other participants within the same room. Messages sent by the user will be displayed in a red bubble for all other participants in the chat room. However, when a user sends a message, they will see their own messages indicated in a green bubble. Messages sent by other participants will also be shown in red bubbles, along with the name of the sender.

The client-side of the app is secured using Auth0 authentication, requiring users to log in with their Google/Microsoft accounts or email credentials. Upon successful login, a token is generated, which is used to verify the user's authenticity on the backend. This token is essential for accessing features such as fetching all available rooms and messages.

The real-time messaging functionality is achieved through the implementation of websockets using the Socket.IO framework, ensuring that messages are delivered instantaneously to all participants in the chat room.




To run the project locally, ensure that you have Node.js installed by downloading it from nodejs.org. Once you have Node.js installed, follow these steps:

Make sure to clone this project, or download the zip file.

Setting up the server:

1. Open the "Server side" folder in your command prompt or terminal.
2. Run the command "npm install" to install all the required dependencies.
3. After the installation is complete, execute the command "node server.js".

If everything is set up correctly, you will see a log message saying "listening on port 3000" in your console.

Next, let's proceed with running the client side:

1. Open the "Client side" folder in your terminal.
2. Run the command "npm install" to install all the necessary dependencies.
3. Once the installation is finished, execute the command "npm run dev".

If everything is done correctly, you will receive a message from Vite indicating that the app is hosted on "http://localhost:5173/". Click on this link to open the application in your browser and explore its features.

Please note that if you encounter any issues, make sure to double-check the installation steps and verify that all dependencies are properly installed. Happy Coding!
