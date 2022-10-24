// TODO: Include packages needed for this application
const inquirer = require("inquirer");

const fs = require("fs");

const generateMarkdown = require("./utils/generateMarkdown");

// TODO: Create an array of questions for user input
const questions = [
  {
    type: "input",
    name: "name",
    message: "What is your name?",
    validate: (nameInput) => {
      if (nameInput) {
        return true;
      } else {
        console.log("You need to enter your name yo!");
        return false;
      }
    },
  },
  {
    type: "input",
    name: "github",
    message: "Enter your GitHub Username",
    validate: (githubInput) => {
      if (githubInput) {
        return true;
      } else {
        console.log("You gotta enter your github user yo!");
        return false;
      }
    },
  },
  {
    type: "input",
    name: "email",
    message: "Please enter your Email",
    validate: (emailInput) => {
      if (emailInput) {
        return true;
      } else {
        console.log("You gotta enter your Email yo!");
        return false;
      }
    },
  },
  {
    type: "input",
    name: "title",
    message: "What is the title of your masterpiece?",
    validate: (titleInput) => {
      if (titleInput) {
        return true;
      } else {
        console.log("Your masterpiece has got to have a name dont it?");
        return false;
      }
    },
  },
  {
    type: "input",
    name: "description",
    message:
      "Please give a description of your masterpiece so everyone knows how what it is!",
    validate: (descriptionInput) => {
      if (descriptionInput) {
        return true;
      } else {
        console.log(
          "You need to add a description, how else would people know what your project is all about"
        );
        return false;
      }
    },
  },
  {
    type: "input",
    name: "instalation",
    message: "What are the steps required to install your project?",
    validate: (instalationInput) => {
      if (instalationInput) {
        return true;
      } else {
        console.log(
          "You need to enter the steps required to install your project"
        );
        return false;
      }
    },
  },
  {
    type: "confirm",
    name: "confirmLicence",
    message: "does your project require any licencing?",
    default: true,
  },
  {
    type: "list",
    name: "license",
    message: "Please choose your project license:",
    choices: ["MIT", "APACHE 2.0", "GPL 3.0", "BSD 3"],
    when: ({ confirmLicense }) => {
      if (confirmLicense) {
        return true;
      } else {
        return false;
      }
    },
  },
  {
    type: "input",
    name: "credits",
    message: "Who built this project? (Please include yourself of course)",
    validate: (creditsInput) => {
      if (creditsInput) {
        return true;
      } else {
        console.log("Please enter who made this project");
      }
    },
  },
];

// TODO: Create a function to write README file
function writeToFile(fileName, data) {
  return new Promise((resolve, reject) => {
    fs.writeFile(fileName, data, (err) => {
      if (err) {
        reject(err);

        return;
      }

      resolve({
        ok: true,
        message: "File Created, yo!",
      });
    });
  });
}

// TODO: Create a function to initialize app
function init() {
  return inquirer
    .prompt(questions)

    .then((data) => {
      console.log("Generating README");

      writeToFile("./dist/readme", generateMarkdown(data));
    });
}

// Function call to initialize app
init();
