import {
    View,
    Text,
    StyleSheet,
    TextInput,
    Pressable,
    Platform
} from "react-native";
import CalenderIcon from '../../assets/icons/calendar.svg';
import CarIconPrimary from '../../assets/icons/car_primary';
import CarIconWhite from '../../assets/icons/car_white';
import WaterIconPrimary from '../../assets/icons/water_primary';
import WaterIconWhite from '../../assets/icons/water_white';
import PetrolIconPrimary from '../../assets/icons/petrol_primary';
import PetrolIconWhite from '../../assets/icons/petrol_white';
import MovieIconPrimary from '../../assets/icons/movie_primary';
import MovieIconWhite from '../../assets/icons/movie_white';
import MobileIconPrimary from '../../assets/icons/mobile_primary';
import MobileIconWhite from '../../assets/icons/mobile_white';
import { LightColors } from "../theme/color";
import DateTimePicker from '@react-native-community/datetimepicker';
import { useState } from "react";
import { modifyDate } from "../utils/dateModifier";
import { CategoryPlaceholder } from "./CategoryPlaceholder";

type formInputType = {
    label: string;
    inputType: string;
    inputConfig: any;
};

interface CategoryInterface {
    name: string,
    isActive: boolean
}

export const FormInput = ({ label, inputType, inputConfig }: formInputType) => {

    const [amount, setAmount] = useState(0);
    const [date, setDate] = useState(new Date());
    const [show, setShow] = useState(false);
    const [category, setCategory] = useState<CategoryInterface>({
        name: '',
        isActive: false
    });
    const [description, setDescription] = useState('');

    return (
        <View style={styles.formInput}>
            <Text style={styles.formLabel}>{label}</Text>
            {inputType === "amount" && (
                <View style={styles.amountContainer}>
                    <Text style={styles.amountSymbol}>₹</Text>
                    <TextInput style={styles.amountInput} {...inputConfig} value={amount} onChangeText={setAmount} />
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

            {inputType === 'categories' && (
                <View style={styles.categoryContainer} >
                    <CategoryPlaceholder categoryImage={(category.name === 'car' && category.isActive) ? <CarIconWhite width={24} height={24} /> : <CarIconPrimary width={24} height={24} />} categoryName="car" category={category} setCategory={setCategory} />
                    <CategoryPlaceholder categoryImage={(category.name === 'water' && category.isActive) ? <WaterIconWhite width={24} height={24} /> : <WaterIconPrimary width={24} height={24} />} categoryName="water" category={category} setCategory={setCategory} />
                    <CategoryPlaceholder categoryImage={(category.name === 'petrol' && category.isActive) ? <PetrolIconWhite width={24} height={24} /> : <PetrolIconPrimary width={24} height={24} />} categoryName="petrol" category={category} setCategory={setCategory} />
                    <CategoryPlaceholder categoryImage={(category.name === 'movie' && category.isActive) ? <MovieIconWhite width={24} height={24} /> : <MovieIconPrimary width={24} height={24} />} categoryName="movie" category={category} setCategory={setCategory} />
                    <CategoryPlaceholder categoryImage={(category.name === 'mobile' && category.isActive) ? <MobileIconWhite width={24} height={24} /> : <MobileIconPrimary width={24} height={24} />} categoryName="mobile" category={category} setCategory={setCategory} />
                </View>
            )}

            {inputType === 'description' && (
                <View style={styles.descriptionContainer}>
                    <TextInput style={styles.descriptionInput} placeholder="Enter your description" {...inputConfig} multiline={true} value={description} onChangeText={setDescription} />
                </View>
            )}


        </View>
    );
};

const styles = StyleSheet.create({
    formInput: {
        marginBottom: 24
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
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
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
    }
});
