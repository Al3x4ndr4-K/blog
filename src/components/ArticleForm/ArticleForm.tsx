import React from 'react';
import { TextField, Button, Paper, Box, Typography } from '@mui/material';
import { useForm } from '../../hooks/useForm';
import { CreateArticleDTO } from '../../types/articlesTypes';
import styles from './ArticleForm.module.scss';

interface ArticleFormProps {
  initialValues: CreateArticleDTO;
  onSubmit: (values: CreateArticleDTO) => Promise<void>;
  isEdit?: boolean;
  isLoading?: boolean;
}

export const ArticleForm: React.FC<ArticleFormProps> = ({
  initialValues,
  onSubmit,
  isEdit = false,
  isLoading = false,
}) => {
  const [tags, setTags] = React.useState<string[]>(initialValues.tagList?.length ? initialValues.tagList : ['']);

  const { values, handleChange, handleSubmit } = useForm<CreateArticleDTO>({
    initialValues: {
      ...initialValues,
      tagList: [],
    },
    onSubmit: async (formValues) => {
      const nonEmptyTags = tags.filter((tag) => tag.trim() !== '');
      await onSubmit({
        ...formValues,
        tagList: nonEmptyTags,
      });
    },
  });

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
          {isEdit ? 'Edit Article' : 'Create Article'}
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            name="title"
            label="Title"
            placeholder="Title"
            value={values.title}
            onChange={handleChange}
            fullWidth
            margin="normal"
            required
          />
          <TextField
            name="description"
            label="Short description"
            placeholder="Title"
            value={values.description}
            onChange={handleChange}
            fullWidth
            margin="normal"
            required
          />
          <TextField
            name="body"
            label="Text"
            placeholder="Text"
            value={values.body}
            onChange={handleChange}
            fullWidth
            multiline
            rows={10}
            margin="normal"
            required
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
              <button onClick={() => handleDeleteTag(index)} className={styles.deleteTagButton}>
                Delete
              </button>
              {index === tags.length - 1 && (
                <button onClick={handleAddTag} className={styles.addTagButton}>
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
            {isLoading ? 'Saving...' : isEdit ? 'Edit article' : 'Send'}
          </Button>
        </form>
      </Paper>
    </Box>
  );
};
