import './style.css';

const header = document.getElementById('header');
const contentDiv = document.getElementById('content');
const title = document.createElement('h1');

title.textContent = "To-Do List";
title.classList.add('title');

contentDiv.appendChild(title);
