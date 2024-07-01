Displaying of user in the index.html page is refreshed if any other user registers it is a get request which loads everytime page is reloaded also when any users update their information or deletes their account it reloads and new data is set

Login and Registration has sent values as required for backend to verify when they verify it they can login or either register

While loggin in localStorage is used to store the details of the user incase of any further process that needs the logged in user information like bearer Token, or while updating the id and the previous information is needed 

While on reset i have used backend to send an otp to the user's provided email which if verified in the second process then the new password can be set accordingly

When updating their information by the loggedInUser first token is checked and if the token is verified than the user can change their information. After this new data will be set in index.js as well as the local localStorage

IN delete i have used delete request and user confirmation whenever they click the delete button to delete their id 

Axios (js library) is used to make all the request (post, put, get, delete) which helps us to connect to the rest apis made in the backend


