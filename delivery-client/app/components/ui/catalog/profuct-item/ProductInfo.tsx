import { FC } from 'react'
import { Text, View } from 'react-native'

import { IProduct } from '../../../../types/product.interface'

import { convertPrice } from '../../../../utils/covertPrice'

interface IProductInfo {
	product: IProduct
}

const ProductInfo: FC<IProductInfo> = ({ product }) => {
	if (!product) {
		return <Text>Product not found</Text>
	  }
	return (
		<View className='my-3'>
			<Text className='font-semibold text-base'>{product.name}</Text>
			<Text className='text-green-800 rounded-full font-medium text-sm'>
  Category: {product?.category?.name ?? 'N/A'}
</Text>
			<Text className='mt-1 font-normal text-sm text-center py-0.5 w-[55px] rounded-full text-white bg-[#47AA52]'>
				{convertPrice(product.price)}
			</Text>
		</View>
	)
}

export default ProductInfo