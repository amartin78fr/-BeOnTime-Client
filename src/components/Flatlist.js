import React from 'react';
import {
  View,
  FlatList,
  ActivityIndicator,
  StyleSheet,
  Text,
} from 'react-native';

const InfiniteScroll = ({
  loading = false,
  isFinish = false,
  loadingText,
  renderLoading,
  onLoadMore,
  ...rest
}) => {
  return (
    <View style={styles.container}>
      <FlatList
        testID="flatlist-infinite-scroll"
        onEndReached={() => {
          if (!loading && typeof onLoadMore === 'function' && !isFinish) {
            onLoadMore();
          }
        }}
        onEndReachedThreshold={0.2}
        {...rest}
      />

      {loading ? (
        typeof renderLoading === 'function' ? (
          renderLoading()
        ) : (
          <View style={styles.loadingWrapper} testID="loading-wrapper">
            <ActivityIndicator size="large" />

            {loadingText ? (
              <Text style={styles.loadingText} testID="loading-text">
                {loadingText}
              </Text>
            ) : null}
          </View>
        )
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loadingWrapper: {
    marginVertical: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 8,
  },
});

export default InfiniteScroll;
