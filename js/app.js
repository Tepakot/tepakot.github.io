// 1. Add new task
// 2. Remove task
// 3. Clear all tasks
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

    if ( taskInput.value === '' ) {
        return taskInput.classList.add('is-invalid');
    }

    taskInput.classList.remove('is-invalid');

    // Создать li
    const li = document.createElement('li');
    li.className = 'list-group-item d-flex justify-content-between';

    // Добавить текст внутрь li
    li.textContent = taskInput.value;

    // Создади ссылку которая будет удалять задачу
    const link = document.createElement('a');
    link.className = 'delete-item';

    link.innerHTML = '<i class="fa fa-remove"></i>';

    // add link to li
    li.appendChild(link);

    // Add li to ul
    tasksList.appendChild(li);

    // Add text in ls
    storeTaskInLocalStorage(taskInput.value);

    // clear input
    taskInput.value = '';

}

// Remove task
function removeTask(e) {

    e.preventDefault();

    if ( e.target.classList.contains('fa-remove') ){

        if ( confirm('Вы уверены что хотите удалить задачу?') ){

            e.target.closest('.list-group-item').remove();

        }

    }

}

// Clear all tasks
function clearTasks(e) {

    e.preventDefault();

    tasksList.innerHTML = '';

}

// Filter tasks
function filterTasks(e) {

    const text = e.target.value.toLowerCase(); // best
    const allItems = document.querySelectorAll('.list-group-item');

    allItems.forEach( function (item) {

        let itemText = item.textContent.toLowerCase(); // best item

        if ( itemText.indexOf(text) !== -1 ){
            item.classList.add('d-flex');
            item.classList.remove('d-none');
        } else {
            item.classList.remove('d-flex');
            item.classList.add('d-none');
        }

    } );
    
}

// Store task
function storeTaskInLocalStorage(task) {

    let tasks;

    if ( localStorage.getItem('tasks') === null ){
        tasks = [];
    } else {
        tasks = JSON.parse( localStorage.getItem('tasks') );
    }

    tasks.push(task);

    localStorage.setItem( 'tasks', JSON.stringify(tasks) );

}

