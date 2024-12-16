const url = 'http://localhost:3000/users'; 


console.log('Starting fetch...');
fetch(url)
  .then((response) => response.json()) 
  .then((users) => {
    console.log(users);

    const ul = document.createElement('ul');
    ul.classList.add('user-list'); 

    users.forEach(user => {
      const li = document.createElement('li');
      li.classList.add('user-item'); 
      li.style.backgroundColor = user.color;
      li.innerHTML = `
        <h3>${user.firstName} ${user.lastName}</h3>
        <p>ID: ${user.id}</p>
        <p>Username: ${user.username}</p>
        <p>Color: ${user.color}</p>
      `;
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
  console.error('Error fetching users:', error);
});

const userForm = document.getElementById('userForm'); 

userForm.addEventListener('submit', sendUserData);

function sendUserData(e) {
  e.preventDefault(); 

  const userData = {
    id: userForm.id.value,
    firstName: userForm.firstName.value,
    lastName: userForm.lastName.value,
    username: userForm.userName.value,
    color: userForm.color.value,
  };

  console.log(userData); 

  const jsonData = JSON.stringify(userData); 
  console.log(jsonData);

  const request = new Request(url, {
    method: 'POST', 
    headers: { 'Content-Type': 'application/json' }, 
    body: jsonData, 
  });

  fetch(request)
    .then((response) => response.json()) 
    .then((data) => {
      console.log('User added:', data); 
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
      console.error('Error sending user data:', error); 
    });
}

