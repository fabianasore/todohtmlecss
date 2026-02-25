let tasks = [];

const taskInput = document.getElementById("taskInput");
const addTaskBtn = document.getElementById("addTaskBtn");
const taskList = document.getElementById("taskList");

function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function renderTasks() {
    taskList.innerHTML = "";

    tasks.forEach((task, index) => {
        const li = document.createElement("li");

        const span = document.createElement("span");
        span.classList.add("task-text");
        span.textContent = task;

        const actions = document.createElement("div");
        actions.classList.add("task-actions");

        // Botão editar
        const editBtn = document.createElement("button");
        editBtn.classList.add("edit-btn");
        editBtn.textContent = "Editar";
        editBtn.addEventListener("click", () => editTask(index));

        // Botão deletar
        const deleteBtn = document.createElement("button");
        deleteBtn.classList.add("delete-btn");
        deleteBtn.textContent = "Apagar";
        deleteBtn.addEventListener("click", () => deleteTask(index));

        actions.appendChild(editBtn);
        actions.appendChild(deleteBtn);

        li.appendChild(span);
        li.appendChild(actions);

        taskList.appendChild(li);
    });
}

// Adicionar tarefa
addTaskBtn.addEventListener("click", () => {
    const taskText = taskInput.value.trim();

    if (taskText !== "") {
        tasks.push(taskText);
        saveTasks();
        renderTasks();
        taskInput.value = "";
    }
});

// Deletar tarefa
function deleteTask(index) {
    tasks.splice(index, 1);
    saveTasks();
    renderTasks();
}

// Editar tarefa
function editTask(index) {
    const newText = prompt("Editar tarefa:", tasks[index]);

    if (newText !== null && newText.trim() !== "") {
        tasks[index] = newText.trim();
        saveTasks();
        renderTasks();
    }
}

// Carregar ao abrir a página
window.addEventListener("load", () => {
    const stored = localStorage.getItem("tasks");

    if (stored) {
        tasks = JSON.parse(stored);
        renderTasks();
    }
});