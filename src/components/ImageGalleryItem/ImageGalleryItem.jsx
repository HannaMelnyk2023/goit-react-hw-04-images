import React, { Component } from 'react';
import css from './ImageGalleryItem.module.css';
export class ImageGalleryItem extends Component {
  render() {
    const { webformatURL, largeImageURL, onClick } = this.props;
    return (
      <li className="imageGalleryItem" onClick={() => onClick(largeImageURL)}>
        <img className={css.imageGalleryItemImage} src={webformatURL} alt="" />
      </li>
    );
  }
}
