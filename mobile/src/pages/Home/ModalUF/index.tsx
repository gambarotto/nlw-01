import React, { useEffect, useState } from 'react';
import { View, TouchableOpacity, Text, ScrollView, StyleSheet } from 'react-native';
import { Feather as Icon } from '@expo/vector-icons';
import axios from 'axios';

interface PropsModalUF {
  ufs: string[];
  setUF: Function;
  setVisible: Function;
}

const ModalUF: React.FC<PropsModalUF> = ({ufs, setUF, setVisible}) => {

  function handleSetUF(uf: string){
    setUF(uf);
    handleOutModal();
  }
  function handleOutModal(){
    setVisible(false)    
  }

  return (
    <>
      <ScrollView style={styles.modal}>
        { ufs.map(uf => (
          <TouchableOpacity 
            key={uf}
            style={styles.container}
            onPress={() => handleSetUF(uf)}
            >
            <Text style={styles.text}>
              {uf}
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
    marginVertical:'20%',
    backgroundColor: '#333',
    borderRadius: 8,
  },
  container: {
    flex:1,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 2,
    paddingVertical:15,
    marginHorizontal:5,
    borderRadius:4,
  },
  text: {
    fontSize: 16,
    color: '#fff',
  },
  buttom: {
    flexDirection:'row',
    overflow: 'hidden',
    backgroundColor: '#34CB79',
    marginHorizontal:'10%',
    borderRadius:4,
    alignItems:'center',
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
export default ModalUF;