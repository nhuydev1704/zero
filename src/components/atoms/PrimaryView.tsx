import {
  StatusBar,
  StyleSheet,
  useWindowDimensions,
  View,
  ViewStyle,
} from 'react-native';
import React, {ReactNode, useMemo} from 'react';
import {Colors} from '../../hooks/useThemeColors';
import {
  InsetComponentProps,
  InsetProps,
  ScreenComponentProps,
  ScreenProps,
} from './type';
import {
  Edge,
  SafeAreaView,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';
import {FocusAwareStatusBar} from './focus-aware-status-bar';

interface PrimaryViewProps {
  colors: Colors;
  children?: ReactNode;
  style?: ViewStyle;
}

const INSETS: Edge[] = ['top', 'bottom', 'left', 'right'];

const getEdges = (
  excludeEdges: ScreenProps['excludeEdges'],
  hiddenStatusBar: boolean,
) => {
  if (excludeEdges === 'all') {
    return [];
  }

  const actualEdges = INSETS.filter(x => !(excludeEdges ?? []).includes(x));

  if (hiddenStatusBar) {
    return actualEdges.filter(x => x !== 'top');
  }

  return actualEdges;
};

const Inset = ({
  color,
  height,
  width,
  bottom,
  left,
  right,
  top,
}: InsetProps) => {
  // state
  const style = useMemo<ViewStyle>(
    () => ({
      backgroundColor: color,
      width,
      height,
      top,
      left,
      bottom,
      right,
    }),
    [bottom, color, height, left, right, top, width],
  );

  // render
  return <View style={[styles.insets, style]} />;
};

const InsetComponent = ({
  edges,
  bottomInsetColor,
  hiddenStatusBar,
  leftInsetColor,
  rightInsetColor,
  statusColor,
  unsafe,
  statusBarStyle,
}: InsetComponentProps) => {
  // state
  const inset = useSafeAreaInsets();

  const {width: screenWidth, height: screenHeight} = useWindowDimensions();

  // render
  return (
    <>
      <FocusAwareStatusBar
        hidden={hiddenStatusBar}
        backgroundColor={'transparent'}
        translucent
        barStyle={statusBarStyle || 'dark-content'}
      />
      {!unsafe && edges.includes('top') && (
        <Inset
          color={statusColor}
          top={0}
          height={inset.top}
          width={screenWidth}
        />
      )}
      {!unsafe && edges.includes('left') && (
        <Inset
          color={leftInsetColor}
          left={0}
          height={screenHeight}
          width={inset.left}
        />
      )}
      {!unsafe && edges.includes('right') && (
        <Inset
          color={rightInsetColor}
          right={0}
          height={screenHeight}
          width={inset.right}
        />
      )}
      {!unsafe && edges.includes('bottom') && (
        <Inset
          color={bottomInsetColor}
          bottom={0}
          height={inset.bottom}
          width={screenWidth}
        />
      )}
    </>
  );
};

const PrimaryView: React.FC<PrimaryViewProps> = ({
  colors,
  children,
  style,
  ...props
}) => {
  const isDark = colors.primaryBackground === '#0F0F0F';
  const {
    statusBarStyle,
    backgroundColor,
    hiddenStatusBar = false,
    statusColor = undefined,
    bottomInsetColor = '#F2F8FC',
    rightInsetColor = '#F2F8FC',
    leftInsetColor = '#F2F8FC',
  }: ScreenComponentProps = props;

  const edges = useMemo<Edge[]>(
    () => getEdges(props.excludeEdges, props?.hiddenStatusBar ?? false),
    [props.excludeEdges, props.hiddenStatusBar],
  );

  const actualUnsafe = props.unsafe || edges.length <= 0;

  const Wrapper = actualUnsafe ? View : SafeAreaView;

  return (
    <>
      <Wrapper
        edges={edges}
        style={[styles.inner, style, backgroundColor ? {backgroundColor} : {}]}>
        <View
          style={[
            styles.mainContainer,
            {backgroundColor: colors.primaryBackground},
            style,
          ]}>
          <StatusBar
            backgroundColor={colors.primaryBackground}
            barStyle={isDark ? 'light-content' : 'dark-content'}
          />
          {children}
        </View>
      </Wrapper>

      <InsetComponent
        edges={edges}
        bottomInsetColor={bottomInsetColor}
        statusColor={statusColor}
        statusBarStyle={statusBarStyle}
        hiddenStatusBar={hiddenStatusBar}
        leftInsetColor={leftInsetColor}
        rightInsetColor={rightInsetColor}
        unsafe={actualUnsafe}
      />
    </>
  );
};

export default PrimaryView;

const styles = StyleSheet.create({
  mainContainer: {
    height: '100%',
    paddingLeft: '6%',
    paddingRight: '6%',
  },
  insets: {
    position: 'absolute',
  },
  inner: {
    flex: 1,
    width: '100%',
    overflow: 'hidden',
  },
});
