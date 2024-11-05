
import { getCookie } from './../services/login_service';

const API_URL = "http://localhost:8080/user";
const AUTH_URL = "http://localhost:8080/auth";

async function getUsers() {
  const user = getCookie();

  if (!user || !user.token) {
    console.error("User not logged in or token not found.");
    return;
  }
  const response = await fetch(API_URL+"/findAll",{
    method: "GET",
    headers: {
      "Authorization": `Bearer ${user.token}`,
      "Content-type": "application/json", 
    },
  });
  const json = await response.json();
  return json;
}

async function getUserId(username) {
  const user = getCookie();

  if (!user || !user.token) {
    console.error("User not logged in or token not found.");
    return;
  }
  const response = await fetch(API_URL+"/findId?username=" + encodeURIComponent(username),{
    method: "GET",
    headers: {
      "Authorization": `Bearer ${user.token}`, 
      "Content-type": "application/json",
    },
  });
  const text = await response.text();
  return text;
}


async function deleteUser(username) {
  const user = getCookie();

  if (!user || !user.token) {
    console.error("User not logged in or token not found.");
    return;
  }
  const response = await fetch(API_URL + "/delete?username=" + encodeURIComponent(username), {
      method: "DELETE",
      headers: {
        "Authorization": `Bearer ${user.token}`,
        "Content-type": "application/json", 
      },
    });

    const text = await response.text();
    return text;
  }
  
  async function updateUser(username, name, email, password, role) {
    const user = getCookie();

    if (!user || !user.token) {
      console.error("User not logged in or token not found.");
      return;
    }
    const response = await fetch(API_URL + "/update", {
      method: "PUT",
      body: JSON.stringify({
        username: username,
        name: name,
        email: email,
        password: password,
        role:role,
      }),
      headers: {
        "Authorization": `Bearer ${user.token}`,  
        "Content-type": "application/json", 
      },
    });
      
    const text = await response.text();
    return text;
  }
  


async function postUser(username, name,email,password,role) {
  const user = getCookie();

  if (!user || !user.token) {
    console.error("User not logged in or token not found.");
    return;
  }
    const response = await fetch(AUTH_URL + "/sign_up", {
      method: "POST",
      body: JSON.stringify({
        username: username,
        name: name,
        email: email,
        password: password,
        role:role,
      }),
      headers: {
        "Authorization": `Bearer ${user.token}`,  
        "Content-type": "application/json",
      },
    });
  
    const text = await response.text();
    return text;
  }


  async function login(username, password) {
    const response = await fetch(AUTH_URL + "/sign_in", {
      method: "POST",
      body: JSON.stringify({
        username: username,
        password: password,
      }),
      headers: {
        "Content-type": "application/json",
      },
    });
  
    const json = await response.json();
    return json;
  }


  export {
   
    postUser,
    deleteUser,
    getUsers,
    updateUser,
    getUserId,
    login,

  };