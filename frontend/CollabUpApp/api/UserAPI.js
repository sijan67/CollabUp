import axios from 'axios'
const API_URL = 'https://collabup.loca.lt'

export async function createUser(email, username, password, firstName, lastName) {
    return axios.post(`${API_URL}/createUser`, {
        'email': email,
        'username': username,
        'password': password,
        'firstName': firstName,
        'lastName': lastName,
    })
}

export async function addUserDetails(username, birthdate, occupation, skill, experience, location, workLink, publicEmail, description, achievements) {
    return axios.post(`${API_URL}/addUserDets`, {
        'username': username,
        'birthdate': birthdate,
        'occupation': occupation,
        'skill': skill,
        'experience': experience,
        'location': location,
        'worklink': workLink,
        'pubemail': publicEmail,
        'description': description,
        'achievements': achievements,
    })
}

export async function addUserPicture(username, profilePicture) {
    return axios.post(`${API_URL}/addUserPic`, {
        'username': username,
        'profPic': profilePicture,
    })
}

export async function loginUser(loginName, password) {
    return axios.get(`${API_URL}/login/${loginName}/pswd/${password}`)
}