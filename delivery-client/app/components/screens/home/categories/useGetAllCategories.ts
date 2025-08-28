import { useQuery } from '@tanstack/react-query'

import { CategoryService } from '../../../../services/category.service'

export const useGelAllCategories = () => {
	const { data: categories, isLoading } = useQuery({
		queryKey: ['get categories'],
		queryFn: () => CategoryService.getAll(),
		select: data =>data
	})

	console.log('Loading:', isLoading);

// Логируем данные, когда они пришли
console.log('Categories:', categories);

// Логируем ошибки, если они есть

	return { categories, isLoading }
}