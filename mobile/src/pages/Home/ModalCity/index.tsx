import React, { useEffect, useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, ScrollView, StyleSheet } from 'react-native';
import { Feather as Icon } from '@expo/vector-icons';
import axios from 'axios';

interface PropsModalCity {
  cities: string[];
  setCity: Function;
  setVisible: Function;
}

const ModalCity: React.FC<PropsModalCity> = ({ cities, setCity, setVisible }) => {

  const [searchedCity, setSearchedCity] = useState<string[]>([]);
  const [data, setData] = useState<string[]>([]);

  function handleSetCity(uf: string) {
    setCity(uf);
    handleOutModal();
  }
  function handleOutModal() {
    setVisible(false)
  }
  function handleSearch(text: string){
    const searchedText = text.toUpperCase()
      .normalize('NFD')
      .replace(/([\u0300-\u036f]|[^0-9a-zA-Z\s])/g, '');
    const arrSearched = cities.filter(city => {
      const cityUpperCase = city.toUpperCase()
        .normalize('NFD')
        .replace(/([\u0300-\u036f]|[^0-9a-zA-Z\s])/g, '');
      if(cityUpperCase.includes(searchedText)){
        return city;
      }
    });
    setSearchedCity(arrSearched);
  }
  return (
    <>
    <View style={styles.inputContainer}>
      <View style={styles.inputIcon}>
        <Text>
            <Icon name='search' size={20} color='#333' />
        </Text>
      </View>
        <TextInput 
          style={styles.inputTextArea}
          placeholder='Pesquisar...'
          onChangeText={(text) => handleSearch(text)}
        />
    </View>
    <ScrollView style={styles.modal}>
      { searchedCity.length > 0 
      ? searchedCity.map(city => (
        <TouchableOpacity
          key={city}
          style={styles.container}
          onPress={() => handleSetCity(city)}
        >
          <Text style={styles.text}>
            {city}
          </Text>
        </TouchableOpacity>
        )) 
        : cities.map(city => (
            <TouchableOpacity
              key={city}
              style={styles.container}
              onPress={() => handleSetCity(city)}
            >
              <Text style={styles.text}>
                {city}
              </Text>
            </TouchableOpacity>
          )) }
    </ScrollView>
      <TouchableOpacity
        style={styles.buttom}
        onPress={handleOutModal}
        activeOpacity={0.8}>
        <View style={styles.buttonIcon}>
          <Text>
            <Icon name='arrow-left' color='#fff' size={24} />
          </Text>
        </View>
        <Text style={styles.textButtom}>
          Voltar
        </Text>
      </TouchableOpacity>
    </>
  );
}

const styles = StyleSheet.create({
  modal: {
    flex: 1,
    marginHorizontal: '10%',
    marginVertical: '10%',
    backgroundColor: '#333',
    borderRadius: 8,
  },
  inputContainer:{
    width: '100%',
    height: 60,
    flexDirection:'row',
    alignItems: 'center',
    backgroundColor:'#f5f5f5',
    borderRadius: 8,
  },
  inputIcon: {
    height: 60,
    width: 60,
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
    justifyContent: 'center',
    alignItems: 'center'
  },
  inputTextArea: {
    flex:1,
    paddingHorizontal:10,
    fontSize:16,
  },

  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 2,
    paddingVertical: 15,
    marginHorizontal: 5,
    borderRadius: 4,
  },
  text: {
    fontSize: 16,
    color: '#fff',
  },
  buttom: {
    flexDirection: 'row',
    overflow: 'hidden',
    backgroundColor: '#34CB79',
    marginHorizontal: '10%',
    borderRadius: 4,
    alignItems: 'center',
  },
  buttonIcon: {
    height: 60,
    width: 60,
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
    justifyContent: 'center',
    alignItems: 'center'
  },
  textButtom: {
    flex: 1,
    justifyContent: 'center',
    textAlign: 'center',
    color: '#FFF',
    fontFamily: 'Roboto_500Medium',
    fontSize: 16,
  }
})
export default ModalCity;