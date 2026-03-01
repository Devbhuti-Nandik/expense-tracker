import { StyleSheet, View } from "react-native";
import { LightColors } from "../theme/color";
import { TransactionTypePicker } from "../components/AddTransaction/TransactionTypePicker";
import { AddTransactionForm } from "../components/AddTransaction/AddTransactionForm";
import { useState } from "react";
import { Transaction } from "../types/transaction";
import { TRANSACTION_TYPE } from "../constants/constants";

const AddTransaction = () => {
  const [transactionType, setTransactionType] = useState<Transaction["type"]>(
    TRANSACTION_TYPE.EXPENSE
  );

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
