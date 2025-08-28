import { useQuery } from '@tanstack/react-query';
import { useTypedRoute } from '../../../hooks/useTypedRoute';
import { CategoryService } from '../../../services/category.service';
import { ICategory } from '../../../types/category.interface';

export const useCategory = () => {
  const { params } = useTypedRoute<'Category'>();

  const { isLoading, data: category } = useQuery<ICategory>({
    queryKey: ['get category by slug', params.slug],
    queryFn: () => CategoryService.getBySlug(params.slug),
  });

  const products = category?.products ?? [];

  return { category, products, isLoading };
};
