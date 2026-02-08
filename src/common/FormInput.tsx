import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Pressable,
  Platform,
} from "react-native";
import CalenderIcon from "../../assets/icons/calendar.svg";
import CarIconPrimary from "../../assets/icons/car_primary";
import CarIconWhite from "../../assets/icons/car_white";
import WaterIconPrimary from "../../assets/icons/water_primary";
import WaterIconWhite from "../../assets/icons/water_white";
import PetrolIconPrimary from "../../assets/icons/petrol_primary";
import PetrolIconWhite from "../../assets/icons/petrol_white";
import MovieIconPrimary from "../../assets/icons/movie_primary";
import MovieIconWhite from "../../assets/icons/movie_white";
import MobileIconPrimary from "../../assets/icons/mobile_primary";
import MobileIconWhite from "../../assets/icons/mobile_white";
import { LightColors } from "../theme/color";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Dispatch, SetStateAction, useState } from "react";
import { modifyDate } from "../utils/dateModifier";
import { CategoryPlaceholder } from "./CategoryPlaceholder";
import { TransactionInputProps } from "../types/transaction";

type FormInputProps =
  | {
      inputType: "amount";
      label: string;
      inputConfig: any;
      transactionInputValues: TransactionInputProps;
      setTransactionInputValues: Dispatch<
        SetStateAction<TransactionInputProps>
      >;
    }
  | {
      inputType: "date";
      label: string;
      inputConfig: any;
      transactionInputValues: TransactionInputProps;
      setTransactionInputValues: Dispatch<
        SetStateAction<TransactionInputProps>
      >;
    }
  | {
      inputType: "categories";
      label: string;
      inputConfig: any;
      transactionInputValues: TransactionInputProps;
      setTransactionInputValues: Dispatch<
        SetStateAction<TransactionInputProps>
      >;
    }
  | {
      inputType: "description";
      label: string;
      inputConfig: any;
      transactionInputValues: TransactionInputProps;
      setTransactionInputValues: Dispatch<
        SetStateAction<TransactionInputProps>
      >;
    };

export const FormInput = (props: FormInputProps) => {
  const [show, setShow] = useState(false);

  const onChangeInput = (identifierName: string, inputValue: any) => {
    props.setTransactionInputValues((prevValue) => ({
      ...prevValue,
      [identifierName]: inputValue,
    }));
  };

  return (
    <View style={styles.formInput}>
      <Text style={styles.formLabel}>{props.label}</Text>
      {props.inputType === "amount" && (
        <View style={styles.amountContainer}>
          <Text style={styles.amountSymbol}>₹</Text>
          <TextInput
            style={styles.amountInput}
            {...props.inputConfig}
            value={props.transactionInputValues.amount}
            onChangeText={onChangeInput.bind(this, "amount")}
          />
        </View>
      )}
      {/* TODO: We need to separate the date and time fields */}
      {props.inputType === "date" && (
        <View style={styles.dateContainer}>
          <View style={{ width: "90%" }}>
            {show && (
              <DateTimePicker
                value={props.transactionInputValues.date}
                mode="date"
                display={Platform.OS === "ios" ? "spinner" : "default"}
                onChange={(event, selectedDate) => {
                  setShow(false);
                  if (selectedDate) {
                    onChangeInput("date", selectedDate);
                  }
                }}
              />
            )}
            <Text>{modifyDate(props.transactionInputValues.date)}</Text>
          </View>
          <View style={{ width: "10%" }}>
            <Pressable onPress={() => setShow(true)}>
              <CalenderIcon width={30} height={30} />
            </Pressable>
          </View>
        </View>
      )}

      {props.inputType === "categories" && (
        <View style={styles.categoryContainer}>
          <CategoryPlaceholder
            categoryImage={
              props.transactionInputValues.category.name === "car" &&
              props.transactionInputValues.category.isActive ? (
                <CarIconWhite width={24} height={24} />
              ) : (
                <CarIconPrimary width={24} height={24} />
              )
            }
            categoryName="car"
            category={props.transactionInputValues.category}
            setTransactionInputValues={props.setTransactionInputValues}
          />
          <CategoryPlaceholder
            categoryImage={
              props.transactionInputValues.category.name === "water" &&
              props.transactionInputValues.category.isActive ? (
                <WaterIconWhite width={24} height={24} />
              ) : (
                <WaterIconPrimary width={24} height={24} />
              )
            }
            categoryName="water"
            category={props.transactionInputValues.category}
            setTransactionInputValues={props.setTransactionInputValues}
          />
          <CategoryPlaceholder
            categoryImage={
              props.transactionInputValues.category.name === "petrol" &&
              props.transactionInputValues.category.isActive ? (
                <PetrolIconWhite width={24} height={24} />
              ) : (
                <PetrolIconPrimary width={24} height={24} />
              )
            }
            categoryName="petrol"
            category={props.transactionInputValues.category}
            setTransactionInputValues={props.setTransactionInputValues}
          />
          <CategoryPlaceholder
            categoryImage={
              props.transactionInputValues.category.name === "movie" &&
              props.transactionInputValues.category.isActive ? (
                <MovieIconWhite width={24} height={24} />
              ) : (
                <MovieIconPrimary width={24} height={24} />
              )
            }
            categoryName="movie"
            category={props.transactionInputValues.category}
            setTransactionInputValues={props.setTransactionInputValues}
          />
          <CategoryPlaceholder
            categoryImage={
              props.transactionInputValues.category.name === "mobile" &&
              props.transactionInputValues.category.isActive ? (
                <MobileIconWhite width={24} height={24} />
              ) : (
                <MobileIconPrimary width={24} height={24} />
              )
            }
            categoryName="mobile"
            category={props.transactionInputValues.category}
            setTransactionInputValues={props.setTransactionInputValues}
          />
        </View>
      )}

      {props.inputType === "description" && (
        <View style={styles.descriptionContainer}>
          <TextInput
            style={styles.descriptionInput}
            placeholder="Enter your description"
            {...props.inputConfig}
            multiline={true}
            value={props.transactionInputValues.description}
            onChangeText={onChangeInput.bind(this, "description")}
          />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  formInput: {
    marginBottom: 24,
  },
  formLabel: {
    fontSize: 12,
    marginBottom: 4,
    fontWeight: 500,
  },
  amountContainer: {
    marginTop: 4,
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 10,
    padding: 16,
    minHeight: 64,
    backgroundColor: LightColors.surface,
  },
  amountSymbol: {
    fontSize: 40,
    color: LightColors.primary,
    width: "10%",
    fontWeight: 500,
  },
  amountInput: {
    fontSize: 24,
    color: LightColors.primary,
    width: "90%",
    paddingLeft: 16,
    fontWeight: 700,
  },
  dateContainer: {
    marginTop: 4,
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 16,
    minHeight: 48,
    backgroundColor: LightColors.surface,
  },
  dateImage: {
    width: "40%",
    height: "40%",
  },
  categoryContainer: {
    marginTop: 8,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  descriptionContainer: {
    marginTop: 4,
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 16,
    height: 100,
    backgroundColor: LightColors.surface,
  },
  descriptionInput: {
    fontSize: 14,
    color: LightColors.textPrimary,
    width: "100%",
    fontWeight: 400,
  },
});
