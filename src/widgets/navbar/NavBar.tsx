// import { bottomNavItems } from "../../config/config";
import { SVG } from "../../shared/ui/svg/SVG";
import { BottomNavItem } from "../../shared/types/types";
import './navbar.scss'
import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";
import store from "../../shared/store";
import useNavigationHandler from "../../features/useNavigationHandler";
import { cartUtils } from "../../features/cartUtils";

const NavBar = observer(() => {
  const { navBarStore } = store
  const [items, setItems] = useState(navBarStore.items);
  const [cartItemsCount, setCartItemsCount] = useState(0);
  const { handleItemClick } = useNavigationHandler();

  useEffect(() => {
    setItems(navBarStore.items);
  }, [navBarStore.items]);

  // Отслеживаем изменения в корзине
  useEffect(() => {
    const updateCartCount = () => {
      const totalItems = cartUtils.getTotalItemsCount();
      setCartItemsCount(totalItems);
    };

    // Обновляем при загрузке
    updateCartCount();

    // Обновляем каждые 500ms для синхронизации
    const interval = setInterval(updateCartCount, 500);

    return () => clearInterval(interval);
  }, []);



  return (
    <div className="b-bottom b-bottom-h124">
      <div className="container">
        <div className="b-bottom-nav">
          {items.map((item: BottomNavItem) => (
            <div
              key={item.id}
              className={`b-bottom-nav-item ${item.isActive ? 'b-bottom-nav-item--active' : ''}`}
            >
              {item.icon === 'menu' && (
                <button className="btn--default" onClick={() => handleItemClick(item.id)}>
                  <SVG.RestaurantIcon color={item.isActive ? 'white' : '#301207'} />
                </button>
              )}
              {item.icon === 'orders' && (
                <button className="btn--default" onClick={() => handleItemClick(item.id)}>
                  <SVG.OrderIcon color={item.isActive ? 'white' : '#301207'} />
                </button>
              )}
              {item.icon === 'baskets' && (
                <button className="btn--default basket-button" onClick={() => handleItemClick(item.id)}>
                  <div className="basket-icon-wrapper">
                    <SVG.BasketIcon
                      color={
                        item.isActive
                          ? 'white'
                          : cartItemsCount > 0
                            ? '#6C452B'
                            : '#301207'
                      }
                    />
                    {cartItemsCount > 0 && (
                      <div className={`basket-badge ${item.isActive ? 'basket-badge--active' : ''}`}>
                        {cartItemsCount > 99 ? '99+' : cartItemsCount}
                      </div>
                    )}
                  </div>
                </button>
              )}
              {item.icon === 'profile' && (
                <button className="btn--default" onClick={() => handleItemClick(item.id)}>
                  <SVG.ProfileIcon color={item.isActive ? 'white' : '#301207'} />
                </button>
              )}
              <p>{item.isActive && item.label}</p>
            </div>
          ))}

        </div>
      </div>
    </div>
  )
})

export default NavBar


