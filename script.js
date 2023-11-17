// atfirst check if the user has already any task on localStorage
if(localStorage.getItem('addedTask')){
// below code is to showing task added earlier on the page
	let addedTask = JSON.parse(localStorage.getItem('addedTask'))
	addedTask.forEach(function(task) {
		const taskList = document.getElementById('taskList');
		const li = document.createElement('li');
			li.innerHTML = `
				<span>${task}</span>
				<button class="complete" onclick="toggleDone(this)"></button>
				<button class="delete" onclick="deleteTask(this)"></button>
			`;
			taskList.appendChild(li);
	})
}
else {
// if the user firsttime on this page then below code will create a empty array(String) on localStorage
	let emptyTask = []
	emptyTask = JSON.stringify(emptyTask)
	localStorage.setItem('addedTask', emptyTask)
}
if(localStorage.getItem('doneTask')){
	let doneTask = JSON.parse(localStorage.getItem('doneTask'))
	doneTask.forEach(function(task) {
		const li = document.createElement('li')
		li.innerHTML = `
				<span>${task}</span>
				<button class="complete" onclick="toggleDone(this)"></button>
				<button class="delete" onclick="deleteTask(this)"></button>
			`
		li.className = 'done'
		taskList.appendChild(li)
	})
}
else {
	let doneTask = []
	doneTask = JSON.stringify(doneTask)
	localStorage.setItem('doneTask', doneTask )
}
function addTask() {
	event.preventDefault()	//as there is no form submission to server
    const taskInput = document.getElementById('taskInput');
    const taskList = document.getElementById('taskList');
    if (taskInput.value.trim() !== '') {
//if the user has inputed something other than whitespace
		if(taskInput.value.trim().length <= 14) {
//resisting user from input longer text
			const existingTask = JSON.parse(localStorage.getItem('addedTask'))
			existingTask.push(taskInput.value)
//retriving array from localStorage and converted to string
			let updatedTask = existingTask
			updatedTask = JSON.stringify(updatedTask)
//reassigning with the new task to localstorage as converted string
			localStorage.setItem('addedTask', updatedTask)
			const li = document.createElement('li');
//adding the element on document body as list item 
			li.innerHTML = `
				<span>${taskInput.value}</span>
				<button class="complete" onclick="toggleDone(this)"></button>
				<button class="delete" onclick="deleteTask(this)"></button>
			`;
			taskList.appendChild(li);
			taskInput.value = '';
			
		}
		else {
			const warn = document.createElement('p');
			warn.id = 'warnText';
			warn.innerHTML = 'Please use shorter input.';
			const container = document.getElementsByClassName('container')[0];
			container.appendChild(warn);
//			const pText = document.getElementById('warnText')
			warn.addEventListener('click', function(){
				warn.remove()
			})
		}
    }

}

function toggleDone(button) {
	let taskItem = button.parentElement.children[0].innerText
	let addedTask = JSON.parse(localStorage.getItem('addedTask'))
	addedTask = addedTask.filter(function (task) {
		return task != taskItem
	})
	addedTask = JSON.stringify(addedTask)
	localStorage.setItem('addedTask', addedTask)
	let doneTask = JSON.parse(localStorage.getItem('doneTask'))
	if(!doneTask.includes(taskItem)){
		doneTask.push(taskItem)
	}
	doneTask = JSON.stringify(doneTask)
	localStorage.setItem('doneTask', doneTask)
    const taskText = button.previousElementSibling;
    taskText.classList.toggle('done');
}

function deleteTask(button) {
	let taskItem = button.parentElement.children[0].innerText
	let addedTask = JSON.parse(localStorage.getItem('addedTask'))
	addedTask = addedTask.filter(function (task) {
		return task != taskItem
	})
	addedTask = JSON.stringify(addedTask)
	localStorage.setItem('addedTask', addedTask)
	let doneTask = JSON.parse(localStorage.getItem('doneTask'))
	doneTask = doneTask.filter(function (task) {
		return task != taskItem
	})
	doneTask = JSON.stringify(doneTask)
	localStorage.setItem('doneTask', doneTask)
	taskItem = button.parentElement;
    taskItem.remove();
}


