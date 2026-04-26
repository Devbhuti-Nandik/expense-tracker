import {
  StyleSheet,
  View,
  Text,
  SectionList,
  SectionListData,
  TouchableOpacity,
  Pressable,
} from "react-native";
import { useRef } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import ReanimatedSwipeable from "react-native-gesture-handler/ReanimatedSwipeable";
import { LightColors } from "../../theme/color";
import { Transaction } from "../../types/transaction";
import { buildTransactionSection, extractDay } from "../../utils/helpers";
import { NoTransactions } from "./ZeroStateTransaction";
import { useTransactionStore } from "../../store/useTransactionStore";

const SWIPE_ACTION_BUTTON_WIDTH = 80;
const SWIPE_ACTIONS_TOTAL_WIDTH = SWIPE_ACTION_BUTTON_WIDTH * 2;

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
      <View style={styles.transactionDetailTextContainer}>
        <Text numberOfLines={1} style={styles.transactionDetailTileTitle}>
          {title}
        </Text>
        <Text numberOfLines={1} style={styles.transactionDetailTileSubtitle}>
          {categoryName}
        </Text>
      </View>
    </View>
  );
};

const TransactionAmountDetail = ({
  amount,
  transactionType,
}: TransactionAmountDetailProps) => {
  return (
    <View style={styles.transactionAmountContainer}>
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
  const swipeableMethodsById = useRef<
    Record<string, { close: () => void } | undefined>
  >({});
  const openedRowId = useRef<string | null>(null);
  const deleteTransaction = useTransactionStore(
    (state) => state.deleteTransaction
  );

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
    const handleSwipeableWillOpen = () => {
      const previouslyOpenedId = openedRowId.current;
      if (previouslyOpenedId && previouslyOpenedId !== item.id) {
        swipeableMethodsById.current[previouslyOpenedId]?.close();
      }
      openedRowId.current = item.id;
    };

    const handleSwipeableClose = () => {
      if (openedRowId.current === item.id) {
        openedRowId.current = null;
      }
    };

    const renderRightActions = (
      _progress: unknown,
      _translation: unknown,
      swipeableMethods: { close: () => void }
    ) => {
      swipeableMethodsById.current[item.id] = swipeableMethods;

      /*
       * Deletes a transaction.
       * @params id: string
       * @returns: updated transactions list
       */
      const handleTransactionDelete = (id: string) => {
        deleteTransaction(id);
      };

      return (
        <View style={styles.rightActionsContainer}>
          <Pressable
            style={[styles.rightActionButton, styles.deleteActionButton]}
            onPress={() => handleTransactionDelete(item.id)}
          >
            <Text style={{ color: LightColors.background }}>Delete</Text>
          </Pressable>
          <TouchableOpacity
            style={[styles.rightActionButton, styles.editActionButton]}
          >
            <Text style={{ color: LightColors.background }}>Edit</Text>
          </TouchableOpacity>
        </View>
      );
    };
    return (
      <View style={styles.transactionRowWrapper}>
        <ReanimatedSwipeable
          rightThreshold={SWIPE_ACTIONS_TOTAL_WIDTH / 2}
          friction={1.5}
          overshootRight={false}
          onSwipeableWillOpen={handleSwipeableWillOpen}
          onSwipeableClose={handleSwipeableClose}
          renderRightActions={renderRightActions}
        >
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
        </ReanimatedSwipeable>
      </View>
    );
  };

  return (
    <View style={styles.transactionsHistoryContainer}>
      {transactions.length === 0 && <NoTransactions />}
      <GestureHandlerRootView>
        <SectionList
          sections={transactionsSectionsData}
          keyExtractor={(item, index) => extractKey(item, index)}
          renderItem={({ item }) => renderTransactionsGroup(item)}
          renderSectionHeader={({ section }) => dateSectionTitle(section)}
        />
      </GestureHandlerRootView>
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
    gap: 12,
    backgroundColor: LightColors.surface,
    paddingVertical: 12,
    paddingEnd: 8,
  },
  transactionRowWrapper: {
    marginBottom: 6,
  },
  transactionDetailTileContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
  },
  transactionDetailTextContainer: {
    flex: 1,
    flexShrink: 1,
    marginRight: 8,
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
  transactionAmountContainer: {
    minWidth: 84,
    marginLeft: 8,
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
  rightActionsContainer: {
    flexDirection: "row",
    width: SWIPE_ACTIONS_TOTAL_WIDTH,
    alignItems: "center",
  },
  rightActionButton: {
    width: SWIPE_ACTION_BUTTON_WIDTH,
    height: "100%",
    paddingVertical: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  deleteActionButton: {
    backgroundColor: LightColors.error,
  },
  editActionButton: {
    backgroundColor: LightColors.textPrimary,
  },
});
