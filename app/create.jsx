import { Colors } from '@/constants/Colors'
import { Entypo } from '@expo/vector-icons'
import React from 'react'
import { View } from 'react-native'
import { Appearance, Platform, SafeAreaView, ScrollView, StyleSheet, Text, TextInput } from 'react-native'

export default function Create() {
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
        <View style={styles.listName}>
            <Text>
                List Name
            </Text>
            <Text>
                List Creation Date
            </Text>
            <Text>
                List Status
            </Text>

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
        maxWidth: "90%"
    },
    searchBox:{
        borderWidth: 1,
        borderRadius: 50,
        borderColor: "black",
        padding: 15,
        width: "100%"
    },
    listName: {
        width: "75%",
        marginLeft: 30,
        backgroundColor: "purple",
        borderWidth: 1,
        borderRadius: 10,
        padding: 10
    }
    })
  };