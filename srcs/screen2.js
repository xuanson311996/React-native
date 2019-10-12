import React, { Component } from 'react';
import {Image} from 'react-native';
import { Container, Content, Text, Card, Header, Body, Button, Title, CardItem } from 'native-base';
import { Actions } from 'react-native-router-flux';
export default class pageTwo extends Component {

  render(){
    return(
      <Container>

        <Content padder>
          <Card>
            <CardItem>
              <Body>
                <Text style={{fontWeight: 'bold',fontSize: 20}}> {this.props.position.user_post}
                </Text>
                <Image style={{marginTop:30,width:360,height:250}}  source={require('../img/post2.png')}></Image>
                <Text style={{marginTop: 30}}> {this.props.position.content}
                </Text>
              </Body>
            </CardItem>
            </Card>
        </Content>
      </Container>
    );
  }
}
