import axios from 'axios';

console.log('api.ts 파일 실행됨');

export const api = axios.create({
  baseURL: 'http://localhost:4999',
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
  }
}); 