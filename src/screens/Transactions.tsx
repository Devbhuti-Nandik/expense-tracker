import { useNavigation } from "@react-navigation/native";
import { useEffect } from "react";
import { StyleSheet, View, Text, Button } from "react-native";
import { useTransactionStore } from "../store/useTransactionStore";

const Transactions = () => {
  const navigation = useNavigation();
  const transactions = useTransactionStore((state) => state.transactions);
  useEffect(() => {
    console.log("transactions: ", transactions);
  }, [transactions]);
  return (
    <View style={styles.transactionsContainer}>
      <Text>Transactions screen</Text>
      <Button
        onPress={() => navigation.navigate("Edit" as never)}
        title="Edit transaction"
      />
    </View>
  );
};

export default Transactions;

const styles = StyleSheet.create({
  transactionsContainer: {
    flex: 1,
    justifyContent: "center",
  },
});
