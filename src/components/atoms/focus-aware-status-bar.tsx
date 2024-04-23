import * as React from 'react';
import {StatusBar, StatusBarProps, StyleSheet, View} from 'react-native';

import {useIsFocused} from '@react-navigation/native';

export const FocusAwareStatusBar = ({
  barStyle = 'dark-content',
  ...props
}: StatusBarProps) => {
  // state
  const isFocused = useIsFocused();

  // render
  return isFocused ? (
    <View style={styles.container}>
      <StatusBar barStyle={barStyle} {...props} />
    </View>
  ) : null;
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    opacity: 0,
  },
});
