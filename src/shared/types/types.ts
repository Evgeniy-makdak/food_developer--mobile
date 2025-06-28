// Возможные ID навигационных пунктов
export type NavItemId = 'menu' | 'orders' | 'baskets' | 'profile';

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

export interface MenuCardProps {
  item: LunchMenuItem | BasketItem | ExtendedBasketItem
  additionalParams?: string
  onRemoveItem?: (id: string) => void
  onUpdateQuantity?: (id: string, newQuantity: number) => void
}

export interface Order {
  id: string
  items: CartItem[]
  comment?: string
  booking?: {
    date: string
    time: string
    persons: number
  }
  status: 'current' | 'submitted' | 'cancelled' | 'completed'
  cancelReason?: string | null
  createdAt: string
  updatedAt?: string
}

export interface ButtonCloseProps {
  redirectTo: NavItemId
  onClick?: () => void
}

export interface LikeButtonProps {
  initialLiked?: boolean
  onLikeChange?: (isLiked: boolean) => void
}

export interface InputProps {
  type: string
  className: string
  style: React.CSSProperties
  value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  disabled: boolean
  text: string
}

export interface ModalProps {
  isOpen: boolean
  onClose: () => void
  children: React.ReactNode
  className?: string
}

export interface StatusProps {
  status?: 'waiting' | 'cancelled' | 'completed'
}

export interface CustomSwiperProps {
  images: string[]
}

export interface AddToCardProps {
  quantity?: number
  totalPrice?: number
  onAddToCart?: () => void
  dishData?: {
    id: string
    name: string
    price: number
    image: string
  }
}

export interface BasketActionHeaderProps {
  items: ExtendedBasketItem[]
  totalItems?: number
  totalPrice?: number
}

export interface BasketButtonActionProps {
  totalPrice?: number
  totalItems?: number
}

export interface BasketCardsProps {
  items: ExtendedBasketItem[]
  onRemoveItem?: (id: string) => void
  onUpdateQuantity?: (id: string, newQuantity: number) => void
}

export interface CancelOrderProps {
  isOpen: boolean
  onClose: () => void
  onConfirm?: () => void
}
export interface DishCardProps {
  quantity?: number
  totalPrice?: number
  onQuantityChange?: (newQuantity: number) => void
  dishData?: {
    id: string
    name: string
    price: number
    image: string
  }
}

export interface FoodModalProps {
  isOpen: boolean
  onClose: () => void
  dishData?: {
    id: string
    name: string
    price: number
    info: string
    image: string
  }
}

export interface LYHeaderProps {
  additionalIcon?: string
  onClose?: () => void
  text: string
}

export interface MenuCardsProps {
  searchQuery?: string
}

export interface OrderCompositionProps {
  items: CartItem[]
  totalItems: number
}
export interface OrderItemsListProps {
  items: CartItem[]
}

export interface OrderTotalPayProps {
  totalPrice: number
}

export interface SearchFieldProps {
  value: string
  onChange: (query: string) => void
}

export interface SliderHeaderProps {
  data: TopNavItem[]
  onTabChange?: (tabId: string) => void
}

export interface StatusRestaurantsProps {
  status?: 'waiting' | 'cancelled' | 'completed'
  activeTab?: string
}
