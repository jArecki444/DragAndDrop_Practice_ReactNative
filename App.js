import React, { Component } from "react";
import {
  View,
  TouchableOpacity,
  Text,
  SafeAreaView,
  StyleSheet
} from "react-native";
import DraggableFlatList from "react-native-draggable-flatlist";
import Collapsible from "react-native-collapsible";

class App extends Component {

  state = {
    data: [
      {
        id: 1,
        title: "Header1",
        data: ["item1", "item2", "item3", "item4"]
      },
      { id: 2, title: "Header2", data: ["item5", "item6", "item7", "item8"] },
      { id: 3, title: "Header3", data: ["item9", "item10", "item11", "item12"] }
    ],
    collapsibleItems: []
  };

  _setCollapsible = id => {
    // clone ids
    const newIds = [...this.state.collapsibleItems];

    // check to add /remove id
    const index = newIds.indexOf(id);
    if (index > -1) {
      newIds.splice(index, 1);
    } else {
      newIds.push(id);
    }

    // set new ids
    this.setState({ collapsibleItems: newIds });
  };

  _renderSectionHeader(section, index, move, moveEnd) {
    return (
      <TouchableOpacity
        style={styles.sectionHeader}
        onLongPress={move}
        onPressOut={moveEnd}
        onPress={() => this._setCollapsible(section.id)}
      >
        <Text style={styles.sectionTitle}>{section.title}</Text>
      </TouchableOpacity>
    );
  }

  _renderSectionItems(section) {
    return (
      <View style={styles.sectionItems}>
        {section.data.map(item => (
          <Text style={styles.itemText} key={item}>
            {item}
          </Text>
        ))}
      </View>
    );
    //return <View style={{ height: 100, backgroundColor: "green" }}></View>;
  }

  renderItem = ({ item, index, move, moveEnd, isActive }) => {
    return (
      <React.Fragment>
        {this._renderSectionHeader(item, index, move, moveEnd)}
        <Collapsible collapsed={this.state.collapsibleItems.includes(item.id)}>
          {this._renderSectionItems(item)}
        </Collapsible>
      </React.Fragment>
    );
  };

  // collapsed={this.state.collapsibleIndex !== index}

  render() {
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <DraggableFlatList
          data={this.state.data}
          renderItem={this.renderItem}
          keyExtractor={(item, index) => `draggable-item-${item.id}`}
          scrollPercent={5}
          onMoveEnd={({ data }) => this.setState({ data })}
          extraData={this.state.collapsibleItems}
        />
      </SafeAreaView>
    );
  }
}

export default App;

const styles = StyleSheet.create({
  sectionHeader: {
    backgroundColor: "#C0C0C0",
    padding: 20
  },
  sectionTitle: {
    fontWeight: "bold",
    fontSize: 20
  },
  sectionItems: { backgroundColor: "red" },
  itemText: { padding: 20 }
});
