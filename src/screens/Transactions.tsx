import { useNavigation } from "@react-navigation/native";
import { StyleSheet, View } from "react-native";
import { useTransactionStore } from "../store/useTransactionStore";
import { LightColors } from "../theme/color";
import { SummaryCard } from "../components/Transactions/SummaryCard";
import { TransactionsHistory } from "../components/Transactions/TransactionsHistory";
import { useEffect, useState } from "react";
import { Transaction } from "../types/transaction";
import { TRANSACTION_TYPE } from "../constants/constants";
import { TransactionTypePicker } from "../components/AddTransaction/TransactionTypePicker";

const Transactions = () => {
  const navigation = useNavigation();
  const transactions = useTransactionStore((state) => state.transactions);
  const [transactionType, setTransactionType] = useState<Transaction["type"]>(
    TRANSACTION_TYPE.ALL
  );
  const [filteredTransactions, setFilteredTransactions] =
    useState(transactions);

  useEffect(() => {
    let filteredData;
    if (transactionType === TRANSACTION_TYPE.ALL) {
      setFilteredTransactions(transactions);
      return;
    }
    filteredData = transactions.filter((item) => item.type === transactionType);
    setFilteredTransactions(filteredData);
  }, [transactionType]);
  return (
    <View style={styles.transactionsContainer}>
      <TransactionTypePicker
        transactionType={transactionType}
        setTransactionType={setTransactionType}
      />
      {/* TODO: Change the UI of Summary Card completely */}
      <SummaryCard />
      <TransactionsHistory transactions={filteredTransactions} />
    </View>
  );
};

export default Transactions;

const styles = StyleSheet.create({
  transactionsContainer: {
    flex: 1,
    backgroundColor: LightColors.background,
  },
});
