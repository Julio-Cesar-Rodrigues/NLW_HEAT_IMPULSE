import { createContext, ReactNode, useEffect, useState } from "react";
import { api } from "../services/api";


//tipagens necessarias por estar usando typscript com react
type User = {
  id: string;
  name: string;
  login: string;
  avatar_url: string;
}

type AuthContextData = {
  user: User | null;
  signInUrl: string;
  signOut: () => void;
}

type AuthResponse = {
  token: string;
  user: {
    id: string;
    avatar_url: string;
    name: string;
    login: string;
  }
}

export const AuthContext = createContext({} as AuthContextData);

type AuthProvider = {
  children: ReactNode
}

//seta ou com as informaçoes do User ou como null d110af197d25c121d936`
export function AuthProvider(props: AuthProvider) {
  const [user, setUser] = useState<User | null>(null)

  const signInUrl = `https://github.com/login/oauth/authorize?scope=user&client_id=d110af197d25c121d936`;

  async function signIn(githubCode: string) {
    const response = await api.post<AuthResponse>('authenticate', {
      code: githubCode,
    })

    const { token, user } = response.data

    localStorage.setItem('@dowhile:token', token)

    api.defaults.headers.common.authorization = `Bearer ${token}`;

    setUser(user)
  }

  function signOut() {
    setUser(null)
    localStorage.removeItem('@dowhile:token')
  }

  useEffect(() => {
    const token = localStorage.getItem('@dowhile:token')

    if (token) {
      api.defaults.headers.common.authorization = `Bearer ${token}`;

      api.get<User>('profile').then(response => {
        setUser(response.data)
      })
    }
  }, [])


// esse useEffect faz com que a busque na url o codigo do github do usuario para ir ao back-end e pegar as informaçoes do usuario para incluir na aplicação
useEffect(() =>{
  const url = window.location.href              //localiza o hfer
  const hasGithubCode = url.includes('?code=')  //verifica se existe na url o "?code="

  //se a url tiver o '?code='
  if( hasGithubCode ){
    
    //ele divide a url o que vem antes do codigo como urlWithoutCode , e o que vem depois como githubCode
    const [urlWithoutCode, githubCode] = url.split('?code=') 

     //*aqui ele limpa a url para nao aparecer o codigo na barra do navegador
    window.history.pushState({}, '', urlWithoutCode)
    //e tras a função signIn com o githubCode
    signIn(githubCode)

  }
},[])

  return(
    <AuthContext.Provider value={{ signInUrl, user, signOut}}>
        {props.children}
    </AuthContext.Provider>
  )
}