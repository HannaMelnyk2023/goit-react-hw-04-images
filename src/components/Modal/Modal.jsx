// import React, { Component } from 'react';
import css from './Modal.module.css';
import { useEffect } from 'react';

export function Modal({ largeImageURL, onClose }) {
  // слухач подій на keydown, для закриття модалки по Esc

  useEffect(() => {
    const handleKeyDown = event => {
      if (event.code === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    // cleanup як componentWillUnmount
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose]);

  return (
    <div
      className={css.overlay}
      onClick={e => {
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
    >
      <div className={css.modal} onClick={e => e.stopPropagation()}>
        <img src={largeImageURL} alt="" />
      </div>
    </div>
  );
}
