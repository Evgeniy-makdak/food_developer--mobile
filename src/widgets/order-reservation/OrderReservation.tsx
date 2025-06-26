
import StatusOrder from '../status-order/StatusOrder'
import { SVG } from '../../shared/ui'

export default function OrderReservation() {
  return (
    <section>
      <div className="b-page-box b-page-box--shaded b-page--mt32">
        <div className="b-page-box-flex">
          <div className="b-page-title-registration">Ваша бронь</div>
          <div className="b-page-icon b-page-icon--big40">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <g clip-path="url(#clip0_2281_6541)">
                <path d="M22.94 1.06006C22.2602 0.38126 21.3387 0 20.378 0C19.4173 0 18.4958 0.38126 17.816 1.06006L0 18.8761V24.0001H5.124L22.94 6.18406C23.6186 5.50409 23.9997 4.58269 23.9997 3.62206C23.9997 2.66143 23.6186 1.74004 22.94 1.06006ZM4.3 22.0001H2V19.7001L15.31 6.40006L17.61 8.70006L4.3 22.0001ZM21.526 4.77006L19.019 7.27706L16.724 4.97706L19.23 2.47406C19.535 2.16906 19.9487 1.99772 20.38 1.99772C20.8113 1.99772 21.225 2.16906 21.53 2.47406C21.835 2.77906 22.0063 3.19273 22.0063 3.62406C22.0063 4.0554 21.835 4.46906 21.53 4.77406L21.526 4.77006Z" fill="#6C452B"></path>
              </g>
              <defs>
                <clipPath id="clip0_2281_6541">
                  <rect width="24" height="24" fill="white"></rect>
                </clipPath>
              </defs>
            </svg>
          </div>
        </div>
        <div className="b-page-box-line b-page-box-line--small8"></div>
        <div className="b-page-subtittle">Love You</div>
        <div className="b-page-box-flex b-page--mt8">
          <div className="b-page-box-flex-wrap">
              <SVG.LocationIcon color='#B56C27' />
            <div className="b-page-box__subtittle b-page-box__subtittle--opacity80 b-page-box--ml6 b-page-box--mr12">г.
              Санкт-Петербург, ул.проспект ... </div>
          </div>
          <div className="b-page-box__subtittle b-page-box__subtittle--opacity50">4 км</div>
        </div>

              <StatusOrder />
        
      </div>
    </section>
  )
}
