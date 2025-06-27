import { BottomNavItem, LunchMenuItem, TopNavItem } from "../../shared/types/types";

export const bottomNavItems: BottomNavItem[] = [
  { id: 'menu', icon: 'menu', label: 'Меню', isActive: false },
  { id: 'orders', icon: 'orders', label: 'Заказы', isActive: true },
  { id: 'backets', icon: 'backets', label: 'Корзина', isActive: false },
  { id: 'profile', icon: 'profile', label: 'Профиль', isActive: false }
];

export const topNavItems: TopNavItem[] = [
  { id: 'current', label: 'Текущие', isActive: true },
  { id: 'cancelled', label: 'Отмененные', isActive: false },
  { id: 'completed', label: 'Завершенные', isActive: false },
]

export const topNavMeuItems: TopNavItem[] = [
  { id: 'current', label: 'Обеденное меню', isActive: true },
  { id: 'cancelled', label: 'Холодные закуски', isActive: false },

]


export const lunch_menu_items: LunchMenuItem[] = [
  {
    title: "Голубцы с мясом1",
    subtitle: "Обеденное (350 г.)",
    info: [
      {
        text: "Есть аллергены",
        type: "violet"
      },
      {
        text: "325 Kkal",
        type: "rose"
      }
    ],
    price: "800"
  },
  {
    subtitle: "Обеденное (350 г.)",
    title: "Голубцы с мясом2",
    info: [
      {
        text: "Нет аллергенов",
        type: "green"
      },
      {
        text: "325 Kkal",
        type: "rose"
      }
    ],
    price: "800"
  },
  {
    title: "Голубцы с мясом3",
    subtitle: "Обеденное (350 г.)",
    info: [
      {
        text: "Есть аллергены",
        type: "violet"
      },
      {
        text: "325 Kkal",
        type: "rose"
      }
    ],
    price: "800"
  },
  {
    title: "Голубцы с мясом4",
    subtitle: "Обеденное (350 г.)",
    info: [
      {
        text: "Есть аллергены",
        type: "violet"
      },
      {
        text: "325 Kkal",
        type: "rose"
      }
    ],
    price: "800"
  },
  {
    title: "Голубцы с мясом5",
    subtitle: "Обеденное (350 г.)",
    info: [
      {
        text: "Есть аллергены",
        type: "violet"
      },
      {
        text: "325 Kkal",
        type: "rose"
      }
    ],
    price: "800"
  },
  {
    title: "Курица с рисом",
    subtitle: "Обеденное (350 г.)",
    info: [
      {
        text: "Есть аллергены",
        type: "violet"
      },
      {
        text: "325 Kkal",
        type: "rose"
      }
    ],
    price: "800"
  },

];
