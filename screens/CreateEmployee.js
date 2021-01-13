import React,{useState} from 'react';
import { StyleSheet, View, Modal , Alert} from 'react-native';
import { TextInput , Button} from 'react-native-paper';
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';
import firebase from '../firebase';
const CreateEmployee = ({navigation,route})=>{
    const getDetails = (type)=>{
       if(route.params){
          switch(type){
              case "name":
                  return route.params.name
              case "phone":
                 return route.params.phone
              case "email":
                return route.params.email
              case "salary":
                  return route.params.salary  
              case "picture":
                  return  route.params.picture
              case "position":
                return  route.params.position  
          }
       }
       return ""
    }
    
    const [name,setName] = useState(getDetails("name"))
    const [phone,setPhone] = useState(getDetails("phone"))
    const [email,setEmail] = useState(getDetails("email"))
    const [salary,setSalary] = useState(getDetails("salary"))
    const [picture,setPicture] = useState(getDetails("picture"))
    const [position,setPosition] = useState(getDetails("position"))
    const [modal, setModal] = useState(false);

    const submitData = () => {
        const data = firebase.database().ref('staff');
        const add = {
            name: name,
            phone: phone,
            email: email,
            salary: salary,
            picture: picture,
            position: position
        }
        data.push(add);
        Alert.alert('Thêm thành công');
        navigation.navigate('Home');
    }
    const updateData = () =>{
        const data = firebase.database().ref('staff').child(route.params.id);
        data.update({
            name: name,
            phone: phone,
            email: email,
            salary: salary,
            picture: picture,
            position: position
        });
        Alert.alert('Sửa thành công');
        navigation.navigate('Home');
    }
    const pickFromGallery = async ()=>{
        const {granted} =  await Permissions.askAsync(Permissions.CAMERA_ROLL)
        if(granted){
             let data =  await ImagePicker.launchImageLibraryAsync({
                  mediaTypes:ImagePicker.MediaTypeOptions.Images,
                  allowsEditing:true,
                  aspect:[1,1],
                  quality:0.5
              })
              if(!data.cancelled){
                  let newfile = { 
                    uri:data.uri,
                    type:`test/${data.uri.split(".")[1]}`,
                    name:`test.${data.uri.split(".")[1]}` 
                    
                }
                  handleUpload(newfile)
              }
        }else{
           Alert.alert("you need to give up permission to work")
        }
     }
     const pickFromCamera = async ()=>{
        const {granted} =  await Permissions.askAsync(Permissions.CAMERA)
        if(granted){
             let data =  await ImagePicker.launchCameraAsync({
                  mediaTypes:ImagePicker.MediaTypeOptions.Images,
                  allowsEditing:true,
                  aspect:[1,1],
                  quality:0.5
              })
            if(!data.cancelled){
                let newfile = { 
                  uri:data.uri,
                  type:`test/${data.uri.split(".")[1]}`,
                  name:`test.${data.uri.split(".")[1]}` 
  
              }
                handleUpload(newfile)
            }
        }else{
           Alert.alert("you need to give up permission to work")
        }
     }

     const handleUpload = (image)=>{
        const data = new FormData()
        data.append('file',image)
        data.append('upload_preset','employee')
        data.append("cloud_name","dhdfr7p4h")

        fetch("https://api.cloudinary.com/v1_1/dhdfr7p4h/image/upload",{
            method:"post",
            body:data
        }).then(res=>res.json()).
        then(data=>{
            setPicture(data.url)
            setModal(false)
            console.log(picture);
        }).catch(err=>{
            Alert.alert("error while uploading")
        })
   }
   
    return (
        <>
            <View style={styles.root}>
            <TextInput
                style={styles.inputStyle}
                label="Họ và tên nhân viên"
                value={name}
                theme={theme}
                mode="outlined"
                onChangeText={text => setName(text)}
                />
            <TextInput
                style={styles.inputStyle}
                label="Số điện thoại"
                value={phone}
                theme={theme}
                mode="outlined"
                keyboardType="number-pad"
                onChangeText={text => setPhone(text)}
                />
            <TextInput
                style={styles.inputStyle}
                label="Email cá nhân"
                value={email}
                theme={theme}
                mode="outlined"
                keyboardType="email-address"
                onChangeText={text => setEmail(text)}
                />
                <TextInput
                style={styles.inputStyle}
                label="Lương tháng"
                value={salary}
                theme={theme}
                mode="outlined"
                keyboardType="number-pad"
                onChangeText={text => setSalary(text)}
                />
                <TextInput
                style={styles.inputStyle}
                label="Vi tri"
                value={position}
                theme={theme}
                mode="outlined"
                onChangeText={text => setPosition(text)}
                />
                <Button 
                
             icon={picture==""?"upload":"check"}
              mode="contained" 
              theme={theme}
              onPress={() => setModal(true)}>
                    Tải ảnh lên
             </Button>
             { route.params ?
                <Button 
                style={{marginTop:5}}
                icon="content-save"
                 mode="contained" 
                 onPress={()=>updateData()}
                 theme={theme}>
                      Lưu lại
                </Button> :
                <Button 
                style={{marginTop:5}}
                icon="content-save"
                 mode="contained" 
                 onPress={()=>submitData()}
                 theme={theme}>
                      Thêm mới
                </Button> 
            }
             <Modal
             animationType="slide"
             transparent={true}
             visible={modal}
             onRequestClose={()=>{
                 setModal(false)
             }}
             >
              <View style={styles.modalView}>
                  <View style={styles.modalButtonView}>
                        <Button icon="camera"
                         theme={theme}
                        mode="contained"
                        onPress={() => pickFromCamera()}>
                                camera
                        </Button>
                        <Button 
                        icon="image-area"
                         mode="contained"
                         theme={theme}  onPress={() => pickFromGallery()}>
                                gallery
                        </Button>
                  </View>
                <Button 
                 theme={theme}
                onPress={() => setModal(false)}>
                        cancel
                </Button>
              </View>
             </Modal>

            </View>
        </>
    )
}
const theme = {
    colors:{
        primary: "#4287f5"
    }
}
const styles = StyleSheet.create({
    root:{
        flex: 1,
       
    },
    inputStyle:{
         padding:5
    },
    modalView:{
        position:"absolute",
        bottom:2,
        width:"100%",
        backgroundColor:"white"

    },
    modalButtonView:{
        flexDirection:"row",
        justifyContent:"space-around",
        padding:10
    }
})
export default CreateEmployee;