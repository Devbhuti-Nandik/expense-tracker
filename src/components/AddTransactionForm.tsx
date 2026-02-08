import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import { FormInput } from "../common/FormInput";
import { LightColors } from "../theme/color";
import { Transaction, TransactionInputProps } from "../types/transaction";
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
  const [transactionInputValues, setTransactionInputValues] =
    useState<TransactionInputProps>({
      amount: 0,
      date: new Date(),
      category: {
        id: "",
        name: "",
        isActive: false,
      },
      description: "",
    });
  const [isFormValid, setIsFormValid] = useState(false);

  const addTransaction = useTransactionStore((state) => state.addTransaction);
  const navigation = useNavigation();

  const resetTransactionForm = () => {
    setTransactionInputValues({
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
    setIsFormValid(false);
  };
  const onSubmit = () => {
    const transaction: Transaction = {
      amount: transactionInputValues.amount,
      date: transactionInputValues.date.toISOString(),
      category: transactionInputValues.category,
      description: transactionInputValues.description,
      type: transactionType,
    };
    const sanitizedTransaction = sanitizeTransactionFormData(transaction);
    addTransaction(sanitizedTransaction);
    resetTransactionForm();
    navigation.navigate("Transactions" as never);
  };

  useEffect(() => {
    if (
      Number(transactionInputValues.amount) > 0 &&
      transactionInputValues.category.name !== "" &&
      transactionInputValues.description.trim() !== ""
    ) {
      setIsFormValid(true);
    } else {
      setIsFormValid(false);
    }
  }, [
    transactionInputValues.amount,
    transactionInputValues.category,
    transactionInputValues.description,
  ]);

  return (
    <View style={styles.transactionForm}>
      <FormInput
        label="Amount"
        inputType="amount"
        inputConfig={{ keyboardType: "decimal-pad" }}
        transactionInputValues={transactionInputValues}
        setTransactionInputValues={setTransactionInputValues}
      />
      <FormInput
        label="Date"
        inputType="date"
        inputConfig={{}}
        transactionInputValues={transactionInputValues}
        setTransactionInputValues={setTransactionInputValues}
      />
      <FormInput
        label="Categories"
        inputType="categories"
        inputConfig={{}}
        transactionInputValues={transactionInputValues}
        setTransactionInputValues={setTransactionInputValues}
      />
      <FormInput
        label="Description"
        inputType="description"
        inputConfig={{}}
        transactionInputValues={transactionInputValues}
        setTransactionInputValues={setTransactionInputValues}
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
