import { View, StyleSheet, Text } from "react-native";

export const NoTransactions = () => {
  return (
    <View style={styles.noTransactionsContainer}>
      <Text style={styles.noTransactionsText}>
        No transactions currently exists. Please add one!
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  noTransactionsContainer: {
    flex: 1,
    alignItems: "center",
    marginTop: 50,
  },
  noTransactionsText: {
    fontSize: 16,
    textAlign: "center",
  },
});
