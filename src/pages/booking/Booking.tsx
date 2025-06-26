import { useState, useEffect } from 'react'
import { topNavItems } from '../../app/config/config'
import { PrevHeader, SliderHeader, StatusRestaurants, StatusOrder, CurrentBooking, OrderFood, BookingOrderComposition } from '../../widgets'
import { cartUtils } from '../../features/cartUtils'
import { CartItem } from '../../shared/types/types'

import './booking.scss'

interface Order {
  id: string
  items: CartItem[]
  comment?: string
  booking?: {
    date: string
    time: string
    persons: number
  }
  status: 'current' | 'submitted' | 'cancelled' | 'completed'
  cancelReason?: string | null
  createdAt: string
  updatedAt?: string
}

export default function Booking() {
  const [isOrderSubmitted, setIsOrderSubmitted] = useState(false)
  const [activeTab, setActiveTab] = useState('current')
  const [orders, setOrders] = useState<Order[]>([])

  // Проверяем статус заказа при загрузке компонента
  useEffect(() => {
    const checkOrderStatus = () => {
      const submitted = cartUtils.isOrderSubmitted()
      setIsOrderSubmitted(submitted)
    }

    checkOrderStatus()

    // Проверяем статус каждые 1 секунду (для синхронизации между вкладками)
    const interval = setInterval(checkOrderStatus, 1000)

    return () => clearInterval(interval)
  }, [])

  // Загружаем заказы в зависимости от активного таба
  useEffect(() => {
    const loadOrders = () => {
      let ordersList: Order[] = []

      switch (activeTab) {
        case 'current': {
          // Текущий заказ + заказы со статусом submitted из истории
          const currentCart = cartUtils.getCart()
          const submittedOrders = cartUtils.getOrdersByStatus('submitted')

          if (currentCart.length > 0 && isOrderSubmitted) {
            ordersList.push({
              id: 'current',
              items: currentCart,
              comment: cartUtils.getOrderComment(),
              booking: cartUtils.getBookingData(),
              status: 'current',
              createdAt: new Date().toISOString()
            })
          }

          ordersList = [...ordersList, ...submittedOrders]
          break
        }

        case 'cancelled': {
          ordersList = cartUtils.getOrdersByStatus('cancelled')
          break
        }

        case 'completed': {
          ordersList = cartUtils.getOrdersByStatus('completed')
          break
        }
      }

      setOrders(ordersList)
    }

    loadOrders()
  }, [activeTab, isOrderSubmitted])

  const handleTabChange = (tabId: string) => {
    setActiveTab(tabId)
  }

  // Определяем, показывать ли заказы для текущего таба
  const shouldShowOrders = () => {
    if (activeTab === 'current') {
      return isOrderSubmitted || orders.length > 0
    }
    return orders.length > 0
  }

  return (
    <div className='booking--page'>
      <PrevHeader />
      <SliderHeader data={topNavItems} onTabChange={handleTabChange} />
      <StatusRestaurants activeTab={activeTab} />
      <div className="wrapper-status-order">
        <StatusOrder />
      </div>
      <CurrentBooking />

      {/* Показываем заказы в зависимости от активного таба */}
      {shouldShowOrders() && (
        <>
          {activeTab === 'current' && isOrderSubmitted && <BookingOrderComposition />}
          {activeTab === 'cancelled' && orders.length > 0 && (
            <div style={{ padding: '20px', textAlign: 'center' }}>
              <h3>Отмененные заказы ({orders.length})</h3>
              {orders.map((order) => (
                <div key={order.id} style={{
                  border: '1px solid #ddd',
                  borderRadius: '8px',
                  padding: '16px',
                  margin: '8px 0',
                  backgroundColor: '#fff'
                }}>
                  <p><strong>Заказ #{order.id}</strong></p>
                  <p>Блюд: {order.items.length}</p>
                  <p>Причина отмены: {order.cancelReason}</p>
                  <p>Дата: {new Date(order.createdAt).toLocaleDateString('ru-RU')}</p>
                </div>
              ))}
            </div>
          )}
          {activeTab === 'completed' && orders.length > 0 && (
            <div style={{ padding: '20px', textAlign: 'center' }}>
              <h3>Завершенные заказы ({orders.length})</h3>
              {orders.map((order) => (
                <div key={order.id} style={{
                  border: '1px solid #ddd',
                  borderRadius: '8px',
                  padding: '16px',
                  margin: '8px 0',
                  backgroundColor: '#fff'
                }}>
                  <p><strong>Заказ #{order.id}</strong></p>
                  <p>Блюд: {order.items.length}</p>
                  <p>Дата завершения: {new Date(order.updatedAt || order.createdAt).toLocaleDateString('ru-RU')}</p>
                </div>
              ))}
            </div>
          )}
        </>
      )}

      {/* Показываем пустое состояние если нет заказов */}
      {!shouldShowOrders() && (
        <div style={{ padding: '40px', textAlign: 'center', color: '#666' }}>
          <h3>
            {activeTab === 'current' && 'Нет текущих заказов'}
            {activeTab === 'cancelled' && 'Нет отмененных заказов'}
            {activeTab === 'completed' && 'Нет завершенных заказов'}
          </h3>
          <p>
            {activeTab === 'current' && 'Оформите заказ в меню'}
            {activeTab === 'cancelled' && 'Отмененные заказы будут отображаться здесь'}
            {activeTab === 'completed' && 'Завершенные заказы будут отображаться здесь'}
          </p>
        </div>
      )}

      {/* Показываем кнопки действий только для текущих заказов */}
      {activeTab === 'current' && <OrderFood isOrderSubmitted={isOrderSubmitted} />}
    </div>
  )
}
