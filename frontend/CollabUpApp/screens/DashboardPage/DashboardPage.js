import React, { useEffect, useState, useContext } from "react";
import {
  Platform,
  RefreshControl,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  ActivityIndicator,
  Text,
  TextInput,
  Button,
  View,
  Image,
  TouchableHighlight
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { FontAwesome } from '@expo/vector-icons';
import * as FileSystem from 'expo-file-system';

// import { PostItem  } from "../../components/PostItem";
import { usePostContext } from "../../context/post-context";
import PostItem from "../../components/PostItem";
import { generatePostsFromAPI } from "../../utils/backend-data";

export default function Dashboard() {
  const [isRefreshing, setIsRefreshing] = useState(false);
  const { posts, updatePosts, uploadPosts } = usePostContext();
  const [newPost, setNewPost] = useState({ title: '', skills: '', idea: '', image: '' });
  const [image, setImage] = useState(null);


  useEffect(() => {
    //  additional logic we need can be placed here
  }, []);


  const handleRefresh = async () => {
    // Set the refreshing state to true to show the loading indicator
    setIsRefreshing(true);
  
    try {
      // Fetch new posts from the API
      const newPosts = await generatePostsFromAPI();
      updatePosts(newPosts);
    } catch (error) {
      //  error if the API call fails
      console.error('Error fetching new posts:', error);
    } finally {
      // after completing the refresh operation, set refreshing to false
      setIsRefreshing(false);
    }
  };

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.5,
    });

    // console.log("result uri is: ", result.uri)

    if (!result.canceled) {
      const base64 = await FileSystem.readAsStringAsync(result.uri, { encoding: 'base64' });
      
 
      setImage(`data:image/png;base64,${base64}`);
      // setNewPost({ ...newPost, image: result.assets[0].uri });
      setNewPost({ ...newPost, image: `data:image/png;base64,${base64}` });
    }
  };


  const sendPostRequest = async (postData) => {
    try {
      const response = await fetch('https://collabup.loca.lt/addNewProject', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: 'siju', // make this dynamic
          projTitle: postData.title,
          projIdea: postData.content,
          timeCreated: new Date().toISOString(),
        }),
      });
  
      if (!response.ok) {
        // handle  error based on the response status
        console.error('Error:', response.status, response.statusText);
        return false; // request not successful
      }
  
      // Assuming the response contains the project ID
      const responseData = await response.json();
      const projectId = responseData.projectID;
  
      // Call the function to post the picture
      const success = await sendPicture(projectId, postData.image);
  
      return success;
    } catch (error) {
      // handle network-related errors
      console.error('Network error:', error.message);
      return false; // request not successful
    }
  };
  
  const sendPicture = async (projectId, image) => {
    try {
      const response = await fetch('https://collabup.loca.lt/addProjectPic', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          projectID: projectId,
          projPic: image,
        }),
      });
  
      if (!response.ok) {
        // handle error based on the response status
        console.error('Error:', response.status, response.statusText);
        return false; // request not successful
      }

      console.log("POST image successful")
  
      return true; // Request was successful
    } catch (error) {
      // handle network-related errors
      console.error('Network error:', error.message);
      return false; // request not successful
    }
  };
  

  


  const handleCreatePost = async() => {
    // Add logic to create a new post

    // TO DO : Add logic here to make post 
    // addPost(newPost);

    const { title, skills, idea, image, author } = newPost;

    const newPostObject = { 
      "author":{
          // "id":"3d25f77b-0dfa-4459-abe2-7c50bd46bfe9",
          "name":"siju", // Make this dynamic
          "photo":"https://avatars.githubusercontent.com/u/60666922", // make this dynamic
          "skills": skills
      },
      "content": idea,
      "createdAt":new Date().toISOString(), // use the current date and time
      "id": posts.length + 1, // id should be received back from api ? or check if this is fine
      "image":image,  
      "likesCount":0,
      "title":title
    };

    // Call the asynchronous function to make the POST request
    const success = await sendPostRequest(newPostObject);

    // Update the posts array only if the request was successful
    if (success) {
      uploadPosts(newPostObject);

    } else {
      // on error making posts currently having error 
      console.error('Failed to create post.');
    }

    // reset the newPost state after creating a post
    setNewPost({ title: '', skills: '', idea: '', image: '' });
    setImage(null)
  };

  const isFormComplete = () => {
    // Check if all fields in the newPost state, excluding image, are filled
    return Object.entries(newPost).every(([key, value]) => key === 'image' || value.trim() !== '');
  };
  

  return (
    <SafeAreaView>
      <ScrollView
        contentContainerStyle={{
          paddingTop: Platform.select({ android: 30 }),
          paddingHorizontal: 10,
        }}
        refreshControl={
          <RefreshControl
            refreshing={isRefreshing}
            tintColor={"transparent"}
            onRefresh={handleRefresh}
          />
        }
      >
        {isRefreshing && <ActivityIndicator size="large" color="#0000ff" />}
      
        <View style={{backgroundColor: "#D9E2E7", borderRadius: 30, padding: 20, margin: 10}}>
          <View style={{flexDirection: 'row',}}>
          <Text> Title </Text>
          <TextInput
            placeholder="Title"
            value={newPost.title}
            onChangeText={(text) => setNewPost({ ...newPost, title: text })}
            style={{marginLeft: 10}}
          />
          </View>
         
          <View style={{flexDirection: 'row', marginTop: 10}}>
            <Text> Skills </Text>
            <TextInput
              placeholder="Skills"
              value={newPost.skills}
              onChangeText={(text) => setNewPost({ ...newPost, skills: text })}
              style={{marginLeft: 6}}
            />
          </View>

          
        <TextInput
          placeholder="What's your project / start up idea ? "
          value={newPost.idea}
          onChangeText={(text) => setNewPost({ ...newPost, idea: text })}
          style={{marginTop: 15, fontSize: 20 , textAlign: 'center' }}
        />
       

       <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          {image && <Image source={{ uri: image }} style={{ width: 200, height: 200, marginTop: 5, borderRadius: 20 }} />}

          <TouchableHighlight style={{marginTop: 10}} onPress={pickImage} >
              <View>
              <FontAwesome name="image" size={24} color="#0779B8" />
              
              </View>
          </TouchableHighlight>
         
        </View>

        {/* Button to create a new post */}
        <Button title="Create Post" 
        onPress={handleCreatePost} 
        disabled={!isFormComplete()}
         />

        </View>
        
        {posts.map((post) => (
          <PostItem key={post.id} post={post} />
        ))}



      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});
