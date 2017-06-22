// Function to bring Focus to Input box once page loads
window.onload = document.getElementById("Input").focus();

// Gloabal variable
var numItems=0;
var globalEdit = '';

// Function to Add new Tasks
function addItemToTheList() {
  var taskInput = document.getElementById("Input");
   if (taskInput.value === '') {
    alert("Please input task");
	document.getElementById("Input").focus();
	}else{
  var listItem = createNewTaskElement(taskInput.value);
  document.getElementById("todo").appendChild(listItem);  
  taskInput.value = "";
  document.getElementById("Input").focus();
}
}

// Function to create the html elements for the new task
var createNewTaskElement = function(taskString) {
  
  numItems++
  
  var listItem = document.createElement("li");
  
  var checkBox = document.createElement("input");
  checkBox.type = "checkbox";
  checkBox.id = "cb"+ numItems;
  checkBox.onclick = taskCompleted;
  
  var span = document.createElement("span");
  span.innerText = taskString;
  span.id = "sp"+ numItems;
  span.className = "taskName";
  
  var editInput = document.createElement("input");
  editInput.type = "text";
  editInput.id = "ip" + numItems;
  editInput.setAttribute("onkeypress", "enterEdit(event)");

  var editButton = document.createElement("button");
  editButton.innerText = "Edit";
  editButton.id = "editB" + numItems;
  editButton.className = "edit";
  editButton.onclick = editClick;
  
  var deleteButton = document.createElement("button");
  deleteButton.innerText = "Delete";
  deleteButton.className = "delete";
  deleteButton.onclick = deleteTask;
        
  listItem.appendChild(checkBox);
  listItem.appendChild(span);
  listItem.appendChild(editInput);
  listItem.appendChild(editButton);
  listItem.appendChild(deleteButton);
  
  return listItem;
}

// Function to accept the enter key
function handle(e){
    if(e.keyCode === 13){
        e.preventDefault();
        addItemToTheList();
        }
}

// Function to edit a selected Task
function enterEdit(e){
    if(e.keyCode === 13){
    e.preventDefault();
	var editInput = globalEdit.querySelector("input[type=text]");
var span = globalEdit.querySelector("span");
	span.innerText = editInput.value;
globalEdit.classList.toggle("edit");
document.getElementById("Input").focus();
  }
}

// Function to strike-through a task once it is completed
function taskCompleted() {
            var chBxId = this.id.replace("cb", "");
			var spanText = document.getElementById("sp" + chBxId);
            if (this.checked) {
                spanText.style.textDecoration = "line-through";
            } else {
                spanText.style.textDecoration = "none";
            }
        }

// Function to delete a task		
function deleteTask() {
  var listItem = this.parentNode;
  var ul = listItem.parentNode;
  ul.removeChild(listItem);
}

// Function to edit a selected task
function editClick(){
var listItem = this.parentNode;
globalEdit = listItem;
var editInput = listItem.querySelector("input[type=text]");
var span = listItem.querySelector("span");
var containsClass = listItem.classList.contains("edit");
if(containsClass) {
	span.innerText = editInput.value;
  } else {
    editInput.value = span.innerText;
  }
  
  listItem.classList.toggle("edit");
  editInput.focus();
}