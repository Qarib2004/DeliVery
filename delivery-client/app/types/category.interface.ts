import { IProduct } from "./product.interface";

export interface ICategory {
	id: string
	name: string
	slug: string
	image: string
	products?: IProduct[];
}

export interface ICategoryEditInput extends Omit<ICategory, 'id'> {}