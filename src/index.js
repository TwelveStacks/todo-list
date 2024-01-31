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

    newDiv.appendChild(projectTitle);
    newDiv.appendChild(projectDueDate);
    newDiv.appendChild(projectPriority);
    projectDiv.appendChild(newDiv);
    btnDiv.appendChild(deleteBtn);
    btnDiv.appendChild(openBtn);
    projectDiv.appendChild(btnDiv);
    projectContainer.append(projectDiv);

    // View modal button functionality
    const dialogContainer = document.createElement('dialog')
    const modalContainer = document.createElement('div');
    const closeModalButton = document.createElement('button');
    const description = document.createElement('p')

    dialogContainer.classList.add('project-modal');
    modalContainer.classList.add('project-info');
    closeModalButton.classList.add('close-button');

    closeModalButton.textContent = 'X';
    description.textContent = `Description: ${project.description}`;

    // Add dialog modal to the DOM
    contentDiv.appendChild(dialogContainer);

    // Add close button and project information to modal
    dialogContainer.appendChild(closeModalButton);
    // Put close modal button in header div
    const modalHeader = document.createElement('div');
    modalHeader.classList.add('modal-header');
    modalHeader.appendChild(closeModalButton);
    dialogContainer.appendChild(modalHeader);
    dialogContainer.appendChild(modalContainer);

    // Add title, due date, prirority and description elements to modal 
    modalContainer.appendChild(projectTitle.cloneNode(true));

    // Contain due date priority and description in seperate div
    const modalDiv = document.createElement('div');
    modalDiv.appendChild(projectDueDate.cloneNode(true));
    modalDiv.appendChild(projectPriority.cloneNode(true));
    modalDiv.appendChild(description.cloneNode(true));
    modalContainer.appendChild(modalDiv);

    // Div to contain to do list items
    const itemListDiv = document.createElement('div');

    // Add task button
    const addTaskBtn = document.createElement('button');

    //  Event listener for closing the view modal window
    closeModalButton.addEventListener('click', () => {
        dialogContainer.close();
    });

    // Event listener for showing the modal
    openBtn.addEventListener('click', () =>{
        dialogContainer.showModal();
    })

    dialogContainer.showModal();
}

let testProject = new Project("Test", "Test", "01/10/2024", "High")
    createProject(testProject);

function resetForm() {
    form.reset();
}





