import { Image, ImageBackground } from 'expo-image';
import { Appearance, Platform, Pressable, StyleSheet, View } from 'react-native';

import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { MaterialIcons } from '@expo/vector-icons';
import Entypo from '@expo/vector-icons/Entypo';
import { Button, Text } from '@react-navigation/elements';

import bgImg from "@/assets/images/clipboard-2693417_1280.jpg"
import { Colors } from '@/constants/Colors';
import { Link } from 'expo-router';

export default function HomeScreen() {
    const colorScheme = Appearance.getColorScheme();
    const theme = colorScheme === "dark" ? Colors.dark : Colors.light;
    const styles = createStyles(theme, colorScheme);
  return (
    <View style={styles.mainBody}>
        <ThemedView style={styles.titleContainer}>
            <ThemedText type="title" style={styles.titleText}>My To-Do App</ThemedText>
            <MaterialIcons name="checklist" size={30} color={colorScheme === "dark"? "white" : "black"}/>
        </ThemedView>
        <ImageBackground source={bgImg} style={styles.bgImage}>
            <View style={styles.actions}>
                <View>
                  <Link href={"/create"} asChild>
                    <Pressable style={styles.iconText}>
                      <Entypo name={"add-to-list"} size={20} color={"blue"}/>
                      <Text style={{color: "black"}}>Create New List</Text>
                    </Pressable>
                  </Link>  
                </View>
                <View>
                  <Link href={"/"} asChild>
                    <Pressable style={styles.iconText}>
                      <MaterialIcons name={'list'} size={20} color={"orange"}/>
                      <Text style={{color: "black"}}>See All Lists</Text>
                    </Pressable>
                  </Link>  
                </View>
                <View>
                  <Link href={"/"} asChild>
                    <Pressable style={styles.iconText}>
                      <MaterialIcons name={"delete"} size={20} color={"red"}/>
                      <Text style={{color: "black"}}>Delete All Lists</Text>
                    </Pressable>
                  </Link>  
                </View>
            </View>
            <View style={styles.buttonContainer}>
                <Button style={styles.buttons}><Text>About</Text></Button>
                <Button style={styles.buttons}><Text>Contact Us</Text></Button>
        </View>
        </ImageBackground>
    </View>
  );
}

function createStyles(theme, colorScheme){
return StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    gap: 8
  },
  titleText: {
    color: colorScheme === "dark"? "white" : "black"
  },
  mainBody:{
    padding: 10,
    height: "100%"
  },
  bgImage:{
    width: "fit",
    height: "90%",
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderRightColor: "brown",
    borderLeftColor: "brown"
  },
  actions:{
    gap:30,
    marginHorizontal: "auto",
    marginVertical: "auto",
    color: "black"
  },
  buttonContainer:{
    padding: 10,
    flex: 1,
    width: "100%",
    position: "absolute",
    bottom: 3,
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: "auto"
  },
  buttons: {
    backgroundColor: "transparent",
    alignItems: "baseline",
  },
  iconText:{
    flex: 1,
    flexDirection: "row",
    gap: 4
  }
});
}