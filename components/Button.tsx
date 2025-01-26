import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import classNames from "classnames";

interface Props {
  text: string;
  handlePress: () => void;
  buttonClasses?: string;
  textClasses?: string;
  loading?: boolean;
}

const Button = ({
  handlePress,
  text,
  buttonClasses,
  textClasses,
  loading,
}: Props) => {
  return (
    <TouchableOpacity
      disabled={loading}
      onPress={handlePress}
      className={classNames(
        `p-4 rounded-lg bg-secondary-flow  ${buttonClasses}`,
        {
          "opacity-50": loading,
        }
      )}
    >
      <Text className={`text-lg font-semibold text-center  ${textClasses}`}>
        {text}
      </Text>
    </TouchableOpacity>
  );
};

export default Button;
