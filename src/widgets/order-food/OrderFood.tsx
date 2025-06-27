import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router'
import LinkAction from '../../shared/ui/link-action/LinkAction'
import { SVG } from '../../shared/ui/svg/SVG'
import CancelOrder from '../cancel-order/CancelOrder'
import './order-food.scss'
import { observer } from 'mobx-react-lite'
import store from '../../shared/store'
import { ActiveButton } from '../../shared/ui/button'

const OrderFood = observer(({ isOrderSubmitted }: { isOrderSubmitted: boolean }) => {
  const { navBarStore } = store
  const [isCancelModalOpen, setIsCancelModalOpen] = useState(false)
  const [wishes, setWishes] = useState<string>('')

  useEffect(() => {
    const savedWishes = localStorage.getItem('wishes')
    if (savedWishes) {
      setWishes(savedWishes)
    }
  }, [])

  useEffect(() => {
    localStorage.setItem('wishes', wishes)
  }, [wishes])

  const navigate = useNavigate();

  const handleRedirectToMenu = () => {
    navBarStore.setActive('menu');
    navigate('/menu');
  };

  const handleCancelClick = () => {
    setIsCancelModalOpen(true)
  }

  const handleCancelConfirm = () => {
    // После отмены заказа перенаправляем на главную страницу
    navigate('/')
  }
  return (
    <section>
      <div className="b-page-box b-page-box--big b-page--mt24">
        {!isOrderSubmitted && (
          <>
            <div className="b-page-box__title"><b>Закажите еду к столу</b></div>
            <div className="b-page-box__subtitle b-page-box__subtittle--color b-page--mt12">Вы можете заказть еду к столу и
              выбрать удобное для вас время подачи блюд</div>

            <div className="b-page-box__btn b-page--mt20 b-page-box__btn--not-border">
              {/* <Link to="/menu" style={{ textDecoration: 'none', color: 'inherit' }}>Посмотреть меню</Link> */}
              <button className="btn--default" onClick={() => handleRedirectToMenu()}>Посмотреть меню</button>
            </div>
          </>
        )}


        <div className="b-page-box b-page-box--big b-page--mt32">
          <div className="b-page-box__title"><b>Пожелания</b></div>
          <div className="b-page-box-line"></div>
          <textarea
            className="b-page-box__subtittle b-page-box__subtittle--opacity70"
            value={wishes}
            onChange={(e) => setWishes(e.target.value)}
            placeholder="Введите ваши пожелания"
            rows={3}
            disabled={isOrderSubmitted}
            style={{ width: '100%', border: 'none', resize: 'none', background: 'transparent' }}
          />
        </div>

        <div className="b-page-map b-page--mt32">
          <div className="b-page-map-wrap">
            <img src="/img/map.png" alt="img" />
            <div className="b-page-map-wrap-discription">
              <div className="b-page-map-wrap-discription-left">
                <SVG.CarIcon />
                <div className="b-page--ml8">
                  <p>1</p>
                  <span>мин</span>
                </div>
              </div>
              <div className="b-page-map-wrap-discription-right b-page--ml12">
                <div className="b-page-map-wrap-discription-right__tittle">Love you</div>
                <div className="b-page-box-flex-wrap">
                  <p>Ср. чек:</p>
                  <span>от 1 000 ₽</span>
                </div>
              </div>
              <div className="dish-grade dish-grade--map">
                <SVG.StarIcon color='#D5ED00' />
                <p className="b-page--ml2">4,95</p>
              </div>
            </div>
            <div className="b-page-map-wrap__location">
              <SVG.FoodLocationIcon backgroundColor="#B56C27" foregroundColor="white" />
            </div>
            <div className="b-page-map-wrap__pointer">
              <SVG.PersonLocationIcon backgroundColor="#6C452B" foregroundColor="white" />
            </div>
          </div>
          <div className="b-page-box-flex-wrap b-page--mt12">
            <SVG.LocationIcon color='#B56C27' />
            <div className="b-page-box__subtittle b-page-box__subtittle--color-orange b-page-box--ml6">
              г. Санкт-Петербург, ул. Проспект Обуховской </div>
          </div>
        </div>


        <div className="links--action b-page--mt48">

          {isOrderSubmitted &&
            <ActiveButton
              text='Отменить'
              style={{
                color: '#fff',
                background: '#6C452B',
                border: 'none',
                width: '100%',
              }}
              onClick={handleCancelClick}
            />
          }

          <LinkAction
            text='Позвонить в ресторан'
            to='tel:+9876373737'
            style={
              {
                color: '#6C452B',
                background: '#fff',
                border: '1px solid #6C452B',
              }} />
        </div>

        {/* Модальное окно отмены */}
        <CancelOrder
          isOpen={isCancelModalOpen}
          onClose={() => setIsCancelModalOpen(false)}
          onConfirm={handleCancelConfirm}
        />


      </div>
    </section>

  )
})
export default OrderFood
