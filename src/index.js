import './style.css';

const contentDiv = document.getElementById('#content');

let projectList = [];

const newProjectButton = document.querySelector('#new-project');

newProject.addEventListener("click", () => {
    let newProject = new Project(title.value, description.value, dueDate.value, priority.value)
    createProject(newProject);
    contentDiv.appendChild(newProject);
});

class Project {
    constructor(title, description, dueDate, priority) {
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
    }
}

function createProject(project) {
    projectList.push(project);
}



// const header = document.getElementById('header');
// const contentDiv = document.getElementById('content');
// const title = document.createElement('h1');

// header.getElementsByTagName

// title.textContent = "To-Do List";
// title.classList.add('title');

// header.appendChild(title);
