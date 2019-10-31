import React, { Component } from 'react'
import { View, TouchableOpacity, Text, Alert } from 'react-native'
import DraggableFlatList from 'react-native-draggable-flatlist'

class App extends Component {

  state = {
    data: [...Array(20)].map((d, index) => ({
      key: `item-${index}`,
      label: index,
      backgroundColor: `rgb(${Math.floor(Math.random() * 255)}, ${index * 5}, ${132})`,
    }))
  }

  renderItem = ({ item, index, move, moveEnd, isActive }) => {
    return (

      <View style={{
        height: 100,
        backgroundColor: isActive ? 'blue' : item.backgroundColor,
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <TouchableOpacity

          onPress={() => Alert.alert('Row has been pressed')}
          onLongPress={move}
          onPressOut={moveEnd}
        >
          <Text style={{
            fontWeight: 'bold',
            color: 'white',
            fontSize: 32,
          }}>{item.label}</Text>
        </TouchableOpacity>
      </View>
    )
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <DraggableFlatList
          data={this.state.data}
          renderItem={this.renderItem}
          keyExtractor={(item, index) => `draggable-item-${item.key}`}
          scrollPercent={5}
          onMoveEnd={({ data }) => this.setState({ data })}
        />
      </View>
    )
  }
}

export default App