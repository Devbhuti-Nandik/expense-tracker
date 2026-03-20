import {
  StyleSheet,
  View,
  Text,
  SectionList,
  SectionListData,
} from "react-native";
import { LightColors } from "../../theme/color";
import { Transaction } from "../../types/transaction";
import { buildTransactionSection, extractDay } from "../../utils/helpers";

type TransactionsHistoryProps = {
  transactions: Transaction[];
};

type SectionData = SectionListData<
  Transaction,
  {
    title: string;
    data: Transaction[];
  }
>;

type TransactionDetailTileProps = {
  icon?: React.ReactNode;
  title: string;
  categoryName: string;
};

type TransactionAmountDetailProps = {
  amount: number;
  transactionType: string;
};

const TransactionDetailTile = ({
  icon,
  title,
  categoryName,
}: TransactionDetailTileProps) => {
  return (
    <View style={styles.transactionDetailTileContainer}>
      <View style={styles.transactionDetailTileCategoryIcon}>{icon}</View>
      <View>
        <Text style={styles.transactionDetailTileTitle}>{title}</Text>
        <Text style={styles.transactionDetailTileSubtitle}>{categoryName}</Text>
      </View>
    </View>
  );
};

const TransactionAmountDetail = ({
  amount,
  transactionType,
}: TransactionAmountDetailProps) => {
  return (
    <View>
      {transactionType === "income" ? (
        <Text style={styles.incomeAmount}>+₹{amount}</Text>
      ) : (
        <Text style={styles.expenseAmount}>-₹{amount}</Text>
      )}
      <Text style={styles.transactionDetailTileTransactionType}>
        {transactionType}
      </Text>
    </View>
  );
};

export const TransactionsHistory = ({
  transactions,
}: TransactionsHistoryProps) => {
  const transactionsSectionsData = buildTransactionSection(transactions);

  const extractKey = (item: Transaction, index: number) => {
    return item.id + "_" + String(index);
  };

  const dateSectionTitle = (section: SectionData) => {
    const { title } = section;
    const dateSplittedValue = title.split("-");
    const dayValue = dateSplittedValue[0];
    const monthYearValue = `${dateSplittedValue[1]}.${dateSplittedValue[2]}`;
    return (
      <View style={styles.sectionTitleContainer}>
        <Text style={styles.sectionTitleDay}>{dayValue}</Text>
        <View style={styles.sectionTitleWeekContainer}>
          <Text style={styles.sectionTitleWeek}>{extractDay(title)}</Text>
        </View>
        <Text style={styles.sectionTitleMonthYear}>{monthYearValue}</Text>
        <View style={styles.sectionTitleLine}></View>
      </View>
    );
  };

  const renderTransactionsGroup = (item: Transaction) => {
    return (
      <View style={styles.sectionListContainer}>
        <TransactionDetailTile
          icon={item.category.icon}
          title={item.description}
          categoryName={item.category.name}
        />
        <TransactionAmountDetail
          amount={item.amount}
          transactionType={item.type}
        />
      </View>
    );
  };

  return (
    <View style={styles.transactionsHistoryContainer}>
      <SectionList
        sections={transactionsSectionsData}
        keyExtractor={(item, index) => extractKey(item, index)}
        renderItem={({ item }) => renderTransactionsGroup(item)}
        renderSectionHeader={({ section }) => dateSectionTitle(section)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  transactionsHistoryContainer: {
    flex: 1,
    backgroundColor: LightColors.background,
    marginHorizontal: 16,
  },
  sectionTitleContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 8,
  },
  sectionTitleDay: {
    fontSize: 16,
    fontWeight: "500",
  },
  sectionTitleWeekContainer: {
    paddingHorizontal: 4,
    paddingVertical: 2,
    backgroundColor: LightColors.surface,
    borderRadius: 5,
    marginHorizontal: 4,
  },
  sectionTitleWeek: {
    textAlign: "center",
    fontSize: 12,
  },
  sectionTitleMonthYear: {
    fontSize: 12,
  },
  sectionTitleLine: {
    width: "100%",
    borderColor: LightColors.lightGrey,
    borderWidth: 0.2,
    marginLeft: 16,
  },
  sectionListContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 8,
  },
  transactionDetailTileContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
  },
  transactionDetailTileCategoryIcon: {
    backgroundColor: LightColors.surface,
    borderRadius: 50,
    width: 40,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 8,
  },
  transactionDetailTileTitle: {
    fontWeight: "500",
    color: LightColors.black,
    fontSize: 14,
    textTransform: "capitalize",
  },
  transactionDetailTileSubtitle: {
    color: LightColors.lightGrey,
    textTransform: "capitalize",
    fontSize: 12,
  },
  incomeAmount: {
    color: LightColors.success,
    textAlign: "right",
    fontWeight: "500",
    fontSize: 16,
  },
  expenseAmount: {
    color: LightColors.error,
    textAlign: "right",
    fontWeight: "500",
    fontSize: 16,
  },
  transactionDetailTileTransactionType: {
    color: LightColors.lightGrey,
    textTransform: "capitalize",
    textAlign: "right",
    fontSize: 12,
  },
});
