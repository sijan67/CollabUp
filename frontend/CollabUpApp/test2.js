const apiUrl = 'https://collabup.loca.lt/likeProject';
const username = 'admin';
const projectID = 1;

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
    console.log("response is: ", response)
    return response.ok;
  })
  .then(data => {
    console.log('Response:', data);
  })
  .catch(error => {
    console.error('Error:', error);
  });
