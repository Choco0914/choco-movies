import React from "react";
import { Text, TouchableOpacity } from "react-native";
export default ({ navigation }) => (
  <>
    <Text>영화</Text>
    <TouchableOpacity onPress={() => navigation.navigate("Detail")}>
      <Text>더 많은 정보</Text>
    </TouchableOpacity>
  </>
);
