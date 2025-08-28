import { EnumAsyncStorage, IAuthResponse } from "../../types/auth.interface"
import { request } from "../../api/request.api"
import { getAuthUrl } from "../../config/api.config"
import { deleteTokensStorage, saveToStorage } from "./auth.helper"
import AsyncStorage from "@react-native-async-storage/async-storage"




export const AuthService = {
    async main(variant: 'reg' | 'login', email: string, password: string) {
  
      const url = getAuthUrl(`/${variant === 'reg' ? 'register' : 'login'}`);
  
      try {
        const responce = await request<IAuthResponse>({
          url,
          method: "POST",
          data: { email, password }
        });
  
  
        if (responce.accessToken) {
          await saveToStorage(responce);
        }
  
        return responce;
      } catch (err) {
        throw err; 
      }
    },
  
    async logout() {
      await deleteTokensStorage();
      await AsyncStorage.removeItem(EnumAsyncStorage.USER);
    }
  };
  