import React, { useState, useEffect } from 'react';

export default function ImageGallery({ style }) {
  // const {style_id, name, original_price, sale_price, photos, skus} = style;
  const { name, photos } = style;
  const [index, setIndex] = useState(0);
  const [currentThumbnail, setCurrentThumbnail] = useState(photos[0].url);
  const [normalView, setNormalView] = useState(true);
  const [expandedView, setExpandedView] = useState(false);
  const [zoomedView, setZoomedView] = useState(false);

  const thumbnails = photos.map((p, i) => (
    <div className="carousel-item-container" key={p.url} onClick={() => { setCurrentThumbnail(photos[i].url); setIndex(i); }}>
      {currentThumbnail === photos[i].url ? <div className="carousel-item-underlay" /> : null}
      <img className="carousel-item-thumbnail" src={p.thumbnail_url} alt={name} />
    </div>
  ));

  useEffect(() => {
    setCurrentThumbnail(photos[0].url);
  }, [style]);

  useEffect(() => {
    const prevArrows = document.querySelectorAll('.prev');
    const nextArrows = document.querySelectorAll('.next');

    if (index === 0) {
      prevArrows.forEach((e) => { e.style.visibility = 'hidden'; });
      nextArrows.forEach((e) => { e.style.visibility = 'visible'; });
    }
    if (index === photos.length - 1) {
      nextArrows.forEach((e) => { e.style.visibility = 'hidden'; });
      prevArrows.forEach((e) => { e.style.visibility = 'visible'; });
    }
    if (index !== 0 && index !== photos.length - 1) {
      nextArrows.forEach((e) => { e.style.visibility = 'visible'; });
      prevArrows.forEach((e) => { e.style.visibility = 'visible'; });
    }
  }, [index]);

  const getNext = () => {
    setIndex(index + 1 === photos.length ? index : index + 1);
  };

  const getPrev = () => {
    setIndex(index - 1 < 0 ? 0 : index - 1);
  };

  const enlargeImage = () => {
    const img = document.getElementById('displayed-image');
    const carouselContainer = document.getElementById('carousel-container');
    const imageGalleryContainer = document.getElementById('image-gallery-container');
    if (normalView) {
      setNormalView(false);
      img.style.cursor = 'cell';
      img.style.overflow = 'hidden';
      imageGalleryContainer.style['z-index'] = 5;
      imageGalleryContainer.style.width = 'auto';
      img.style.transform = 'scale(1.5)';
      img.style.height = 'auto';
      img.style.width = 'auto';
      img.style['object-fit'] = 'cover';
      img.style.transition = 'transform 0.25s ease';
      setExpandedView(true);
    } else if (expandedView) {
      img.style.cursor = 'zoom-out';
      img.style.transform = 'scale(1)';
      img.style.transform = 'scale(2.5)';
      setExpandedView(false);
      setZoomedView(true);
    } else {
      img.style.cursor = 'zoom-in';
      img.style.transform = 'scale(1)';
      img.style.height = '500px';
      img.style.width = '500px';
      imageGalleryContainer.style['z-index'] = 0;
      setZoomedView(false);
      setNormalView(true);
    }
  };

  return (
    <div id="image-gallery-container">
      <div id="carousel-thumbnail-container">
        <button className="prev navigate" id="carousel-thumbnail-prev" aria-label="previous" type="button" onClick={getPrev}>&and;</button>
        {thumbnails}
        <button className="next navigate" id="carousel-thumbnail-next" aria-label="next" type="button" onClick={getNext}>&or;</button>
      </div>
      <div id="carousel-container">
        <img id="displayed-image" role="presentation" src={photos[index].url} alt={name} onClick={enlargeImage} />
        <div className="carousel-actions">
          <button className="prev navigate" id="carousel-prev" aria-label="previous" type="button" onClick={getPrev}>&lt;</button>
          <button className="next navigate" id="carousel-next" aria-label="next" type="button" onClick={getNext}>&gt;</button>
        </div>
      </div>

    </div>
  );
}
