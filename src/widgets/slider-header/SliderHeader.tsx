import { useState } from 'react'
import './slider-header.scss'
import { TopNavItem } from '../../shared/types/types'

interface SliderHeaderProps {
  data: TopNavItem[]
  onTabChange?: (tabId: string) => void
}

export default function SliderHeader({ data, onTabChange }: SliderHeaderProps) {
  const [activeTab, setActiveTab] = useState(data.find(item => item.isActive)?.id || data[0]?.id)

  const handleTabClick = (tabId: string) => {
    setActiveTab(tabId)
    if (onTabChange) {
      onTabChange(tabId)
    }
  }

  return (
    <section className="b-page-slider">
      {data.map((item: TopNavItem) => (
        <div
          key={item.id}
          className={`b-page-slider__item ${activeTab === item.id ? 'b-page-slider__item--active' : ''}`}
          onClick={() => handleTabClick(item.id)}
          style={{ cursor: 'pointer' }}
        >
          {item.label}
        </div>
      ))}
    </section>
  )
}
