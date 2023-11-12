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
      onPress={() => navigation.navigate("post-details", { ...post })}
    >
      <PostLeftSide {...post} />
      <View style={{ flexShrink: 1, gap: 6 }}>
        <PostHeading
          name={post.author.name}
          verified={post.author.verified}
          createdAt={post.createdAt}
        />
        <Text>{post.content}</Text>
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
      {/* <Text>{post.title}</Text> */}
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
        {[1, 2, 3].map((index) => (
          <Image
            key={index}
            source={post.replies[index - 1]?.author.photo}
            style={{ width: index * 7, height: index * 7, borderRadius: 15 }}
            placeholder={blurhash}
            contentFit="cover"
            transition={500}
          />
        ))}
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
      <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
        <Text style={{ color: "gray" }}>{timeAgo(createdAt)}</Text>
        <Feather name="more-horizontal" size={14} color="gray" />
      </View>
    </View>
  );
}

export function PostFooter({ replies, likes }) {
  return (
    <Text style={{ color: "gray" }}>
       {likes} likes · {replies} replies 
    </Text>
  );
}

export function BottomIcons() {
  const iconSize = 20;
  const iconColor = "black"; // Adjust icon color as needed

  return (
    <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
      <FontAwesome name="heart-o" size={iconSize} color={iconColor} />
      <Ionicons name="chatbubble-outline" size={iconSize} color={iconColor} />
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
