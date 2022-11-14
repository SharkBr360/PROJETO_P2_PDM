import { 
    StyleSheet, 
    View 
} from 'react-native'
import React from 'react'
import Cartao from './Cartao'
import { Avatar, ListItem } from '@rneui/base'

const PrevisaoItem = ({previsao}) => {
    const dt = previsao.dt_txt
    const icon = previsao.weather[0].icon
    const temp_min = previsao.main.temp_min
    const temp_max = previsao.main.temp_max

    return (
        <Cartao
            meusEstilos={styles.cartao}>
            <View style={styles.tela}>
                <View style={{border: '1px solid black', borderRadius: 8, marginBottom: 8}}>
                    <View>
                        <ListItem.Content style={styles.primeiraLinha}>
                            <ListItem.Subtitle style={{fontSize: 10}}>{dt}</ListItem.Subtitle>
                        </ListItem.Content>
                    </View>
                    
                    <ListItem style={styles.tela}>
                        <Avatar rounded source={{ uri: 'https://openweathermap.org/img/wn/' + icon + '.png' }}/>
                        <ListItem.Content style={styles.temp}>
                            <ListItem.Title>Temp</ListItem.Title>
                            <ListItem.Subtitle>Max: {temp_max + '\u00B0C'}</ListItem.Subtitle>
                        </ListItem.Content>
                        <ListItem.Content style={styles.temp}>
                            <ListItem.Title>Temp</ListItem.Title>
                            <ListItem.Subtitle>Min: {temp_min + '\u00B0C'}</ListItem.Subtitle>
                        </ListItem.Content>
                    </ListItem>
                </View>
            </View>
        </Cartao>
  )
}


export default PrevisaoItem

const styles = StyleSheet.create({
    cartao: {
        marginBottom: 4
    },
    tela: {
        flexDirection: 'row'
    },
    temp:{
        width: 85
    },
    primeiraLinha: {
        justifyContent: 'center',
        flexDirection: 'row',
        fontSize: 9
    }
})