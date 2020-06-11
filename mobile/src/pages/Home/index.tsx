import React, { useEffect, useState } from 'react';
import { View, ImageBackground, ScrollView, Image, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Feather as Icon } from '@expo/vector-icons';
import { RectButton } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import Modal from 'react-native-modal';
import axios from 'axios';

import ModalUF from './ModalUF';
import ModalCity from './ModalCity';

interface IBGEUFRequest {
  sigla: string;
}

interface IBGECityRequest {
  nome: string;
}

const Home: React.FC = () => {

  const [selectedUf, setSelectedUf] = useState('');
  const [selectedCity, setSelectedCity] = useState('');
  
  const [isVisibleModalUF, setIsVisibleModalUF] = useState(false);
  const [isVisibleModalCity, setIsVisibleModalCity] = useState(false);

  const [ufs, setUfs] = useState<string[]>([]);
  const [cities, setCities] = useState<string[]>([]);

  const navigation = useNavigation();

  useEffect(() => {
    axios.get<IBGEUFRequest[]>('https://servicodados.ibge.gov.br/api/v1/localidades/estados')
      .then(response => {
        const ufs = response.data.map(uf => uf.sigla)
        setUfs(ufs)
      });
  }, []);
  useEffect(() => {
    if(selectedUf === ''){
      return;
    }
    axios.get<IBGECityRequest[]>(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${selectedUf}/municipios`)
      .then(response => {
        const cities = response.data.map(city => city.nome);
        setCities(cities);
      })
  }, [selectedUf]);

  function handleNavigateToPoints(){
    if(!selectedCity){
      return;
    };

    navigation.navigate('Points', {
      city: selectedCity,
      uf: selectedUf,
    });
  };

  return (
      <ImageBackground 
        style={styles.container}
        source={require('../../assets/home-background.png')}
        imageStyle={{ width: 274, height: 368 }}>
        <View style={styles.main}>
          <Image source={require('../../assets/logo.png')} />

          <Text style={styles.title}>Seu marketplace de coleta de resíduos</Text>
          <Text style={styles.description}>
            Ajudamos pessoas a encontrarem pontos de coleta de forma eficiente.
          </Text>
        </View>

        <View style={styles.footer}>
          <TouchableOpacity 
            style={styles.input} 
            onPress={() => setIsVisibleModalUF(!isVisibleModalUF)}>
            <Text style={styles.textModal}>
              { selectedUf ? selectedUf : 'Selecione o Estado' }
            </Text>
          </TouchableOpacity>
          <Modal
            isVisible={isVisibleModalUF}
          >
            <ModalUF 
              setVisible={setIsVisibleModalUF}
              setUF={setSelectedUf}
              ufs={ufs}
              />
          </Modal>
          <TouchableOpacity
            disabled={selectedUf ? false : true}
            style={ selectedUf ? styles.input : styles.disableInput}
            onPress={() => setIsVisibleModalCity(!isVisibleModalCity)}>
            <Text style={styles.textModal}>
              {selectedCity ? selectedCity : 'Selecione a Cidade'}
            </Text>
          </TouchableOpacity>
          <Modal
            isVisible={isVisibleModalCity}
          >
            <ModalCity
              setVisible={setIsVisibleModalCity}
              setCity={setSelectedCity}
              cities={cities}
            />
          </Modal>
          <RectButton 
            style={styles.button} 
            onPress={handleNavigateToPoints}>
            <View style={styles.buttonIcon}>
              <Text>
                <Icon name='arrow-right' color='#fff' size={24} />
              </Text>
            </View>
            <Text style={styles.buttonText}>
              Entrar
            </Text>
          </RectButton>
        </View>
      </ImageBackground>
  )
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 32,
  },

  main: {
    flex: 1,
    justifyContent: 'center',
  },

  title: {
    color: '#322153',
    fontSize: 32,
    fontFamily: 'Ubuntu_700Bold',
    maxWidth: 260,
    marginTop: 64,
  },

  description: {
    color: '#6C6C80',
    fontSize: 16,
    marginTop: 16,
    fontFamily: 'Roboto_400Regular',
    maxWidth: 260,
    lineHeight: 24,
  },

  footer: {},

  input: {
    height: 60,
    backgroundColor: '#FFF',
    borderRadius: 10,
    marginBottom: 8,
    paddingHorizontal: 24,
    justifyContent:'center',
  },
  disableInput: {
    height: 60,
    backgroundColor: '#f9f9f9',
    borderRadius: 10,
    marginBottom: 8,
    paddingHorizontal: 24,
    justifyContent: 'center',
  },
  textModal: {
    fontSize: 16,
  },

  button: {
    backgroundColor: '#34CB79',
    height: 60,
    flexDirection: 'row',
    borderRadius: 10,
    overflow: 'hidden',
    alignItems: 'center',
    marginTop: 8,
  },

  buttonIcon: {
    height: 60,
    width: 60,
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
    justifyContent: 'center',
    alignItems: 'center'
  },

  buttonText: {
    flex: 1,
    justifyContent: 'center',
    textAlign: 'center',
    color: '#FFF',
    fontFamily: 'Roboto_500Medium',
    fontSize: 16,
  }
});

export default Home;