import { memo, useMemo } from 'react'
import { lunch_menu_items } from '../../app/config/config'
import { LunchMenuItem } from '../../shared/types/types'
import './menu-cards.scss'
import MenuCard from '../menu-card/MenuCard'

interface MenuCardsProps {
  searchQuery?: string
}

const MenuCards = memo(({ searchQuery = "" }: MenuCardsProps) => {
  // Фильтруем и мемоизируем список карточек
  const filteredItems = useMemo(() => {
    if (!searchQuery.trim()) {
      return lunch_menu_items
    }

    const query = searchQuery.toLowerCase().trim()
    return lunch_menu_items.filter((item: LunchMenuItem) =>
      item.title.toLowerCase().includes(query)
    )
  }, [searchQuery])

  const menuCards = useMemo(() =>
    filteredItems.map((item: LunchMenuItem, index: number) => (
      <MenuCard
        key={`${item.title}-${index}`}
        item={item}
      />
    )), [filteredItems]
  )

  return (
    <section className='menu-cards'>
      <h3>
        Обеденное меню
        {searchQuery && (
          <span style={{ fontSize: '14px', color: '#666', marginLeft: '8px' }}>
            ({filteredItems.length} из {lunch_menu_items.length})
          </span>
        )}
      </h3>
      <div className="cards">
        {menuCards.length > 0 ? (
          menuCards
        ) : (
          <div style={{
            textAlign: 'center',
            padding: '40px 20px',
            color: '#666'
          }}>
            <p>Блюда не найдены</p>
            <p style={{ fontSize: '14px' }}>
              Попробуйте изменить поисковый запрос
            </p>
          </div>
        )}
      </div>
    </section>
  )
})

MenuCards.displayName = 'MenuCards'

export default MenuCards
