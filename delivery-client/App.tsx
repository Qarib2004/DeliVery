import { View } from 'react-native'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { StatusBar } from 'expo-status-bar'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

import AuthProvider from './app/providers/AuthProvider'
import Navigation from './app/navigation/Navigation'
import { Provider } from 'react-redux'
import { store,persistor } from './app/store/store'
import { PersistGate } from 'redux-persist/integration/react'
import { StripeProvider } from '@stripe/stripe-react-native'
import Toast from './app/components/ui/Toast'

const queryClient = new QueryClient({
	defaultOptions:{
		queries:{
			refetchOnWindowFocus:false
		}
	}
})


export default function App() {
	
	return (
		<QueryClientProvider client={queryClient}>
			<Provider store={store}>
				<PersistGate persistor={persistor} loading={null}>
					<AuthProvider>
						<SafeAreaProvider>
							<StripeProvider
								publishableKey={
									process.env.STRIPE_KEY as string
								}
							>
								<Navigation />
							</StripeProvider>
						</SafeAreaProvider>
					</AuthProvider>
				</PersistGate>
			</Provider>
			<StatusBar style='auto' />
			<Toast />
		</QueryClientProvider>
	)
}