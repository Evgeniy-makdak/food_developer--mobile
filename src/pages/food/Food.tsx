import { DishCompound } from '../../shared/ui'
import { AddToCard, DishSwitcherInfo, LYHeader } from '../../widgets'
import DishCard from '../../widgets/dish-card/DishCard'
import { useCurrentButton } from '../../features'
import './food.scss'

export default function Food() {
  const { quantity, totalPrice, handleQuantityChange } = useCurrentButton({
    initialQuantity: 1,
    basePrice: 800,
    minQuantity: 1,
    maxQuantity: 10,
    onQuantityChange: (quantity, totalPrice) => {
      console.log(`Общее состояние: ${quantity} шт., итого: ${totalPrice} ₽`);
    }
  });

  return (
    <div className='food--page'>
      <LYHeader text='Love You' additionalIcon={"like"}/>

      <DishCard
        quantity={quantity}
        totalPrice={totalPrice}
        onQuantityChange={handleQuantityChange}
      />

      <DishSwitcherInfo />

      <DishCompound />

      <AddToCard
        quantity={quantity}
        totalPrice={totalPrice}
      />
    </div>
  )
}
