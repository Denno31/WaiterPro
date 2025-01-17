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
  return (
    <>
      <BottomSheet
        index={-1}
        ref={sheetRef}
        onClose={() => handleSetIsOpen(false)}
        snapPoints={snapPoint}
        enablePanDownToClose={true}
      >
        <BottomSheetView>{children}</BottomSheetView>
      </BottomSheet>
    </>
  );
};

export default BottomSheetCustom;
