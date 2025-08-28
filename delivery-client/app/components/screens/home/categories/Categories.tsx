import { FC } from 'react'
import { Image, Pressable, Text, View } from 'react-native'

import Heading from '../../../ui/Heading'

import { useTypedNavigation } from '../../../../hooks/usetypedNavigation'

import { getMediaSource } from '../../../../utils/getMediaSource'
import { useGelAllCategories } from './useGetAllCategories'
import Loader from '../../../ui/Loader'


const Categories: FC = () => {
	const { categories, isLoading } = useGelAllCategories()

	const { navigate } = useTypedNavigation()

	return isLoading ? (
		<Loader />
	) : (
		<View className='flex flex-col mt-5 mb-4'>
			<Heading>Categories</Heading>

			<View className='flex-row justify-center mt-5'>
				{categories?.map(category => (
					<Pressable
						onPress={() =>
							navigate('Category', { slug: category.slug })
						}
						key={category.id}
						className='rounded-xl bg-gray-100 p-5 mx-2'
					>
						<Image
							source={{uri:category.image}}
							className='w-11 h-10 mb-2 p-3 rounded-sm'
							style={{
								resizeMode: 'cover'
							}}
						/>
						<Text className='font-normal text-xs text-center'>
							{category.name}
						</Text>
					</Pressable>
				))}
			</View>
		</View>
	)
}

export default Categories