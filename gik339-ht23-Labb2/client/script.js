const url = 'http://localhost:3000/users'; // URL till din server

// Hämtar användare från servern och visar dem på sidan
console.log('Starting fetch...');
fetch(url)
  .then((response) => response.json()) // Konverterar till JSON
  .then((users) => {
    console.log(users); // Logga användare för felsökning

    // Skapa ett ul-element
    const ul = document.createElement('ul');
    ul.classList.add('user-list'); // Lägg till en CSS-klass för styling

    // Loop genom users-arrayen
    users.forEach(user => {
      // Skapa ett li-element för varje user
      const li = document.createElement('li');
      li.classList.add('user-item'); // Lägg till en CSS-klass för styling
      // Skapa innehåll med rubrik och paragrafer för att visa användardata
      li.style.backgroundColor = user.color;
      li.innerHTML = `
        <h3>${user.firstName} ${user.lastName}</h3>
        <p>ID: ${user.id}</p>
        <p>Username: ${user.username}</p>
        <p>Color: ${user.color}</p>
      `;

      // Lägg till li-elementet i ul
      ul.appendChild(li);
    });
        
const userList = document.getElementById('userList');
if (userList) {
    userList.appendChild(ul);
  } else {
    console.error('Element med id \"userList\" hittades inte!');
  }
})
.catch((error) => {
  console.error('Error fetching users:', error); // Hantera fel
});

// Eventlyssnare för formuläret
const userForm = document.getElementById('userForm'); // Referens till formuläret

userForm.addEventListener('submit', sendUserData);

// Funktion för att skicka användardata
function sendUserData(e) {
  e.preventDefault(); // Förhindra att sidan laddas om

  const userData = {
    id: userForm.id.value,
    firstName: userForm.firstName.value,
    lastName: userForm.lastName.value,
    username: userForm.userName.value,
    color: userForm.color.value,
  };

  console.log(userData); // Logga den inskickade användardatan för felsökning

  const jsonData = JSON.stringify(userData); // Konvertera till JSON
  console.log(jsonData);

  const request = new Request(url, {
    method: 'POST', // Skicka data med POST
    headers: { 'Content-Type': 'application/json' }, // Ange korrekt content-type
    body: jsonData, // Skickad JSON-data
  });

  fetch(request)
    .then((response) => response.json()) // Vänta på att servern svarar
    .then((data) => {
      console.log('User added:', data); // Bekräfta att användaren lades till
      // Uppdatera listan med användare efter att den nya användaren lagts till
      const userList = document.getElementById('userList');
      const html = `
        <p>
          ID: ${data.id} <br>
          Firstname: ${data.firstName} <br>
          Lastname: ${data.lastName} <br>
          Username: ${data.username} <br>
          Color: ${data.color}
        </p>
      `;
      console.log('User data:', data);
      userList.insertAdjacentHTML('beforeend', html);
    })
    .catch((error) => {
      console.error('Error sending user data:', error); // Hantera fel
    });
}

