import { useNavigation } from "@react-navigation/native";
import { useEffect } from "react";
import { StyleSheet, View, Text, Button } from "react-native";
import { useTransactionStore } from "../store/useTransactionStore";
import { LightColors } from "../theme/color";
import { SummaryCard } from "../components/Transactions/SummaryCard";

const Transactions = () => {
  const navigation = useNavigation();
  const transactions = useTransactionStore((state) => state.transactions);
  useEffect(() => {
    console.log("transactions: ", transactions);
  }, [transactions]);
  return (
    <View style={styles.transactionsContainer}>
      <SummaryCard />
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
