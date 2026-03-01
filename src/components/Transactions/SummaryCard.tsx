import { StyleSheet, View, Text, Pressable } from "react-native";
import { LightColors } from "../../theme/color";
import DownArrow from "../../../assets/icons/down_arrow.svg";
import UpArrow from "../../../assets/icons/up_arrow.svg";
import { LinearGradient } from "expo-linear-gradient";
import { useTransactionStore } from "../../store/useTransactionStore";

export const SummaryCard = () => {
  const totalIncomeAmount = useTransactionStore((state) => state.incomeAmount);
  const totalExpenseAmount = useTransactionStore(
    (state) => state.expenseAmount
  );

  return (
    <View style={styles.summaryCardWrapper}>
      <LinearGradient
        colors={[
          LightColors.surface,
          LightColors.cardColorPrimary,
          LightColors.cardColorSecondary,
        ]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.summaryCard}
      >
        <View>
          <Text>Total Balance</Text>
          <View style={styles.headingContainer}>
            <View style={styles.textContainer}>
              <Text style={styles.currencySymbolBalance}>₹</Text>
              <Text style={styles.totalBalanceText}>
                {" "}
                {totalIncomeAmount - totalExpenseAmount}
              </Text>
            </View>

            <Pressable style={styles.addAmountBtn}>
              <Text style={styles.addAmountBtnText}>Add balance</Text>
            </Pressable>
          </View>
        </View>
        <View style={styles.subHeadingContainer}>
          <View>
            <Text>Expense</Text>
            <View style={styles.textContainer}>
              <Text style={[styles.currencySymbolExpense]}>₹</Text>
              <Text style={styles.expenseBalanceText}>
                {" "}
                {totalExpenseAmount}
              </Text>
              <DownArrow width={24} height={24} />
            </View>
          </View>
          <View>
            <Text>Income</Text>
            <View style={styles.textContainer}>
              <Text style={[styles.currencySymbolIncome]}>₹</Text>
              <Text style={styles.incomeBalanceText}> {totalIncomeAmount}</Text>
              <UpArrow width={24} height={24} />
            </View>
          </View>
        </View>
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  summaryCardWrapper: {
    marginVertical: 28,
    marginHorizontal: 16,
    borderRadius: 15,

    // iOS
    shadowColor: LightColors.black,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.08,
    shadowRadius: 12,

    // Android
    elevation: 4,
  },

  summaryCard: {
    paddingTop: 18,
    paddingHorizontal: 16,
    borderRadius: 15,
  },
  headingContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  subHeadingContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 16,
  },
  addAmountBtn: {
    marginLeft: 8,
    borderWidth: 2,
    borderColor: LightColors.primary,
    flexDirection: "row",
    width: 110,
    borderRadius: 10,
    padding: 4,
    justifyContent: "center",
  },
  addAmountBtnText: {
    color: LightColors.primary,
    fontSize: 16,
    marginLeft: 4,
    fontWeight: "600",
  },
  currencySymbolBalance: {
    opacity: 0.8,
    fontSize: 28,
  },
  currencySymbolExpense: {
    opacity: 0.8,
    fontSize: 26,
    color: LightColors.error,
  },

  currencySymbolIncome: {
    opacity: 0.8,
    fontSize: 26,
    color: LightColors.success,
  },
  textContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  totalBalanceText: {
    fontSize: 32,
    fontWeight: "600",
  },
  expenseBalanceText: {
    fontSize: 28,
    color: LightColors.error,
    fontWeight: "500",
  },
  incomeBalanceText: {
    fontSize: 28,
    color: LightColors.success,
    fontWeight: "500",
  },
});
