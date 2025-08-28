import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { OrderService } from '../order/order.service'
import Stripe from 'stripe'
import { OrderStatus } from '@prisma/client'

@Injectable()
export class StripeService {
	private stripe: Stripe

	constructor(
		private configService: ConfigService,
		private orderService: OrderService
	) {
		this.stripe = new Stripe(
			this.configService.get<string>('SECRET_KEY_STRIPE')!
		)
	}

	constructEvent(payload: Buffer, signature: string): Stripe.Event {
		const webhookSecret = this.configService.get('WEBHOOK_SECRET')
		
		if (!webhookSecret) {
		  throw new Error('Stripe webhook secret not configured')
		}
	
		
		const payloadStart = payload.toString('utf8', 0, Math.min(100, payload.length))
		console.log('Payload start:', payloadStart)
	
		try {
		  const event = this.stripe.webhooks.constructEvent(
			payload,
			signature,
			webhookSecret,
			300 
		  )
		  
		  return event
		} catch (err) {
		  console.error('❌ Signature verification failed:', {
			payloadLength: payload.length,
			signature: signature,
			error: err.message,
			webhookSecretLength: webhookSecret?.length || 0,
			payloadPreview: payload.toString('utf8', 0, 50)
		  })
		  
		  if (err.message.includes('timestamp')) {
			console.error('Timestamp issue - check server time synchronization')
		  }
		  if (err.message.includes('signatures')) {
			console.error('Signature mismatch - check webhook secret and payload integrity')
		  }
		  
		  throw err
		}
	  }


	  async createPayment(orderId: string, total: number) {
		// создаём PaymentIntent для PaymentSheet
		const paymentIntent = await this.stripe.paymentIntents.create({
		  amount: total * 100, // в центах
		  currency: 'usd',
		  metadata: { orderId },
		});
	
		// возвращаем clientSecret для фронта
		return { clientSecret: paymentIntent.client_secret };
	  }

	 async handleWebhook(event: Stripe.Event) {


    try {
      switch (event.type) {
        case 'checkout.session.completed':
          const session = event.data.object as Stripe.Checkout.Session
          
          const orderId = session.metadata?.orderId
          if (!orderId) {
            console.error('Order ID not found in metadata')
            return
          }

          await this.orderService.updateOrderStatus(orderId, 'COMPLETED' as OrderStatus)
          await this.orderService.addPaymentData(orderId, session.id, session)
          break

        case 'checkout.session.expired':
          const expiredSession = event.data.object as Stripe.Checkout.Session
          
          const expiredOrderId = expiredSession.metadata?.orderId
          if (!expiredOrderId) {
            console.error('Order ID not found in expired session metadata')
            return
          }

          await this.orderService.updateOrderStatus(expiredOrderId, 'CANCELLED' as OrderStatus)
          break

        case 'payment_intent.succeeded':
          const paymentIntent = event.data.object as Stripe.PaymentIntent
          break

        default:
          console.log(`Unhandled event type: ${event.type}`)
      }
    } catch (error) {
      throw error
    }

    console.log('=== WEBHOOK PROCESSING COMPLETE ===')
  }

}
