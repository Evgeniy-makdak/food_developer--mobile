
import { useState } from 'react'
import './dish-switcher-info.scss'
import { TabItem, TabType } from '../../shared/types/types'
import { SVG } from '../../shared/ui'



export default function DishSwitcherInfo({ info }: { info?: string | undefined }) {
  const [tabs, setTabs] = useState<TabItem[]>([
    { id: 'nutrition', label: 'КБЖУ', isActive: true },
    { id: 'allergens', label: 'Аллергены', isActive: false }
  ])

  const [activeTab, setActiveTab] = useState<TabType>('nutrition')

  const handleTabClick = (tabId: TabType) => {
    setActiveTab(tabId)
    setTabs(tabs.map(tab => ({
      ...tab,
      isActive: tab.id === tabId
    })))
  }

  const renderTabContent = () => {
    switch (activeTab) {
      case 'nutrition':
        return (
          <div className="b-pag-tab-box b-page--mt24 js-tab-box b-pag-tab-box--active">
            <div className="dish__subtitle">На 100 г.</div>
            <div className="b-page-box b-page--mt8">
              <div className="b-pag-tab-box-wrap">
                <div className="b-pag-tab-box-wrap-elem">
                  <p>белки</p>
                  <span>8 г</span>
                </div>
                <div className="b-pag-tab-box-wrap__elem"></div>
                <div className="b-pag-tab-box-wrap-elem">
                  <p>жиры</p>
                  <span>6 г</span>
                </div>
                <div className="b-pag-tab-box-wrap__elem"></div>
                <div className="b-pag-tab-box-wrap-elem">
                  <p>углеводы</p>
                  <span>6 г</span>
                </div>
                <div className="b-pag-tab-box-wrap__elem"></div>
                <div className="b-pag-tab-box-wrap-elem">
                  <p>ккал</p>
                  <span>120</span>
                </div>
              </div>
            </div>
          </div>
        )
      case 'allergens':
        return (
          <div className="b-pag-tab-box b-page--mt24 js-tab-box b-pag-tab-box--active">
            <div className="b-page-box">
              <div className="b-page-box-flex-wrap">
                <div className="b-pag-tab-elem__icon">
                  <SVG.CowIcon />
                </div>
                <p className="b-pag-tab-elem__text b-page-box--ml8">говяжье мясо</p>
              </div>
              <div className="b-page-box-line"></div>
              <div className="b-page-box-flex-wrap">
                <div className="b-pag-tab-elem__icon">
                  <SVG.CarrotIcon />
                </div>
                <p className="b-pag-tab-elem__text b-page-box--ml8">морковь сухая</p>
              </div>
            </div>
          </div>
        )
      default:
        return null
    }
  }

  return (
    <section className="b-page--mt32">
      <div className="b-pag-tab">
        {tabs.map((tab) => {

          if (info === 'green' && tab.id === 'allergens') return

          return (
            <div
              key={tab.id}
              className={`b-pag-tab__item ${tab.isActive ? 'b-pag-tab__item--active' : ''} ${info === 'green' ? 'w-100' : ''}`}
              onClick={() => handleTabClick(tab.id)}
            >
              {tab.label}
            </div>
          )
        })}
      </div>
      {renderTabContent()}
    </section>
  )
}
