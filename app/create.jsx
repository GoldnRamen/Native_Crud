import { Colors } from '@/constants/Colors'
import { Entypo, MaterialIcons } from '@expo/vector-icons'
import React, { useContext, useState, useEffect } from 'react'
import { FlatList, Pressable, View } from 'react-native'
import { Appearance, Platform, SafeAreaView, ScrollView, StyleSheet, Text, TextInput } from 'react-native'
import CheckBox from '@react-native-community/checkbox'
// import RNFS from 'react-native-fs'

import { listData } from '@/constants/ListItems'
import { Inter_500Medium, useFonts } from '@expo-google-fonts/inter'
import { ThemeContext, ThemeProvider } from '@/context/ThemeContext'
import Animated, {LinearTransition, FadeInDown, FadeOut} from 'react-native-reanimated'

import AsyncStorage from "@react-native-async-storage/async-storage"
import { StatusBar } from 'expo-status-bar'

// import storage from "@/utils/storage" from my dabbling with react-native-mmkv
// const STORED_KEY  = "todos" which apparently is too generic and hence the use of the one below
const STORED_KEY  = "Newtodos"

export default function Create() {
    const Container = Platform.OS === "web" ? ScrollView : SafeAreaView
    // const colorScheme = Appearance.getColorScheme()
    // const theme = colorScheme === "dark"? Colors.dark : Colors.light
    //  both are of no use rn cause i'm currently getting tyhem with ThemeContext
    const {theme, colorScheme, setColorScheme} = useContext(ThemeContext)
    const randomColor1 = `rgb(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)})`
    const randomColor2 = `rgb(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)})`
    const styles = createStyles(theme, colorScheme, randomColor1, randomColor2)

    // const [todos, setTodos] = useState(listData.sort((a,b)=> b.id - a.id)) took this off since todos is going to be empty now
    const [todos, setTodos] = useState([])
    const [status, setStatus] = useState(false)
    const [text, setText] = useState("")

    useEffect(()=>{
        const fetchData = async()=>{
            try {
                // const jsonValue = await storage.getItem(STORED_KEY) used in my mmkv trial
                const jsonValue = await AsyncStorage.getItem("NewTodo")
                const storedJSONValue = jsonValue != null ? JSON.parse(jsonValue) : null
                if (storedJSONValue && storedJSONValue.length) setTodos(storedJSONValue.sort((a,b)=> b.id - a.id))
                else{
                    setTodos(listData.sort((a,b) => b.id - a.id))
                }
            } catch (error) {
                console.error(error)
            }
        }
        fetchData()
    }, [listData])

    useEffect(()=>{
        const storedData = async()=>{
            try {
                const jSonValue = JSON.stringify(todos)
                // await storage.setItem(STORED_KEY, jSonValue)
                await AsyncStorage.setItem("NewTodo", jSonValue)
            } catch (error) {
                console.error(error)
            }
        }
        storedData()
    }, [todos])


    // const addList = async()=>{
    const addList = ()=>{
        if (text.trim()){
            const newId = todos.length > 0 ? todos[0].id + 1 : 1
            const todayDate = new Date()
            const currentDate = `${todayDate.getDate()}-${todayDate.getMonth() + 1}-${todayDate.getFullYear()}`
            // setTodos([{id: newId, title: text, date_created: currentDate, status: status}, ...todos])
            const newTodos = [
                { id: newId, title: text, date_created: currentDate, status: status },
                ...todos,
            ];
            setTodos(newTodos)

            setText("")
            // await saveToFile(newTodos)
        }
    }
    const deleteAllTasks = ()=>{
        setTodos([])
    }
  return (        
    <SafeAreaView>
        <Container style={styles.mainBody}>
            
            <View style={styles.searchBody}>
                <TextInput style={styles.searchBox} placeholder='Enter List Title' value={text} onChangeText={setText}/>
                <Pressable onPress={addList}><MaterialIcons name='add' size={30}  style={{color: colorScheme === "dark" ? "white" : "black",}}/></Pressable>
                <Pressable onPress={()=> setColorScheme( colorScheme === "dark" ? "light" : "dark")} style={styles.toggleMode}>
                    {/* {colorScheme === "dark" ? <MaterialIcons name='dark-mode'color={"rgb(219, 218, 218)"} size={24} />
                    :
                    <MaterialIcons name="light-mode" color={"rgb(230, 164, 22)"}  size={24} />
                    } */}
                    <MaterialIcons name={colorScheme === "dark" ? "dark-mode" : "light-mode" } color={colorScheme === "light" ? "rgb(230, 164, 22)" : "rgb(219, 218, 218)"} size={24}/>
                </Pressable>
            </View>
            <View>
                <Pressable style={styles.iconText} onPress={()=>deleteAllTasks()}>
                    <MaterialIcons name={"delete"} size={20} color={"rgb(105, 13, 13)"}/>
                    <Text style={{color: "rgb(255, 255, 255)", }}>Delete All Lists</Text>
                </Pressable>
            </View>
            <Animated.FlatList
                data={todos}
                keyExtractor={(item, index) => item.id.toString()}
                showsVerticalScrollIndicator = {true}
                itemLayoutAnimation={LinearTransition}
                keyboardDismissMode={"on-drag"}
                ListEmptyComponent={<Text style={{padding: 20, backgroundColor: "rgb(11, 41, 66)", color: "white"}}>No Content</Text>}
                renderItem = {({item, index}) => (
                    <Animated.View style={[styles.listName, {display: item.status === true ? "none" : "flex"}]}
                    entering={FadeInDown.delay(index * 100)}
                    exiting={FadeOut}>
                        <View style={{flexDirection: "row",  justifyContent: "space-between", alignItems: "center"}}>
                            <Text style={{fontFamily: "Inter_500Medium", fontSize: 12, padding: 5, backgroundColor: randomColor2, borderRadius: 5, fontWeight: 700, width: "fit", marginBottom: 10, alignSelf: "flex-start", textDecorationLine: item.status === true ? "line-through" : "none"}}>
                                {item.title}
                            </Text>
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
                    </Animated.View>
                    )}>

            </Animated.FlatList>
        </Container>
        <StatusBar style={ colorScheme === "dark" ? "light" : "dark"}/>
    </SafeAreaView>
  )
}
function createStyles(theme, colorScheme, randomColor1, randomColor2){
   return StyleSheet.create({
    toggleMode: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "flex-end",
        padding: 10
    },
    mainBody:{
        width: "100%",
        height: "100%",
        overflowX: "scroll",
        backgroundColor: colorScheme === "dark" ? "black" : "white",
    },
    searchBody:{
        padding: 10,
        flexDirection: "row",
        gap: 3,
        alignItems: "center",
        width: "100%",
        justifyContent: "space-between",
    },
    searchBox:{
        flex: 1,
        marginRight: 5,
        borderWidth: 1,
        borderRadius: 20,
        borderColor: colorScheme === "dark" ? "white" : "black",
        color: colorScheme === "dark" ? "white" : "black",
        padding: 15,
        width: "100%",
        minWidth: 0,
    },
    listName: {
        width: "75%",
        marginLeft: 30,
        backgroundColor: randomColor1,
        borderWidth: 1,
        borderRadius: 10,
        padding: 10,
        marginVertical: 10
    },
    iconText:{
        flex: 1,
        flexDirection: "row",
        gap: 4,
        padding: 20,
        backgroundColor: "rgb(37, 158, 108)"
    }
    })
  };