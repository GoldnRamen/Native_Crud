import { Colors } from '@/constants/Colors'
import { Entypo, MaterialIcons } from '@expo/vector-icons'
import React, { useState } from 'react'
import { FlatList, Pressable, View } from 'react-native'
import { Appearance, Platform, SafeAreaView, ScrollView, StyleSheet, Text, TextInput } from 'react-native'
import CheckBox from '@react-native-community/checkbox'

import { listData } from '@/constants/ListItems'

export default function Create() {
    const Container = Platform.OS === "web" ? ScrollView : SafeAreaView
    const colorScheme = Appearance.getColorScheme()
    const theme = colorScheme === "dark"? Colors.dark : Colors.light
    const randomColor1 = `rgb(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)})`
    const randomColor2 = `rgb(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)})`

    const styles = createStyles(theme, colorScheme, randomColor1, randomColor2)

    const [todos, setTodos] = useState(listData.sort((a,b)=> b.id - a.id))
        const [status, setStatus] = useState(false)
    
        const [text, setText] = useState("")

        const addList = ()=>{
            if (text.trim()){
                const newId = todos.length > 0 ? todos[0].id + 1 : 1
                const todayDate = new Date()
                const currentDate = `${todayDate.getDate()}-${todayDate.getMonth() + 1}-${todayDate.getFullYear()}`
                setTodos([{id: newId, title: text, date_created: currentDate, status: status}, ...todos])
                setText("")
            }
        }
  return (
    <Container style={styles.mainBody}>
        <View style={styles.searchBody}>
            <TextInput style={styles.searchBox} placeholder='Enter List Title' value={text} onChangeText={setText}/>
            <Pressable onPress={addList}><MaterialIcons name='add' size={30}  /></Pressable>
        </View>
        <FlatList
            data={todos}
            keyExtractor={(item) => item.id.toString()}
            showsVerticalScrollIndicator = {true}
            ListEmptyComponent={<Text>No Content</Text>}
            renderItem = {({item}) => (
                <View style={[styles.listName, {display: item.status === true ? "none" : "flex"}]}>
                    <View style={{flexDirection: "row",  justifyContent: "space-between", alignItems: "center"}}>
                        <Pressable onPress={()=>toggleStatus(item.id)}>
                            <Text style={{fontSize: 12, padding: 5, backgroundColor: randomColor2, borderRadius: 5, fontWeight: 700, width: "fit", marginBottom: 10, alignSelf: "flex-start", textDecorationLine: item.status === true ? "line-through" : "none"}}>
                                {item.title}
                            </Text>
                        </Pressable>
                        <View style={{flexDirection: "row", alignItems: "center", gap: 14}}>
                            <Entypo name="edit" size={20} color="rgb(8, 36, 73)" />
                            <MaterialIcons name="delete" size={20} color="rgb(80, 3, 3)" />
                        </View>
                    </View>
                    <View style={{flexDirection: "row", fontWeight: "500", justifyContent: "space-between", alignItems: "center", width: "100%"}}>
                        <Text style={{fontWeight: "500", fontSize: 10}}>
                            List Status:
                        </Text>
                        <View style={{flexDirection: "row", gap: 3, alignItems: 'center'}}>
                            <View style={{backgroundColor: item.status === true ? "green" : "yellow", height: 15, width: 15, borderRadius: 50, borderWidth: 1}}></View>
                            <View>{item.status.toString() === "true"? <Text style={{fontWeight: 500, fontSize: 12}}>Completed</Text> : <Text>Pending</Text>}</View>
                        </View>
                    </View>
                    <View style={{flexDirection: "row", justifyContent: "space-between"}}>
                        <Text style={{fontStyle: "italic", fontWeight: 500, fontSize: 10}}>
                            Creation Date
                        </Text>
                        <Text style={{fontStyle: "italic", fontWeight: "300", fontSize: 10}}>
                            {item.date_created}
                        </Text>
                    </View>
                </View>
                )}>

        </FlatList>


    </Container>
    
  )
}
function createStyles(theme, colorScheme, randomColor1, randomColor2){
   return StyleSheet.create({
    mainBody:{
        width: "100%",
        height: "100%",
        overflowX: "scroll"
    },
    searchBody:{
        padding: 10,
        flexDirection: "row",
        gap: 3,
        alignItems: "center",
        width: "100%",
        justifyContent: "space-between"
    },
    searchBox:{
        flex: 1,
        marginRight: 5,
        borderWidth: 1,
        borderRadius: 20,
        borderColor: "black",
        padding: 15,
        width: "100%",
        minWidth: 0
    },
    listName: {
        width: "75%",
        marginLeft: 30,
        backgroundColor: randomColor1,
        borderWidth: 1,
        borderRadius: 10,
        padding: 10,
        marginVertical: 10
    }
    })
  };