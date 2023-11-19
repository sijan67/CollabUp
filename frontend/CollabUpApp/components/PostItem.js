import React from "react";
import { Pressable, StyleSheet, View } from "react-native";
import { Image } from "expo-image";
import { Text } from "./Themed";
import { timeAgo } from "../utils/timeAgo";
import {
  Ionicons,
  Feather,
  AntDesign,
  FontAwesome,
  MaterialIcons,
} from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

export const blurhash =
  "|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[";

export default function PostItem({ post }) {
  const navigation = useNavigation();

  return (
    <Pressable
      style={styles.container}
    >
      <PostLeftSide {...post} />
      <View style={{ flexShrink: 1, gap: 6, flex: 1  }}>
        {/* Info about each post */}
        <PostHeading
          name={post.title}
          createdAt={post.createdAt}
        />

  
        <Text>{String(post.content)}</Text>
        
        
        {/* <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
          <Text style={{ fontSize: 11, fontWeight: 600 }}>{post.author.name}</Text>
          <Text style={{ fontSize: 11, color: "gray" }}>{timeAgo(post.createdAt)} ago</Text>
          <Text style={{ fontSize: 11, color: "gray" }}>.... ago</Text>
        </View>
        <View style={{flexDirection: 'row'}}>
          <Text style={{fontSize: 11,  fontWeight: 600}}>Related Skills</Text>
          <Text style={{fontSize: 11,   marginLeft: 10 }}> {post.author.skills} </Text>
        </View>
        
        <Text>{post.content}</Text>
         */}

        {post.image && (
          <Image
            source={post.image}
            style={{ width: "100%", minHeight: 300, borderRadius: 10 }}
            placeholder={blurhash}
            contentFit="cover"
            transition={500}
          />
        )}

   
        <BottomIcons />
        <PostFooter replies={post.repliesCount} likes={post.likesCount} />
      </View>
      
    </Pressable>
  );
}

function PostLeftSide(post) {
  const borderColor = "#00000020"; // Adjust border color as needed

  return (
    <View style={{ justifyContent: "space-between" }}>
      <Image
        source={post.author.photo}
        style={styles.image}
        placeholder={blurhash}
        contentFit="cover"
        transition={500}
      />
      <View
        style={{
          borderWidth: 1,
          alignSelf: "center",
          borderColor: borderColor,
          flexGrow: 1,
        }}
      />
      <View
        style={{
          width: 20,
          alignItems: "center",
          alignSelf: "center",
          gap: 3,
        }}
      >

      </View>
    </View>
  );
}

export function PostHeading({ name, createdAt, verified }) {
  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        flexGrow: 1,
        width: "100%",
      }}
    >
      <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
        <Text style={{ fontWeight: "500" }}>{name}</Text>
        {/* {verified && (
          <MaterialIcons name="verified" size={14} color="#60a5fa" />
        )} */}
      </View>
      {/* <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
      <Text style={{ color: "gray" }}> by {name}</Text>
        <Text style={{ color: "gray" }}>{timeAgo(createdAt)} ago</Text>
      </View> */}
    </View>
  );
}

export function PostFooter({ replies, likes }) {
  const iconSize = 20;
  const iconColor = "black"; 

  return (

    <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
  
    <FontAwesome name="heart-o" size={iconSize} color={iconColor} />
    <Text style={{ color: "gray" }}>
       {likes} likes 
    </Text>

  </View>

   
  );
}

export function BottomIcons() {
  const iconSize = 20;
  const iconColor = "black"; // Adjust icon color as needed

  return (
    <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
      {/* <FontAwesome name="heart-o" size={iconSize} color={iconColor} /> */}
      {/* <Ionicons name="chatbubble-outline" size={iconSize} color={iconColor} /> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    gap: 6,
    paddingBottom: 30,

   
  },
  image: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
});
