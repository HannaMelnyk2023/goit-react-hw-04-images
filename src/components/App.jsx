// import React, { Component } from 'react';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Button } from './Button/Button';
import { Loader } from './Loader/Loader';
import { Modal } from './Modal/Modal';
import './App.css';
import { useState } from 'react';
import { useEffect } from 'react';

const API_KEY = '52609803-933344cf37d0c6144f6fe0bf2';

export function App() {
  const [images, setImages] = useState([]);
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [largeImageURL, setLargeImageURL] = useState(null);
  const [totalHits, setTotalHits] = useState(0);

  useEffect(() => {
    if (!query) return;

    const fetchImages = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(
          `https://pixabay.com/api/?q=${query}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`
        );
        const data = await response.json();
        setImages(prevImages => [...prevImages, ...data.hits]);

        setTotalHits(data.totalHits);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchImages();
  }, [query, page]);

  const handleSearchSubmit = newQuery => {
    setQuery(newQuery);
    setPage(1);
    setImages([]);
  };

  const loadMore = () => {
    setPage(prevPage => prevPage + 1);
  };

  const openModal = url => {
    setLargeImageURL(url);
  };

  const closeModal = () => {
    setLargeImageURL(null);
  };

  return (
    <>
      <Searchbar onSubmit={handleSearchSubmit} />
      <ImageGallery images={images} onImageClick={openModal} />
      {isLoading && <Loader />}
      {images.length > 0 && images.length < totalHits && !isLoading && (
        <Button onClick={loadMore} />
      )}
      {largeImageURL && (
        <Modal largeImageURL={largeImageURL} onClose={closeModal} />
      )}
    </>
  );
}
