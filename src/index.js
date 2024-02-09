import './style.css';

const contentDiv = document.getElementById('content');

const modal = document.querySelector('#modal');
const form = document.getElementById('form');

const newProjectButton = document.querySelector('#new-project');
const closeButton = document.querySelector('.close-button');

const title = document.getElementById('title');
const description = document.getElementById('desc');
const dueDate = document.getElementById('dueDate');
const priority = document.getElementById('priority');

let projectList = [];

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
    addProjectToList(newProject);
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

class Task {
    constructor(name, done) {
        this.name = name;
        this.done = done;
    }
}

function addProjectToList(project) {
    projectList.push(project);
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
    let taskList = [];

    projectDiv.classList.add('project-div');
    projectTitle.classList.add('project-title');
    projectDueDate.classList.add('project-duedate');
    deleteBtn.classList.add('button');
    openBtn.classList.add('button');
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
    projectContainer.append(projectDiv);

     // Event listener for showing the project information modal
     openBtn.addEventListener('click', () =>{
        openProjectInfo(projectTitle, projectDueDate, projectPriority, project, taskList);
    })
}

function openProjectInfo(projectTitle, projectDueDate, projectPriority, project, taskList) {
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

    // Contain due date priority and description in seperate div
    const modalDiv = document.createElement('div');
    modalDiv.classList.add('side-content');
    modalDiv.appendChild(projectDueDate.cloneNode(true));
    modalDiv.appendChild(projectPriority.cloneNode(true));
    modalDiv.appendChild(description.cloneNode(true));
    modalContainer.appendChild(modalDiv);

    // Add title to project modal
    const articleDiv = document.createElement('div');
    articleDiv.classList.add('article-content');
    articleDiv.appendChild(projectTitle.cloneNode(true))
    modalContainer.appendChild(articleDiv);

    // Add div to contain task items in project info modal view
    const tasksDiv = document.createElement('div');
    const taskDivTitle = document.createElement('h1');
    tasksDiv.classList.add('tasks-div');
    taskDivTitle.classList.add('task-div-h1');
    taskDivTitle.textContent = "To do";
    tasksDiv.appendChild(taskDivTitle);
    articleDiv.appendChild(tasksDiv);
    
    // Show existing tasks
    for (let i = 0; i < taskList.length; i++) {
        createNewListItem(tasksDiv, taskList[i]);
        console.log(taskList)
    }

    createAddTaskBtn(tasksDiv, taskList);

    //  Event listener for closing the view modal window
    closeModalButton.addEventListener('click', () => {
        dialogContainer.remove();
    });

    dialogContainer.showModal();
}

// Test project object
let testProject = new Project("Test", "Test", "01/10/2024", "High")
    createProject(testProject);

function resetForm() {
    form.reset();
}

function createTask(tasksDiv, taskList) {
    const taskContainer = document.createElement('div');
    const taskInput = document.createElement('input');
    const btnDiv =  document.createElement('div');
    const cancelBtn = document.createElement('button');
    const checkBtn = document.createElement('button');

    taskContainer.classList.add('new-task-div');
    taskInput.classList.add('new-task-input');
    // taskInput.setAttribute('maxlength', '10');
    taskInput.setAttribute('placeholder',  'Enter Task Here...')
    cancelBtn.classList.add('new-task-cancel');
    checkBtn.classList.add('new-task-check');

    checkBtn.textContent = "✓";
    cancelBtn.textContent = "✕";

    btnDiv.append(cancelBtn, checkBtn);
    taskContainer.append(taskInput, btnDiv);
    tasksDiv.appendChild(taskContainer);

    checkBtn.addEventListener('click', () => {
        if(taskInput.value === ''){
            alert("You must write something!");
        } 
        else if(taskInput.value !== ''){
            let newTask = new Task(taskInput.value, false)
            taskList.push(newTask);
            console.log(taskList);
            taskContainer.remove();
            createNewListItem(tasksDiv, newTask);
            createAddTaskBtn(tasksDiv, taskList);
        }
    });

    cancelBtn.addEventListener('click', ()=> {
        taskContainer.remove();
        createAddTaskBtn(tasksDiv, taskList);
    })
}

function createAddTaskBtn(tasksDiv, taskList) {
    // Add task button
    const addTaskBtn = document.createElement('button');
    const addBtnLabel = document.createElement('label');
    const addBtnContainer = document.createElement('div');
    addBtnContainer.classList.add('add-btn-container');
    addBtnLabel.classList.add('add-btn-label');
    addBtnLabel.setAttribute('for', 'add-button');
    addTaskBtn.classList.add('add-button');
    addTaskBtn.textContent = '+';
    addBtnLabel.textContent = 'Add Task';
    addBtnContainer.appendChild(addTaskBtn);
    addBtnContainer.appendChild(addBtnLabel);
    tasksDiv.appendChild(addBtnContainer);
    addBtnContainer.addEventListener('click', ()=> {
        createTask(tasksDiv, taskList);
        addBtnContainer.remove();
    })
}

function createNewListItem(tasksDiv, newTask) {
    const li = document.createElement("li");
    const liDiv = document.createElement('div');
    const checkCircle = document.createElement('div');
    const deleteBtn = document.createElement('button');
    liDiv.classList.add('new-task-item')
    checkCircle.classList.add('checkmark-unchecked');
    deleteBtn.classList.add('remove-task-btn');
    liDiv.appendChild(checkCircle)
    liDiv.appendChild(li);
    liDiv.appendChild(deleteBtn);
    li.textContent = newTask.name;
    tasksDiv.appendChild(liDiv);

    if(newTask.done === true) {
        checkCircle.classList.toggle('checkmark-checked')
    } 

    checkCircle.addEventListener('click',  () => {
       if (newTask.done === true) {
            // If task is checked, uncheck it and set done to false
            checkCircle.classList.add('checkmark-unchecked')
            checkCircle.classList.remove('checkmark-checked')
            newTask.done = false;
       } else {
            // Else, if unchecked, check the task and set done to true 
            checkCircle.classList.add('checkmark-checked')
            newTask.done = true;
       }
    });
}