"use strict";

Vue.createApp({
  data() {
    return {
      apiURL: "http://localhost:4730/todos",
      newTodo: "",
      todos: [],
      todoFilter: "filterAll",
    };
  },
  computed: {
    filteredTodos() {
      if (this.todoFilter === "filterOpen") {
        return this.todos.filter((todo) => !todo.done);
      } else if (this.todoFilter === "filterDone") {
        return this.todos.filter((todo) => todo.done);
      } else {
        return this.todos;
      }
    },
  },
  methods: {
    getDataFromApi() {
      fetch(this.apiURL)
        .then((response) => response.json())
        .then((data) => {
          this.todos = data;
        })
        .catch((error) => console.error("API Error", error));
    },
    addTodo() {
      const inputText = this.newTodo.trim();
      if (inputText !== "" && !this.isDuplicate(inputText)) {
        fetch(this.apiURL, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            description: inputText,
            checkbox: false,
            done: false,
          }),
        })
          .then((response) => response.json())
          .then((newTodo) => {
            this.todos.push(newTodo);
            this.newTodo = "";
          });
      }
    },
    isDuplicate(description) {
      return this.todos.some(
        (todo) =>
          todo &&
          todo.description &&
          todo.description.toLowerCase() === description.toLowerCase()
      );
    },
    updateTodo(todo) {
      fetch(this.apiURL + "/" + todo.id, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          done: todo.done,
          description: todo.description,
        }),
      })
        .then((response) => response.json())
        .then((updatedTodo) => {
          console.log("update", updatedTodo);
        });
    },
    removeDoneTodos() {
      const doneTodos = this.todos.filter((todo) => todo.done);
      const deleteTodoPromises = doneTodos.map((todo) =>
        fetch(this.apiURL + "/" + todo.id, {
          method: "DELETE",
        })
      );
      Promise.all(deleteTodoPromises)
        .then(() => {
          this.getDataFromApi();
        })
        .catch((error) => console.error("Error deleting todos:", error));
    },
  },
}).mount("#app");

/*const todos = document.querySelector("#btn-add");
const input = document.querySelector("#newTodo");
const toDoList = document.querySelector("#to-do-list");
const allFilter = document.querySelector("#all");
const openFilter = document.querySelector("#open");
const doneFilter = document.querySelector("#done");
const removeDoneButton = document.querySelector("#btn-remove");
const apiUrl = "http://localhost:4730/todos";
let newArray = [];
getDatafromApi();

// Daten von der API laden
function getDatafromApi() {
  fetch(apiUrl)
    .then((request) => request.json())
    .then((datas) => {
      console.log("API load", datas);
      newArray = datas;
      showNewArray();
    })
    .catch((error) => console.error("API Error", error));
}
// ist ein Todo schon vorhanden?
function isDuplicate(description) {
  return newArray.some(function (todo) {
    return (
      todo &&
      todo.description &&
      todo.description.toLowerCase() === description.toLowerCase()
    );
  });
}

function buttonClick() {
  const inputtext = input.value.trim();
  if (inputtext !== "" && !isDuplicate(inputtext)) {
    input.value = "";

    // Daten an die API senden, um eine neue Aufgabe zu erstellen
    fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        description: inputtext,
        checkbox: false,
        done: false,
      }),
    })
      .then(function (response) {
        return response.json();
      })
      .then(function (newTodo) {
        newArray.push(newTodo);
        getDatafromApi();
      });
  }
}

function updateTodo(todo) {
  const todoID = todo.id;
  fetch(apiUrl + "/" + todoID, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      done: todo.done,
      description: todo.description,
    }),
  })
    .then((response) => response.json())
    .then((updatedTodo) => {
      console.log("update", updatedTodo);
      showNewArray();
    });
}

function removeDoneTodos() {
  const doneTodos = newArray.filter((todo) => todo.done);

  const deletetodo = doneTodos.map((todo) =>
    fetch(apiUrl + "/" + todo.id, {
      method: "DELETE",
    })
  );

  Promise.all(deletetodo)
    .then(() => {
      getDatafromApi();
    })
    .catch((error) => console.error("Error gelöschte Todos:", error));
}

function showNewArray() {
  toDoList.innerHTML = "";

  const filteredArray = filterTodos(newArray);
  for (const objects of filteredArray) {
    const toDoElement = document.createElement("li");
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = objects.done;
    checkbox.addEventListener("change", function () {
      objects.done = checkbox.checked;
      updateTodo(objects);
    });

    const description = document.createElement("label");
    description.textContent = objects.description;
    description.appendChild(checkbox);

    if (objects.done) {
      description.classList.add("done");
    }

    toDoElement.appendChild(description);
    toDoList.appendChild(toDoElement);
  }
}

function filterTodos(todos) {
  if (openFilter.checked) {
    return todos.filter((todo) => !todo.done);
  } else if (doneFilter.checked) {
    return todos.filter((todo) => todo.done);
  } else {
    return todos;
  }
}

todos.addEventListener("click", buttonClick);
allFilter.addEventListener("change", showNewArray);
openFilter.addEventListener("change", showNewArray);
doneFilter.addEventListener("change", showNewArray);
removeDoneButton.addEventListener("click", removeDoneTodos);*/
