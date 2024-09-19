import React from 'react';
import { ScrollView, TouchableOpacity, Text, View, StyleSheet } from 'react-native';

const Tabs = ({ data, tabVal, settabData, bgcolor }) => {
  return (
    <View style={styles.container}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={[styles.scrollView, { backgroundColor: bgcolor }]}>
        {data.map((tab, i) => (
          <TouchableOpacity key={i} onPress={() => settabData(tab.name)} style={[styles.item, tabVal === tab.name && styles.itemActive]}>
            <Text style={styles.tabText}>{tab.name}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    paddingVertical: 5,
    paddingLeft: 3,
    paddingRight: 4,
  },
  scrollView: {
    height: 40,
  },
  item: {
    backgroundColor: '#d9deea90',
    paddingHorizontal: 15,
    paddingVertical: 7,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: 'rgba(211,211,211,0.5)',
    marginLeft: 10,
    justifyContent: 'center',
  },
  itemActive: {
    borderColor: 'red',
  },
  tabText: {
    color: '#000',
  },
});

export default Tabs;
