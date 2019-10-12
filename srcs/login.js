import React, { Component } from 'react';
import {TouchableHighlight,Image,ImageBackground } from 'react-native';
import { Container,Footer, Header, Content, Form, Item, Input, Label, Button,Text,Toast } from 'native-base';
import { Actions } from 'react-native-router-flux';
export default class Login extends Component {
  constructor(props){
    super(props);
    this.state ={ isLoading: true,
      user: '',
      pass:'',
      showToast: false,
    }
  }

  componentDidMount(){
    return fetch('http://192.168.1.12/test_json/userlist.php')
      .then((response) => response.json())
      .then((responseJson) => {

        this.setState({
          isLoading: false,
          dataUser: responseJson.user,
        }, function(){

        });

      })
      .catch((error) =>{
        console.error(error);
      });
  }


  render() {
    return (
      <Container style={{marginTop:20}}>
        <ImageBackground style={{marginTop:30,width:'100%',height:'100%'}}  source={require('../img/moutain.jpg')}>
        <Content>
          <Form>
          <Item></Item>
            <Item floatingLabel>
              <Label style={{fontWeight:"bold",marginLeft:5}}>User Name</Label>
              <Input style={{width:350, height:60, borderWidth:1, margin:5, borderRadius:5,backgroundColor:'white',marginTop:50}} autoCapitalize = "none" value={this.state.user} onChangeText={(text) => this.setState({user:text})} />
            </Item>
            <Item floatingLabel last>
              <Label style={{fontWeight:"bold",marginLeft:5,marginTop:-15}}>Password</Label>
              <Input style={{marginTop:40,width:350, height:60, borderWidth:1, margin:5, borderRadius:5,backgroundColor:'white'}} autoCapitalize = "none" secureTextEntry = {true} value={this.state.pass} onChangeText={(text) => this.setState({pass:text})} />
            </Item>
          </Form>
          <Button full info style = {{alignSelf: 'center', margin: 30,  }}
            onPress={()=>{this.onPressNext()}}
            >
            <Text>Sign In</Text>
          </Button>

        </Content>
        <Footer style={{backgroundColor:'white'}}>
        <TouchableHighlight onPress={()=>{Actions.SignUp()}}>
          <Text style={{fontWeight:"bold"}}>Create New Account !</Text>
        </TouchableHighlight>
        </Footer>
        </ImageBackground>
      </Container>
    );
  }

  onPressNext(){
    var arr = this.state.dataUser;
    if(this.state.user.trim(" ") == '' ||this.state.pass.trim(" ")== ''){
      return alert ('You must fill out the form!')
    }
    else{
    for(var item = 0; item< arr.length; item++){
      if(arr[item].tk == this.state.user && arr[item].mk == this.state.pass){
          return Actions.MainScreen({infoUser: this.state.dataUser[item]});
        }

      }
          return alert("Wrong Passord ! Please try again!")
    }

   }

}
