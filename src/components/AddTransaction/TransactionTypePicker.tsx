import { View, Text, Pressable } from "react-native";
import { StyleSheet } from "react-native";
import { LightColors } from "../../theme/color";
import { Dispatch, SetStateAction } from "react";
import { TRANSACTION_TYPE } from "../../constants/constants";

type TransactionTypeProps = {
  transactionType: "expense" | "income";
  setTransactionType: Dispatch<SetStateAction<"expense" | "income">>;
};

export const TransactionTypePicker = ({
  transactionType,
  setTransactionType,
}: TransactionTypeProps) => {
  return (
    <View style={styles.transactionTypePicker}>
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
    marginVertical: 8,
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
