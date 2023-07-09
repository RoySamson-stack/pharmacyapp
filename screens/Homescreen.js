import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Alert,
  Pressable,
  Image,
  TextInput,
  ScrollView,
} from "react-native";
import React, { useEffect, useState } from "react";
import * as Location from "expo-location";
import { MaterialIcons } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import Carousel from "../components/Carousel";
import Services from "../components/Services";
import DressItem from "../components/DressItem";
import { useSelector, useDispatch } from "react-redux";
import { getProducts } from "../ProductReducer";
import { useNavigation } from "@react-navigation/native";
import { collection, getDoc, getDocs } from "firebase/firestore";
import { db } from "../firebase";

const Homescreen = () => {
  
  const cart = useSelector((state) => state.cart.cart);
  const [items,setItems] = useState([]);
  const total = cart
    .map((item) => item.quantity * item.price)
    .reduce((curr, prev) => curr + prev, 0);
  const navigation = useNavigation();

  console.log(cart);
  const [displayCurrentAddress, setDisplayCurrentAddress] = useState(
    "we are loading your location"
  );
  const [locationServiceEnabled, setlocationServiceEnabled] = useState(false);

  useEffect(() => {
    checkIfLocationEnabled();
    getcurrentlocation();
  }, []);
  const checkIfLocationEnabled = async () => {
    let enabled = await Location.hasServicesEnabledAsync();
    if (!enabled) {
      Alert.alert(
        "Location aservices not enabled",
        "Please enable location services",
        [
          {
            text: "Cancel",
            onPress: () => console.log("Cancel Pressed"),
            style: "cancel",
          },
          { text: "OK", onPress: () => console.log("OK Pressed") },
        ]
      );
    } else {
      setlocationServiceEnabled(enabled);
    }
  };

  const getcurrentlocation = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      Alert.alert(
        "permission denied",
        "Allow app to use the location services",
        [
          {
            text: "Cancel",
            onPress: () => console.log("Cancel Pressed"),
            style: "cancel",
          },
          { text: "OK", onPress: () => console.log("OK Pressed") },
        ]
      );
    }
    const { coords } = await Location.getCurrentPositionAsync();
    // console.log(coords);
    if (coords) {
      const { latitude, longitude } = coords;
      let response = await Location.reverseGeocodeAsync({
        latitude,
        longitude,
      });
      //   console.log(response);
      for (let item of response) {
        let address = `${item.name} ${item.city} ${item.postalCode}`;
        setDisplayCurrentAddress(address);
      }
    }
  };

  const product = useSelector((state) => state.product.product);
  console.log("product array", product);

  const dispatch = useDispatch();

  //handling products
  useEffect(() => {
    if (product.length > 0) return;
    const fetchProducts = async () => {

      const colRef=collection(db, "types");
      const docsSnap= await getDocs(colRef);
      docsSnap.forEach((doc )=>{
      items.push(doc.data());//we using items .push instead of products.push because of read/write error
      });
      //to use products in our application, using product array 
      items?.map((service)=>dispatch(getProducts(service)))
      // services.map((service) => dispatch(getProducts(service)));
    };
    fetchProducts();
  }, []);
  console.log(product);
  const services = [
    {
      id: "0",
      image: "https://cdn-icons-png.flaticon.com/128/6567/6567164.png",
      name: "Panadol-Extra",
      quantity: 0,
      price: 15,
    },
    {
      id: "11",
      image: "https://cdn-icons-png.flaticon.com/128/1686/1686545.png",
      name: "Ibuprofen",
      quantity: 0,
      price: 10,
    },
    {
      id: "12",
      image: "https://cdn-icons-png.flaticon.com/128/8136/8136755.png",
      name: "Vitamin C",
      quantity: 0,
      price: 100,
    },
    {
      id: "13",
      image: "https://cdn-icons-png.flaticon.com/128/3226/3226218.png",
      name: "Sunscreen",
      quantity: 0,
      price: 2500,
    },
    {
      id: "14",
      image: "https://cdn-icons-png.flaticon.com/128/9581/9581238.png",
      name: "Pregnacare",
      quantity: 0,
      price: 2610,
    },
    {
      id: "15",
      image: "https://cdn-icons-png.flaticon.com/128/7391/7391748.png",
      name: "Scotts-Emulsion",
      quantity: 0,
      price: 500,
    },
    {
      id: "16",
      image: "https://cdn-icons-png.flaticon.com/128/9399/9399180.png",
      name: "ABZ",
      quantity: 0,
      price: 250,
    },
  ];

  return (
    <>
      <ScrollView style={{ backgroundColor: "F0F0F0", flex: 1, marginTop: 50 }}>
        {/* location and profile code */}
        <View
          style={{ flexDirection: "row", alignItems: "center", padding: 10 }}
        >
          <MaterialIcons name="location-on" size={30} color="#fd5c63" />
          <View>
            <Text style={{ fontSize: 18, fontWeight: "600" }}>Home</Text>

            <Text>{displayCurrentAddress}</Text>
          </View>
          <Pressable  onPress={() => navigation.navigate("Profile")} style={{ marginLeft: "auto", marginRight: 7 }}>
            <Image
              style={{ width: 40, height: 40, borderRadius: 20 }}
              source={{
                uri: "https://lh3.googleusercontent.com/ogw/AGvuzYYN8bfbQ4s-0reYyU3KuN1MNuftVR1-EcnQTe0NbA=s64-c-mo",
              }}
            />
            {/* <Image source={{uri:"https://lh3.googleusercontent.com/ogw/AGvuzYYN8bfbQ4s-0reYyU3KuN1MNuftVR1-EcnQTe0NbA=s64-c-mo"}}></Image> */}
          </Pressable>
        </View>
        {/* search bar view */}
        <View
          style={{
            padding: 10,
            margin: 10,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            borderRadius: 7,
            borderWidth: 0.8,
            borderColor: "#C0C0C0",
          }}
        >
          <TextInput placeholder="Search for drugs or more"></TextInput>
          <Feather name="search" size={24} color="#fd5c63" />
        </View>

        {/* corousel */}
        <Carousel />

        {/* services */}
        <Services />
        {/* render all products */}
        {product.map((item, index) => (
          <DressItem item={item} key={index} />
        ))}
      </ScrollView>
      {total === 0 ? null : (
        <Pressable
          style={{
            backgroundColor: "#088F8F",
            padding: 10,
            marginBottom: 30,
            margin: 15,
            borderRadius: 7,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <View>
            <Text style={{ fontSize: 17, fontWeight: "600", color: "white" }}>
              {cart.length} items | ksh.{total}
            </Text>
            <Text
              style={{
                fontSize: 15,
                fontWeight: "400",
                color: "white",
                marginVertical: 6,
              }}
            >
              Extra charges might apply
            </Text>
          </View>
          <Pressable onPress={() => navigation.navigate("PickUp")}>
            <Text style={{ fontSize: 17, fontWeight: "600", color: "white" }}>
              Proceed to pickup
            </Text>
          </Pressable>
        </Pressable>
      )}
    </>
  );
};

export default Homescreen;

const styles = StyleSheet.create({});
