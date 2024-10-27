import { useState } from 'react';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import {
  TouchableOpacity,
  TextInput,
  View,
  Text,
  StyleSheet,
} from 'react-native';

export default Item = ({ item,index, onDelete ,onEdit}) => {
  const [isEdit, setIsEdit] = useState(false);
  const [editText, setEditText] = useState('');

  return (
    <TouchableOpacity style={[styles.item, { backgroundColor: item.color }]}>
      {!isEdit ? (
        <Text style={[styles.title, { color: 'white' }]}>{item.title}</Text>
      ) : (
        <TextInput style={styles.textInput} value={editText} onChangeText={setEditText} />
      )}

      <View style={{ flexDirection: 'row', columnGap: 5 }}>
        {isEdit ? (
          <MaterialIcons
            name="save"
            size={32}
            color="white"
            onPress={() => onEdit(index,editText)}
          />
        ) : (
          <MaterialIcons
            name="edit"
            size={32}
            color="white"
            onPress={() => setIsEdit(!isEdit)}
          />
        )}

        <MaterialCommunityIcons
          name="delete-forever-outline"
          size={32}
          color="white"
          onPress={onDelete}
        />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  item: {
    padding: 20,
    borderRadius: 8,
    marginBottom: 10,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    columnGap: 10,
  },
  textInput: {
    flex: 1,
    padding: 8,
    borderWidth: 1,
    borderColor: 'back',
    color: 'white',
    borderRadius: 8,
  },

  title: {
    fontSize: 24,
  },
});
