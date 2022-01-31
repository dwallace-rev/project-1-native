import React,{ useState } from "react";
import {
  Text,
  Link,
  HStack,
  Center,
  Heading,
  Switch,
  useColorMode,
  NativeBaseProvider,
  extendTheme,
  VStack,
  Code,
  Input,
  Box,
  Button,
} from "native-base";
import axios from "axios";
import { Employee } from "./dtos/dtos";
import { AsyncStorage } from "react-native";
import { useAsyncStorage } from "@react-native-community/async-storage";

// Define the config
const config = {
  useSystemColorMode: false,
  initialColorMode: "dark",
};

// extend the theme
export const theme = extendTheme({ config });

export default function App() {

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  return (
    <NativeBaseProvider>
      <Center
        bg={"blueGray.200"}
        px={4}
        flex={1}
      >
        <VStack space={5} alignItems="center">
          <Heading size="lg" textAlign={"center"}>Planet Express</Heading>
          <Heading size="lg" textAlign={"center"}>Expense Reimbursement System</Heading>
            <Input mx={"3"} 
            placeholder="Username" 
            backgroundColor={"white"}
            width={"200"}
            onChangeText={(t)=> setUsername(t)}/>

            <Input mx={'3'}
            placeholder={"Password"}
            backgroundColor={"white"}
            width={"200"}
            passwordRules={"true"}
            onChangeText={(t)=> setPassword(t)}
            type="password"/>

            <Button onPress={()=> logIn(username, password)}>Log In</Button>
            
        </VStack>
      </Center>
    </NativeBaseProvider>
  );
}

async function logIn(user: string, pass: string){
  let valid = true; // Wasn't sure of a better way to account for whether a login succeeds or not.
  const loginPayload = {username: user, password: pass}
        
  const employee: Employee = await axios.patch(`https://9c09-184-90-227-213.ngrok.io/employees/login`, loginPayload).then(response=>{
      return response.data;
  }).catch(function(error){
      console.log(error.response);
      valid = false;
  })

  if (valid){            
    useAsyncStorage("username").setItem(employee.username)
    useAsyncStorage("isManager").setItem(`${employee.isManager}`);
    employee.password = ""; // remove so I don't store sensitive data in session storage.
    useAsyncStorage("employeeData").setItem(JSON.stringify(employee));
  }
  else {
    alert("Invalid username/password");
  }

}
