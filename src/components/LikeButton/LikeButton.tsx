import { useNavigate } from 'react-router-dom';
import { useAppSelector } from '../../hooks/hooks';
import { favoriteArticle, unfavoriteArticle } from '../../api/apiArticles';
import { toast } from 'react-toastify';
import { MESSAGES } from '../../constants/messages';
import { formatNumber } from '../../utils/formatters';
import { retry } from '../../utils/retry';
import styles from './LikeButton.module.scss';
import { LikeButtonProps } from '../../types/components';
import { FC, useState } from 'react';

export const LikeButton: FC<LikeButtonProps> = ({
  articleSlug,
  favoritesCount: initialCount,
  favorited: initialFavorited,
}) => {
  const navigate = useNavigate();
  const { user } = useAppSelector((state) => state.user);
  const [isLiking, setIsLiking] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [favorited, setFavorited] = useState(initialFavorited);
  const [favoritesCount, setFavoritesCount] = useState(initialCount);

  const handleLike = async () => {
    if (!user) {
      navigate('/login');
      return;
    }

    if (isLiking) return;

    const previousState = { favorited, favoritesCount };

    setIsLiking(true);
    setIsUpdating(true);
    setFavorited(!favorited);
    setFavoritesCount(favorited ? favoritesCount - 1 : favoritesCount + 1);

    try {
      await retry(() => (favorited ? unfavoriteArticle(articleSlug) : favoriteArticle(articleSlug)));
    } catch (error) {
      setFavorited(previousState.favorited);
      setFavoritesCount(previousState.favoritesCount);
      toast.error(MESSAGES.ERROR.LIKE_UPDATE);
    } finally {
      setIsLiking(false);
      setTimeout(() => setIsUpdating(false), 300);
    }
  };

  return (
    <div className={styles.likeContainer}>
      <img
        src={favorited ? '/like-filled.svg' : '/like.svg'}
        alt="Like"
        onClick={handleLike}
        className={isLiking ? styles.liking : ''}
        title={favorited ? 'Unlike' : 'Like'}
      />
      <span className={isUpdating ? styles.updating : ''}>{formatNumber(favoritesCount)}</span>
    </div>
  );
};
