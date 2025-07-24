let lista = [];

function add() {
  const usuarioNuevo = document.getElementById("form-add");
  let usuario = [];
  const name = usuarioNuevo.name.value.trim();
  const tel = usuarioNuevo.tel.value.trim();

  if (name && tel) {
    let repetido = lista.filter(
      (e) => e[0].toLowerCase() == name.toLowerCase()
    );
    if (repetido.length > 0) {
      alert(`${name} ya es uno de tus contactos.`);
      document.getElementById("name").value = "";
      document.getElementById("tel").value = "";
    }

    usuario.push(name);
    usuario.push(tel);
    lista.push(usuario);

    document.getElementById("name").value = "";
    document.getElementById("tel").value = "";
  } else {
    alert("Por favor, introduce un nombre y un teléfono.");
  }
}

function find() {
  let usuario = document.getElementById("find-user").value.toLowerCase();

  let buscarUsuario = lista.filter(
    (e) => e[0].toLowerCase().slice(0, usuario.length) == usuario
  );

  let listar = "";
  let listarForm = "";

  if (buscarUsuario.length > 0) {
    buscarUsuario.forEach((e) => {
      listar += `<li>
      <div class="modify" id="modify-${e[0]}">
      <div class="contact-info" id='edit-${e[0]}'>
      <span>Nombre: ${e[0]}</span><span> Tel: ${e[1]}</span>
      </div>
      </div>
      </li>
      <div class="list-btn" id="list-btn-${e[0]}">
        <button type="button"  onclick="deleteUser('${e[0]}')">Eliminar</button>
        <button type="button" onclick="edit('${e[0]}')" class="modify-btn"  >Modificar</button>
      </div>`;
    });
    listarForm = `<form class="eliminar" id="">${listar}</form>`;
  } else {
    listar = `<li>No hay contactos con ese nombre</li>`;
  }
  document.getElementById("result").innerHTML = listarForm;
}

function deleteUser(name) {
  const user = lista.filter((e) => e[0].toLowerCase() == name.toLowerCase());
  lista = lista.filter((e) => e[0].toLowerCase() != name.toLowerCase());
  find();
}

function edit(name) {
  const user = lista.filter((e) => e[0].toLowerCase() == name.toLowerCase());
  const elementoInput = document.getElementById(`edit-${name}`);
  elementoInput.style.display = "none";
  const elementoBoton = document.getElementById(`list-btn-${name}`);
  elementoBoton.style.display = "none";

  document.getElementById(`modify-${name}`).innerHTML = `<form>
  <label >Nombre: </label><input type="text" id="name-modify-${name}" value="${user[0][0]}">
  <label>Tel: </label><input type="number" id="tel-modify-${name}" value="${user[0][1]}" >
  <button type="button" class="add-modify"  onclick="editUser('${name}')">Agregar</button>
  </form>`;

  const nameInput = document.getElementById(`name-modify-${name}`);
  nameInput.focus();

  const valueLength = nameInput.value.length;
  nameInput.setSelectionRange(valueLength, valueLength);
  document.getElementById("find-user").value = "";
}

function editUser(name) {
  const elementoInput = document.getElementById(`modify-${name}`);
  elementoInput.style.display = "block";

  const nameModify = document.getElementById(`name-modify-${name}`).value;
  const telModify = document.getElementById(`tel-modify-${name}`).value;

  if (nameModify && telModify) {
    const indice = lista.findIndex(
      (e) => e[0].toLowerCase() === name.toLowerCase()
    );

    lista.splice(indice, 1, [nameModify, telModify]);
    lista.forEach((u) => console.log(u));
    document.getElementById("find-user").value = `${nameModify}`;
    find();
    elementoInput.style.display = "none";
  } else {
    alert("Por favor, introduce un nombre y un teléfono.");
  }
}
