import { FC } from 'react'
import { Text, View } from 'react-native'

import Loader from '../../../ui/Loader'
import Catalog from '../../../ui/catalog/Catalog'

import { useProducts } from './useProduct'

const Products: FC = () => {
	const { products, isLoading } = useProducts()
    console.log(products)

	return (
		<View>
  {isLoading ? (
    <Loader />
  ) : products?.length ? (
    <Catalog title="Products" products={products} />
  ) : (
    <Text>No products found</Text>
  )}
</View>

	)
}

export default Products