import { useMutation } from "@tanstack/react-query";
import { useAuth } from "../../../hooks/useAuth";
import { IAuthFormData } from "../../../types/auth.interface";
import { UseFormReset } from "react-hook-form";
import { AuthService } from "../../../services/auth/auth.service";
import { useMemo } from "react";








export const useAuthMutation = (reset:UseFormReset<IAuthFormData>) => {
    const {setUser} = useAuth()

	const { mutate: loginAsync, isPending: isLoginLoading } = useMutation({
		mutationKey: ['login'],
		mutationFn: async ({ email, password }: IAuthFormData) => {
			const result = await AuthService.main('login', email, password)
			return result
		},
		onSuccess(data) {
			reset()
			setUser(data.user)
		},
		onError(error) {
			console.log("Mutation error:", error)
		}
	})
	

    const { mutate: registerSync, isPending: isRegisterLoading } = useMutation({
		mutationKey: ['register'],
		mutationFn: ({ email, password }: IAuthFormData) =>
			AuthService.main('reg', email, password),

		onSuccess(data) {
			reset()
			setUser(data.user)
		}
	})

	return useMemo(
		() => ({
			loginAsync,
			registerSync,
			isLoading: isLoginLoading || isRegisterLoading
		}),
		[isLoginLoading, isRegisterLoading]
	)
}