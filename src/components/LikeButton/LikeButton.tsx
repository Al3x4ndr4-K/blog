import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from '../../hooks/hooks';
import { favoriteArticle, unfavoriteArticle } from '../../api/apiArticles';
import { toast } from 'react-toastify';
import { MESSAGES } from '../../constants/messages';
import { formatNumber } from '../../utils/formatters';
import { retry } from '../../utils/retry';
import styles from './LikeButton.module.scss';

interface LikeButtonProps {
  slug: string;
  initialFavorited: boolean;
  initialFavoritesCount: number;
}

const LikeButtonComponent: React.FC<LikeButtonProps> = ({ slug, initialFavorited, initialFavoritesCount }) => {
  const navigate = useNavigate();
  const { user } = useAppSelector((state) => state.user);
  const [favorited, setFavorited] = React.useState(initialFavorited);
  const [favoritesCount, setFavoritesCount] = React.useState(initialFavoritesCount);
  const [isLiking, setIsLiking] = React.useState(false);
  const [isUpdating, setIsUpdating] = React.useState(false);

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
    setFavoritesCount((prev) => (favorited ? prev - 1 : prev + 1));

    try {
      await retry(() => (favorited ? unfavoriteArticle(slug) : favoriteArticle(slug)));
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

export const LikeButton = React.memo(LikeButtonComponent, (prevProps, nextProps) => {
  return (
    prevProps.slug === nextProps.slug &&
    prevProps.initialFavorited === nextProps.initialFavorited &&
    prevProps.initialFavoritesCount === nextProps.initialFavoritesCount
  );
});
