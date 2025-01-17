import { View, Text } from "react-native";
import React, { useRef, useState } from "react";
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";

const snapPoint = ["80%", "80%"];

interface Props {
  isOpen: boolean;
  handleSetIsOpen: (isOpened: boolean) => void;
  sheetRef: React.RefObject<BottomSheet>;
}

const BottomSheetCustom = ({ isOpen, handleSetIsOpen, sheetRef }: Props) => {
  return (
    <>
      <BottomSheet
        index={-1}
        ref={sheetRef}
        onClose={() => handleSetIsOpen(false)}
        snapPoints={snapPoint}
        enablePanDownToClose={true}
      >
        <BottomSheetView>
          <Text>Bottom Sheet</Text>
        </BottomSheetView>
      </BottomSheet>
    </>
  );
};

export default BottomSheetCustom;
