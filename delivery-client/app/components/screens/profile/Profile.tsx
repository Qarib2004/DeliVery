import { FC } from 'react'
import { Image, View } from 'react-native'

import Layout from '../../ui/layout/Layout'
import Heading from '../../ui/Heading'
import Button from '../../ui/button/Button'

import { useAuth } from '../../../hooks/useAuth'

import { AuthService } from '@/services/auth/auth.service'

import { useProfile } from './useProfile'

const Profile: FC = () => {
	const { setUser } = useAuth()

	const { profile } = useProfile()

	return (
		<Layout>
			<Heading isCenter>Profile</Heading>

			<View className='my-6 items-center justify-center'>
				<Image
					source={{ uri: profile?.avatarPath }}
					className='w-40 h-40 rounded-full'
				/>
			</View>

			<Button
				onPress={() => AuthService.logout().then(() => setUser(null))}
				className='mt-5'
			>
				Logout
			</Button>
		</Layout>
	)
}

export default Profile