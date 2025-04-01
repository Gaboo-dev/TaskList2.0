// UTILITY

$ = selector => document.querySelector(selector)
$$ = selector => document.querySelectorAll(selector)


//VARIABLES - OBJ - DomComponents
localStorage.setItem("taskID", 0)
//DomComponents
let $input = $(`#input`)
let $button = $(`#button`)
let $taskList = $(`ul`)
let $taskDeleter = $(`#taskDeleter`)

//Variables
taskID = localStorage.getItem("taskID")

//clases
class NewTask{
    constructor(id, name, ){
        this.id = id
        this.name = name
        this.description = ""
        this.color = "black"
       
        
        
    }
}



// Constants
const Tasks = {
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
if ($input.value == "" || Tasks.taskLimit <=taskID) return
    //definir taskID
    taskID = localStorage.getItem("taskID")
    //crea un objeto tarea para cada una 
    const infTask = new NewTask(taskID, $input.value )
    //subir informacion de la tarea a la base de datos 
    localStorage.setItem(`task#${taskID}`, JSON.stringify(infTask))
    taskID++
    localStorage.setItem("taskID", taskID)

cargarTareas()
}
//renderiza la tarea
function cargarTareas(){
    Tasks.taskNumber = localStorage.length - 1
    for (i = 0; i < task.taskNumber; i++ ){
        console.log(i)
    }
    return console.log(localStorage)
}
function borrarTareas(){
    localStorage.clear()
    cargarTareas()
}




