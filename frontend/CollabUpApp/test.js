
// Test Endpoints file

// get all projects
// const apiUrl = 'https://collabup.loca.lt/getProjectList ';
// const apiUrl = 'https://collabup.loca.lt/getUserByID/1';
const apiUrl = 'https://collabup.loca.lt/likeProject';




// configure the fetch options, GET requests
// const requestOptions = {
//   method: 'GET',
//   headers: {
//     'Content-Type': 'application/json',
//   },
// };

username= "admin"
projectID = 1

const requestOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json', 
    },
    body: JSON.stringify({
        username: username,
        projectID: projectID,
      }),
  };

fetch(apiUrl, requestOptions)
  .then(response => {
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return response.json();
  })
  .then(data => {
    console.log('Response:', data);
  })
  .catch(error => {
    console.error('Error:', error.message);
  });


// console.log(new Date().toISOString())