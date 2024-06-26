'use client';

import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import apiClient from '@/utils/axiosConfig';
import 'bootstrap/dist/css/bootstrap.min.css';
import PostForm from '@/app/components/PostForm';
import Header from '@/app/components/Header';

function NewPostPage() {
  const router = useRouter();
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    async function fetchCategories() {
      try {
        const response = await apiClient.get('/categories');
        setCategories(response.data['hydra:member']);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    }
    fetchCategories();
  }, []);

  async function handleCreate(postData) {
    try {
      await apiClient.post('/posts', postData);
      router.push('/');
    } catch (error) {
      console.error('Error creating post:', error);
    }
  }

  return (
    <div className="mt-4">
      <Header name={'Add Post'} />
      <PostForm name="Add" categories={categories} onSubmit={handleCreate} />
    </div>
  );
}

export default NewPostPage;
