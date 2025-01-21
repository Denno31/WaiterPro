import { View, Text, TouchableOpacity } from "react-native";
import React, { useRef, useState } from "react";
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";

const snapPoint = ["80%", "80%"];

interface Props {
  isOpen: boolean;
  handleSetIsOpen: (isOpened: boolean) => void;
  sheetRef: React.RefObject<BottomSheet>;
  children: React.ReactNode;
}

const BottomSheetCustom = ({
  isOpen,
  handleSetIsOpen,
  sheetRef,
  children,
}: Props) => {
  console.log("isOpen", isOpen);
  return (
    <>
      <BottomSheet
        index={-1}
        ref={sheetRef}
        onClose={() => {
          console.log("closed");
          handleSetIsOpen(false);
        }}
        snapPoints={snapPoint}
        enablePanDownToClose={true}
      >
        <BottomSheetView>{children}</BottomSheetView>
      </BottomSheet>
    </>
  );
};

export default BottomSheetCustom;
