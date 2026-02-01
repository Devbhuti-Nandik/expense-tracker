import { View, StyleSheet, Pressable, Text } from "react-native";
import { LightColors } from "../theme/color";
import { Category } from "../types/category";

type CategoryPlaceholderProps = {
  categoryImage: React.ReactNode;
  categoryName: string;
  category: Category;
  setCategory: (category: Category) => void;
};

export const CategoryPlaceholder = (props: CategoryPlaceholderProps) => {
  const { categoryImage, categoryName, category, setCategory } = props;
  return (
    <Pressable
      style={styles.categoryPlaceholderContainer}
      onPress={() =>
        setCategory({
          id: Math.random().toString(36).substring(2, 9),
          name: categoryName,
          isActive: true,
        })
      }
    >
      <View
        style={[
          styles.categoryDefault,
          category.name === categoryName &&
            category.isActive === true &&
            styles.activeCategory,
        ]}
      >
        {categoryImage}
      </View>
      <View>
        <Text style={styles.categoryName}>{categoryName}</Text>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  categoryPlaceholderContainer: {
    width: 70,
    height: 70,
    alignItems: "center",
    justifyContent: "center",
    gap: 3,
    flex: 1,
  },
  categoryDefault: {
    width: 50,
    height: 50,
    borderRadius: "50%",
    backgroundColor: LightColors.surface,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  activeCategory: {
    backgroundColor: LightColors.primary,
  },
  categoryName: {
    fontSize: 12,
    marginLeft: 4,
  },
});
