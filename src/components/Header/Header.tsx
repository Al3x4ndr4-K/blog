import { useAppDispatch, useAppSelector } from '../../hooks/hooks.ts';
import { logout } from '../../store/slices/userSlice.ts';
import { Link, useNavigate } from 'react-router-dom';
import styles from './Header.module.scss';

export const Header = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { user } = useAppSelector((state) => state.user);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/');
  };

  return (
    <header className={styles.header}>
      <div>
        <Link to="/articles" className="span">
          Realworld Blog
        </Link>
      </div>
      <div className={styles.buttons}>
        {user ? (
          <>
            <button className={styles.createArticle}>Создать статью</button>
            <div className={styles.userInfo} onClick={() => navigate('/profile')}>
              <img src={user.image || '/avatar.svg'} alt="Avatar" />
              <span>{user.username}</span>
            </div>
            <button className={styles.logout} onClick={handleLogout}>
              Выйти
            </button>
          </>
        ) : (
          <>
            <button className={styles.signIn} onClick={() => navigate('/login')}>
              Sign In
            </button>
            <button className={styles.signUp} onClick={() => navigate('/register')}>
              Sign Up
            </button>
          </>
        )}
      </div>
    </header>
  );
};
