import { useState } from 'react'
import { SVG } from '../../svg/SVG'
import './like-button.scss'

interface LikeButtonProps {
  initialLiked?: boolean
  onLikeChange?: (isLiked: boolean) => void
}

export default function LikeButton({
  initialLiked = false,
  onLikeChange
}: LikeButtonProps) {
  const [isLiked, setIsLiked] = useState(initialLiked)
  const [isAnimating, setIsAnimating] = useState(false)

  const handleClick = () => {
    const newLikedState = !isLiked
    setIsLiked(newLikedState)
    onLikeChange?.(newLikedState)

    // Запускаем анимацию при лайке
    if (newLikedState) {
      setIsAnimating(true)
      setTimeout(() => setIsAnimating(false), 600)
    }
  }

  return (
    <div className="header__icon">
      <button
        className={`btn--default btn-like ${isAnimating ? 'liked' : ''}`}
        onClick={handleClick}
        type="button"
      >
        <SVG.HeartIcon fill={isLiked ? '#FF0000' : '#301207'} />
      </button>
    </div>
  )
}
