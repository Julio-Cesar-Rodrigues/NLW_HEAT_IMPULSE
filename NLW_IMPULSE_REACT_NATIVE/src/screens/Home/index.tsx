import React from "react";
import { View, KeyboardAvoidingView, Platform } from "react-native";

import { Header } from '../../components/Header'
import { MessageList } from "../../components/MessageList";
import { SingInBox } from '../../components/SingInBox'
import { SendMenssageForm } from '../../components/SendMenssageForm'
import { useAuth } from "../../hooks/auth";

import { styles  } from "./styles";

export function Home(){
  const { user } = useAuth()
  return(
    <KeyboardAvoidingView
      style={{flex: 1}}
      behavior={Platform.OS ==='ios' ? 'padding': undefined}
    >
    <View style={styles.container}>
        <Header />
        <MessageList/>

        {user ? <SendMenssageForm /> : <SingInBox />}

    </View>
    </KeyboardAvoidingView>
  )
}