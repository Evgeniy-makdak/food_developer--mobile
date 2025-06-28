import { observer } from "mobx-react-lite";
import { ButtonClose, DownloadButton, LikeButton } from "../../shared/ui";
import { LYHeaderProps } from "../../shared/types/types";


const LYHeader = observer(({ additionalIcon, onClose, text }: LYHeaderProps) => {

  const handleLikeChange = (isLiked: boolean) => {
    console.log(`Блюдо ${isLiked ? 'добавлено в' : 'удалено из'} избранное`);
  };

  return (
    <div className="header--shadow">
      <section className="header-flex header__pt12 header__pb12 ">
        <div className="header-flex-wrap">
          <div className="header__tittle">{text}</div>
        </div>
        <div className="header-flex-wrap gap-8">
          {additionalIcon && (
            additionalIcon === "like" ? (
              <LikeButton
                initialLiked={false}
                onLikeChange={handleLikeChange}
              />
            ) : (
              <DownloadButton />
            )
          )}
          <ButtonClose
            redirectTo={'orders'}
            onClick={onClose}
          />
        </div>
      </section>
    </div>
  )
})

export default LYHeader
