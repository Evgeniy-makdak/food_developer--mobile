import { useState, useEffect } from 'react'
import { SVG } from '../../shared/ui/svg/SVG'
import Modal from '../../shared/ui/modal/Modal'
import './status-order.scss'

export default function StatusOrder() {
  // Состояния для модальных окон
  const [isCalendarOpen, setIsCalendarOpen] = useState(false)
  const [isTimeOpen, setIsTimeOpen] = useState(false)
  const [isPersonsOpen, setIsPersonsOpen] = useState(false)

  // Состояния для значений
  const [selectedDate, setSelectedDate] = useState(() => {
    const saved = localStorage.getItem('bookingDate')
    return saved || new Date().toISOString().split('T')[0]
  })

  // Генерируем список времени с интервалом 30 минут с 9:00 до 24:00
  const generateTimeSlots = () => {
    const slots = []
    for (let hour = 9; hour <= 23; hour++) {
      slots.push(`${hour.toString().padStart(2, '0')}:00`)
      slots.push(`${hour.toString().padStart(2, '0')}:30`)
    }
    // Добавляем 00:00 (полночь)
    slots.push('00:00')
    return slots
  }

  // Группируем время по категориям
  const generateTimeCategories = () => {
    const categories = {
      morning: {
        title: 'Завтрак',
        times: ['9:00', '9:30', '10:00', '10:30', '11:00', '11:30']
      },
      lunch: {
        title: 'Обед',
        times: ['12:00', '12:30', '13:00', '13:30', '14:00', '14:30', '15:00', '15:30']
      },
      dinner: {
        title: 'Ужин',
        times: ['16:00', '16:30', '17:00', '17:30', '18:00', '18:30', '19:00', '19:30']
      },
      evening: {
        title: 'Поздний ужин',
        times: ['20:00', '20:30', '21:00', '21:30', '22:00', '22:30', '23:00', '23:30', '00:00']
      }
    }
    return categories
  }

  const timeCategories = generateTimeCategories()
  const timeSlots = generateTimeSlots()

  const [selectedTime, setSelectedTime] = useState(() => {
    const saved = localStorage.getItem('bookingTime')
    // Проверяем, что сохраненное время есть в списке доступных
    if (saved && timeSlots.includes(saved)) {
      return saved
    }
    // Если нет, возвращаем время по умолчанию
    return '10:30'
  })

  const [personsCount, setPersonsCount] = useState(() => {
    const saved = localStorage.getItem('bookingPersons')
    return saved ? parseInt(saved) : 4
  })

  // Сохранение в localStorage
  useEffect(() => {
    localStorage.setItem('bookingDate', selectedDate)
  }, [selectedDate])

  useEffect(() => {
    localStorage.setItem('bookingTime', selectedTime)
  }, [selectedTime])

  useEffect(() => {
    localStorage.setItem('bookingPersons', personsCount.toString())
  }, [personsCount])

  // Форматирование даты для отображения
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    const options: Intl.DateTimeFormatOptions = {
      weekday: 'short',
      day: 'numeric',
      month: 'long'
    }
    return date.toLocaleDateString('ru-RU', options)
  }

  // Форматирование времени для отображения
  const formatTime = (time: string) => {
    const hour = parseInt(time.split(':')[0])

    if (hour === 0) return `${time} (полночь)`
    return time
  }



  // Форматирование количества людей
  const formatPersons = (count: number) => {
    if (count === 1) return '1 персона'
    if (count < 5) return `${count} персоны`
    return `${count} персон`
  }

  return (
    <div>
      <div className="b-page-order-status">
        {/* Календарь */}
        <div
          className="b-page-order-status-item"
          onClick={() => setIsCalendarOpen(true)}
          style={{ cursor: 'pointer' }}
          title="Выбрать дату"
        >
          <SVG.CalendarIcon color='#6C452B' />
          <p className="b-page--mt4">{formatDate(selectedDate)}</p>
        </div>

        {/* Время */}
        <div
          className="b-page-order-status-item"
          onClick={() => setIsTimeOpen(true)}
          style={{ cursor: 'pointer' }}
          title="Выбрать время"
        >
          <div className="reverse">
            <SVG.TimeIcon color='#6C452B' />
          </div>
          <p className="b-page--mt4">{formatTime(selectedTime)}</p>
        </div>

        {/* Количество людей */}
        <div
          className="b-page-order-status-item"
          onClick={() => setIsPersonsOpen(true)}
          style={{ cursor: 'pointer' }}
          title="Выбрать количество людей"
        >
          <SVG.PersonsIcon color='#6C452B' />
          <p className="b-page--mt4">{formatPersons(personsCount)}</p>
        </div>
      </div>

      {/* Модальное окно календаря */}
      <Modal isOpen={isCalendarOpen} onClose={() => setIsCalendarOpen(false)} className="date-modal">
        <div style={{ padding: '20px' }}>
          <h3 style={{ marginBottom: '20px', textAlign: 'center' }}>Выберите дату</h3>
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            style={{
              width: '100%',
              padding: '12px',
              fontSize: '16px',
              border: '1px solid #ddd',
              borderRadius: '8px',
              marginBottom: '20px'
            }}
          />
          <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end' }}>
            <button
              onClick={() => setIsCalendarOpen(false)}
              style={{
                padding: '10px 20px',
                border: '1px solid #6C452B',
                background: '#fff',
                color: '#6C452B',
                borderRadius: '6px',
                cursor: 'pointer'
              }}
            >
              Отмена
            </button>
            <button
              onClick={() => setIsCalendarOpen(false)}
              style={{
                padding: '10px 20px',
                border: 'none',
                background: '#6C452B',
                color: '#fff',
                borderRadius: '6px',
                cursor: 'pointer'
              }}
            >
              Выбрать
            </button>
          </div>
        </div>
      </Modal>

      {/* Модальное окно времени */}
      <Modal isOpen={isTimeOpen} onClose={() => setIsTimeOpen(false)} className="time-modal">
        <div style={{ padding: '20px' }}>
          <h3 style={{ marginBottom: '20px', textAlign: 'center' }}>Выберите время</h3>

          <div className="time-categories" style={{ marginBottom: '20px' }}>
            <div className="time-categories-grid">
              {/* Левая колонка */}
              <div className="time-category-column">
                <div className="time-category">
                  <h4 className="category-title">{timeCategories.morning.title}</h4>
                  <div className="category-times">
                    {timeCategories.morning.times.map((time) => (
                      <div
                        key={time}
                        onClick={() => setSelectedTime(time)}
                        className={`time-slot ${selectedTime === time ? 'selected' : ''}`}
                      >
                        {time}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="time-category">
                  <h4 className="category-title">{timeCategories.dinner.title}</h4>
                  <div className="category-times">
                    {timeCategories.dinner.times.map((time) => (
                      <div
                        key={time}
                        onClick={() => setSelectedTime(time)}
                        className={`time-slot ${selectedTime === time ? 'selected' : ''}`}
                      >
                        {time}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Правая колонка */}
              <div className="time-category-column">
                <div className="time-category">
                  <h4 className="category-title">{timeCategories.lunch.title}</h4>
                  <div className="category-times">
                    {timeCategories.lunch.times.map((time) => (
                      <div
                        key={time}
                        onClick={() => setSelectedTime(time)}
                        className={`time-slot ${selectedTime === time ? 'selected' : ''}`}
                      >
                        {time}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="time-category">
                  <h4 className="category-title">{timeCategories.evening.title}</h4>
                  <div className="category-times">
                    {timeCategories.evening.times.map((time) => (
                      <div
                        key={time}
                        onClick={() => setSelectedTime(time)}
                        className={`time-slot ${selectedTime === time ? 'selected' : ''}`}
                      >
                        {time}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end' }}>
            <button
              onClick={() => setIsTimeOpen(false)}
              style={{
                padding: '10px 20px',
                border: '1px solid #6C452B',
                background: '#fff',
                color: '#6C452B',
                borderRadius: '6px',
                cursor: 'pointer'
              }}
            >
              Отмена
            </button>
            <button
              onClick={() => setIsTimeOpen(false)}
              style={{
                padding: '10px 20px',
                border: 'none',
                background: '#6C452B',
                color: '#fff',
                borderRadius: '6px',
                cursor: 'pointer'
              }}
            >
              Выбрать
            </button>
          </div>
        </div>
      </Modal>

      {/* Модальное окно количества людей */}
      <Modal isOpen={isPersonsOpen} onClose={() => setIsPersonsOpen(false)} className="persons-modal">
        <div style={{ padding: '20px' }}>
          <h3 style={{ marginBottom: '20px', textAlign: 'center' }}>Количество людей</h3>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '20px', marginBottom: '20px' }}>
            <button
              onClick={() => setPersonsCount(Math.max(1, personsCount - 1))}
              style={{
                width: '40px',
                height: '40px',
                border: '1px solid #6C452B',
                background: '#fff',
                color: '#6C452B',
                borderRadius: '50%',
                cursor: 'pointer',
                fontSize: '20px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              -
            </button>
            <span style={{ fontSize: '24px', fontWeight: 'bold', minWidth: '60px', textAlign: 'center' }}>
              {personsCount}
            </span>
            <button
              onClick={() => setPersonsCount(Math.min(20, personsCount + 1))}
              style={{
                width: '40px',
                height: '40px',
                border: '1px solid #6C452B',
                background: '#6C452B',
                color: '#fff',
                borderRadius: '50%',
                cursor: 'pointer',
                fontSize: '20px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              +
            </button>
          </div>
          <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end' }}>
            <button
              onClick={() => setIsPersonsOpen(false)}
              style={{
                padding: '10px 20px',
                border: '1px solid #6C452B',
                background: '#fff',
                color: '#6C452B',
                borderRadius: '6px',
                cursor: 'pointer'
              }}
            >
              Отмена
            </button>
            <button
              onClick={() => setIsPersonsOpen(false)}
              style={{
                padding: '10px 20px',
                border: 'none',
                background: '#6C452B',
                color: '#fff',
                borderRadius: '6px',
                cursor: 'pointer'
              }}
            >
              Выбрать
            </button>
          </div>
        </div>
      </Modal>
    </div>
  )
}
