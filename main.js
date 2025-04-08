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
    taskID = tasks.length
    localStorage.setItem("taskID", taskID)
    console.log("se cargo")
    return renderizarTareas(tasks)
}


//renderizar las tareas cargadas por cargarTarea()
function renderizarTareas(tasks) {
    const tasksContainer = $('#tasks-container'); // Elemento en tu HTML
    tasksContainer.innerHTML = ''; // Limpiar contenedor
  
    for (let i = 0; i < tasks.length; i++) { // 'let' para evitar reasignaciones
      const task = tasks[i];
        
        //comprobar si una tarea ya esta completada
        if (task.isTask == true) {
            localStorage.removeItem(`task#${task.id}`)
            continue
        }
        // Crear elementos
        const taskContainer = document.createElement("div");
        const Checkbox = document.createElement("button")
        const taskName = document.createElement("h2");
        const taskMenu = document.createElement("button");
        const TaskIcon = document.createElement("span")
        const ModalMenu = document.createElement("dialog")
        
        // Configurar elementos
        taskName.textContent = task.name;
        taskName.style.color = task.color;
        taskName.contentEditable = true; // Usar propiedades en lugar de isContentEditable
      
        taskMenu.className = "taskMenu";
        taskMenu.innerHTML = `<img src = "assets/icons/settings.svg"></img>`; // Icono de configuración
        taskMenu.id = `settings ${task.id}`

        //configuracion checkbox
        Checkbox.className = "checkbox"
        Checkbox.id = `checkbox ${task.id}`
        Checkbox.innerHTML = `<span id = "checkbox">✅</span>`
        Checkbox.addEventListener("click", (e) => {
            if (task.isTask == null) {
                task.isTask = true
                Checkbox.className = "checkbox checked"
                taskContainer.classList.add("checked")
                localStorage.setItem(`task#${task.id}`, JSON.stringify(task))
            } else {
                task.isTask = null
                Checkbox.className = "checkbox"
                taskContainer.classList.remove("checked")
                localStorage.setItem(`task#${task.id}`, JSON.stringify(task))
            }
            })




      //configurar modal de settings
        ModalMenu.innerHTML = `<p class = "dialogTittle">Configuracion de tarea</p>`
        ModalMenu.className = "modal"
        ModalMenu.id = `modal ${task.id}`
        ModalMenu.setAttribute("closedby", "any")
        ModalMenu.removeAttribute("open")

        taskMenu.addEventListener("click", (e) => {
          if (ModalMenu.hasAttribute("open")) {

            ModalMenu.removeAttribute("open")
          }
          else {
            ModalMenu.showModal()
            ModalMenu.setAttribute("open", "true")
          }
        })



        //objetos dentro del modal
        const DeleteButton = document.createElement("button")
        DeleteButton.textContent = "eliminar tarea❌"
        DeleteButton.className = "deleteButton"
        DeleteButton.id = `delete ${task.id}`
        //eliminar tareas del localstorage y de la vista
        DeleteButton.addEventListener("click", (e) => {
            localStorage.removeItem(`task#${task.id}`)
            cargarTareas()
            })
        ModalMenu.appendChild(DeleteButton)





        const ColorPicker = document.createElement("input")
        ColorPicker.type = "color"
        ColorPicker.id = `colorPicker ${task.id}`
        ColorPicker.classList.add("colorPicker")

        ColorPicker.addEventListener("change", (e) => {
          taskName.style.color = e.target.value
          task.color = e.target.value
          localStorage.setItem(`task#${task.id}`, JSON.stringify(task))
        })

        ModalMenu.appendChild(ColorPicker)

        //detectar cambios en el input de texto
        taskName.addEventListener("input", (e) => {
            task.name = e.target.textContent
            localStorage.setItem(`task#${task.id}`, JSON.stringify(task))
        })
        //añadir el icono de la tarea
        TaskIcon.className = "taskIcon"
        TaskIcon.textContent = "📝"

        
       
        
        
        
      

  
    taskContainer.id = task.id;
    taskContainer.classList.add("task"); // Añadir clase para la NodeList
    taskContainer.appendChild(TaskIcon)
    taskContainer.appendChild(taskName);
    taskContainer.appendChild(taskMenu);
    taskContainer.appendChild(Checkbox)
    taskContainer.appendChild(ModalMenu)
  
      tasksContainer.appendChild(taskContainer); // Agregar al DOM
    }
    console.log(localStorage)
  

  }

    

//borrar tareas de el localstorage
function borrarTareas(){
    localStorage.clear()
    cargarTareas()
}

