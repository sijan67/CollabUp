import React, { useEffect, useState, useContext } from "react";
import {
  Platform,
  RefreshControl,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  ActivityIndicator,
  Text
} from 'react-native';



// import { PostItem  } from "../../components/PostItem";
import { usePostContext } from "../../context/post-context";
import PostItem from "../../components/PostItem";

export default function Dashboard() {
  const [isRefreshing, setIsRefreshing] = useState(false);
  const { posts } = usePostContext();


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
