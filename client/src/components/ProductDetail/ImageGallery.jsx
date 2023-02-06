import React, { useState, useEffect } from 'react';

export default function ImageGallery({ style }) {
  const { name, photos } = style;
  const [index, setIndex] = useState(0);
  const [thumbnailIndex, setThumbnailIndex] = useState(0);
  const [currentThumbnail, setCurrentThumbnail] = useState(photos[0].url);
  const [displayedThumbnails, setDisplayedThumbnails] = useState([]);
  const [normalView, setNormalView] = useState(true);
  const [expandedView, setExpandedView] = useState(false);

  const thumbnails = photos.map((p, i) => (
    <div className="carousel-item-container" key={p.url} onClick={() => { setCurrentThumbnail(photos[i].url); setIndex(i); }}>
      {currentThumbnail === photos[i].url ? <div className="carousel-item-underlay" /> : null}
      <div className="carousel-item-underlay" id={`underlay-${i}`} hidden />
      <img className="carousel-item-thumbnail" src={p.thumbnail_url} alt={name} />
    </div>
  ));

  useEffect(() => {
    setDisplayedThumbnails(thumbnails.slice(0, 4)); // testing max of 4 elements
    setCurrentThumbnail(photos[0].url);
    setIndex(0);
    setThumbnailIndex(0);
  }, [style]);

  useEffect(() => {
    setCurrentThumbnail(photos[index].url);

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
    if (thumbnailIndex + 1 === displayedThumbnails.length && index + 1 < thumbnails.length) {
      setDisplayedThumbnails([...displayedThumbnails.slice(1), thumbnails[index + 1]]);
    }
    // eslint-disable-next-line max-len
    setThumbnailIndex(thumbnailIndex + 1 === displayedThumbnails.length ? thumbnailIndex : thumbnailIndex + 1);
    setIndex(index + 1 === photos.length ? index : index + 1);
  };

  const getPrev = () => {
    if (thumbnailIndex === 0) {
      if (index - 1 >= 0) {
        setDisplayedThumbnails(thumbnails.slice(index - 1, index + 3));
        setIndex(index - 1);
      }
    } else {
      setThumbnailIndex(thumbnailIndex - 1);
      setIndex(index - 1);
    }
  };

  const panImage = (e) => {
    const img = document.getElementById('displayed-image');
    if (!normalView && !expandedView) {
      const xPos = ((e.pageX - img.offsetLeft - img.width / 3) / img.width) * 100;
      const yPos = ((e.pageY - img.offsetTop - img.height / 3) / img.height) * 100;
      img.style['transform-origin'] = `${xPos}% ${yPos}%`;
    }
  };

  const enlargeImage = () => {
    const img = document.getElementById('displayed-image');
    const displayImageContainer = document.getElementById('display-image-container');
    const imageGalleryContainer = document.getElementById('image-gallery-container');
    const productInfoContainer = document.getElementById('product-info-container');

    if (normalView) {
      setNormalView(false);
      imageGalleryContainer.style.height = '60vh';
      displayImageContainer.style.width = '90vh';
      productInfoContainer.style.display = 'none';
      imageGalleryContainer.style['z-index'] = 5;
      img.style.cursor = 'cell';
      img.style.transform = 'scale(1.0)';
      setExpandedView(true);
    } else if (expandedView) {
      img.style.cursor = 'zoom-out';
      img.style.transform = 'scale(2.5)';
      setExpandedView(false);
    } else { // zoomed view
      productInfoContainer.style.display = 'block';
      imageGalleryContainer.style.height = '';
      displayImageContainer.style.width = '';
      img.style.cursor = 'zoom-in';
      img.style.transform = 'scale(1)';
      img.style.height = '500px';
      img.style.width = '500px';
      imageGalleryContainer.style['z-index'] = 0;

      setNormalView(true);
    }
  };

  return (
    <div id="image-gallery-container">
      <div id="carousel-thumbnail-container">
        <button className="prev navigate" id="carousel-thumbnail-prev" aria-label="previous" type="button" onClick={getPrev}>&and;</button>
        {displayedThumbnails}
        <button className="next navigate" id="carousel-thumbnail-next" aria-label="next" type="button" onClick={getNext}>&or;</button>
      </div>
      <div id="display-image-container">
        <img id="displayed-image" role="presentation" src={photos[index].url} alt={name} onClick={enlargeImage} onMouseMove={(e) => panImage(e)} onFocus={() => {}} />
        <div className="carousel-actions">
          <button className="prev navigate" id="carousel-prev" aria-label="previous" type="button" onClick={getPrev}>&lt;</button>
          <button className="next navigate" id="carousel-next" aria-label="next" type="button" onClick={getNext}>&gt;</button>
        </div>
      </div>

    </div>
  );
}
