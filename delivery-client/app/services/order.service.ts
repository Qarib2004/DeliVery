// services/order.service.ts
import { ICreateOrderInput, IOrder } from '../components/screens/cart/useCheckout'
import { request } from '../api/request.api'
import { getOrdersUrl } from '../config/api.config'


class OrderService {
  async createOrder(data: ICreateOrderInput): Promise<IOrder> {
    return request<IOrder>({
      url: getOrdersUrl(''),
      method: 'POST',
      data
    })
  }

  async getOrder(id: string): Promise<IOrder> {
    return request<IOrder>({
      url: getOrdersUrl(`/${id}`),
      method: 'GET'
    })
  }

  async getUserOrders(): Promise<IOrder[]> {
    return request<IOrder[]>({
      url: getOrdersUrl(''),
      method: 'GET'
    })
  }

  async createStripePayment(orderId: string): Promise<{ clientSecret: string }> {
    return request<{ clientSecret: string }>({
      url: getOrdersUrl(`/${orderId}/stripe/create`),
      method: 'POST'
    })
  }
}

export const orderService = new OrderService()