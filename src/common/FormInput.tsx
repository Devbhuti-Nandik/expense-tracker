import {
    View,
    Text,
    StyleSheet,
    TextInput,
    Pressable,
    Platform
} from "react-native";
import CalenderIcon from '../../assets/icons/calendar.svg';
import { LightColors } from "../theme/color";
import DateTimePicker from '@react-native-community/datetimepicker';
import { useState } from "react";
import { modifyDate } from "../utils/dateModifier";

type formInputType = {
    label: string;
    inputType: string;
    inputConfig: any;
};

export const FormInput = ({ label, inputType, inputConfig }: formInputType) => {
    const [date, setDate] = useState(new Date());
    const [show, setShow] = useState(false);
    return (
        <View style={styles.formInput}>
            <Text style={styles.formLabel}>{label}</Text>
            {inputType === "amount" && (
                <View style={styles.amountContainer}>
                    <Text style={styles.amountSymbol}>₹</Text>
                    <TextInput style={styles.amountInput} {...inputConfig} />
                </View>
            )}
            {/* TODO: We need to separate the date and time fields */}
            {inputType === "date" && (
                <View style={styles.dateContainer}>
                    <View style={{ width: '90%' }}>
                        {show && <DateTimePicker
                            value={date}
                            mode="date"
                            display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                            onChange={(event, selectedDate) => {
                                setShow(false);
                                if (selectedDate) setDate(selectedDate)
                            }}
                        />}
                        <Text>{modifyDate(date)}</Text>
                    </View>
                    <View style={{ width: '10%' }}>
                        <Pressable onPress={() => setShow(true)}>
                            <CalenderIcon width={30} height={30} />
                        </Pressable>
                    </View>
                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    formInput: {
        flex: 1,
    },
    formLabel: {
        fontSize: 12,
        marginBottom: 4,
    },
    amountContainer: {
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
});
