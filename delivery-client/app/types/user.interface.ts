import { IProduct } from "./product.interface"

export interface IUser {
	id: string
	email: string
	password: string
	name: string
	avatarPath: string
	favorites: IProduct[]
}

export interface IUserEditInput extends Omit<IUser, 'id' | 'createdAt'> {}