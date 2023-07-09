import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { SliderBox } from "react-native-image-slider-box";

const Carousel = () => {
  const images = [
    "https://media.istockphoto.com/id/1465073112/photo/blue-capsules-on-conveyor-at-modern-pharmaceutical-factory-tablet-and-capsule-manufacturing.jpg?s=612x612&w=0&k=20&c=J47lIrTymL2fKn5IJBFVr70eDuK4KTxbI3NRh8O3M_4=",
    "https://media.istockphoto.com/id/1277009188/photo/close-up-of-hand-holding-blister-packs.jpg?s=612x612&w=0&k=20&c=5hvmGRlDRQnzpX3sKMASly2jaCA9f3b3xLlH1UPZIOw=",
  ];
  return (
    <View>
      <SliderBox
        images={images}
        autoPlay
        circleLoop
        dotColor={"#13274F"}
        inactiveDotColor="#90A4AE"
        ImageComponentStyle={{
          borderRadius: 6,
          width: "94%",
        }}
      />
    </View>
  );
};

export default Carousel;

const styles = StyleSheet.create({});
