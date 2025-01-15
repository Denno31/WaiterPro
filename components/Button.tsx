import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import classNames from "classnames";

interface Props {
  text: string;
  handlePress: () => void;
  buttonClasses?: string;
  textClasses?: string;
}

const Button = ({ handlePress, text, buttonClasses, textClasses }: Props) => {
  return (
    <TouchableOpacity
      onPress={handlePress}
      className={classNames(`p-4 rounded-lg  ${buttonClasses}`)}
    >
      <Text className={`text-lg font-semibold text-center  ${textClasses}`}>
        {text}
      </Text>
    </TouchableOpacity>
  );
};

export default Button;
