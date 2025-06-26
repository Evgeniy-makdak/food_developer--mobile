import { SVG } from '../../shared/ui/svg/SVG'
import './current-booking.scss'

export default function CurrentBooking() {
  return (
    <section>

      <h3>Текущие бронирования</h3>
      <div className="b-page-box b-page-box--middle b-page--mt20 b-page-box--shadow">
        <div className="b-page-box-img b-page-box-img--rectangular">
          {/* <img src="./img/img/1.png" alt="img"> */}
          <img className='b-page-box-img' src="/img/1.png" alt="img" />
        </div>
        <div className="b-page-box-flex b-page--mt16">
          <div className="b-page-box__tittle">Love You</div>
          <div className="b-page-box-flex-wrap b-page-box-flex-wrap--gap8">
            {Array(5).fill(0).map((_, index) => (
              <SVG.StarIcon key={index} color='#D5ED00' />
            ))}
          </div>
        </div>
        <div className="b-page-box-flex b-page--mt16">
          <div className="b-page-box-flex-wrap">
            <SVG.LocationIcon color='#B56C27' />
            <div className="b-page-box__subtittle b-page-box__subtittle--opacity80 b-page-box--ml6 b-page-box--mr12">г.
              Санкт-Петербург, ул.проспект ... </div>
          </div>
          <div className="b-page-box__subtittle b-page-box__subtittle--opacity80">4 км</div>
        </div>
      </div>
    </section>

  )
}
