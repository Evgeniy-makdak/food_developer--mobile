import { CurrentButton, DishPrice, SVG } from "../../shared/ui";
import CustomSwiper from "../../shared/ui/swiper/Swiper";
import './dish-card.scss'

interface DishCardProps {
  quantity?: number
  totalPrice?: number
  onQuantityChange?: (newQuantity: number) => void
  dishData?: {
    id: string
    name: string
    price: number
    image: string
  }
}

export default function DishCard({
  quantity = 1,
  totalPrice = 800,
  onQuantityChange,
  dishData
}: DishCardProps) {

  return (
    <section className="b-page-box" style={{ marginTop: '32px' }}>
      <div className="dish-img">
        <CustomSwiper images={["/img/2.png", "/img/2.png", "/img/2.png", "/img/2.png"]}/>
      </div>
      <div className="b-page-box-flex b-page--mt12">
        <div className="dish-info-wrapper">
          <div className="dish__tittle">{dishData?.name || "Голубцы с мясом"}</div>
          <div className="dish__subtitle b-page--mt8">Обеденное (350 г.)</div>
        </div>
        <a href="#" className="dish-grade-link">
          <div>
            <SVG.StarIcon color='#D5ED00' />
            <p className="b-page--ml2">4,95</p>
          </div>
          <span>200 оценок</span>
        </a>
      </div>

      <div className="b-page-box-flex b-page--mt20">
        <DishPrice price={totalPrice.toString()} />
        <CurrentButton
          initialValue={quantity}
          minValue={1}
          maxValue={10}
          onChange={onQuantityChange}
        />
      </div>
    </section>
  )
}