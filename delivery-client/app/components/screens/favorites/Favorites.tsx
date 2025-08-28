import { FC } from 'react'

import Layout from '../../ui/layout/Layout'
import Catalog from '../../ui/catalog/Catalog'

import { useProfile } from '../profile/useProfile'

const Favorites: FC = () => {
	const { profile } = useProfile()

	return (
		<Layout>
			<Catalog title='Favorites' products={profile?.favorites || []} />
		</Layout>
	)
}

export default Favorites