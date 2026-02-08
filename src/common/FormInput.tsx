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
import ErrorIcon from "../../assets/icons/error_icon.svg";
import { LightColors } from "../theme/color";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Dispatch, SetStateAction, useState } from "react";
import { modifyDate } from "../utils/dateModifier";
import { CategoryPlaceholder } from "./CategoryPlaceholder";
import { TransactionFormInputProps } from "../types/transaction";
import { isValidAmount } from "../utils/regexValidation";

type FormInputProps =
  | {
      inputType: "amount";
      label: string;
      inputConfig: any;
      transactionInputValues: TransactionFormInputProps;
      setTransactionInputValues: Dispatch<
        SetStateAction<TransactionFormInputProps>
      >;
    }
  | {
      inputType: "date";
      label: string;
      inputConfig: any;
      transactionInputValues: TransactionFormInputProps;
      setTransactionInputValues: Dispatch<
        SetStateAction<TransactionFormInputProps>
      >;
    }
  | {
      inputType: "categories";
      label: string;
      inputConfig: any;
      transactionInputValues: TransactionFormInputProps;
      setTransactionInputValues: Dispatch<
        SetStateAction<TransactionFormInputProps>
      >;
    }
  | {
      inputType: "description";
      label: string;
      inputConfig: any;
      transactionInputValues: TransactionFormInputProps;
      setTransactionInputValues: Dispatch<
        SetStateAction<TransactionFormInputProps>
      >;
    };

export const FormInput = (props: FormInputProps) => {
  const [show, setShow] = useState(false);
  const [hasAmountBeenTouched, setHasAmountBeenTouched] = useState(false);

  const onChangeInput = (identifierName: string, inputValue: any) => {
    props.setTransactionInputValues((prevValue) => ({
      ...prevValue,
      [identifierName]: inputValue,
    }));
  };

  const { amount, date, category, description } = props.transactionInputValues;

  return (
    <View style={styles.formInput}>
      <Text style={styles.formLabel}>{props.label}</Text>
      {props.inputType === "amount" && (
        <View>
          <View style={styles.amountContainer}>
            <Text style={styles.amountSymbol}>₹</Text>
            <TextInput
              style={styles.amountInput}
              {...props.inputConfig}
              value={amount}
              onChangeText={onChangeInput.bind(this, "amount")}
              onEndEditing={() => setHasAmountBeenTouched(true)}
            />
          </View>
          <View
            style={[
              styles.validationContainer,
              hasAmountBeenTouched &&
              (!isValidAmount(String(amount)) || Number(amount) <= 0)
                ? styles.showValidationText
                : styles.hideValidationText,
            ]}
          >
            <ErrorIcon height={14} width={14} alt="error" />
            <Text style={styles.validationText}>
              Amount must be greater than 0
            </Text>
          </View>
        </View>
      )}
      {/* TODO: We need to separate the date and time fields */}
      {props.inputType === "date" && (
        <View style={styles.dateContainer}>
          <View style={{ width: "90%" }}>
            {show && (
              <DateTimePicker
                value={date}
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
            <Text>{modifyDate(date)}</Text>
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
              category.name === "car" && category.isActive ? (
                <CarIconWhite
                  width={24}
                  height={24}
                  alt="car_category_selected"
                />
              ) : (
                <CarIconPrimary width={24} height={24} alt="car_category" />
              )
            }
            categoryName="car"
            category={category}
            setTransactionInputValues={props.setTransactionInputValues}
          />
          <CategoryPlaceholder
            categoryImage={
              category.name === "water" && category.isActive ? (
                <WaterIconWhite
                  width={24}
                  height={24}
                  alt="water_category_selected"
                />
              ) : (
                <WaterIconPrimary width={24} height={24} alt="water_category" />
              )
            }
            categoryName="water"
            category={category}
            setTransactionInputValues={props.setTransactionInputValues}
          />
          <CategoryPlaceholder
            categoryImage={
              category.name === "petrol" && category.isActive ? (
                <PetrolIconWhite
                  width={24}
                  height={24}
                  alt="petrol_category_selected"
                />
              ) : (
                <PetrolIconPrimary
                  width={24}
                  height={24}
                  alt="petrol_category"
                />
              )
            }
            categoryName="petrol"
            category={category}
            setTransactionInputValues={props.setTransactionInputValues}
          />
          <CategoryPlaceholder
            categoryImage={
              category.name === "movie" && category.isActive ? (
                <MovieIconWhite
                  width={24}
                  height={24}
                  alt="movie_category_selected"
                />
              ) : (
                <MovieIconPrimary width={24} height={24} alt="movie_category" />
              )
            }
            categoryName="movie"
            category={category}
            setTransactionInputValues={props.setTransactionInputValues}
          />
          <CategoryPlaceholder
            categoryImage={
              category.name === "mobile" && category.isActive ? (
                <MobileIconWhite
                  width={24}
                  height={24}
                  alt="mobile_category_selected"
                />
              ) : (
                <MobileIconPrimary
                  width={24}
                  height={24}
                  alt="mobile_category"
                />
              )
            }
            categoryName="mobile"
            category={category}
            setTransactionInputValues={props.setTransactionInputValues}
          />
        </View>
      )}

      {props.inputType === "description" && (
        <View>
          <View style={styles.descriptionContainer}>
            <TextInput
              style={styles.descriptionInput}
              placeholder="Enter your description"
              {...props.inputConfig}
              multiline={true}
              value={description}
              onChangeText={onChangeInput.bind(this, "description")}
            />
          </View>
          <View style={styles.descriptionCounter}>
            <Text
              style={[
                styles.descriptionText,
                description.length > 90 && styles.descriptionTextLimit,
              ]}
            >
              [ {description.length} / 100 ]
            </Text>
          </View>
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
    fontWeight: "500",
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
    fontWeight: "500",
  },
  amountInput: {
    fontSize: 24,
    color: LightColors.primary,
    width: "90%",
    paddingLeft: 16,
    fontWeight: "700",
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
    fontWeight: "400",
  },
  validationContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 8,
  },
  validationText: {
    fontSize: 12,
    color: LightColors.error,
    marginLeft: 4,
  },
  descriptionCounter: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
    marginTop: 8,
  },
  descriptionText: {
    fontSize: 12,
    textAlign: "right",
  },
  descriptionTextLimit: {
    color: LightColors.error,
  },
  showValidationText: {
    display: "flex",
  },
  hideValidationText: {
    display: "none",
  },
});
