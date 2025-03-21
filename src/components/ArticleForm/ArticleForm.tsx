import { FC, useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Button, Paper, TextField, Typography } from '@mui/material';
import { articleSchema } from '../../validation/schemas';
import styles from './ArticleForm.module.scss';
import { CreateArticleDTO } from '../../types/articlesTypes';

interface ArticleFormProps {
  mode: 'create' | 'edit';
  initialData?: CreateArticleDTO;
  onSubmit: (values: CreateArticleDTO) => Promise<void>;
  isLoading?: boolean;
}

export const ArticleForm: FC<ArticleFormProps> = ({ mode, initialData, onSubmit, isLoading = false }) => {
  const [tags, setTags] = useState<string[]>(initialData?.tagList?.length ? initialData.tagList : ['']);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateArticleDTO>({
    defaultValues: initialData,
    resolver: yupResolver(articleSchema),
  });

  const onSubmitHandler = async (formValues: CreateArticleDTO) => {
    const nonEmptyTags = tags.filter((tag) => tag.trim() !== '');
    await onSubmit({
      ...formValues,
      tagList: nonEmptyTags,
    });
  };

  const handleTagChange = (index: number, value: string) => {
    const newTags = [...tags];
    newTags[index] = value;
    setTags(newTags);
  };

  const handleAddTag = () => {
    setTags([...tags, '']);
  };

  const handleDeleteTag = (index: number) => {
    const newTags = tags.filter((_, i) => i !== index);
    if (newTags.length === 0) {
      setTags(['']);
    } else {
      setTags(newTags);
    }
  };

  return (
    <Box sx={{ pb: 2 }}>
      <Paper className={styles.form}>
        <Typography variant="h5" component="h1" gutterBottom align="center">
          {mode === 'edit' ? 'Edit Article' : 'Create Article'}
        </Typography>
        <form onSubmit={handleSubmit(onSubmitHandler)}>
          <TextField
            {...register('title')}
            label="Title"
            placeholder="Title"
            error={!!errors.title}
            helperText={errors.title?.message}
            fullWidth
            margin="normal"
          />
          <TextField
            {...register('description')}
            label="Short description"
            placeholder="Description"
            error={!!errors.description}
            helperText={errors.description?.message}
            fullWidth
            margin="normal"
          />
          <TextField
            {...register('body')}
            label="Text"
            placeholder="Text"
            error={!!errors.body}
            helperText={errors.body?.message}
            fullWidth
            multiline
            rows={10}
            margin="normal"
          />
          <Typography variant="subtitle1" gutterBottom align="left">
            Tags
          </Typography>
          {tags.map((tag, index) => (
            <Box key={index} sx={{ display: 'flex', gap: 2, mb: 2, alignItems: 'center' }}>
              <TextField
                value={tag}
                onChange={(e) => handleTagChange(index, e.target.value)}
                size="small"
                placeholder="Tag"
                sx={{
                  minWidth: '300px',
                  '& .MuiInputBase-input': {
                    wordWrap: 'break-word',
                    overflowWrap: 'break-word',
                  },
                }}
              />
              <button type="button" onClick={() => handleDeleteTag(index)} className={styles.deleteTagButton}>
                Delete
              </button>
              {index === tags.length - 1 && (
                <button type="button" onClick={handleAddTag} className={styles.addTagButton}>
                  Add tag
                </button>
              )}
            </Box>
          ))}
          <Button
            type="submit"
            variant="contained"
            color="primary"
            disabled={isLoading}
            className={styles.submitButton}
          >
            {isLoading ? 'Saving...' : mode === 'edit' ? 'Send' : 'Send'}
          </Button>
        </form>
      </Paper>
    </Box>
  );
};
