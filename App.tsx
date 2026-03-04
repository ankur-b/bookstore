import axios from "axios";
import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import { Button, StyleSheet, Text, View, FlatList ,Image} from "react-native";

export default function App() {
  const [bookList, setBookList] = useState([]);

  const endpointURL = "https://69a82b1c37caab4b8c60f5b8.mockapi.io/books";

  const getListOfBooks = async () => {
    const response = await axios.get(endpointURL);

    setBookList(response.data);
  };

  console.log(bookList);

  return (
    <View style={styles.container}>
      <Text>Hello World.</Text>
      <StatusBar style="auto" />
      <Button onPress={getListOfBooks} title="Get list of books" />
      <FlatList
        data={bookList}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View>
            <Text>{item.name_of_author}</Text>
            <Text>{item.price}</Text>
            <Image 
              style={{height:150,width:150}}
            source={{uri:item.cover}} />
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
