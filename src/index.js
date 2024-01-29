import './style.css';
import { format } from 'date-fns'

const contentDiv = document.getElementById('content');

let projectList = [];

const modal = document.querySelector('#modal');
const form = document.getElementById('form');

const newProjectButton = document.querySelector('#new-project');
const closeButton = document.querySelector('.close-button');

const title = document.getElementById('title');
const description = document.getElementById('desc');
const dueDate = document.getElementById('dueDate');
const priority = document.getElementById('priority');

const projectContainer = document.querySelector('.project-container');

newProjectButton.addEventListener("click", () => {
    resetForm();
    modal.showModal();
});

closeButton.addEventListener('click', () => {
    modal.close();
});

form.addEventListener("submit", () => {
    let newProject = new Project(title.value, description.value, dueDate.value, priority.value)
    createProject(newProject);
    addProject(newProject);
    console.log(projectList);
});

class Project {
    constructor(title, description, dueDate, priority) {
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
    }
}

function addProject(item) {
    projectList.push(item);
}

function createProject(project) {
    const projectContainer = document.querySelector('.project-container');
    const projectDiv = document.createElement('div');
    const projectTitle = document.createElement('h2');
    const projectDueDate = document.createElement('h3');
    const projectPriority = document.createElement('h3');
    const deleteBtn = document.createElement('button');

    projectDiv.classList.add('project-div')
    projectTitle.classList.add('project-title')
    projectDueDate.classList.add('project-duedate')
    deleteBtn.classList.add('delete-btn')

    deleteBtn.addEventListener('click', () => {
        projectDiv.remove();
    });

    projectTitle.textContent = "Title: " + project.title;
    projectDueDate.textContent = "Due: " + project.dueDate;
    projectPriority.textContent = "Priority: " + project.priority;
    deleteBtn.textContent = "Remove"

    projectContainer.append(projectDiv);
    projectDiv.appendChild(projectTitle);
    projectDiv.appendChild(projectDueDate);
    projectDiv.appendChild(projectPriority);
    projectDiv.appendChild(deleteBtn);
}

let testProject = new Project("Test", "Test", "01/10/2024", "High")
    createProject(testProject);

function resetForm() {
    form.reset();
}


