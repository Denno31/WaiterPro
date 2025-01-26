import { View, Text, TouchableOpacity } from "react-native";
import React, { useRef, useState } from "react";
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";

const snapPoint = ["80%", "80%"];

interface Props {
  handleClose: () => void;
  sheetRef: React.RefObject<BottomSheet>;
  children: React.ReactNode;
}

const BottomSheetCustom = ({ sheetRef, children, handleClose }: Props) => {
  return (
    <>
      <BottomSheet
        index={-1}
        ref={sheetRef}
        onClose={handleClose}
        snapPoints={snapPoint}
        enablePanDownToClose={true}
      >
        <BottomSheetView>{children}</BottomSheetView>
      </BottomSheet>
    </>
  );
};

export default BottomSheetCustom;
