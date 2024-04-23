import React, {useEffect, useState} from 'react';
import {StyleSheet} from 'react-native';

import {FadeIn} from 'react-native-reanimated';

import {PostDelayProps} from './type';
import {AnimatedView} from '../core';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

const DURATION = 300;

export const PostDelay = ({
  children,
  durationMs = DURATION,
}: PostDelayProps) => {
  // state
  const [loaded, setLoaded] = useState<boolean>(false);

  // effect
  useEffect(() => {
    const id = setTimeout(() => {
      setLoaded(true);
    }, 0);

    return () => {
      clearTimeout(id);
    };
  }, []);

  // render
  return loaded ? (
    <AnimatedView
      entering={FadeIn.duration(durationMs)}
      style={[styles.container]}>
      {children}
    </AnimatedView>
  ) : null;
};
