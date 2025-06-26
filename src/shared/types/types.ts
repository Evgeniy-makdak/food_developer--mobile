// Возможные ID навигационных пунктов
export type NavItemId = 'menu' | 'orders' | 'backets' | 'profile';

export type BottomNavItem = {
  id: NavItemId;
  icon: string;
  label: string;
  isActive: boolean;
};

export type TopNavItem = {
  id: string;
  label: string;
  isActive: boolean;
};

export type LunchMenuhInfoItem = {
  text: string;
  type: 'violet' | 'rose' | 'green'; // Можно расширить при необходимости
};

export type LunchMenuItem = {
  title: string;
  subtitle: string;
  info: LunchMenuhInfoItem[];
  price: string;
};

export type BasketItem = {
  title: string;
  subtitle: string;
  price: string;
};

export type ExtendedBasketItem = BasketItem & {
  id: string;
  quantity: number;
  basePrice: number;
  image: string;
};

export type CartItem = {
  id: string;
  name: string;
  price: number;
  quantity: number;
  totalPrice: number;
  image: string;
  addedAt: string;
};

export interface CurrentButtonProps {
  initialValue?: number
  minValue?: number
  maxValue?: number
  onChange?: (value: number) => void
}

export interface DishCompoundProps {
  title?: string
  content?: string
  isOpenByDefault?: boolean
}

export type TabType = 'nutrition' | 'allergens'

export interface TabItem {
  id: TabType
  label: string
  isActive: boolean
}

// export type BottomNavItem = {
//   id: string;
//   icon: string;
//   label: string;
//   isActive: boolean;
// };

// export type TopNavItem = {
//   id: string;
//   label: string;
//   isActive: boolean;
// };

// export type LunchMenuhInfoItem = {
//   text: string;
//   type: 'violet' | 'rose' | 'green'; // Можно расширить при необходимости
// };

// export type LunchMenuItem = {
//   title: string;
//   subtitle: string;
//   info: LunchMenuhInfoItem[];
//   price: string;
// };