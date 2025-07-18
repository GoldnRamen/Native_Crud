import React from 'react'
import { Colors } from '@/constants/Colors'
import { Entypo, MaterialIcons } from '@expo/vector-icons'
import { View } from 'react-native'
import { Appearance, Platform, SafeAreaView, ScrollView, StyleSheet, Text, TextInput } from 'react-native'

export default function AllLists() {
    const Container = Platform.OS === "web" ? ScrollView : SafeAreaView
    const colorScheme = Appearance.getColorScheme()
    const theme = colorScheme === "dark"? Colors.dark : Colors.light
    const styles = createStyles(theme, colorScheme)

    return (
        <Container style={styles.mainBody}>
            <View style={styles.searchBody}>
                <TextInput style={styles.searchBox} placeholder='Enter List Name' />
                <Entypo name='add-to-list' size={30}  />
            </View>
            <View>
                <View style={styles.listName}>
                    <View style={{flexDirection: "row", justifyContent: "space-between", alignItems: "center"}}>
                        <Text style={{fontSize: 20, backgroundColor: "rgb(219, 129, 55)", padding: 5, borderRadius: 5, fontWeight: 700, width: "fit", marginBottom: 10, alignSelf: "flex-start"}}>
                            List Name
                        </Text>
                        <View style={{flexDirection: "row", alignItems: "center", gap: 14}}>
                            <Entypo name="edit" size={24} color="black" />
                            <MaterialIcons name="delete" size={24} color="black" />
                        </View>
                    </View>
                    <View style={{flexDirection: "row", fontWeight: "500", justifyContent: "space-between", alignItems: "center", width: "100%"}}>
                        <Text style={{fontWeight: "500"}}>
                            List Status:
                        </Text>
                        <View style={{flexDirection: "row", gap: 3, alignItems: 'center'}}>
                            <View style={{backgroundColor: "green", height: 15, width: 15, borderRadius: 50}}></View>
                            <Text style={{fontWeight: 500}}>Completed</Text>
                        </View>
                    </View>
                    <View style={{flexDirection: "row", justifyContent: "space-between"}}>
                        <Text style={{fontStyle: "italic", fontWeight: 500}}>
                            Creation Date
                        </Text>
                        <Text style={{fontStyle: "italic", fontWeight: "300"}}>
                            14/11/2024
                        </Text>
                    </View>
                </View>
                <View style={styles.listName}>
                    <View style={{flexDirection: "row", justifyContent: "space-between", alignItems: "center"}}>
                        <Text style={{fontSize: 20, backgroundColor: "rgb(219, 129, 55)", padding: 5, borderRadius: 5, fontWeight: 700, width: "fit", marginBottom: 10, alignSelf: "flex-start"}}>
                            List Name
                        </Text>
                        <View style={{flexDirection: "row", alignItems: "center", gap: 14}}>
                            <Entypo name="edit" size={24} color="black" />
                            <MaterialIcons name="delete" size={24} color="black" />
                        </View>
                    </View>
                    <View style={{flexDirection: "row", fontWeight: "500", justifyContent: "space-between", alignItems: "center", width: "100%"}}>
                        <Text style={{fontWeight: "500"}}>
                            List Status:
                        </Text>
                        <View style={{flexDirection: "row", gap: 3, alignItems: 'center'}}>
                            <View style={{backgroundColor: "yellow", height: 15, width: 15, borderRadius: 50}}></View>
                            <Text style={{fontWeight: 500}}>Pending</Text>
                        </View>
                    </View>
                    <View style={{flexDirection: "row", justifyContent: "space-between"}}>
                        <Text style={{fontStyle: "italic", fontWeight: 500}}>
                            Creation Date
                        </Text>
                        <Text style={{fontStyle: "italic", fontWeight: "300"}}>
                            14/11/2024
                        </Text>
                    </View>
                </View>
            </View>

        </Container>
        
    )
}
function createStyles(theme, colorScheme){
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
        borderRadius: 50,
        borderColor: "black",
        padding: 15,
        width: "100%",
        minWidth: 0
    },
    listName: {
        width: "75%",
        marginLeft: 30,
        backgroundColor: "pink",
        borderWidth: 1,
        borderRadius: 10,
        padding: 10,
        marginVertical: 10
    }
    })
  };

