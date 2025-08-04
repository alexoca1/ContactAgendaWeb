// Lista para almacenar los contactos
let list = [];

// Función para agregar un nuevo contacto
function add() {
  // Obtiene el formulario de agregar contacto
  const newUserForm = document.getElementById("form-add");
  let user = []; // Array para almacenar el nuevo contacto

  // Obtiene los valores de nombre y teléfono del formulario
  const name = newUserForm.name.value.trim();
  const phone = newUserForm.phone.value.trim();

  // Verifica si ambos campos están llenos
  if (name && phone) {
    // Busca si ya existe un contacto con el mismo nombre (evita duplicados)
    let duplicate = list.filter(
      (e) => e[0].toLowerCase() == name.toLowerCase()
    );

    if (duplicate.length > 0) {
      alert(`${name} ya es uno de tus contactos.`);
      // Limpia los campos si hay un duplicado
      document.getElementById("name").value = "";
      document.getElementById("phone").value = "";
      return; // Salir de la función para no continuar con el resto del proceso
    }

    // Si no hay duplicados, agrega el nuevo contacto a la lista
    user.push(name);
    user.push(phone);
    list.push(user);

    // Limpia los campos del formulario después de agregar un contacto exitosamente
    document.getElementById("name").value = "";
    document.getElementById("phone").value = "";
  } else {
    // Si falta información, muestra una alerta
    alert("Por favor, introduce un nombre y un teléfono.");
  }
}


// Función para buscar un contacto
function find() {
  // Obtiene el texto de búsqueda y lo convierte a minúsculas
  let userInput = document.getElementById("find-user").value.toLowerCase();

  // Filtra la lista de contactos según el texto de búsqueda
  let searchUser = list.filter(
    (e) => e[0].toLowerCase().slice(0, userInput.length) == userInput
  );

  let listResult = ""; // Almacena el resultado de la búsqueda en formato HTML
  let listForm = "";   // Almacena el formulario completo de resultados

  // Si hay resultados, construye una lista HTML con ellos
  if (searchUser.length > 0) {
    searchUser.forEach((e) => {
      listResult += `<li>
        <div class="modify" id="modify-${e[0]}">
          <div class="contact-info" id='edit-${e[0]}'>
            <span>Nombre: ${e[0]}</span><span> Tel: ${e[1]}</span>
          </div>
        </div>
      </li>
      <div class="list-btn" id="list-btn-${e[0]}">
        <button type="button" onclick="deleteUser('${e[0]}')">Eliminar</button>
        <button type="button" onclick="edit('${e[0]}')" class="modify-btn">Modificar</button>
      </div>`;
    });
    listForm = `<form class="delete" id="">${listResult}</form>`;
  } else {
    // Si no hay resultados, muestra un mensaje
    listResult = `<li>No hay contactos con ese nombre</li>`;
  }

  // Actualiza el contenido del contenedor de resultados con los resultados de la búsqueda
  document.getElementById("result").innerHTML = listForm;
}

// Función para eliminar un contacto
function deleteUser(name) {
  // Filtra la lista de contactos para excluir el contacto con el nombre dado
  list = list.filter((e) => e[0].toLowerCase() != name.toLowerCase());

  // Actualiza la lista de contactos mostrada
  find();
}

// Función para editar un contacto existente
function edit(name) {
  // Busca el contacto a editar
  const user = list.filter((e) => e[0].toLowerCase() == name.toLowerCase());

  // Oculta los elementos actuales del contacto
  const elementInput = document.getElementById(`edit-${name}`);
  elementInput.style.display = "none";

  const elementButton = document.getElementById(`list-btn-${name}`);
  elementButton.style.display = "none";

  // Crea un formulario para editar la información del contacto
  document.getElementById(`modify-${name}`).innerHTML = `<form>
    <label>Nombre: </label><input type="text" id="name-modify-${name}" value="${user[0][0]}">
    <label>Tel: </label><input type="number" id="tel-modify-${name}" value="${user[0][1]}" >
    <button type="button" class="add-modify" onclick="editUser('${name}')">Agregar</button>
  </form>`;

  // Enfoca el campo de nombre para edición inmediata
  const nameInput = document.getElementById(`name-modify-${name}`);
  nameInput.focus();

  // Coloca el cursor al final del texto en el campo de nombre
  const valueLength = nameInput.value.length;
  nameInput.setSelectionRange(valueLength, valueLength);

  // Limpia el campo de búsqueda
  document.getElementById("find-user").value = "";
}

// Función para guardar los cambios de un contacto editado
function editUser(name) {
  // Obtiene el contenedor del formulario de edición
  const elementInput = document.getElementById(`modify-${name}`);
  elementInput.style.display = "block";

  // Obtiene los nuevos valores del nombre y teléfono del formulario de edición
  const nameModify = document.getElementById(`name-modify-${name}`).value;
  const telModify = document.getElementById(`tel-modify-${name}`).value;

  // Verifica que ambos campos estén llenos
  if (nameModify && telModify) {
    // Encuentra el índice del contacto a editar en la lista
    const index = list.findIndex(
      (e) => e[0].toLowerCase() === name.toLowerCase()
    );

    // Actualiza el contacto en la lista
    list.splice(index, 1, [nameModify, telModify]);

    // Actualiza la lista de contactos mostrada
    document.getElementById("find-user").value = `${nameModify}`;
    find();

    // Oculta el formulario de edición después de guardar los cambios
    elementInput.style.display = "none";
  } else {
    // Si falta información, muestra una alerta
    alert("Por favor, introduce un nombre y un teléfono.");
  }
}
