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
    title: "Голубцы с мясом",
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
    subtitle: "Обеденное (300 г.)",
    title: "Рис с говядиной",
    info: [
      {
        text: "Нет аллергенов",
        type: "green"
      },
      {
        text: "310 Kkal",
        type: "rose"
      }
    ],
    price: "500"
  },
  {
    title: "Рис с курицей",
    subtitle: "Обеденное (420 г.)",
    info: [
      {
        text: "Нет аллергенов",
        type: "green"
      },
      {
        text: "270 Kkal",
        type: "rose"
      }
    ],
    price: "730"
  },
  {
    title: "Оджахури с говядиной",
    subtitle: "Обеденное (470 г.)",
    info: [
      {
        text: "Есть аллергены",
        type: "rose"
      },
      {
        text: "520 Kkal",
        type: "rose"
      }
    ],
    price: "1600"
  },
  {
    title: "Плов с говядиной",
    subtitle: "Обеденное (400 г.)",
    info: [
      {
        text: "Есть аллергены",
        type: "rose"
      },
      {
        text: "570 Kkal",
        type: "rose"
      }
    ],
    price: "1100"
  },

];

// export const basket_items = [
//   {
//     id: 1,
//     title: "Голубцы с мясом3",
//     subtitle: "Обеденное (350 г.)",
//     price: "800"
//   },
//     {
//     id: 2,
//     title: "Голубцы с мясом",
//     subtitle: "Обеденное (350 г.)",
//     price: "800"
//   },
//     {
//     id: 3,
//     title: "Голубцы с мясом",
//     subtitle: "Обеденное (350 г.)",
//     price: "800"
//   },
//     {
//     id: 4,
//     title: "Голубцы с мясом",
//     subtitle: "Обеденное (350 г.)",
//     price: "800"
//   },
// ]