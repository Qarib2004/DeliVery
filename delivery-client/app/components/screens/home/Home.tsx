import { FC } from 'react'

import Layout from '../../ui/layout/Layout'

import Banner from './banner/Banner'
import Categories from './categories/Categories'
import Products from './product/Product'

const Home: FC = () => {
	return (
		<Layout showHeader>
			<Banner />
			<Categories />
			<Products />
		</Layout>
	)
}

export default Home