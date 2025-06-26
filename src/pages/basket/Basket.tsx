import { useMemo, useCallback } from 'react'
import { BasketAction, BasketButtonAction, BasketCards, BasketComment, LYHeader } from '../../widgets'
import { useCart } from '../../features'
import "./basket.scss"

export default function Basket() {
  const { cart, removeFromCart, updateQuantity } = useCart()

  // Мемоизируем преобразование данных для избежания лишних пересчетов
  const basketItems = useMemo(() =>
    cart.map(item => ({
      title: item.name,
      subtitle: `${item.quantity} шт.`,
      price: item.totalPrice.toString(),
      id: item.id,
      quantity: item.quantity,
      basePrice: item.price,
      image: item.image
    })), [cart]
  )

  // Вычисляем напрямую без лишних функций
  const totalItems = useMemo(() =>
    cart.reduce((total, item) => total + item.quantity, 0), [cart]
  )

  const totalPrice = useMemo(() =>
    cart.reduce((total, item) => total + item.totalPrice, 0), [cart]
  )

  const handleRemoveItem = useCallback((id: string) => {
    removeFromCart(id)
  }, [removeFromCart])

  const handleUpdateQuantity = useCallback((id: string, newQuantity: number) => {
    updateQuantity(id, newQuantity)
  }, [updateQuantity])

  return (
    <div className='basket-page'>
      <LYHeader text="Корзина" additionalIcon={"download"} />
      <BasketAction
        items={basketItems}
        totalItems={totalItems}
        totalPrice={totalPrice}
      />
      <BasketCards
        items={basketItems}
        onRemoveItem={handleRemoveItem}
        onUpdateQuantity={handleUpdateQuantity}
      />

      <BasketComment />

      <BasketButtonAction
        totalPrice={totalPrice}
        totalItems={totalItems}
      />
    </div>
  )
}
