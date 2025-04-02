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
let $taskList = $(`ul`)
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
    for (i = 0; i < localStorage.length; i++ ){
        
       let keyTask = localStorage.key(i)
       let valueTask = localStorage.getItem(keyTask)
       if (valueTask.includes(TasksInfo.taskTester)){
        let task= JSON.parse(valueTask)
        tasks.push(task)

       }
       
    }
    return renderizarTareas(tasks)
}
//borrar tareas de el localstorage
function borrarTareas(){
    localStorage.clear()
    cargarTareas()
}
//renderizar las tareas cargadas por cargarTarea()
function renderizarTareas(tasks){
      tasks.forEach(task => {
        //por cada tarea voy a crear un contenedor, un titulo y un menu
        let taskContainer = document.createElement("div")
        let taskName = document.createElement("h2")
        let taskMenu = document.createElement("button")

        // configuracion de el menu
        taskMenu.classname = "taskMenu"
        taskMenu.textContent = "settings"


        //configuracion de el nombre 
        taskName.textContent = task.name
        taskName.style = `color: ${task.color}`
        taskName.isContentEditable = true


        //configuracion de el contenedor
        taskContainer.id = task.id
        taskContainer.append(taskName)
        taskContainer.append(taskMenu)
        whatIdIs(task)

      });
}
function whatIdIs(task){
    if (task.id = 0) {
        console.log(
            $$tasks
        )
    }
    if (task.id = 1) {
        console.log($$tasks)
    }
    if (task.id = 2) {
        console.log($$tasks)
    }
    if (task.id = 3) {
        console.log($$tasks)
    }

}




