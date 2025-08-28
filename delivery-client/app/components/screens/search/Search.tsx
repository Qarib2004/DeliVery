import { FC } from 'react'
import { View } from 'react-native'

import Layout from '../../ui/layout/Layout'
import Heading from '../../ui/Heading'
import Loader from '../../ui/Loader'
import Catalog from '../../ui/catalog/Catalog'
import Field from '../../ui/field/Field'

import { ISearchFormData } from './search.interface'
import { useSearch } from './useSearch'

const Search: FC = () => {
	const { searchTerm, products, isLoading, control } = useSearch()

	return (
		<Layout>
			<Heading>Search</Heading>
			<View className='mt-3'>
				<Field<ISearchFormData>
					placeholder='Type something...'
					control={control}
					name='searchTerm'
					keyboardType='web-search'
				/>
			</View>
			{!!searchTerm ? (
				<View className='mt-2'>
					{isLoading ? <Loader /> : <Catalog products={products} />}
				</View>
			) : null}
		</Layout>
	)
}

export default Search