import React, { useEffect, useState, useContext } from 'react'
import { Colors } from '@/constants/Colors'
import { Entypo, MaterialIcons } from '@expo/vector-icons'
import { FlatList, Pressable, View } from 'react-native'
import { Appearance, Platform, SafeAreaView, ScrollView, StyleSheet, Text, TextInput } from 'react-native'
// import RNFS from "react-native-fs"

import {listData} from "@/constants/ListItems"
import { Link, router, useRouter } from 'expo-router'

import { Inter_500Medium, useFonts } from '@expo-google-fonts/inter'
import { ThemeContext, ThemeProvider } from '@/context/ThemeContext'
import Animated, { LinearTransition, FadeInDown, FadeOutDown, FadeOut } from 'react-native-reanimated'
import AsyncStorage from '@react-native-async-storage/async-storage'

export default function AllLists() {
    const Container = Platform.OS === "web" ? ScrollView : SafeAreaView
    // const colorScheme = Appearance.getColorScheme()
    const {theme, colorScheme, setColorScheme} = useContext(ThemeContext)
    // const theme = colorScheme === "dark"? Colors.dark : Colors.light    
    const randomColor1 = `rgb(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)})`
    const randomColor2 = `rgb(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)})`

    const styles = createStyles(theme, colorScheme, randomColor1, randomColor2)
    const [todos, setTodos] = useState(listData.sort((a,b)=> b.id - a.id))
    const [loaded, error] = useFonts({ Inter_500Medium })
    const router = useRouter()

    useEffect(() => {
        const fetchedData = async()=>{
            try {
                const jsonValue = await AsyncStorage.getItem("NewTodo")
                const storedjsonValue = jsonValue != null ? JSON.parse(jsonValue) : null
                if(storedjsonValue && storedjsonValue.length) setTodos(storedjsonValue.sort((a,b)=> b.id - a.id))
                else{
                    setTodos(listData.sort((a,b)=> b.id - a.id))
                }
            } catch (error) {
                console.error(error)
            }
        }
        fetchedData()
    }, [listData]);

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
    
    if(!loaded && !error) return null
    
    // const filePath = RNFS.DocumentDirectoryPath + "/constants/ListItems.js"

    const toggleStatus = (id)=>{
        setTodos(todos.map(todo => todo.id === id ? {...todo, status: !todo.status} : todo))
    }
    const deleteTask = (id)=>{
        setTodos(todos.filter(todo => todo.id !== id))
    }
    const deleteAllTasks = ()=>{
        setTodos(!listData)
    }
    
    const handlePress = (id)=>{
        router.push(`/todos/${id}`)
    }

    return (
        <Container style={styles.mainBody}>
            {/* <View style={styles.searchBody}>
                <TextInput style={styles.searchBox} placeholder='Enter List Name' />
                <MaterialIcons name='search' size={30}  />
            </View> */}
            <View style={styles.toggleMode}>
                <Pressable onPress={()=> setColorScheme( colorScheme === "dark" ? "light" : "dark")}>
                    {colorScheme === "dark" ? 
                        <MaterialIcons name="dark-mode" size={24} color={"rgb(219, 218, 218)"} />
                        :
                        <MaterialIcons name='light-mode' size={24} color={"rgb(230, 164, 22)"}/>

                    }
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
                    <Animated.View 
                    entering={FadeInDown.delay(index * 100)}
                    exiting={FadeOut}
                    style={styles.listName}>
                        <View style={{flexDirection: "row",  justifyContent: "space-between", alignItems: "center"}}>
                            <Pressable onPress={()=>toggleStatus(item.id)}>
                                <Text style={{fontFamily: "Inter_500Medium", fontSize: 12, padding: 5, backgroundColor: colorScheme === "dark" ? "rgb(19, 19, 19)" : "white", borderRadius: 5, fontWeight: 700, width: "fit", marginBottom: 10, alignSelf: "flex-start", textDecorationLine: item.status === true ? "line-through" : "none", color: item.status === true ? "rgb(78, 78, 78)" : "rgb(255,255,255)" && colorScheme === "dark" ? "white" : "black" }}>
                                    {item.title}
                                </Text>
                            </Pressable>
                            <View style={{flexDirection: "row", alignItems: "center", gap: 14}}>
                                <Pressable onPress={()=> handlePress(item.id)}><Entypo name="edit" size={24} color="rgb(8, 36, 73)" /></Pressable>
                                <Pressable onPress={()=>deleteTask(item.id)}>
                                    <MaterialIcons name="delete" size={24} color="rgb(80, 3, 3)" />
                                </Pressable>
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
        
    )
}
function createStyles(theme, colorScheme, randomColor1, randomColor2){
   return StyleSheet.create({
    toggleMode:{
        display: "flex",
        flexDirection: "row",
        justifyContent: "flex-end",
        padding: 10,
        // backgroundColor: colorScheme === "dark"? "rgb(51, 48, 48)" : "rgb(128, 192, 218)",
        gap: 10,
        position: "fixed",
        top: 0,
        right: 20,
        zIndex: 50
    },
    mainBody:{
        width: "100%",
        height: "100%",
        overflowX: "scroll",
        backgroundColor: colorScheme === "dark" ? "black" : "white"
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
        borderRadius: 50,
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

