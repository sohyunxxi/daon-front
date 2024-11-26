'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import api from '@/utils/api';
import { 
  Grid, 
  Card, 
  CardContent, 
  Typography, 
  Container,
  Box
} from '@mui/material';
import { format } from 'date-fns';
import { ko } from 'date-fns/locale';
import ReviewList from './ReviewList';

interface VolunteerPost {
  idx: number;
  title: string;
  activity_type: string;
  description: string;
  max_participants: number;
  activity_date: string;
  location: string;
  created_at: string;
  writer: {
    idx: number;
    username: string;
  };
}

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

const VolunteerList: React.FC = () => {
  const router = useRouter();
  const [posts, setPosts] = useState<VolunteerPost[]>([]);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [postsResponse, reviewsResponse] = await Promise.all([
          api.get('/api/posts'),
          api.get('/api/reviews')
        ]);

        setPosts(postsResponse.data);
        setReviews(reviewsResponse.data);
      } catch (err) {
        console.error('API 에러:', err);
        setError('데이터를 불러오는데 실패했습니다.');
      }
    };

    fetchData();
  }, []);

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h5" gutterBottom>봉사활동 목록</Typography>
      <Grid container spacing={3} sx={{ mb: 6 }}>
        {posts.map((post) => (
          <Grid item xs={12} sm={6} md={4} key={post.idx}>
            <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
              <CardContent>
                <Typography variant="h6" component="h2" gutterBottom>
                  {post.title}
                </Typography>
                <Typography color="textSecondary" gutterBottom>
                  활동 유형: {post.activity_type}
                </Typography>
                <Typography variant="body2" paragraph>
                  {post.description}
                </Typography>
                <Box sx={{ mt: 'auto' }}>
                  <Typography variant="body2" color="textSecondary">
                    📍 {post.location}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    🗓 {format(new Date(post.activity_date), 'yyyy년 MM월 dd일', { locale: ko })}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    👥 최대 인원: {post.max_participants}명
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    작성자: {post.writer.username}
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Typography variant="h5" gutterBottom>최근 리뷰</Typography>
      <ReviewList reviews={reviews} />
    </Container>
  );
};

export default VolunteerList; 