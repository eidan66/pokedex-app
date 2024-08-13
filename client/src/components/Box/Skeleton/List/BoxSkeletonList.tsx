import { FlatList, StyleSheet } from 'react-native';

import { BoxSkeleton } from '../BoxSkeleton';

export const BoxSkeletonList = () => {
  const skeletonArray = Array(10).fill(0);

  return (
    <FlatList
      data={skeletonArray}
      renderItem={() => <BoxSkeleton />}
      keyExtractor={(item, index) => `skeleton-${index}`}
      numColumns={2}
      columnWrapperStyle={styles.row}
      testID="skeleton-box-list"
    />
  );
};
const styles = StyleSheet.create({
  row: {
    flex: 1,
    justifyContent: 'space-around',
    marginBottom: 10,
  },
});
