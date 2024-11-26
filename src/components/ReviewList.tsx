'use client';

import React from 'react';
import { Grid, Card, CardContent, Typography, Box } from '@mui/material';
import { format } from 'date-fns';
import { ko } from 'date-fns/locale';

interface Review {
  idx: number;
  title: string;
  author: string;
  date: string;
  location: string;
  likes: number;
  content: string;
  preview: string;
  rating: number;
}

interface ReviewListProps {
  reviews: Review[];
}

const ReviewList: React.FC<ReviewListProps> = ({ reviews }) => {
  return (
    <Grid container spacing={3}>
      {reviews.map((review) => (
        <Grid item xs={12} sm={6} md={4} key={review.idx}>
          <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
            <CardContent>
              <Typography variant="subtitle1" gutterBottom>
                {review.title}
              </Typography>
              <Typography variant="body2" paragraph>
                {review.preview}
              </Typography>
              <Box sx={{ mt: 'auto' }}>
                <Typography variant="body2" color="textSecondary">
                  작성자: {review.author}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  작성일: {format(new Date(review.date), 'yyyy년 MM월 dd일', { locale: ko })}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  평점: {review.rating}
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default ReviewList; 