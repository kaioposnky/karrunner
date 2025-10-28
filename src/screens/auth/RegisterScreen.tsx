import { ThemedInput } from "@/components/themed/ThemedInput"
import { ThemedView } from "@/components/themed/ThemedView"
import { useState } from "react";

export const RegisterScreen = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  
  return(
    <ThemedView
      center="both"
    >
      {/*Username*/}
      <ThemedInput
        onChangeText={(text) => setUsername(text)}
      >
        Username
      </ThemedInput>
    </ThemedView>
  )
}