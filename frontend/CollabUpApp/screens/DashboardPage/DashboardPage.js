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


// import { PostItem  } from "../../components/PostItem";
import { usePostContext } from "../../context/post-context";
import PostItem from "../../components/PostItem";

export default function Dashboard() {
  const [isRefreshing, setIsRefreshing] = useState(false);
  const { posts } = usePostContext();
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
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
      setNewPost({ ...newPost, image: result.assets[0].uri });
    }
  };

  const handleCreatePost = () => {
    // Add logic to create a new post

    // TO DOO
    // addPost(newPost);

    // Reset the newPost state after creating a post
    setNewPost({ title: '', skills: '', idea: '', image: '' });
    setImage(null)
  };

  const isFormComplete = () => {
    // Check if all fields in the newPost state are filled
    return Object.values(newPost).every((value) => value.trim() !== '');
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
          {image && <Image source={{ uri: image }} style={{ width: 200, height: 200, marginTop: 5 }} />}

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
                 // <Text>{post.title}</Text>
 
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
