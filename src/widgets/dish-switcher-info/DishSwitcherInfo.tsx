
import { useState } from 'react'
import './dish-switcher-info.scss'
import { TabItem, TabType } from '../../shared/types/types'
import { SVG } from '../../shared/ui'



export default function DishSwitcherInfo() {
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
                  <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g clip-path="url(#clip0_2253_8096)">
                      <path d="M21.0628 4.58333H18.6923L20.7942 2.48142C20.9612 2.30853 21.0536 2.07698 21.0515 1.83663C21.0494 1.59629 20.953 1.36637 20.783 1.19642C20.6131 1.02646 20.3832 0.930054 20.1428 0.927966C19.9025 0.925877 19.6709 1.01827 19.498 1.18525L17.3961 3.28717V0.916667C17.3961 0.673552 17.2995 0.440394 17.1276 0.268485C16.9557 0.0965771 16.7226 0 16.4794 0C16.2363 0 16.0032 0.0965771 15.8313 0.268485C15.6594 0.440394 15.5628 0.673552 15.5628 0.916667V5.00133C14.8124 4.20256 13.9267 3.54279 12.9466 3.0525C12.2584 2.74896 11.4899 2.67854 10.7581 2.85195C10.0262 3.02536 9.371 3.43312 8.89219 4.01317C7.28069 5.62467 2.78903 13.8609 0.254444 18.6258C0.0316845 19.0593 -0.0476986 19.5524 0.0277319 20.0339C0.103162 20.5154 0.329512 20.9606 0.674169 21.3053C1.01883 21.6499 1.464 21.8763 1.94555 21.9517C2.42709 22.0271 2.92016 21.9478 3.35369 21.725C8.12036 19.1913 16.3548 14.6988 17.9663 13.0873C18.5462 12.6085 18.9539 11.9536 19.1274 11.2219C19.301 10.4902 19.2309 9.72193 18.9279 9.03375C18.4369 8.0535 17.7769 7.16756 16.9781 6.41667H21.0628C21.3059 6.41667 21.5391 6.32009 21.711 6.14818C21.8829 5.97627 21.9794 5.74312 21.9794 5.5C21.9794 5.25689 21.8829 5.02373 21.711 4.85182C21.5391 4.67991 21.3059 4.58333 21.0628 4.58333ZM16.6701 11.7911C16.0147 12.3518 15.3114 12.854 14.5682 13.2917L12.5442 11.2686C12.3713 11.1016 12.1398 11.0092 11.8994 11.0113C11.6591 11.0134 11.4292 11.1098 11.2592 11.2797C11.0892 11.4497 10.9928 11.6796 10.9907 11.92C10.9887 12.1603 11.081 12.3919 11.248 12.5647L12.9622 14.278C10.445 15.7841 6.83061 17.7998 2.49294 20.1062C2.4063 20.1521 2.3072 20.1691 2.2102 20.1545C2.11321 20.14 2.02344 20.0947 1.95409 20.0254C1.88474 19.956 1.83946 19.8662 1.82491 19.7692C1.81037 19.6722 1.82732 19.5731 1.87328 19.4865C3.26844 16.8639 4.55269 14.5145 5.68661 12.5033L7.58136 14.3981C7.75425 14.5651 7.9858 14.6575 8.22614 14.6554C8.46649 14.6533 8.6964 14.5569 8.86636 14.3869C9.03632 14.217 9.13272 13.987 9.13481 13.7467C9.1369 13.5064 9.04451 13.2748 8.87753 13.1019L6.62619 10.8506C7.62536 9.119 8.46503 7.73392 9.10944 6.7595L11.248 8.89808C11.4209 9.06506 11.6525 9.15746 11.8928 9.15537C12.1332 9.15328 12.3631 9.05687 12.533 8.88692C12.703 8.71696 12.7994 8.48705 12.8015 8.2467C12.8036 8.00635 12.7112 7.7748 12.5442 7.60192L10.2223 5.28C10.9987 4.55675 11.4744 4.43483 12.2234 4.73733C13.2629 5.3306 14.1951 6.0948 14.9807 6.99783C15.8841 7.78371 16.6486 8.71618 17.2421 9.75608C17.4704 10.2878 17.5593 10.9028 16.6701 11.7911Z" fill="#B56C27"></path>
                    </g>
                    <defs>
                      <clipPath id="clip0_2253_8096">
                        <rect width="22" height="22" fill="white"></rect>
                      </clipPath>
                    </defs>
                  </svg>
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
        {tabs.map((tab) => (
          <div
            key={tab.id}
            className={`b-pag-tab__item ${tab.isActive ? 'b-pag-tab__item--active' : ''}`}
            onClick={() => handleTabClick(tab.id)}
          >
            {tab.label}
          </div>
        ))}
      </div>
      {renderTabContent()}
    </section>
  )
}
