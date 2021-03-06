const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");
const Employee = require("./lib/Employee");

// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)
let teamMembers = [];
function createManager() {
  inquirer
    .prompt([
      {
        type: "input",
        message: "Input manager name",
        name: "name",
      },

      {
        type: "input",
        message: "Input manager employee Id",
        name: "id",
      },

      {
        type: "input",
        message: "Input manager email",
        name: "email",
      },
      {
        type: "input",
        message: "Input manager office number",
        name: "officeNumber",
      },
    ])
    .then(function (answers) {
      let manager = new Manager(
        answers.name,
        answers.id,
        answers.email,
        answers.officeNumber
      );
      teamMembers.push(manager);
      createTeamMember()
    });
}

function createTeamMember(){
    inquirer
    .prompt([{
        message: "What kind of team member would you like to add?",
        type: "list",
        name: "action",
        choices: [
            "Engineer",
            "Intern",
            "I don't want to add any more"
        ]
    }])
    .then(function(answers){
        if (answers.action === "Engineer"){
            createEngineer() 
        } else if (answers.action === "Intern"){
            createIntern() 
        }  else {
            createHTML()
        }     
    })

}

function createHTML(){
    let html = render(teamMembers)
    if (!fs.existsSync(OUTPUT_DIR)){
        fs.mkdirSync(OUTPUT_DIR);
    }
    fs.writeFile(outputPath, html, function (err) {
        if (err) {
          return console.log(err)
        }
      })
}

function createEngineer() {
  inquirer
    .prompt([
      {
        type: "input",
        message: "Input engineer name",
        name: "name",
      },

      {
        type: "input",
        message: "Input engineer employee Id",
        name: "id",
      },

      {
        type: "input",
        message: "Input engineer email",
        name: "email",
      },
      {
        type: "input",
        message: "Input engineer gitHub",
        name: "gitHub",
      },
    ])
    .then(function (answers) {
      let engineer = new Engineer(
        answers.name,
        answers.id,
        answers.email,
        answers.gitHub
      );
      teamMembers.push(engineer);
      createTeamMember()
    });
}

function createIntern() {
  inquirer
    .prompt([
      {
        type: "input",
        message: "Input intern name",
        name: "name",
      },

      {
        type: "input",
        message: "Input intern employee Id",
        name: "id",
      },

      {
        type: "input",
        message: "Input intern email",
        name: "email",
      },
      {
        type: "input",
        message: "Input intern school",
        name: "school",
      },
    ])
    .then(function (answers) {
      let intern = new Intern(
        answers.name,
        answers.id,
        answers.email,
        answers.school
      );
      teamMembers.push(intern);
      createTeamMember()
    });
}

createManager();

// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```
