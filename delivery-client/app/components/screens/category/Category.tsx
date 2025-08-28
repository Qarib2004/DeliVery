import { FC } from 'react'
import { Text } from 'react-native'

import Layout from '../../ui/layout/Layout'
import Loader from '../../ui/Loader'
import Catalog from '../../ui/catalog/Catalog'

import { useCategory } from './useCategory'

const Category: FC = () => {
	const { isLoading, products, category } = useCategory()
  
	if (isLoading) return <Loader />

	return (
		<Layout>
			{category ? (
				<Catalog title={category.name} products={products} />
			) : (
				<Text>Category not found</Text>
			)}
		</Layout>
	)
}

export default Category