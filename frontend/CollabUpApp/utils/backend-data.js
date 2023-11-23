

// fetch data from an endpoint with body
async function fetchData(url, body, method) {

  if (method=="GET"){

    const response = await fetch(url, {
        method: method, 
        headers: {
          'Content-Type': 'application/json',
        },
      });
    
      if (!response.ok) {
        throw new Error(`Failed to fetch data: ${response.status}` + "for " + url + " body " + body);
      }
    
      return response.json();
  }

  else if (method=="POST"){
    const response = await fetch(url, {
        method: method, 
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      });
    
      if (!response.ok) {
        throw new Error(`Failed to fetch data: ${response.status}` + "for " + url + " body " + body);
      }
    
      return response.json();
  }

  return null 
  
}

// fetch project details 
async function fetchProjectDetails() {

  const url = `https://collabup.loca.lt/getProjectList`;
  return fetchData(url, null, 'GET');
}

// fetch project likes count 
async function fetchProjectLikesCount(projectID) {
  console.log("inside fetchProjectLikesCount" + projectID)
  const url = `https://collabup.loca.lt/getProjLikeCount/${projectID}`;

  return fetchData(url, null,  'GET');
}

// fetch user details by username
async function fetchUserByUsername(userID) {
    console.log("inside fetchUserByUsername " + userID);
  
    const url = `https://collabup.loca.lt/getUserByID/${userID}`;
    const response = await fetchData(url, null, 'GET');
    return response;
  }
  

  async function fetchUserDetails(userID) {
    console.log("inside fetchUserDetails " + userID);
  
    // get username from userID
    const userResponse = await fetchUserByUsername(userID);
    const userName = userResponse.username;
  
    const url = `https://collabup.loca.lt/getUserDets/${userName}`;

    return fetchData(url, null, 'GET');
  }
  

// fetch user profile picture 
export async function fetchUserProfilePic(username) {
    console.log("inside fetchUserProfilePic" + username)
    const url = `https://collabup.loca.lt/getUserPic/${username}`;
  
    try {
      const response = await fetchData(url, null, 'GET');
      
      if (response && response.profPic) {
        return response.profPic;
      } else {
        return null; // Return null if response or response.profPic is falsy
      }
    } catch (error) {
      // Check if the error is due to a 404 response
      if (error.message.includes('Failed to fetch data: 404')) {
        console.log("error.response isss: " ,error.response)
        return null; // Return null for 404 errors
      } else {
        throw error; // Re-throw other errors
      }
    }
  }
  

// fetch project picture 
async function fetchProjectPic(projectID) {
    console.log("inside fetchProjectPic" + projectID)
    const url = `https://collabup.loca.lt/getProjectPic/${projectID}`;

    try {
    const response = await fetchData(url, null, 'GET');

    if (response && response.projPic) {
        return response.projPic;
    } else {
        return null; // Return null if response or response.projPic is falsy
    }
    } catch (error) {
    // Check if the error is due to a 404 response
    // check if other way to get status from the response
    if (error.message.includes('Failed to fetch data: 404')) {
        console.log("error.response isss: " ,error.response)
        return null; // Return null for 404 errors
    } else {
        throw error; // Re-throw other errors
    }
    }
}

// generate a user using the fetched data
async function getUserFromAPI(userID) {
  console.log("inside getUserFromAPI")
  const userDetails = await fetchUserDetails(userID);
  return {
    id: userDetails.id,
    photo: await fetchUserProfilePic(userDetails.username), // change 
    name: userDetails.username,
    skills: userDetails.skill,
  };
}

// generate a post using the fetched data
async function getPostFromAPI(project) {
    console.log("inside getPostFromAPI");
  
    const author = await getUserFromAPI(project.ownerID);
    const likesCount = await fetchProjectLikesCount(project.id);
  
    return {
      id: project.id,
      title: project.title,
      author,
      content: project.idea,
      image: await fetchProjectPic(project.id),
      likesCount: likesCount.likeCount,
      createdAt: project.timeCreated,
    };
}

// generate posts using the fetched data
export async function generatePostsFromAPI() {
    const projects = await fetchProjectDetails();
    const posts = [];
    console.log("inside generatePostsFromAPI");
  
    for (const project of projects) {
      const post = await getPostFromAPI(project);
      posts.push(post);
    }
    
    // latest order:
    posts.reverse();
    
    return posts;
  }



