import { FC, useState } from "react";
import { View, Text, Pressable } from "react-native";
import {SubmitHandler, useForm} from 'react-hook-form'
import { useAuthMutation } from "./useAuthMutation";
import DismissKeyboard from "../../../components/ui/field/DismissKeyboard";
import AuthFields from "./AuthField";
import Loader from "../../..//components/ui/Loader";
import Button from "../../../components/ui/button/Button";
import { IAuthFormData } from "../../../types/auth.interface";

const Auth: FC = () => {
   const [isReg,setIsReg] = useState(false)

   const {handleSubmit,reset,control} = useForm<IAuthFormData>({
    mode:'onChange'
   })

   const {isLoading,registerSync,loginAsync} = useAuthMutation(reset)

   const onSubmit:SubmitHandler<any> = data => {
    if(isReg) registerSync(data)
      else loginAsync(data)
  }

  return (
    <DismissKeyboard>
    <View className='mx-2 items-center justify-center h-full'>
      <View className='w-9/12'>
        <Text className='text-center text-black text-3xl font-medium mb-8'>
          {isReg ? 'Welcome Back to DeliVery' : 'Login'}
        </Text>
        {isLoading ? (
          <Loader />
        ) : (
          <>
            <AuthFields control={control} isPassRequired />

            <Button onPress={handleSubmit(onSubmit)}>
              {isReg ? 'Sign Up' : 'Login'}
            </Button>

            <Pressable onPress={() => setIsReg(!isReg)}>
              <Text className='text-black text-center text-base mt-6'>
                {isReg
                  ? 'Already have an account? '
                  : "Don't have an account? "}
                <Text className='text-[#47AA52]'>
                  {isReg ? 'Login' : 'Sign up'}
                </Text>
              </Text>
            </Pressable>
          </>
        )}
      </View>
    </View>
  </DismissKeyboard>
  )
};

export default Auth;
