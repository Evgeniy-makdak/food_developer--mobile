import { useEffect, useState } from 'react'
import { useCart } from '../../features'
import { cartUtils } from '../../features/cartUtils'
import { CartItem } from '../../shared/types/types'

export default function BookingOrderComposition() {
  const { cart, removeFromCart } = useCart()
  const [orderItems, setOrderItems] = useState<CartItem[]>([])
  const [isOrderSubmitted, setIsOrderSubmitted] = useState(false)

  const formatPrice = (price: number) => {
    return price.toLocaleString('ru-RU')
  }

  useEffect(() => {
    const checkOrderStatus = () => {
      const submitted = cartUtils.isOrderSubmitted()
      setIsOrderSubmitted(submitted)

      if (submitted && cart.length === 0) {
        // Если заказ оформлен, но корзина пуста, показываем последний заказ
        const lastOrder = cartUtils.getLastSubmittedOrder()
        if (lastOrder && lastOrder.items) {
          setOrderItems(lastOrder.items)
        }
      } else {
        // Иначе показываем текущую корзину
        setOrderItems(cart)
      }
    }

    checkOrderStatus()
  }, [cart])

  const displayItems = orderItems.length > 0 ? orderItems : cart

  if (displayItems.length === 0) {
    return (
      <div className="composition">
        <h3>Состав заказа</h3>
        <div style={{
          textAlign: 'center',
          padding: '40px 20px',
          color: '#666'
        }}>
          <p>Корзина пуста</p>
          <p style={{ fontSize: '14px' }}>
            Добавьте блюда из меню
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="composition">
      <h3>Состав заказа</h3>
      <div className="b-page-slider b-page--mt24">
        {displayItems.map((item: CartItem, index: number) => (
          <div key={item.id || index} className="b-page-box b-page-box--slider js-item-slider" style={{ width: '358px' }}>
            <div className="dish">
              <div className="dish-slider dish-slider--small112">
                <div className="dish-slider-wrap">
                  <img
                    className="swiper-slide swiper-slide-active"
                    src={item.image || "./img/dish1.png"}
                    alt={item.name}
                    style={{ width: '110px' }}
                  />
                </div>
                <div className="dish-grade">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12.4127 1L15.1068 9.2918H23.8254L16.7719 14.4164L19.4661 22.7082L12.4127 17.5836L5.35925 22.7082L8.05342 14.4164L1 9.2918H9.71851L12.4127 1Z" fill="#D5ED00"></path>
                  </svg>
                  <p className="b-page--ml2">4,95</p>
                </div>
              </div>
              <div className="dish-subscription">
                <div className="b-page-box-flex">
                  <div className="dish__tittle">{item.name}</div>
                  {isOrderSubmitted && orderItems.length > 0 ? (
                    <div className="dish-status" style={{
                      padding: '4px 8px',
                      backgroundColor: '#28A745',
                      color: 'white',
                      borderRadius: '4px',
                      fontSize: '12px',
                      fontWeight: 'bold'
                    }}>
                      Оформлен
                    </div>
                  ) : (
                    <div
                      className="dish-delete"
                      onClick={() => removeFromCart(item.id)}
                      style={{ cursor: 'pointer' }}
                      title="Удалить из заказа"
                    >
                      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M8.94191 3.73334C11.3957 3.73335 13.8555 3.84274 16.3044 4.05561L17.3534 4.15326L17.416 4.16222C17.7267 4.22496 17.9452 4.51468 17.9133 4.83686C17.8813 5.15871 17.6106 5.39916 17.294 5.40001L17.2297 5.39675L16.1961 5.30073C13.7824 5.09091 11.3587 4.98335 8.94191 4.98334C7.313 4.98334 5.68345 5.06536 4.05422 5.22993L4.05259 5.23074L2.35256 5.39675C2.00905 5.43043 1.7035 5.17954 1.66978 4.83604C1.6361 4.49254 1.887 4.18698 2.23049 4.15326L3.92889 3.98725C5.5996 3.8185 7.27089 3.73334 8.94191 3.73334Z" fill="#301207"></path>
                        <path d="M10.8828 0.833344C11.6619 0.833344 12.2642 1.00447 12.6569 1.45672C13.0122 1.86611 13.0859 2.4064 13.1411 2.74578L13.3242 3.82895L13.3316 3.89243C13.3527 4.20859 13.1315 4.49597 12.8124 4.54998C12.4933 4.60387 12.1901 4.40534 12.106 4.09994L12.0921 4.03728L11.9082 2.95411V2.95086C11.8385 2.52334 11.7939 2.36952 11.7129 2.27621C11.6679 2.22442 11.511 2.08334 10.8828 2.08334H8.70021C8.0618 2.08334 7.90969 2.22068 7.86932 2.26645C7.8118 2.33175 7.77352 2.43047 7.72609 2.66358L7.67482 2.94516L7.4909 4.03647C7.43375 4.37681 7.11184 4.60702 6.7715 4.54998C6.43109 4.49281 6.20164 4.17017 6.25881 3.82976L6.44191 2.73845L6.49237 2.4463C6.55439 2.12793 6.6629 1.74462 6.93182 1.43963C7.32687 0.991648 7.9303 0.833344 8.70021 0.833344H10.8828Z" fill="#301207"></path>
                        <path d="M15.5399 6.78497C15.8842 6.8072 16.1454 7.10392 16.1234 7.44822L15.5822 15.8401L15.5814 15.8434C15.5591 16.1611 15.5356 16.5125 15.4699 16.8387C15.4029 17.1713 15.2851 17.5225 15.0459 17.834C14.5449 18.4862 13.6916 18.7503 12.4662 18.7503H7.11623C5.89092 18.7503 5.03823 18.4862 4.53729 17.834C4.29807 17.5225 4.18029 17.1713 4.1133 16.8387C4.0476 16.5125 4.02326 16.1611 4.001 15.8434V15.8401L3.45982 7.44822L3.45819 7.38474C3.46976 7.06812 3.72034 6.80582 4.04331 6.78497C4.36596 6.76433 4.64685 6.99205 4.69924 7.30418L4.70656 7.36847L5.24855 15.7563L5.28436 16.2129C5.29814 16.3507 5.31547 16.4758 5.33889 16.5921C5.38435 16.8177 5.44706 16.9661 5.5285 17.0722C5.66918 17.2554 6.01693 17.5003 7.11623 17.5003H12.4662C13.5656 17.5003 13.9132 17.2554 14.0539 17.0722C14.1354 16.9661 14.1988 16.8179 14.2443 16.5921C14.2911 16.3597 14.3111 16.0928 14.3347 15.7563L14.8758 7.36847L14.8832 7.30418C14.9355 6.99194 15.2171 6.76424 15.5399 6.78497Z" fill="#301207"></path>
                        <path d="M11.1749 12.9167L11.2384 12.9199C11.5537 12.9518 11.7999 13.2179 11.7999 13.5417C11.7999 13.8654 11.5537 14.1316 11.2384 14.1634L11.1749 14.1667H8.39986C8.05468 14.1667 7.77486 13.8869 7.77486 13.5417C7.77486 13.1965 8.05468 12.9167 8.39986 12.9167H11.1749Z" fill="#301207"></path>
                        <path d="M11.8749 9.58334C12.22 9.58334 12.4999 9.86316 12.4999 10.2083C12.4999 10.5535 12.22 10.8333 11.8749 10.8333H7.70819C7.36301 10.8333 7.08319 10.5535 7.08319 10.2083C7.08319 9.86316 7.36301 9.58334 7.70819 9.58334H11.8749Z" fill="#301207"></path>
                      </svg>
                    </div>
                  )}
                </div>
                <div className="dish__subtitle b-page--mt8">
                  Обеденное (350 г.)
                </div>
                <div className="b-page-box-flex b-page--mt12">
                  <div className="dish-price">
                    <svg width="9" height="10" viewBox="0 0 9 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M3.68457 1.77637V4.85938H4.87402C6.07031 4.85938 6.69238 4.27148 6.69238 3.31445C6.69238 2.36426 6.07031 1.77637 4.8877 1.77637H3.68457ZM6.35742 8.68066H3.68457V10H1.62012V8.68066H0.382812V7.40918H1.62012V6.39746H0.382812V4.88672H1.62012V0.135742H5.50293C7.47852 0.135742 8.78418 1.44824 8.78418 3.29395C8.78418 5.11914 7.41016 6.43164 5.39355 6.43164H3.68457V7.40918H6.35742V8.68066Z" fill="#6C452B"></path>
                    </svg>
                    <p>{formatPrice(item.totalPrice)}</p>
                  </div>
                  <div className="dish-quantity">
                    {item.quantity} шт
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
