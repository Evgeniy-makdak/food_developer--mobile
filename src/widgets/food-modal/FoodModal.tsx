import { DishCompound } from '../../shared/ui'
import Modal from '../../shared/ui/modal/Modal'
import { AddToCard, DishSwitcherInfo, LYHeader } from '../../widgets'
import DishCard from '../../widgets/dish-card/DishCard'
import { useCurrentButton, useCart } from '../../features'
import './food-modal.scss'

interface FoodModalProps {
  isOpen: boolean
  onClose: () => void
  dishData?: {
    id: string
    name: string
    price: number
    image: string
  }
}

export default function FoodModal({ isOpen, onClose, dishData }: FoodModalProps) {
  const basePrice = dishData?.price || 800
  const { addToCart } = useCart()

  const { quantity, totalPrice, handleQuantityChange } = useCurrentButton({
    initialQuantity: 1,
    basePrice,
    minQuantity: 1,
    maxQuantity: 10,
    onQuantityChange: (quantity, totalPrice) => {
      console.log(`Модальное окно: ${quantity} шт., итого: ${totalPrice} ₽`);
    }
  });

  return (
    <Modal isOpen={isOpen} onClose={onClose} className="food-modal">
      <div className='food-modal__content'>
        <LYHeader text={dishData?.name || 'Блюдо'} additionalIcon={"like"} onClose={onClose} />

        <DishCard 
          quantity={quantity}
          totalPrice={totalPrice}
          onQuantityChange={handleQuantityChange}
          dishData={dishData}
        />

        <DishSwitcherInfo />

        <DishCompound />

        <AddToCard 
          quantity={quantity}
          totalPrice={totalPrice}
          onAddToCart={() => {
            // Создаем стабильный ID на основе названия блюда
            const stableId = dishData?.name
              ? dishData.name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')
              : 'unknown-dish'

            // Создаем объект для добавления в корзину
            const cartItem = {
              id: stableId,
              name: dishData?.name || 'Блюдо',
              price: basePrice,
              quantity: quantity,
              totalPrice: totalPrice,
              image: dishData?.image || '/img/dish1.png'
            }

            // Добавляем товар в корзину через хук
            addToCart(cartItem)

            console.log(`Добавлено в корзину: ${quantity} шт. на сумму ${totalPrice} ₽`)

            onClose()
          }}
        />
      </div>
    </Modal>
  )
}
