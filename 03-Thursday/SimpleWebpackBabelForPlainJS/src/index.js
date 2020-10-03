import "./style.css"
import "bootstrap/dist/css/bootstrap.css"
import personFacade from "./personFacade"
import "bootstrap";

//GET PERSONS
function fetchPersons(){
    personFacade.getPersons()
    .then(data => {
      const persons = data.all;
      const personRows = persons.map(person => `
      <tr>
        <td>${person.id}</td>
        <td>${person.firstName}</td>
        <td>${person.lastName}</td>
        <td>${person.phone}</td>
        <td>${person.street}</td>
        <td>${person.zip}</td>
        <td>${person.city}</td>
        <td><a href="javascript:void(0);" name="deletePerson" id="${person.id}">Delete</a> / <a href="javascript:void(0);" name="editPerson" id="${person.id}" data-toggle="modal" data-target="#myModal">Edit</a></td>
      </tr>`
      );
      const personRowsAsString = personRows.join("");
      document.getElementById("tbody").innerHTML = personRowsAsString;
    })
  }
  setTimeout(fetchPersons, 500);

//ADD PERSON
function addPerson() {
  let person = {
    "firstName": document.getElementById("fname").value,
    "lastName": document.getElementById("lname").value,
    "phone": document.getElementById("phone").value,
    "street": document.getElementById("street").value,
    "zip": document.getElementById("zip").value,
    "city": document.getElementById("city").value
  }

  personFacade.addPerson(person)
  .catch(err => {
    console.log(err);
    if(err.status){
      err.fullError.then(e => document.getElementById("error").innerHTML = e.message);
    } else {
      console.log("Network error");
    }
  })
}


//Edit Person
function editPerson(id) {
  document.getElementById("id").value = id;

  personFacade.getPersonById(id)
  .then(person => {
       document.getElementById("fname").value = person.firstName,
       document.getElementById("lname").value = person.lastName,
       document.getElementById("phone").value = person.phone,
       document.getElementById("street").value = person.street,
       document.getElementById("zip").value = person.zip,
       document.getElementById("city").value = person.city
  })
  .catch(err => {
    if(err.status){
      err.fullError.then(e => document.getElementById("error").innerHTML = e.message);
    } else {
      console.log("Network error");
    }
  })

  
}

function updatePerson(){
  const person = {
    "id": document.getElementById("id").value,
    "firstName": document.getElementById("fname").value,
    "lastName": document.getElementById("lname").value,
    "phone": document.getElementById("phone").value,
    "street": document.getElementById("street").value,
    "zip": document.getElementById("zip").value,
    "city": document.getElementById("city").value,
  }

  personFacade.editPerson(person)
  .catch(err => {
    if(err.status){
      err.fullError.then(e => document.getElementById("error").innerHTML = e.message);
    } else {
      console.log("Network error");
    }
  })
}

//Delete Person
function deletePerson(id) {
personFacade.deletePerson(id)
.catch(err => {
  console.log(err);
  if(err.status){
    err.fullError.then(e => document.getElementById("error").innerHTML = e.message);
  } else {
    console.log("Network error");
  }
})
}

//Reload Persons
document.getElementById("reload").addEventListener("click", function(e) {
  fetchPersons();
})

//Add Person and Edit
document.getElementById("savebtn").addEventListener("click", function(e) {
let action = document.getElementById("id").value

if(action === "0"){
  addPerson();
} else{
  updatePerson();
}
})



//Delete Person
document.getElementById("tbody").addEventListener("click", function(e) {
  let request = e.target;
  let id = request.id;

  if(request.name === "deletePerson"){
    deletePerson(id);
  } else if (request.name === "editPerson") {
    editPerson(id);
  }
})

document.getElementById("addPerson").addEventListener("click", function(e) {
  document.getElementById("id").value = "0";
})