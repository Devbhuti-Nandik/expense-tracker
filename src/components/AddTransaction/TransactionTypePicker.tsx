import { View, Text, Pressable } from "react-native";
import { StyleSheet } from "react-native";
import { LightColors } from "../../theme/color";
import { Dispatch, SetStateAction } from "react";
import {
  TRANSACTION_FILTERS,
  TRANSACTION_TYPE,
} from "../../constants/constants";

type TransactionPickerType = (typeof TRANSACTION_TYPE)[keyof typeof TRANSACTION_TYPE];
type TransactionFilterType = "all" | TransactionPickerType;

type TransactionTypeFilterProps = {
  pickerType: "transaction_filter";
  transactionType: TransactionFilterType;
  setTransactionType: Dispatch<SetStateAction<TransactionFilterType>>;
};

type TransactionTypePickerProps = {
  pickerType: "transaction_picker";
  transactionType: TransactionPickerType;
  setTransactionType: Dispatch<SetStateAction<TransactionPickerType>>;
};

type TransactionTypeProps = TransactionTypeFilterProps | TransactionTypePickerProps;

export const TransactionTypePicker = ({
  transactionType,
  setTransactionType,
  pickerType,
}: TransactionTypeProps) => {
  return (
    <View style={styles.transactionTypePicker}>
      {pickerType === "transaction_filter" && (
        <Pressable
          style={[
            styles.transactionTypeDefaultBtn,
            transactionType === TRANSACTION_FILTERS.ALL &&
              styles.transactionTypeActiveBtn,
          ]}
          onPress={() => setTransactionType(TRANSACTION_FILTERS.ALL)}
        >
          <Text style={styles.transactionTypeDefaultText}>All</Text>
        </Pressable>
      )}
      <Pressable
        style={[
          styles.transactionTypeDefaultBtn,
          transactionType === TRANSACTION_TYPE.EXPENSE &&
            styles.transactionTypeActiveBtn,
        ]}
        onPress={() => setTransactionType(TRANSACTION_TYPE.EXPENSE)}
      >
        <Text style={styles.transactionTypeDefaultText}>Expense</Text>
      </Pressable>
      <Pressable
        style={[
          styles.transactionTypeDefaultBtn,
          transactionType === TRANSACTION_TYPE.INCOME &&
            styles.transactionTypeActiveBtn,
        ]}
        onPress={() => setTransactionType(TRANSACTION_TYPE.INCOME)}
      >
        <Text style={styles.transactionTypeDefaultText}>Income</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  transactionTypePicker: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-evenly",
    marginHorizontal: 28,
    marginVertical: 4,
    maxHeight: 70,
    alignItems: "center",
  },
  transactionTypeDefaultBtn: {
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 10,
  },
  transactionTypeDefaultText: {
    fontWeight: "500",
  },
  transactionTypeActiveBtn: {
    backgroundColor: LightColors.secondary,
  },
});
