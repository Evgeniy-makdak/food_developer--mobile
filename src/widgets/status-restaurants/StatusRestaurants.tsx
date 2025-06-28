import { StatusRestaurantsProps } from '../../shared/types/types'
import { Status } from '../../shared/ui'
import './status-restaurants.scss'


export default function StatusRestaurants({ status = 'waiting', activeTab = 'current' }: StatusRestaurantsProps) {
  // Определяем статус на основе активного таба
  const getStatusFromTab = () => {
    switch (activeTab) {
      case 'cancelled':
        return 'cancelled'
      case 'completed':
        return 'completed'
      case 'current':
      default:
        return status
    }
  }

  // Определяем текст описания на основе статуса
  const getStatusDescription = () => {
    const currentStatus = getStatusFromTab()
    switch (currentStatus) {
      case 'cancelled':
        return 'Ваше бронирование было отменено'
      case 'completed':
        return 'Ваше бронирование успешно завершено'
      case 'waiting':
      default:
        return 'Ждем от хостес ресторана подтверждения вашей брони'
    }
  }

  const currentStatus = getStatusFromTab()

  return (
    <section>
      <div className="b-page-box b-page-box--big b-page--mt24">
        <div className="b-page-box__tittle">Статус</div>
        <div className="b-page-box__subtittle b-page-box__subtittle--opacity70 b-page--mt4">
          {getStatusDescription()}
        </div>
        <div className="b-page-box-line"></div>
        <div className="b-page-box-flex">
          <div className="b-page-box__small-text">Пятница, 10 мая, 09:00</div>
          <Status status={currentStatus} />
        </div>
      </div>
    </section>
  )
}
