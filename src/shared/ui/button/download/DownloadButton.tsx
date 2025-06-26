
import { SVG } from '../../svg/SVG'


export default function ButtonDownload() {

  return (
    <div className="header__icon">
      <button className="btn--default btn-close">
        <SVG.DownloadIcon />
      </button>
    </div>
  )
}
