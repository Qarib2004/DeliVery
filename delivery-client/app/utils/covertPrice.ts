export const convertPrice = (price: number | undefined | null): string => {
	if (price === undefined || price === null || isNaN(price)) {
	  return '$0' 
	}
	
	return price.toLocaleString('en-US', {
	  style: 'currency',
	  currency: 'USD',
	  minimumFractionDigits: 0,
	  maximumFractionDigits: 0
	})
  }