import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';

const CategoryContainer = ({
  categories,
  colors,
  toggleCategorySelection,
  selectedCategories,
}) => {
  return (
    <View style={styles.categoryMainContainer}>
      {categories.map(category => (
        <TouchableOpacity
          key={category._id}
          onPress={() => toggleCategorySelection(category)}>
          <View
            style={[
              styles.categoryContainer,
              {
                backgroundColor: selectedCategories.includes(category)
                  ? colors.accentGreen
                  : colors.primaryText,
                borderColor: colors.secondaryText,
              },
            ]}>
            <Text
              style={[
                styles.subtitleText,
                {color: colors.buttonText, fontSize: 13},
              ]}>
              {category.name}
            </Text>
          </View>
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default CategoryContainer;

const styles = StyleSheet.create({
  categoryMainContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  subtitleText: {
    fontFamily: 'FiraCode-Medium',
    fontSize: 15,
    includeFontPadding: false,
  },
  categoryContainer: {
    height: 45,
    padding: 10,
    marginRight: 5,
    marginTop: 5,
    borderRadius: 5,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
