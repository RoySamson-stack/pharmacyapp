import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Pressable,
  Image,
} from "react-native";
import React from "react";

const Services = () => {
  const services = [
    {
      id: "0",
      image: "https://cdn-icons-png.flaticon.com/128/65/65587.png",
      name: "Painkillers",
    },
    {
      id: "11",
      image: "https://cdn-icons-png.flaticon.com/128/7901/7901985.png",
      name: "Maternal Care",
    },
    {
      id: "12",
      image: "https://cdn-icons-png.flaticon.com/128/3257/3257860.png",
      name: "Mental Health",
    },
    {
      id: "13",
      image: "https://cdn-icons-png.flaticon.com/128/6425/6425024.png",
      name: "Personal Care",
    },
  ];
  return (
    <View style={{padding:10}}>
      <Text style={{fontSize:16, fontWeight:"500", marginBottom:7}}>Options Available</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {services.map((service, index) => (
          <Pressable style={{ margin:10, backgroundColor:"white",padding:20, borderRadius:7}}key={index}>
            <Image
              source={{uri:service.image}}
              style={{ width:70, height:70 }}
            ></Image>
            <Text style={{textAlign:"center", marginTop:10}}>{service.name}</Text>
          </Pressable>
        ))}
      </ScrollView>
    </View>
  );
};

export default Services;

const styles = StyleSheet.create({});
