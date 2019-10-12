import React from 'react';
import { FlatList, ActivityIndicator, Text, View, Image,TouchableHighlight   } from 'react-native';
import {Container,Header,Title, Content, List, ListItem, Left,Card,CardItem, Body, Right, Thumbnail,Button} from 'native-base';
import { Actions } from 'react-native-router-flux';
export default class MainScreen extends React.Component {

  constructor(props){
    super(props);
    this.state ={
      isLoading: true,
      chitiet: this.props.infoUser
    }
  }

  componentDidMount(){
    return fetch('http://192.168.1.12/test_json/list_post.php')
      .then((response) => response.json())
      .then((responseJson) => {

        this.setState({
          isLoading: false,
          dataSource: responseJson.post,
        }, function(){

        });

      })
      .catch((error) =>{
        console.error(error);
      });
  }




  render(){

    if(this.state.isLoading){
      return(
        <View style={{flex: 1, padding: 20}}>
          <ActivityIndicator/>
        </View>
      )
    }
    return(
      <Container style={{backgroundColor: "#54B042"}}>
      <Header noLeft style={{backgroundColor: '#54B042'}} >
      <Title style={{fontWeight: 'bold',fontFamily:"sans-serif-medium",marginLeft:100,marginTop:20}}>KÊNH TIN TỨC +</Title>
         <Body>
         
         <Thumbnail style={{borderRadius:50,marginLeft:-230,marginTop:20}} source={require('../img/post3.png')} />
         </Body>
         <Right>
             <Text style={{color: 'white', fontSize:18, fontWeight: 'bold'}}
             onPress= {()=>{Actions.infoUser({chitiet_user: this.state.chitiet})}}>
             {this.props.infoUser.ten}
             </Text>
         </Right>
       </Header>
      <View style={{flex: 1, paddingTop:10}}>
        <FlatList
          data={this.state.dataSource}
          renderItem={({item,index}) =>
          <Content>
          <Card>
              <CardItem style={{padding: 10}}>
                <Left>
                <Thumbnail source={require('../img/avt3.jpg')} />
                  <Body>
                    <Text style={{fontWeight: 'bold',fontSize: 20}}>{item.user_post}</Text>
                  </Body>
                </Left>
              </CardItem>
              <CardItem cardBody>
              <Text style={{padding:15}}  numberOfLines={4} ellipsizeMode="tail">{item.content}</Text>

              </CardItem>
              <CardItem>
                <Left>
                    <Text style={{fontWeight:"bold"}}>Details</Text>
                </Left>
                <Body>
                  <Button transparent>
                    <Text style={{marginLeft: 20,fontWeight:"bold"}}>Report</Text>
                  </Button>
                </Body>
                <Right>
                    <TouchableHighlight onPress={()=>{Actions.pageTwo({position: this.state.dataSource[index]})}}>
                      <Text style={{fontWeight:"bold"}}>View </Text>
                    </TouchableHighlight>
                </Right>
              </CardItem>
            </Card>
          </Content>


        }
          keyExtractor={(item, index) => {return item.id;}}
        />
      </View>


      </Container>
    );
  }
}
