import { FC } from 'react'

import Layout from '../../ui/layout/Layout'
import Loader from '../../ui/Loader'
import Catalog from '../../ui/catalog/Catalog'

import { useGetAllProducts } from './useGetAllProducts'

const Explorer: FC = () => {
	const { isLoading, products } = useGetAllProducts()

	return (
		<Layout>
			{isLoading ? (
				<Loader />
			) : (
				<Catalog title='Explorer' products={products} />
			)}
		</Layout>
	)
}

export default Explorer