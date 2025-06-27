import { useState, useCallback, memo, useMemo } from 'react'
import { BasketItem, LunchMenuhInfoItem, LunchMenuItem, ExtendedBasketItem } from '../../shared/types/types'
import CustomSwiper from '../../shared/ui/swiper/Swiper'
import { SVG } from '../../shared/ui/svg/SVG'
import { CurrentButton, DishGrade, DishPrice } from '../../shared/ui/index'
import { FoodModal } from '../../widgets'
import { useCart } from '../../features'

// Статический массив изображений для избежания создания нового массива при каждом рендере
const DEFAULT_IMAGES = ["/img/dish1.png", "/img/dish2.png", "/img/dish3.png"]

interface MenuCardProps {
  item: LunchMenuItem | BasketItem | ExtendedBasketItem
  additionalParams?: string
  onRemoveItem?: (id: string) => void
  onUpdateQuantity?: (id: string, newQuantity: number) => void
}

const MenuCard = memo(function MenuCard({
  item,
  additionalParams,
  onRemoveItem,
  onUpdateQuantity
}: MenuCardProps) {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const { addToCart } = useCart()

  // Type guard для ExtendedBasketItem
  const isExtendedBasketItem = (item: LunchMenuItem | BasketItem | ExtendedBasketItem): item is ExtendedBasketItem => {
    return item && 'id' in item && 'quantity' in item &&
           typeof (item as ExtendedBasketItem).id === 'string' &&
           typeof (item as ExtendedBasketItem).quantity === 'number'
  }

  const handleCardClick = useCallback(() => {
    // Если это корзина, не открываем модальное окно
    if (additionalParams === "baskets") {
      return
    }
    setIsModalOpen(true)
  }, [additionalParams])

  const handleCloseModal = useCallback(() => {
    setIsModalOpen(false)
  }, [])

  // Мемоизируем стили для избежания создания новых объектов
  const containerStyle = useMemo(() =>
    additionalParams === "baskets" ? { position: 'relative' as const } : {},
    [additionalParams]
  )

  const cursorStyle = useMemo(() => ({
    cursor: additionalParams !== "baskets" ? 'pointer' as const : 'default' as const
  }), [additionalParams])

  const deleteButtonStyle = useMemo(() => ({
    position: 'absolute' as const,
    top: '8px',
    right: '8px'
  }), [])

  const handleDeleteClick = useCallback(() => {
    if (onRemoveItem && isExtendedBasketItem(item)) {
      onRemoveItem(item.id)
    }
  }, [onRemoveItem, item])

  const handleQuickAddToCart = useCallback((e: React.MouseEvent) => {
    e.stopPropagation() // Предотвращаем открытие модального окна

    // Создаем стабильный ID на основе названия блюда
    const stableId = item.title
      ? item.title.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')
      : 'unknown-dish'

    const cartItem = {
      id: stableId,
      name: item.title || 'Блюдо',
      price: parseInt(item.price) || 800,
      quantity: 1,
      totalPrice: parseInt(item.price) || 800,
      image: '/img/dish1.png'
    }

    addToCart(cartItem)
    console.log(`Быстро добавлено в корзину: ${item.title}`)
  }, [item, addToCart])
  const cardContent = (
    <div className="b-page-box b-page--mt20" style={containerStyle}>
      {
        additionalParams === "baskets" && (
          <div className="dish-delete" style={deleteButtonStyle}>
            <button
              className='btn--default'
              onClick={handleDeleteClick}
            >
              <SVG.DeleteIcon />
            </button>
          </div>
        )
      }
      <div className="dish">
        <div className={`dish-slider ${additionalParams === "baskets" ? 'dish-slider--small112' : 'dish-slider--big140'} swiper swiper-initialized swiper-horizontal swiper-ios swiper-backface-hidden`}>
          <CustomSwiper images={DEFAULT_IMAGES} />
          <DishGrade />

        </div>
        <div className="dish-subscription">
          <div className="dish-wrapper">
            <div className="dish__tittle">{item.title}</div>
            <div className="dish__subtitle b-page--mt8">{item.subtitle}</div>
            <div className="dish-flex b-page--mt12">
              {'info' in item && item.info.map((infoItem: LunchMenuhInfoItem, index: number) => (
                <div key={index} className={`dish__box dish__box--${infoItem.type}`}>{infoItem.text}</div>
              ))}
            </div>
          </div>

          <div className={`b-page-box-flex ${additionalParams === "baskets" ? 'b-page-mt8' : 'b-page--mt20'}`}>
            <DishPrice price={item.price} />

            {additionalParams === "baskets" ? (
              <CurrentButton
                initialValue={isExtendedBasketItem(item) ? item.quantity : 1}
                minValue={1}
                maxValue={10}
                onChange={(quantity) => {
                  if (onUpdateQuantity && isExtendedBasketItem(item)) {
                    onUpdateQuantity(item.id, quantity)
                  }
                }}
              />
            ) : (
              <button
                className="dish-btn"
                onClick={handleQuickAddToCart}
                style={{ cursor: 'pointer' }}
                title="Добавить в корзину"
              >
                <SVG.PlusIcon />
              </button>
            )}

          </div>
        </div>
      </div>
    </div>
  )

  // Мемоизируем данные для модального окна
  const dishData = useMemo(() => {
    // Создаем стабильный ID на основе названия блюда
    const stableId = item.title
      ? item.title.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')
      : 'unknown-dish'
    return {
      id: stableId,
      name: item.title || 'Блюдо',
      price: parseInt(item.price) || 800,
      info: 'info' in item && item.info.length > 0 ? item.info[0].type : 'violet',
      image: '/img/dish1.png'
    }
  }, [item.title, item.price])

  return (
    <>
      <div
        className={`dish-link ${additionalParams !== "baskets" ? 'clickable' : ''}`}
        onClick={additionalParams !== "baskets" ? handleCardClick : undefined}
        style={cursorStyle}
      >
        {cardContent}
      </div>


      <FoodModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        dishData={dishData}
      />
    </>
  )
})

export default MenuCard
