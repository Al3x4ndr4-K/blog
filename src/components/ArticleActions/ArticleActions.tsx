import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText } from '@mui/material';
import { deleteArticle } from '../../api/apiArticles';
import { toast } from 'react-toastify';
import { MESSAGES } from '../../constants/messages';
import { retry } from '../../utils/retry';
import styles from './ArticleActions.module.scss';
import { ArticleActionsProps } from '../../types/components';

export const ArticleActions: React.FC<ArticleActionsProps> = ({ article }) => {
  const navigate = useNavigate();
  const [deleteDialogOpen, setDeleteDialogOpen] = React.useState(false);
  const [isDeleting, setIsDeleting] = React.useState(false);

  const handleEdit = () => {
    navigate(`/articles/${article.slug}/edit`);
  };

  const handleDelete = async () => {
    try {
      setIsDeleting(true);
      await retry(() => deleteArticle(article.slug), { maxAttempts: 2 });
      toast.success(MESSAGES.SUCCESS.ARTICLE_DELETED);
      navigate('/');
    } catch (error) {
      toast.error(MESSAGES.ERROR.ARTICLE_DELETE);
    } finally {
      setIsDeleting(false);
      setDeleteDialogOpen(false);
    }
  };

  return (
    <>
      <div className={styles.actions}>
        <button className={styles.deleteButton} onClick={() => setDeleteDialogOpen(true)} disabled={isDeleting}>
          {MESSAGES.BUTTONS.DELETE}
        </button>
        <button className={styles.editButton} onClick={handleEdit} disabled={isDeleting}>
          {MESSAGES.BUTTONS.EDIT}
        </button>
      </div>

      <Dialog
        open={deleteDialogOpen}
        onClose={() => !isDeleting && setDeleteDialogOpen(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        className={styles.deleteDialog}
      >
        <DialogContent>
          <DialogContentText id="alert-dialog-description">{MESSAGES.DIALOG.DELETE_MESSAGE}</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteDialogOpen(false)} disabled={isDeleting} color="primary" variant="outlined">
            {MESSAGES.DIALOG.CANCEL}
          </Button>
          <Button onClick={handleDelete} color="error" autoFocus disabled={isDeleting} variant="contained">
            {isDeleting ? MESSAGES.DIALOG.DELETING : MESSAGES.DIALOG.CONFIRM}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
