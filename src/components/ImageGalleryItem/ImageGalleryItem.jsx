// import React, { Component } from 'react';
import css from './ImageGalleryItem.module.css';

export function ImageGalleryItem ({ webformatURL, largeImageURL, onClick }) {
    return (
      <li className={css.imageGalleryItem} onClick={() => onClick(largeImageURL)}>
        <img className={css.imageGalleryItemImage} src={webformatURL} alt=
          {tags} />
      </li>
    );
  }

