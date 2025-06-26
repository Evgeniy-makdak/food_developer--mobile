
export default function DishPrice({price}: { price: string }) {
  return (
    <div className="dish-price">
      <b><p>₽</p></b>

      <p>{price}</p>
    </div>
  )
}
