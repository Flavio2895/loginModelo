import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-auth.js"
import { auth, onGetTasks} from "./app/firebase.js";
import { loginCheck } from "./app/loginCheck.js";
//import { setupPosts } from "./app/postList.js";

import './app/signupForm.js'
import './app/signinForm.js'
import './app/logout.js'
import './app/postList.js'

import { getFirestore, collection} from "https://www.gstatic.com/firebasejs/10.14.1/firebase-firestore.js"
import { saveTask, getTasks } from "./app/firebase.js";
// list for auth state changes

onAuthStateChanged(auth, async (user) => {
  if (user) {
    loginCheck(user);
    const correo = user.email;
    try {     
      //const mensaje = "Iniciaste sesion";

      //setupPosts(mensaje); 
      const taskForm = document.getElementById("task-form");
      taskForm.addEventListener("submit", (e)=>{
        e.preventDefault();
        const title = taskForm["task-title"].value;
        const description = taskForm["task-description"].value;
        saveTask(title,description,correo);
        taskForm.reset();
      })
    } catch (error) {
      console.log(error)
    }
    const querySnapshot = await getTasks();
    const tasksContainer = document.getElementById("tasks-container");

    onGetTasks((querySnapshot)=>{
      let html = '';
      tasksContainer.innerHTML = '';
      querySnapshot.forEach(doc => {
        const task = doc.data();
        if(task.userMail == correo){
          html += `
          <li class="list-group-item list-group-item-action mt-2">
            <h5>${task.title}</h5>
            <p>${task.description}</p>
            <div>
              <button class="btn btn-primary btn-delete" data-id="">
               Delete
              </button>
              <button class="btn btn-secondary btn-edit" data-id="">
                Edit
              </button>
            </div>
          </li>
          `;
        }
      })
      tasksContainer.innerHTML = html
    })
  } else {
    loginCheck(user);
    const tasksContainer = document.getElementById("tasks-container");
    tasksContainer.innerHTML = '<h3 class="text-white">Inicia sesion para ver tus publicaciones</h1>'
    const vacio = "";
    //setupPosts(vacio);
   
  }
});