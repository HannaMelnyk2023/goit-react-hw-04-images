import React, { Component } from 'react';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Button } from './Button/Button';
import { Loader } from './Loader/Loader';
import { Modal } from './Modal/Modal';
import './App.css';

const API_KEY = '52609803-933344cf37d0c6144f6fe0bf2';

export class App extends Component {
  state = {
    images: [],
    query: '',
    page: 1,
    isLoading: false,
    largeImageURL: null,
    // додаємо властивість загальної кількості співпадінь:
    totalHits: 0,
  };

  componentDidUpdate(prevProps, prevState) {
    if (
      prevState.query !== this.state.query ||
      prevState.page !== this.state.page
    ) {
      this.fetchImage();
    }
  }
  fetchImage = () => {
    const { query, page } = this.state;
    this.setState({ isLoading: true });
    fetch(
      `https://pixabay.com/api/?q=${query}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`
    )
      .then(res => res.json())
      .then(data => {
        // console.log(data)
        this.setState(prev => ({
          images: [...prev.images, ...data.hits],
          totalHits: data.totalHits,
        }));
      })
      .finally(() => {
        this.setState({
          isLoading: false,
        });
      });
  };
  handleSearchSubmit = query => {
    this.setState({
      query,
      page: 1,
      images: [],
    });
  };
  loadMore = () => {
    this.setState(prev => ({
      page: prev.page + 1,
    }));
  };
  openModal = largeImageURL => {
    this.setState({ largeImageURL });
  };

  closeModal = () => {
    this.setState({ largeImageURL: null });
  };

  render() {
    const { images, isLoading, largeImageURL, totalHits} = this.state;

    return (
      <>
        <Searchbar onSubmit={this.handleSearchSubmit} />
        <ImageGallery images={images} onImageClick={this.openModal} />
        {isLoading && <Loader />}
        {images.length > 0 && images.length < totalHits && !isLoading && <Button onClick={this.loadMore} />}
        {largeImageURL && (
          <Modal largeImageURL={largeImageURL} onClose={this.closeModal} />
        )}
      </>
    );
  }
}
