import { useState } from 'react'
import { 
  Button,
  FlatList,
  StyleSheet,
  TextInput, 
  View
} from 'react-native';

import{
  PROTOCOL,
  BASE_URL,
  UNITS,
  CNT,
  LANGUAGE,
  APPID
} from '@env'

import PrevisaoItem from './components/PrevisaoItem';
import HistoricoItem from './components/Historico';
import * as previsaoService from './service/PrevisaoService';
import { Tab, Text, TabView } from '@rneui/themed';

export default function App() {
  const [cidade, setCidade] = useState('')
  const [previsoes, setPrevisoes] = useState([])
  const [mensagem, setMensagem] = useState('')
  const [index, setIndex] = useState(0);
  const [bdPrevisoes, setBdPrevisoes] = useState([]);

  const capturarCidade = (cidadeDigitada) => {
    setCidade(cidadeDigitada)
  }

  const obterPrevisoes = () => {
    const url = encodeURI(`${PROTOCOL}://${BASE_URL}?units=${UNITS}&cnt=${CNT}&lang=${LANGUAGE}&appid=${APPID}&q=${cidade}`)
    fetch(url)
    .then (response => response.json())
    .then(dados => {
      setPrevisoes(dados['list'])
      addPrevisao(dados['list'])
    })
  }

  const addPrevisao = async (listPrevisoes) => {
      try{
          if(listPrevisoes){
            return listPrevisoes.map(async (previsao) => {
              const res = await previsaoService.cadastrarPrevisoes({cidade: cidade, data: new Date(previsao.dt_txt), link: 'https://openweathermap.org/img/wn/' + previsao.weather[0].icon + '.png'})
              setMensagem('Previsão cadastrada com sucesso')
              setInterval(() => {setMensagem()}, 2500)
            });
          }else{
            setMensagem();
          }
      }
      catch(erro){
          console.log('erro', erro)
          setMensagem('Falha. Tente novamente mais tarde')
          setInterval(() => {setMensagem()}, 2500)
      }
  }

  const getPrevisoes = async() =>{
    const allPrevisoes = await previsaoService.obterLista();
    setBdPrevisoes(allPrevisoes.data.items);
  }

  const functionCombine = () =>{
    obterPrevisoes();
    addPrevisao();
  }

  return (
    <>
      <Tab value={index} onChange={(e) => setIndex(e)}>
        <Tab.Item title="Pesquisar" titleStyle={{ fontSize: 16 }}/>
        <Tab.Item title="Histórico" titleStyle={{ fontSize: 16 }}/>
      </Tab>

      <TabView value={index} onChange={setIndex} animationType="spring" variant="primary">
        <TabView.Item style={{width: '100%'}}>
            <View style={styles.container}>
              <View
                style={styles.cidadeView}>
                {/* View para a entrada de dados */}
                <TextInput 
                  style={styles.cidadeTextInput}
                  placeholder="Digite o nome da cidade"
                  value={cidade}
                  onChangeText={capturarCidade}      
                />
                <Text style={{textAlign: 'center'}}>{mensagem}</Text>
                <Button 
                  title="OK"
                  onPress={() => functionCombine()}
                />

              </View>
              {/* exibição das previsões */}
              <View
                style={{alignItems: 'center'}}>
                <FlatList 
                  data={previsoes}
                  renderItem={
                    p => (
                      <PrevisaoItem previsao={p.item}/>
                    )
                  }
                />
              </View>
            </View>
        </TabView.Item>
        
        <TabView.Item style={{width: '100%'}}>
            <View style={styles.container}>
              <View
                style={styles.cidadeView}>
                {/* View para a entrada de dados */}
                <Button
                  style={{width: '100vw'}} 
                  title="Atualizar"
                  onPress={() => getPrevisoes()}
                />

              </View>
              {/* exibição das previsões */}
              <View
                style={{alignItems: 'center'}}>
                <FlatList
                  contentContainerStyle={{justifyContent:'center'}}
                  style={{padding: 5}}
                  data={bdPrevisoes}
                  renderItem={
                    p => (
                      <HistoricoItem previsao={p.item}/>
                    )
                  }
                />
              </View>
            </View>
        </TabView.Item>
      </TabView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 40
  },
  cidadeView: {
    padding: 12,
    marginBottom: 8
  },
  cidadeTextInput: {
    padding: 12,
    borderBottomColor: '#FF9800',
    borderBottomWidth: 2,
    marginBottom: 4,
    textAlign: 'center'
  }
});