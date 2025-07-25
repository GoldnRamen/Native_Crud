import { Entypo, MaterialIcons } from "@expo/vector-icons";
import { useLocalSearchParams } from "expo-router";
import { useState } from "react";
import { FlatList, Pressable } from "react-native";
import { Text, View } from "react-native";
import Animated, { FadeInDown, FadeOut, LinearTransition } from "react-native-reanimated";

export default function EditListItem(){
    const { id } = useLocalSearchParams()
    const [todos, setTodos] = useState({})
    return(
        // <View>
        //     <Text>{id}</Text>
        //     <Animated.View>
        //         <FlatList
        //         renderItem={({item}=>(
        //             <View>
        //                 {item.id}
        //             </View>
        //         ))}>

        //         </FlatList>
        //     </Animated.View>
        // </View>
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
                                <Text style={{fontFamily: "Inter_500Medium", fontSize: 12, padding: 5, backgroundColor: randomColor2, borderRadius: 5, fontWeight: 700, width: "fit", marginBottom: 10, alignSelf: "flex-start", textDecorationLine: item.status === true ? "line-through" : "none", color: item.status === true ? "rgb(66, 66, 66)" : "black"}}>
                                    {item.title}
                                </Text>
                            </Pressable>
                            <View style={{flexDirection: "row", alignItems: "center", gap: 14}}>
                                <Pressable onPress={()=> handleListItem(item.id)}>
                                    <Entypo name="edit" size={24} color="rgb(8, 36, 73)" />
                                </Pressable>
                                <Pressable onLongPress={()=>deleteTask(item.id)}>
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
    )
}