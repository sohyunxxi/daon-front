'use client';

import React, { useEffect, useState } from 'react';
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

const VolunteerList: React.FC = () => {
  const [posts, setPosts] = useState<VolunteerPost[]>([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch('/api/volunteer-posts');
        const data = await response.json();
        setPosts(data);
      } catch (error) {
        console.error('봉사활동 목록을 불러오는데 실패했습니다:', error);
      }
    };

    fetchPosts();
  }, []);

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Grid container spacing={3}>
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
    </Container>
  );
};

export default VolunteerList; 