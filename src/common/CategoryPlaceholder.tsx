import { View, StyleSheet, Pressable, Text } from 'react-native';
import { LightColors } from '../theme/color';

export const CategoryPlaceholder = ({ categoryImage, categoryName, category, setCategory }: any) => {
    return (
        <Pressable style={styles.categoryPlaceholderContainer} onPress={() => setCategory({ name: categoryName, isActive: true })}>
            <View style={[styles.categoryDefault, (category.name === categoryName && category.isActive === true) && styles.activeCategory]}>
                {categoryImage}
            </View>
            <View>
                <Text style={styles.categoryName}>{categoryName}</Text>
            </View>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    categoryPlaceholderContainer: {
        width: 70,
        height: 70,
        alignItems: 'center',
        justifyContent: 'center',
        gap: 3,
        flex: 1
    },
    categoryDefault: {
        width: 50,
        height: 50,
        borderRadius: '50%',
        backgroundColor: LightColors.surface,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    activeCategory: {
        backgroundColor: LightColors.primary
    },
    categoryName: {
        fontSize: 12,
        marginLeft: 4
    }
})