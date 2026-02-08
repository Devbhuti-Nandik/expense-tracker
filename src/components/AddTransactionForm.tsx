import { Dispatch, SetStateAction, useState } from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import { FormInput } from "../common/FormInput";
import { LightColors } from "../theme/color";
import { Transaction, TransactionFormInputProps } from "../types/transaction";
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
  const [transactionFormInput, setTransactionFormInput] =
    useState<TransactionFormInputProps>({
      amount: 0,
      date: new Date(),
      category: {
        id: "",
        name: "",
        isActive: false,
      },
      description: "",
    });
  const addTransaction = useTransactionStore((state) => state.addTransaction);
  const navigation = useNavigation();
  const { amount, date, category, description } = transactionFormInput;

  const resetTransactionForm = () => {
    setTransactionFormInput({
      amount: 0,
      date: new Date(),
      category: {
        id: "",
        name: "",
        isActive: false,
      },
      description: "",
    });
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

  const isFormValid =
    Number(amount) > 0 &&
    category.name !== "" &&
    description.trim() !== "";

  return (
    <View style={styles.transactionForm}>
      <FormInput
        label="Amount"
        inputType="amount"
        inputConfig={{ keyboardType: "decimal-pad", maxLength: 10 }}
        transactionInputValues={transactionFormInput}
        setTransactionInputValues={setTransactionFormInput}
      />
      <FormInput
        label="Date"
        inputType="date"
        inputConfig={{}}
        transactionInputValues={transactionFormInput}
        setTransactionInputValues={setTransactionFormInput}
      />
      <FormInput
        label="Categories"
        inputType="categories"
        inputConfig={{}}
        transactionInputValues={transactionFormInput}
        setTransactionInputValues={setTransactionFormInput}
      />
      <FormInput
        label="Description"
        inputType="description"
        inputConfig={{ autoCorrect: true, maxLength: 100 }}
        transactionInputValues={transactionFormInput}
        setTransactionInputValues={setTransactionFormInput}
      />
      <Pressable
        style={[
          styles.addTransactionButton,
          !isFormValid && styles.disabledButton,
        ]}
        onPress={onSubmit}
        disabled={!isFormValid}
      >
        <Text
          style={[
            styles.addTransactionButtonText,
            !isFormValid && styles.disabledButton,
          ]}
        >
          Save
        </Text>
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
  disabledButton: {
    color: LightColors.disabledText,
    backgroundColor: LightColors.disabledBackground,
  },
});
