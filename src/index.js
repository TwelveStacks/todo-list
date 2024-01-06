import './style.css';
import { format } from 'date-fns'

const contentDiv = document.getElementById('content');

let projectList = [];

const modal = document.querySelector('#modal');
const form = document.getElementById('form');

const newProjectButton = document.querySelector('#new-project');
const closeButton = document.querySelector('.close-button');

const title = document.getElementById('title');
const description = document.getElementById('description');
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
    const projectDiv = document.createElement('div');
    const projectTitle = document.createElement('h2');
    const projectDueDate = document.createElement('');
    const deleteBtn = document.createElement('button');
}

function resetForm() {
    title.value = "";
    description.value = "";
    dueDate.value = "";
    priority.value = "";
}

// const header = document.getElementById('header');
// const contentDiv = document.getElementById('content');
// const title = document.createElement('h1');

// header.getElementsByTagName

// title.textContent = "To-Do List";
// title.classList.add('title');

// header.appendChild(title);
