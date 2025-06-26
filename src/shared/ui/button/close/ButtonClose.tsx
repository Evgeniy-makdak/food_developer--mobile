import { useNavigationHandler } from '../../../../features'
import { NavItemId } from '../../../types/types';
import { SVG } from '../../svg/SVG'
import './button-close.scss'

interface ButtonCloseProps {
  redirectTo: NavItemId
  onClick?: () => void
}

export default function ButtonClose({ redirectTo, onClick }: ButtonCloseProps) {
  const { handleItemClick } = useNavigationHandler();

  const handleClick = () => {
    if (onClick) {
      onClick()
    } else {
      handleItemClick(redirectTo)
    }
  }

  return (
    <div className="header__icon">
      <button className="btn--default btn-close" onClick={handleClick}>
        <SVG.CloseIcon />
      </button>
    </div>
  )
}
