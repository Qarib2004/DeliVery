import { FC } from 'react'
import { Image, Pressable, View } from 'react-native'

import { useTypedNavigation } from '../../../..//hooks/usetypedNavigation'

import { IProduct } from '../../../../types/product.interface'

import { getMediaSource } from '../../../..//utils/getMediaSource'

import ProductInfo from './ProductInfo'

interface IProductItem {
	product: IProduct
}

const ProductItem: FC<IProductItem> = ({ product }) => {
	const { navigate } = useTypedNavigation()

	return (
		<View className='rounded-lg flex-col mb-3.5'>
			<Pressable
				onPress={() => navigate('Product', { slug: product.slug })}
				className='bg-gray-100 rounded-xl relative overflow-hidden p-5 flex items-center justify-center'
			>
				<Image
					source={{uri:product.image}}
                    style={{ width: 130, height: 130 }} 
                    resizeMode="cover"
				/>
			</Pressable>
			<ProductInfo product={product} />
		</View>
	)
}

export default ProductItem