/* Primer proyecto "bien hecho"

-   hay un monton de funcionalidades hechas a las prisas que generar una cantidad considerable de deuda tecnica
    pero ya que es un proyecto pequeño no importa mucho.
-   



*/


// MIDUQUERY XD

$ = selector => document.querySelector(selector)
$$ = selector => document.querySelectorAll(selector)


//VARIABLES - OBJ - DomComponents
localStorage.setItem("taskID", 0)

//DomComponents
let $input = $(`#input`)
let $button = $(`#button`)
let $taskDeleter = $(`#taskDeleter`)
let $$tasks = $$(".task")



//Variables
taskID = localStorage.getItem("taskID")

//clases
class NewTask{
    constructor(id, name, ){
        this.id = id
        this.name = name
        this.description = ""
        this.color = "black"
        //esto es una marraneria que use mas adelante
        this.isTask = null
       
        
        
    }
}



// Constants
const TasksInfo = {
    taskTester: "isTask",
    taskNumber: 0,
    taskClass: "tarea",
    taskChartLim: 15,
    taskLimit: 4,
    
    taskModes: {
        inProgress: "inProgress",
        compleated: "compleated"
    
    },
    taskColors: {
        black: "black",
        green: "green",
        red: "red",
        blue: "blue"

    },
    
}

// EVENTHANDLERS

document.addEventListener("DOMContentLoaded", cargarTareas)
$button.addEventListener("click", agregarTarea)
$taskDeleter.addEventListener("click", borrarTareas)

//FUNCTIONS
//crea la tarea
function agregarTarea(){
    //no sobrepase el limite de tareas ni permita tareas en blanco
if ($input.value == "" || TasksInfo.taskLimit <=taskID) return

    //definir taskID
    taskID = localStorage.getItem("taskID")
    //comprobar si taskID es null
    if (taskID == null) {taskID = 0} 
    //crea un objeto tarea para cada una 
    const infTask = new NewTask(taskID, $input.value )
    //subir informacion de la tarea a la base de datos 
    localStorage.setItem(`task#${taskID}`, JSON.stringify(infTask))
    taskID++
    localStorage.setItem("taskID", taskID)

cargarTareas()
}
//cargar tarea la tarea
function cargarTareas(){
    let tasks = []
    for (s = 0; s < localStorage.length; s++ ){
        
       let keyTask = localStorage.key(s)
       let valueTask = localStorage.getItem(keyTask)
       if (valueTask.includes(TasksInfo.taskTester)){
        let task= JSON.parse(valueTask)
        tasks.push(task)

       }
       
    }
    console.log("se cargo")
    return renderizarTareas(tasks)
}


//renderizar las tareas cargadas por cargarTarea()
function renderizarTareas(tasks) {
    const tasksContainer = $('#tasks-container'); // Elemento en tu HTML
    tasksContainer.innerHTML = ''; // Limpiar contenedor
  
    for (let i = 0; i < tasks.length; i++) { // 'let' para evitar reasignaciones
      const task = tasks[i];
      
      // Crear elementos
      const taskContainer = document.createElement("div");
      const taskName = document.createElement("h2");
      const taskMenu = document.createElement("button");
  
      // Configurar elementos
      taskName.textContent = task.name;
      taskName.style.color = task.color;
      taskName.contentEditable = true; // Usar propiedades en lugar de isContentEditable
      
      taskMenu.className = "taskMenu";
      taskMenu.textContent = "settings";
  
      taskContainer.id = task.id;
      taskContainer.classList.add("task"); // Añadir clase para la NodeList
      taskContainer.appendChild(taskName);
      taskContainer.appendChild(taskMenu);
  
      tasksContainer.appendChild(taskContainer); // Agregar al DOM
    }
    console.log(localStorage)
  

  }
    

//borrar tareas de el localstorage
function borrarTareas(){
    localStorage.clear()
    cargarTareas()
}

