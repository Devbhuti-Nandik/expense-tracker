import { StyleSheet, View } from "react-native";
import { LightColors } from "../theme/color";
import { TransactionTypePicker } from "../components/AddTransaction/TransactionTypePicker";
import { AddTransactionForm } from "../components/AddTransaction/AddTransactionForm";
import { useState } from "react";
import { TransactionType } from "../types/transaction";
import { TRANSACTION_TYPE } from "../constants/constants";

const AddTransaction = () => {
  const [transactionType, setTransactionType] = useState<TransactionType>(
    TRANSACTION_TYPE.EXPENSE
  );

  return (
    <View style={styles.addTransactionContainer}>
      {/* Transaction type picker */}
      <TransactionTypePicker
        transactionType={transactionType}
        setTransactionType={setTransactionType}
        pickerType="transaction_picker"
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
