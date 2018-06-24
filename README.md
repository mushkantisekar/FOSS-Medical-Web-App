This README documents the basis of this repo and how to use it to set up a free Universal Web App to store the data that users will access using the Universal Medical App UMA

## Requirements
## Local set up - summary (more details later)
- Git [Git website](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git)
- NodeJS (v8) with npm [Node website](https://nodejs.org/en/)
- Ionic ($ `npm install -g ionic`)
- Firebase tools ($ `npm install -g firebase-tools`)
## Online
- Firebase account [Firebase home page](https://firebase.google.com/)


What is this repository for?
Set up a Web App to manage the database for a Universal Medical App UMA

# License
You have been invited to use this repo

It is licensed under an AGPL 3.0 license

## How do I get set up?
** You will need to set a few things up.**
You need to be able to run some commands from the "Terminal" or "Command promt"

If you are not comfortable with this, have a look at this short free course:
[CodeAcademy free course](https://www.codecademy.com/learn/learn-the-command-line)

### Set up Firebase
First go and create a new Firebase account at this page
[Firebase home page](https://firebase.google.com/)
Click "GET STARTED"

Either use an existing Google Account or set a new one up.


When you choose a project name it will create a random project ID- play around with this to try and make this
as useable as possible (it affects the address of the project).
If you can get a good name it will be easier for your users.

Set up a new project (click on the + sign and chosse your name and location )

## Set up GIT
Ensure you have installed Git for your system
Follow these instructions 
https://git-scm.com/book/en/v2/Getting-Started-Installing-Git

### Set up Node
Ensure you have node installed with npm (got to https://nodejs.org/en/ and follow the instructions for your system). npm is packaged with node.


When node is installed open a terminal (or CMD or PowerShell) 
Run 
~~~
`npm install -g firebase-tools`
~~~
to install the firebase CLI

then type 
~~~
`firebase login`
~~~
and login with your credentials (your firebase account username and password)


### Clone the repo
 

Clone this repo using this command in a new directory (where you wish to store the project)
`git clone https://github.com/AppertaFoundation/FOSS-Medical-Web-App`


You will also need to install Ionic for this process

Run
~~~
`npm install ionic`
~~~


In the terminal cd into the project folder and run
~~~
`npm install`
~~~
It should take a bit of time and install lots of stuff



`cd` into the src folder

## UPDATE THE DETAILS

# The only folder you should have to alter is the Assets folder
Open the file `dbdetails.ts` and delete everything between the word `export` and the words `export const dbDetails`

Change the address of the firebase DB:
Go to this page
[Firebase web set up](https://firebase.google.com/docs/web/setup)
and follow the instructions on how to Add Firebase To your App
- Choose a name
- Edit the project ID (choose one that represents your organisation and is easy to remember)
- Select the country ID
- You may wish to uncheck the box stating
~~~
Use the default settings for sharing Google Analytics for Firebase data
~~~
- Click Continue
- Click Create Project
- When ready click Continue

# Set up Authentication
On the left menu select (if not already selected)
`Authentication`
- Click the button `Set up sign-in method`
- Choose 'Email/Password'
- Toggle the first switch to `Enable` then `Save`

# Enable the Database rules
On the left menu select `Database`
Choose `Get Started` in the Realtime Database (on the right)
Choose `Start in test mode` then `Enable`

# Get your database "Snippet"
- On the left menu go back to `Authentication`.
- In the top right there is a button stating
   `Web Setup` - click it
- A box will open up stating `Add firebase to your web app`

Where it says (in your own snippet)
~~~
  var config = {
      apiKey: "<API_KEY>",
      authDomain: "<PROJECT_ID>.firebaseapp.com",
      databaseURL: "https://<DATABASE_NAME>.firebaseio.com",
      storageBucket: "<BUCKET>.appspot.com",
      messagingSenderId: "<SENDER_ID>",
    };
~~~
  copy everything starting with  the `var` until after the next `};`
   
   (this is a javascript object with your project settings)

  **You DON'T copy these lines**
  ~~~
  <script src="https://www.gstatic.com/firebasejs/5.1.0/firebase.js"></script>
  <script>
  // Initialize Firebase
  ~~~
  `firebase.initializeApp(config); </script>` 



   and paste the object into the dbdetails.ts file after the word `export `  (remember to leave a space between)
   
~~~
   ionic serve
~~~

   which should spin up a local server for testing  

# First time using the app
The database should take you to the setup page and you will enter you email as the username and choose a password and a specialty. The program will set up these details in the account with you as the data administrator.

## When you are ready to upload:
in the root directory (may still be foss-web-app if cloned)
`firebase init`

Using the arrow keys and space bar, select 
`hosting`
so it has an asterisk next to it then press enter

Select your project that you set up earlier.
When it asks for the public directory type 
`www`

It will ask if you

`? Configure as a single-page app (rewrite all urls to /index.html)?` -select YES

It will ask you 

`? File www/index.html already exists. Overwrite?` - select NO

And it will upload your file and you should be able to access it via the web address (it will show you this when completed).
   

### Contribution guidelines
*contact me (see below) if you wish to contribute

Who do I talk to?
repo owned by Shane Lester contact shanesapps@hotmail.com
