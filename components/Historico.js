import {
    StyleSheet, 
    View 
} from 'react-native'
import React from 'react'
import Cartao from './Cartao'
import { Avatar, ListItem } from '@rneui/base'

const HistoricoItem = ({previsao}) => {
    return (
        <Cartao
            meusEstilos={styles.cartao}>
            <View style={styles.tela}>
                <View style={{border: '1px solid black', borderRadius: 8, marginBottom: 8}}>
                    <View>
                        <ListItem.Content style={styles.primeiraLinha}>
                            <ListItem.Subtitle style={{fontSize: 10}}>{ new Date(previsao.data).toLocaleString()}</ListItem.Subtitle>
                        </ListItem.Content>
                    </View>
                    
                    <ListItem style={styles.tela}>
                        <Avatar rounded source={{ uri: previsao.link }}/>
                        <ListItem.Content style={styles.temp}>
                            <ListItem.Title style={{width: '100vw'}}>{previsao.cidade}</ListItem.Title>
                        </ListItem.Content>
                    </ListItem>
                </View>
            </View>
        </Cartao>
  )
}


export default HistoricoItem

const styles = StyleSheet.create({
    cartao: {
        marginBottom: 4,
        
    },
    tela: {
        flexDirection: 'row',
        width: '20vw'
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