let addBtn = document.querySelector(".add-btn");

let nameInput = document.querySelector(".name-input");
let phoneInput = document.querySelector(".phone-input");
let photoInput = document.querySelector(".photo-input");

let contactCards = document.querySelector(".cards");

addBtn.addEventListener("click", () => {
  if (!nameInput.value.trim() || !phoneInput.value.trim()) {
    return;
  }

  let contact = {
    name: nameInput.value,
    phone: phoneInput.value,
    photo: photoInput.value || "default-photo.jpg",
  };

  addContactToStorage(contact);
  displayContacts();
  nameInput.value = "";
  phoneInput.value = "";
  photoInput.value = "";
});
// добавляется в локал сторедж
function addContactToStorage(contact) {
  let contacts = JSON.parse(localStorage.getItem("contact-data")) || [];
  contacts.push(contact);
  localStorage.setItem("contact-data", JSON.stringify(contacts));
}
// отображение контактв
function displayContacts() {
  if (!localStorage.getItem("contact-data")) {
    localStorage.setItem("contact-data", "[]");
  }

  let contacts = JSON.parse(localStorage.getItem("contact-data"));
  contactCards.innerHTML = "";
  // проходится каждому элементу и создает карточку
  contacts.forEach((contact, index) => {
    let card = document.createElement("div");
    card.classList.add("contact-card");

    card.innerHTML = `
      <strong>${contact.name}</strong>
      <p>Номер: ${contact.phone}</p>
      <img src="${contact.photo}" alt="${contact.name}'s Photo" width="100px" height="100px">
      <button class="delete-btn">Удалить</button>
      <button class="edit-btn">Изменить</button>
    `;

    // удаление
    let deleteBtn = card.querySelector(".delete-btn");
    // изменение
    let editBtn = card.querySelector(".edit-btn");

    deleteBtn.addEventListener("click", () => {
      deleteContact(index);
    });

    editBtn.addEventListener("click", () => {
      editContact(index);
    });

    contactCards.appendChild(card);
  });
}
// ф для удаление по индексу
function deleteContact(index) {
  let contacts = JSON.parse(localStorage.getItem("contact-data"));
  contacts.splice(index, 1);
  localStorage.setItem("contact-data", JSON.stringify(contacts));
  displayContacts();
}
// ф для изменение
function editContact(index) {
  let contacts = JSON.parse(localStorage.getItem("contact-data"));
  let updatedName = prompt("Изените имя:", contacts[index].name);
  let updatedPhone = prompt("Измените номер:", contacts[index].phone);
  let updatedPhoto = prompt("Измените URL ссылку:", contacts[index].photo);
  // изменение контавтов
  if (updatedName !== null && updatedPhone !== null) {
    contacts[index].name = updatedName;
    contacts[index].phone = updatedPhone;
    contacts[index].photo = updatedPhoto || "default-photo.jpg";
    localStorage.setItem("contact-data", JSON.stringify(contacts));
    displayContacts();
  }
}

displayContacts();
