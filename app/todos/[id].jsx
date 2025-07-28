import { listData } from "@/constants/ListItems";
import { ThemeContext } from "@/context/ThemeContext";
import { Entypo, MaterialIcons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router, useLocalSearchParams, useRouter } from "expo-router";
import { useContext, useEffect, useState } from "react";
import { View, Text, SafeAreaView, StyleSheet, TextInput, Pressable } from "react-native";
import Animated, { FadeInDown, FadeOut } from "react-native-reanimated";

export default function EditTitle(){
    const [todos, setTodos] = useState({})
    const { id } = useLocalSearchParams()
    const router = useRouter()

    const {theme, colorScheme} = useContext(ThemeContext)
    const randomColor1 = `rgb(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)})`
    const randomColor2 = `rgb(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)})`
    const styles = createStyles(theme, colorScheme, randomColor1, randomColor2)
    
    useEffect(()=>{
        const fetchStorageData = async(id)=>{
            try {
                const jsonValue = await AsyncStorage.getItem("NewTodo")
                const savedData = jsonValue != null ? JSON.parse(jsonValue) : null

                if(savedData && savedData.length){
                    const fetchData = savedData.find(todo => todo.id.toString() === id)
                    setTodos(fetchData)
                }
            } catch (error) {
                console.error(error)
            }
        }
        fetchStorageData(id)
    }, [id])

    const handleSave = async()=>{
        try {
            const savedData = {...todos, title: todos.title}
            const jsonValue = await AsyncStorage.getItem("NewTodo")
            const storedData = jsonValue != null ? JSON.parse(jsonValue) : null

            if (storedData && storedData.length){
                const dropData = storedData.filter(todo => todo.id !== savedData.id)
                const allNewData = [...dropData, savedData]
                await AsyncStorage.setItem("NewTodo", JSON.stringify(allNewData))
            }else{
                await AsyncStorage.setItem("NewTodo", JSON.stringify[savedData])
            }
            router.push("/allLists")
        } catch (error) {
            console.error(error)
        }
    }

    return(
        <SafeAreaView>
            {/* <Animated.View style={[styles.listName, {display: todos.status === true ? "none" : "flex"}]} */}
            <Animated.View style={[styles.listName]}
            entering={FadeInDown.delay(100)}
            exiting={FadeOut}>
                <View style={{flexDirection: "row",  justifyContent: "space-between", alignItems: "center"}}>
                    <TextInput autoFocus={true} value={todos?.title || ""} onChangeText={(text)=>setTodos(prev => ({ ...prev, title: text}))} style={{fontFamily: "Inter_500Medium", fontSize: 12, padding: 5, backgroundColor: randomColor2, borderRadius: 5, fontWeight: 700, width: "fit", marginBottom: 10, alignSelf: "flex-start", borderColor: "rgb(245, 193, 49)", borderWidth: 2}}>
                        
                    </TextInput>
                </View>
                <View style={{flexDirection: "row", justifyContent: "space-between"}}>
                    <Text style={{fontStyle: "italic", fontWeight: 500, fontSize: 10}}>
                        Creation Date
                    </Text>
                    <Text style={{fontStyle: "italic", fontWeight: "300", fontSize: 10}}>
                        {todos.date_created}
                    </Text>
                </View>
            </Animated.View>
            <View>
                <Pressable onPress={()=>handleSave()}><Text>Save</Text></Pressable>
                <Pressable onPress={()=> router.push("/allLists")}><Text>Cancel</Text></Pressable>
            </View>
        </SafeAreaView>
    )
}

export function createStyles(theme, colorScheme, randomColor1){
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
}