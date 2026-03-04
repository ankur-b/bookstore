import axios from "axios";
import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import { Button, StyleSheet, Text, View, FlatList ,Image, Alert} from "react-native";

export default function App() {
  const [bookList, setBookList] = useState([]);

  const endpointURL = "https://69a82b1c37caab4b8c60f5b8.mockapi.io/books";

  const getListOfBooks = async () => {
    try{
        const response = await axios.get(endpointURL);
    setBookList(response.data);
    }catch(error){
      console.log(error)
    }
  };

  const getBookByID = async() =>{
    try{
      const response = await axios.get(`${endpointURL}/40`);
    console.log(response.data)
    }catch(error){
      console.log("An Error Occurred.",error)
    }
  }

  const deleteBookById = async () =>{
    try{
      const response = await axios.delete(`${endpointURL}/24`)
      Alert.alert("Book is Deleted Successfully.")
    }catch(error){
      console.log("An Error Occurred.",error)
    }
  }

  return (
    <View style={styles.container}>
      <Text>Hello World.</Text>
      <StatusBar style="auto" />
      <Button onPress={getListOfBooks} title="Get list of books" />
      <Button onPress={getBookByID} title="Get Book By ID"/>
      <Button onPress={deleteBookById} title="Delete Book"/>
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
