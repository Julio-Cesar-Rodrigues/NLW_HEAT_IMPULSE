import React from "react";
import { View } from "react-native";

import { Header } from '../../components/Header'
import { MessageList } from "../../components/MessageList";
import { SingInBox } from '../../components/SingInBox'
import { SendMenssageForm } from '../../components/SendMenssageForm'

import { styles  } from "./styles";



export function Home(){
  return(
    
    <View style={styles.container}>
        <Header />
        <MessageList/>

        <SendMenssageForm />

    </View>
  )
}