import { useStripe } from '@stripe/stripe-react-native'
import { useMutation } from '@tanstack/react-query'

import { useActions } from '../../../hooks/useActions'
import { useAuth } from '../../../hooks/useAuth'
import { useCart } from '../../../hooks/useCart'
import { useTypedNavigation } from '../../../hooks/usetypedNavigation'

import { orderService } from '../../../services/order.service' // исправлено


export interface IOrderItem {
    id: string
    createdAt: string
    updatedAt: string
    quantity: number
    price: number
  
    orderId?: string
    productId?: string
  }
  
  export type OrderStatus = 'PENDING' | 'PROCESSING' | 'COMPLETED' | 'CANCELLED' | 'REFUNDED'
  
  export interface IOrder {
    id: string
    createdAt: string
    updatedAt: string
    status: OrderStatus
    reference: string
    total: number
  
    userId?: string
    paymentId?: string
    paymentData?: any
  
    customerName?: string
    customerEmail?: string
    customerPhone?: string
    shippingAddress?: string
  
    items: IOrderItem[]
  }
  
  export type ICreateOrderInput = {
    items: {
      price: number
      quantity: number
      productId: string
    }[]
    customerName?: string
    customerEmail?: string
    customerPhone?: string
    shippingAddress?: string
  }
  

  export const useCheckout = () => {
	const { items } = useCart()
	const { reset } = useActions()
	const { navigate } = useTypedNavigation()
	const { initPaymentSheet, presentPaymentSheet } = useStripe()

	const { mutateAsync: placeOrder } = useMutation({
		mutationKey: ['place order'],
		mutationFn: async () => {
			console.log('📦 Отправляем заказ на сервер:', items)

			// 1️⃣ Создаём заказ
			const order = await orderService.createOrder({
				items: items.map(item => ({
					price: item.price,
					quantity: item.quantity,
					productId: item.product.id
				}))
			})

			console.log('✅ Заказ создан:', order)

			// 2️⃣ Создаём PaymentIntent на бэке
			const payment = await orderService.createStripePayment(order.id)
			console.log('💳 PaymentIntent создан:', payment)

			return payment
		}
	})

	const onCheckout = async () => {
		try {
			console.log('🚀 Запуск checkout...')

			const response = await placeOrder()
			console.log('📥 Ответ placeOrder:', response)

			const clientSecret = (response as { clientSecret: string }).clientSecret
			console.log('🔑 clientSecret:', clientSecret)

			const { error } = await initPaymentSheet({
				merchantDisplayName: 'Your Merchant Name',
				paymentIntentClientSecret: clientSecret
			})

			if (error) {
				console.error('❌ Ошибка инициализации payment sheet:', error)
				return
			}
			console.log('✅ Payment sheet инициализирован')

			const { error: paymentError } = await presentPaymentSheet()
			if (paymentError) {
				return
			}

			console.log('🎉 Оплата прошла успешно!')
			reset()
			navigate('Thanks')
		} catch (error) {
			console.error('🔥 Checkout error:', error)
		}
	}

	return { onCheckout }
}
