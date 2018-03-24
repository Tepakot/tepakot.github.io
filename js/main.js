// 1. add new task
// 2. remove task
// 3. clear all tasks
// 4. Filter tasks
// 5. Update localStorage

const form = document.querySelector('form');
const taskInput = document.getElementById('task');
const clearBtn = document.querySelector('.clear-tasks');
const tasksList = document.querySelector('.list-group');
const filter = document.getElementById('filter');

loadEventsListeners();

function loadEventsListeners() {
	form.addEventListener('submit', addTask);
	tasksList.addEventListener('click', removeTask);
	clearBtn.addEventListener('click', clearTasks);
	filter.addEventListener('keyup', filterTasks);
}

// Add new task
function addTask(e) {

	e.preventDefault();
	if( taskInput.value === '' ) {
		return taskInput.classList.add('is-invalid');
	}

	taskInput.classList.remove('is-invalid');

	//создать li
	const li = document.createElement('li');
	li.className = 'list-group-item d-flex justify-content-between';

	//Добавить текст внутрь li
	li.textContent = taskInput.value;

	//Создать ссылку для удаления задачи
	const link = document.createElement('a');
	link.className = 'delete-item';
	link.innerHTML = '<i class="fa fa-remove"></i>';
	//add link to li
	li.appendChild(link);
	// Add li to ul
	tasksList.appendChild(li);
	//add text in ls
	storageTaskInLocalStorage(taskInput.value);
	// clear taskInput
	taskInput.value = '';
}

//Remove task
function removeTask(e) {
	e.preventDefault();
	// console.log(e.target);
	if( e.target.classList.contains('fa-remove')){
		if(confirm('Вы уверены что хотите удалить задачу?')) {
			e.target.closest('.list-group-item').remove();
		}
	}

}

//Clear all tasks
function clearTasks(e) {
	e.preventDefault();
	tasksList.innerHTML = '';
}

//Filter tasks
function filterTasks(e) {

	const text = e.target.value.toLowerCase();
	const allItems = document.querySelectorAll('.list-group-item');
  allItems.forEach (function(item) {
		let itemText = item.textContent.toLowerCase();
		if ( itemText.indexOf(text) !== -1 ){
			item.classList.remove('d-none');
			item.classList.add('d-flex');
		} else {
			item.classList.remove('d-flex');
			item.classList.add('d-none');
		}
	});
}

// Store task
function storageTaskInLocalStorage(task) {

	let tasks;
	if ( localStorage.getItem('tasks') === null ){
		tasks = [];
	} else {
		tasks = JSON.parse(localStorage.getItem('tasks'));
	}
	tasks.push(task);

	localStorage.setItem('tasks', JSON.stringify(tasks));

}

// function eventHandler(e) {

// 	e.preventDefault();
// 	console.log(e.type);
// 	// console.log(this.value);

// }
// form.addEventListener('submit', eventHandler);
// taskInput.addEventListener('keyup', eventHandler);
// taskInput.addEventListener('change', eventHandler);
// clearTask.addEventListener('click', eventHandler);



// let li = document.createElement('li');
// li.textContent = 'New task';
// li.className = 'list-group-item';

// let icon = document.createElement('i');
// icon.className = 'fa fa-times';
// li.appendChild(icon);

// console.log(li);

// document.querySelector('.list-group').appendChild(li);











// let btn = document.getElementsByClassName('btn');
// let btn = document.querySelector('.btn');
// btn.setAttribute('title', 'new value');
// btn.classList.add('new_class');
// btn.classList.remove('new_class');
// btn.classList.contains('new_class');
// console.log(btn.dataset.type);
