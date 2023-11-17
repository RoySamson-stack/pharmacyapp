import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  KeyboardAvoidingView,
  TextInput,
  Pressable,
  ActivityIndicator
} from "react-native";
import React, { useEffect, useState } from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";


const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigation = useNavigation();
  const [loading,setLoading] = useState(false);


useEffect(()=>{
    setLoading(true);
    const unsubscibe=auth.onAuthStateChanged((authUser)=>{
        if(!authUser){
            setLoading(false);
          }
        if(authUser){
            navigation.navigate("Home");
        }
    });
    return unsubscibe;


}, [])
  

const login = () => {
  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      console.log("user details", user);
    })
    .catch((error) => {
      if (error.code === "auth/user-not-found" || error.code === "auth/wrong-password") {
        // User not found or wrong password during login
        Alert.alert("Login Failed", "Invalid email or password. Please try again.");
      } else {
        console.error("Login Error:", error.message);
        Alert.alert("Login Failed", "An error occurred during login.");
      }
    });
};


  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: "white",
        alignItems: "center",
        padding: 10,
      }}
    >
        {loading ? (
            <View style={{alignItems:"center",justifyContent:"center",flexDirection:"row",flex:1}}>
          <Text style={{marginRight:10}}>Loading</Text>
          <ActivityIndicator size="large" color={"red"}/>
        </View>
        ):(
<KeyboardAvoidingView>
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            marginTop: 100,
          }}
        >
          <Text style={{ fontSize: 20, color: "#662d91", fontWeight: "bold" }}>
            Sign In
          </Text>
          <Text style={{ fontSize: 18, marginTop: 8, fontWeight: "600" }}>
            Sign in to your account
          </Text>
        </View>

        {/* //email placeholder */}
        <View style={{ marginTop: 50 }}>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <MaterialCommunityIcons
              name="email-outline"
              size={24}
              color="black"
            />

            <TextInput
              placeholder="Email"
              placeholderTextColor="black"
              value={email}
              onChangeText={(text) => setEmail(text)}
              style={{
                fontSize: email ? 18 : 18,
                borderBottomWidth: 1,
                borderBottomColor: "gray",
                marginLeft: 13,
                width: 300,
                marginVertical: 10,
              }}
            ></TextInput>
          </View>



            {/* password placeholder */}
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Ionicons name="key-outline" size={24} color="black" />

            <TextInput
              placeholder="Password"
              placeholderTextColor="black"
              value={password}
              onChangeText={(text) => setPassword(text)}
            //   secureTextEntry={true} shows dots when you enter text

              style={{
                fontSize: password ? 18 : 18,
                borderBottomWidth: 1,
                borderBottomColor: "gray",
                marginLeft: 13,
                width: 300,
                marginVertical: 20,
              }}
            ></TextInput>
          </View>

          <Pressable onPress={login}
style={{
              width: 200,
              backgroundColor: "#318CE7",
              padding: 15,
              borderRadius: 7,
              marginTop: 50,
              marginLeft: "auto",
              marginRight: "auto",
            }}>
            <Text style={{ fontSize: 18, textAlign: "center", color: "white" }}>Login</Text>

          </Pressable>
          <Pressable onPress={() => navigation.navigate("Register")}
          style={{ marginTop: 20 }}>
                <Text style={{
                textAlign: "center",
                fontSize: 17,
                color: "gray",
                fontWeight: "500",
              }}>Dont have account? Sign Up</Text>
            </Pressable>
        </View>
      </KeyboardAvoidingView>
        )}
      
    </SafeAreaView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({});
