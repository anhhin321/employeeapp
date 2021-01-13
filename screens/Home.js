import React,{useEffect,useState} from 'react';
import { StyleSheet, Text, View,Image,FlatList,Alert} from 'react-native';
import {Card,FAB} from 'react-native-paper';
import firebase from 'firebase';
import {Spinner} from 'native-base';
const Home = ({navigation, route}) =>{
    const data = [
        {id:1, name:"Nguyễn khắc anh", postion:"Web dev"},
        {id:2, name:"Nguyễn Văn An", postion:"Content"},
        {id:3, name:"Hoàng Thị Thúy", postion:"android dev"},
        {id:4, name:"Lê min ho", postion:"Windows dev"},
    ];
    // const [data,setData] = useState();
   
    const [staff, setStaff] = useState();
    const [loading, setLoading] = useState(true);
    useEffect(()=>{
        const todoRef = firebase.database().ref('staff');
    todoRef.on('value', (snapshot) => {
      const todos = snapshot.val();
      const todoList = [];
      for (let id in todos) {
        todoList.push({ id, ...todos[id] });
      }
      setStaff(todoList);
      setLoading(false);
    });
    },[])
    console.log(staff);
    const renderList = ((item)=>{
        return(
            <Card style={styles.myCard} 
            onPress={()=>navigation.navigate("Profile",{item})}
          >
              <View style={styles.cardView}
              
              >
                  <Image style={{width:50,height:50,borderRadius:50/2}}
                  
              source={{uri: item.picture}}
              />
            <View style={{marginLeft:10}} 
            >
            <Text style={styles.text}>{item.name}</Text>
            <Text style={{fontSize:15}}>{item.position}</Text>

            </View>
              </View>
              
        </Card>
        )
    })
    return (
        <>
        {loading ? <View style={{justifyContent:"center", alignContent:"center",alignItems:"center"}}>
        <Spinner />
        </View>:
        <View>
            <FlatList
                data={staff}
                
                renderItem={({item})=>{
                    return renderList(item);
                }}
                keyExtractor={item=>item.id}
            />
          <FAB
          onPress={()=>navigation.navigate('Create')}
    style={styles.fab}
    small={false}
    icon="plus"
    theme={{colors:{accent:"#006aff"}}}
  />
        </View>
        }
        
        
        </>
    );
}

const styles = StyleSheet.create({
    myCard:{
        margin:5,
        
    },
    cardView:{
        flexDirection:"row",
        padding:6
    },
    text:{
        fontSize:17,
    },
    fab: {
        position: 'absolute',
        margin: 16,
        right: 0,
        bottom: 0,
      },
      
})
export default Home;