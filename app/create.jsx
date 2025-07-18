import { Colors } from '@/constants/Colors'
import { Entypo, MaterialIcons } from '@expo/vector-icons'
import React from 'react'
import { View } from 'react-native'
import { Appearance, Platform, SafeAreaView, ScrollView, StyleSheet, Text, TextInput } from 'react-native'
import CheckBox from '@react-native-community/checkbox'

export default function Create() {
    const Container = Platform.OS === "web" ? ScrollView : SafeAreaView
    const colorScheme = Appearance.getColorScheme()
    const theme = colorScheme === "dark"? Colors.dark : Colors.light

    const styles = createStyles(theme, colorScheme)
  return (
    <Container style={styles.mainBody}>
        <View style={styles.searchBody}>
            <TextInput style={styles.searchBox} placeholder='Enter List Title' />
            {/* <Entypo name='add-to-list' size={30}  /> */}
        </View>
        <View>
            <View style={styles.listName}>
                <View style={{flexDirection: "row", justifyContent: "space-between", alignItems: "center"}}>
                    <View style={{flexDirection: "row", alignItems: "center", gap: 14}}>
                        <MaterialIcons name="add" size={24} color="black" />
                    </View>
                     <Text style={{fontSize: 20, backgroundColor: "rgb(219, 129, 55)", padding: 5, borderRadius: 5, fontWeight: 700, width: "fit", marginBottom: 10, alignSelf: "flex-start"}}>
                        List Name
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
        borderRadius: 20,
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