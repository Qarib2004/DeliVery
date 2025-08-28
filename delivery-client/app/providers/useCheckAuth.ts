import { useEffect } from "react"
import { useAuth } from "../hooks/useAuth"
import { getAccessToken } from "../services/auth/auth.helper"
import { errorCatch } from "../api/error.api"
import { AuthService } from "../services/auth/auth.service"





export const useCheckAuth = (routName?:string) => {
    const {user,setUser} = useAuth()

    useEffect(() => {
        const checkAccessToken = async () => {
            const accessToken = await getAccessToken()

            if(accessToken){
                try {
                    
                } catch (error) {
                    if(errorCatch(error) === 'jwt expired'){
                        await AuthService.logout()
                        setUser(null)
                    }
                }
            }
        }
    })
}