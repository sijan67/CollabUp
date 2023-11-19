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

export default function Dashboard() {
  const [isRefreshing, setIsRefreshing] = useState(false);
  const { posts, updatePosts, uploadPosts } = usePostContext();
  const [newPost, setNewPost] = useState({ title: '', skills: '', idea: '', image: '' });
  const [image, setImage] = useState(null);


  useEffect(() => {
    //  additional logic we need can be placed here
  }, []);

  const handleRefresh = () => {
    // Set the refreshing state to true to show the loading indicator
    setIsRefreshing(true);

    // Add  refresh logic here
    // we fetch new data or perform any async operation

    // After completing the refresh operation, set refreshing to false
    setIsRefreshing(false);
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
      
      // console log base64 encoding
      // console.log(base64)
                 
      // need to change this to base64
      setImage(result.assets[0].uri);
      setNewPost({ ...newPost, image: result.assets[0].uri });
    }
  };

  const handleCreatePost = () => {
    // Add logic to create a new post

    // TO DO : Add logic here 
    // addPost(newPost);

    const { title, skills, idea, image, author } = newPost;

    const newPostObject = {
      // id: posts.length + 1, // You may need to adjust the way you generate IDs
      // title: "check",
      // skills: "check",
      // idea: "check",
      // image: "check",
      // author: {
      //   id: 1, // Assuming author information is part of the newPost state
      //   name: "check",
      //   photo: "pic",
      //   skills: "skills",
      // },
      
      
      "author":{
          "id":"3d25f77b-0dfa-4459-abe2-7c50bd46bfe9",
          "name":"Florence Parisian",
          "photo":"https://avatars.githubusercontent.com/u/60666922",
          "skills": skills
      },
      "content": idea,
      "createdAt": "2023-11-18T20:16:02.650Z",
      "id": posts.length + 1, // id should be received back from api ? or check if this is fine
      "image":"https://avatars.githubusercontent.com/u/60666922",
      "likesCount":0,
      "title":title

    };

    // Update the posts array by adding the new post
    uploadPosts(newPostObject);

    // Reset the newPost state after creating a post
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
