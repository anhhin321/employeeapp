import React from 'react';
import { StyleSheet, View ,Image,Text, Linking, Platform} from 'react-native';
import {LinearGradient} from 'expo-linear-gradient';
import {Title, Card, Button} from 'react-native-paper';
import { MaterialIcons,AntDesign, FontAwesome } from '@expo/vector-icons';
import firebase from '../firebase'
const Profile = (props) => {
    // const openDial = () =>{
    //     if(Platform.OS === "android"){
    //         Linking.openURL("tel:0565034332");
    //     }else{
    //         // Linking.openURL("")
    //     }
    // }
    const {id,name,picture,phone,salary,email,position} = props.route.params.item
    const deleteStaff = () =>{
        firebase.database().ref('staff').child(id).remove()
        Alert.alert('Xóa thành công');
        props.navigation.navigate('Home');
    }
    return(
        <View style={styles.root}>
            <LinearGradient 
            colors={["#0033ff","#6bc1ff"]}
            style = {{height:"20%"}}
            />
            <View style={{alignItems:"center",justifyContent:"center", }}>
                <Image
            style={{height:140, width:140, borderRadius:140/2, marginTop:-100}}
            source={{uri:picture}}
            />
            <Title>{name}</Title>
            <Text style={{fontSize:18}}>{position}</Text>

            </View>
            <Card style={styles.myCard}
            onPress={()=>Linking.openURL("mailto:"+email)}
            >
                <View style={styles.cardContent}>
                   <MaterialIcons name="email" size={24} color="#4287f5" />
                <Text style={styles.text}>{email}</Text> 
                </View>
                
            </Card>
            <Card style={styles.myCard}
            // onPress={()=>openDial()}
            >
                <View style={styles.cardContent}>
                <AntDesign name="phone" size={24} color="#4287f5" />
                <Text style={styles.text}>{phone}</Text> 
                </View>
                
            </Card>
            <Card style={styles.myCard}>
                <View style={styles.cardContent}>
                <FontAwesome name="money" size={24} color="#4287f5" />
                <Text style={styles.text}>{salary}</Text> 
                </View>
                
            </Card>
            <View style={{flexDirection:"row", justifyContent:"space-around", padding:5}}>
            <Button icon="update" mode="contained" onPress={() => props.navigation.navigate("Create",{id,name,picture,phone,salary,email,position})}>
               Sửa
            </Button>
            <Button icon="delete" mode="contained" onPress={() => deleteStaff()}>
                Xóa
            </Button>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    root:{
        flex: 1
    },
    myCard:{
        margin:5
    },
    cardContent:{
        flexDirection:"row",
        padding:8
    },
    text:{
        fontSize:18,
        marginLeft:10
    }
})
const theme = {
    colors:{
        primary: "#4287f5"
    }
}
export default Profile