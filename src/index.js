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
    const newDiv = document.createElement('div');
    const projectTitle = document.createElement('h2');
    const projectDueDate = document.createElement('h3');
    const projectPriority = document.createElement('h3');
    const deleteBtn = document.createElement('button');
    const openBtn = document.createElement('button');
    const btnDiv = document.createElement('div');

    projectDiv.classList.add('project-div');
    projectTitle.classList.add('project-title');
    projectDueDate.classList.add('project-duedate');
    deleteBtn.classList.add('button');
    openBtn.classList.add('button');
    openBtn.setAttribute('id','view-button');
    newDiv.classList.add('info-div');
    btnDiv.classList.add('button-container');

    deleteBtn.addEventListener('click', () => {
        projectDiv.remove();
    });

    projectTitle.textContent = "Title: " + project.title;
    projectDueDate.textContent = "Due: " + project.dueDate;
    projectPriority.textContent = "Priority: " + project.priority;
    deleteBtn.textContent = "Delete";
    openBtn.textContent = "View";

    projectContainer.append(projectDiv);
    newDiv.appendChild(projectTitle);
    newDiv.appendChild(projectDueDate);
    newDiv.appendChild(projectPriority);
    projectDiv.appendChild(newDiv);
    btnDiv.appendChild(deleteBtn);
    btnDiv.appendChild(openBtn);
    projectDiv.appendChild(btnDiv);

    // View modal button functionality
    const dialogContainer = document.createElement('dialog')
    const modalContainer = document.createElement('div');
    const closeModalButton = document.createElement('button');
    const titleLabel = document.createElement('h1');
    const dueDateLabel = document.createElement('h2');
    const priorityLabel = document.createElement('h2');
    const description = document.createElement('p')

    dialogContainer.classList.add('project-modal');
    modalContainer.classList.add('project-info');
    closeModalButton.classList.add('close-button');

    titleLabel.textContent = 'Title: ' +  project.title;
    dueDateLabel.textContent = 'Due Date: ' + project.dueDate;
    priorityLabel.textContent = 'Priority: ' + project.priority;
    closeModalButton.textContent = 'X';
    description.textContent = `Description: ${project.description}`;

    contentDiv.appendChild(dialogContainer);
    dialogContainer.appendChild(modalContainer);
    modalContainer.appendChild(closeModalButton);
    modalContainer.appendChild(titleLabel);
    modalContainer.appendChild(dueDateLabel);
    modalContainer.appendChild(priorityLabel);
    modalContainer.appendChild(description);

    closeModalButton.addEventListener('click', () => {
        dialogContainer.close();
    });

    // openBtn.addEventListener('click', () =>{
    //     dialogContainer.showModal();
    // })

    dialogContainer.showModal();
}

let testProject = new Project("Test", "Test", "01/10/2024", "High")
    createProject(testProject);

function resetForm() {
    form.reset();
}





