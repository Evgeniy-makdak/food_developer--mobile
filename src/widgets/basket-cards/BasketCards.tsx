import { MenuCard } from '../../shared/ui'
import { BasketCardsProps, ExtendedBasketItem } from '../../shared/types/types'



export default function BasketCards({
  items,
  onRemoveItem,
  onUpdateQuantity
}: BasketCardsProps) {
  return (
    <section className='b-page--mt24 basket-cards'>
      <h3>Ланч к столу</h3>
      <div className="cards">
        {items.length === 0 ? (
          <div className="empty-cart" style={{
            textAlign: 'center',
            padding: '40px 20px',
            color: '#666'
          }}>
            <p style={{ fontSize: '18px', marginBottom: '8px' }}>Корзина пуста</p>
            <p style={{ fontSize: '14px' }}>Добавьте блюда из меню</p>
          </div>
        ) : (
          items.map((item: ExtendedBasketItem) => (
            <MenuCard
              key={item.id}
              item={item}
              additionalParams={"baskets"}
              onRemoveItem={onRemoveItem}
              onUpdateQuantity={onUpdateQuantity}
            />
          ))
        )}
      </div>
    </section>
  )
}
