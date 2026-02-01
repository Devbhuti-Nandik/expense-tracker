import { Dispatch, SetStateAction, useState } from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import { FormInput } from "../common/FormInput";
import { LightColors } from "../theme/color";
import { Category } from "../types/category";
import { Transaction } from "../types/transaction";
import { sanitizeTransactionFormData } from "../utils/helpers";
import { useTransactionStore } from "../store/useTransactionStore";
import { useNavigation } from "@react-navigation/native";

type AddTransactionFormProps = {
  transactionType: "expense" | "income";
  setTransactionType: Dispatch<SetStateAction<"expense" | "income">>;
};

export const AddTransactionForm = ({
  transactionType,
  setTransactionType,
}: AddTransactionFormProps) => {
  const [amount, setAmount] = useState(0);
  const [date, setDate] = useState(new Date());
  const [category, setCategory] = useState<Category>({
    id: "",
    name: "",
    isActive: false,
  });
  const [description, setDescription] = useState("");

  const addTransaction = useTransactionStore((state) => state.addTransaction);
  const navigation = useNavigation();

  const resetTransactionForm = () => {
    setAmount(0);
    setDate(new Date());
    setCategory({
      id: "",
      name: "",
      isActive: false,
    });
    setDescription("");
    setTransactionType("expense");
  };
  const onSubmit = () => {
    const transaction: Transaction = {
      amount,
      date: date.toISOString(),
      category,
      description,
      type: transactionType,
    };
    const sanitizedTransaction = sanitizeTransactionFormData(transaction);
    addTransaction(sanitizedTransaction);
    resetTransactionForm();
    navigation.navigate("Transactions" as never);
  };

  return (
    <View style={styles.transactionForm}>
      <FormInput
        label="Amount"
        inputType="amount"
        inputConfig={{ keyboardType: "decimal-pad" }}
        amount={amount}
        setAmount={setAmount}
      />
      <FormInput
        label="Date"
        inputType="date"
        inputConfig={{}}
        date={date}
        setDate={setDate}
      />
      <FormInput
        label="Categories"
        inputType="categories"
        inputConfig={{}}
        category={category}
        setCategory={setCategory}
      />
      <FormInput
        label="Description"
        inputType="description"
        inputConfig={{}}
        description={description}
        setDescription={setDescription}
      />
      <Pressable style={styles.addTransactionButton} onPress={onSubmit}>
        <Text style={styles.addTransactionButtonText}>Add Transaction</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  transactionForm: {
    flex: 1,
    marginHorizontal: 28,
    marginVertical: 8,
  },
  addTransactionButton: {
    marginTop: 8,
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: LightColors.primary,
    alignItems: "center",
    justifyContent: "center",
    minHeight: 48,
  },
  addTransactionButtonText: {
    fontSize: 16,
    color: LightColors.background,
    fontWeight: 700,
  },
});
