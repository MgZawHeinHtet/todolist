import { useState } from 'react';

import {
  Text,
  SafeAreaView,
  StyleSheet,
  View,
  TextInput,
  TouchableOpacity,
  FlatList,
  Platform,
  StatusBar
  
} from 'react-native';

import Item from './components/Item';

const Data = [
  { title: 'shit', color: 'red' ,isDone : false },
  { title: 'nice', color: 'green', isDone : false },
];

export default function App() {
  const [toDoItem, setToDoItem] = useState(Data);
  const [inputText, setInputText] = useState('');

  function addItemToList() {
    if (inputText.length === 0) return;
    const color = toDoItem.length % 2 != 0 ? 'green' : 'red';
    const newItem = {
      title: inputText,
      color,
    };
    setToDoItem([...toDoItem, newItem]);
    setInputText('');
  }

  function textChangeEdit(index,editText) {
    let editItem = toDoItem[index];
    editItem.title = editText;
    editItem.color = 'orange';

    const updatedItem = toDoItem.map((item,i) => {
      if(index===i){
        return editItem
      }else{
        return item
      }
    });
    setToDoItem(updatedItem)
  }

  function deleteItem(index) {
    setToDoItem((items) => items.filter((item, i) => i != index));
  }

  function renderList(data) {
    return (
      <Item
        item={data.item}
        index={data.index}
        onDelete={() => deleteItem(data.index)}
        onEdit={textChangeEdit}
      />
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.textInput}
          value={inputText}
          onChangeText={(value) => setInputText(value)}
        />
        <TouchableOpacity style={styles.addBtn} onPress={addItemToList}>
          <Text style={styles.addBtnText}>Add</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        style={styles.list}
        data={toDoItem}
        renderItem={renderList}
        keyExtractor={(item) => item.title}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 20,
    paddingTop : Platform.OS === 'android' ? StatusBar.currentHeight : ''
  },
  inputContainer: {
    flexDirection: 'row',
    columnGap: 20,
  },
  textInput: {
    flex: 1,
    padding: 8,
    borderWidth: 1,
    borderColor: '#0569FF',
    borderRadius: 8,
  },

  addBtn: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderWidth: 1,
    backgroundColor: '#0569FF',
    borderColor: '#0569FF',
  },
  addBtnText: {
    color: 'white',
  },
  list: {
    marginTop: 40,
  },
});
