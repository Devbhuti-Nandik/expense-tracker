import { StyleSheet, View, Text } from "react-native";
import { LightColors } from "../theme/color";
import { TransactionTypePicker } from "../components/TransactionTypePicker";
import { AddTransactionForm } from "../components/AddTransactionForm";
import { useState } from "react";
import { Transaction } from "../types/transaction";

const AddTransaction = () => {
  const [transactionType, setTransactionType] =
    useState<Transaction["type"]>("expense");

  return (
    <View style={styles.addTransactionContainer}>
      {/* Transaction type picker */}
      <TransactionTypePicker
        transactionType={transactionType}
        setTransactionType={setTransactionType}
      />
      <AddTransactionForm
        transactionType={transactionType}
        setTransactionType={setTransactionType}
      />
    </View>
  );
};

export default AddTransaction;

const styles = StyleSheet.create({
  addTransactionContainer: {
    flex: 1,
    backgroundColor: LightColors.background,
  },
});
