/* eslint-disable max-len */
import React, { useState, useEffect } from 'react';
import backupImage from '../../assets/edna-image-unavailable.jpg';
import backupThumbnail from '../../assets/image-unavailable.jpg';

export default function ImageGallery({ style }) {
  const maxThumbnailDisplay = 5;
  const { name, photos } = style;
  const [index, setIndex] = useState(0);
  const [thumbnailIndexStart, setThumbnailIndexStart] = useState(0);
  const [thumbnailIndexEnd, setThumbnailIndexEnd] = useState(maxThumbnailDisplay > photos.length ? photos.length : maxThumbnailDisplay);
  const [currentThumbnail, setCurrentThumbnail] = useState(photos[0].url ? photos[0].url : backupImage);
  const [normalView, setNormalView] = useState(true);
  const [expandedView, setExpandedView] = useState(false);

  let thumbnails = photos.map((p, i) => (
    <div className="carousel-item-container" key={p.url} onClick={() => { setIndex(i); }}>
      {currentThumbnail === (photos[i].url || backupImage) && <div className="carousel-item-underlay" />}
      <img className="carousel-item-thumbnail" src={p.thumbnail_url ? p.thumbnail_url : backupThumbnail} alt={name} />
    </div>
  ));

  useEffect(() => {
    thumbnails = photos.map((p, i) => (
      <div className="carousel-item-container" key={p.url} onClick={() => { setIndex(i); }}>
        {currentThumbnail === photos[i].url && <div className="carousel-item-underlay" />}
        <img className="carousel-item-thumbnail" src={p.thumbnail_url ? p.thumbnail_url : backupThumbnail} alt={name} />
      </div>
    ));

    setCurrentThumbnail(photos[index].url);
    setThumbnailIndexEnd(maxThumbnailDisplay > thumbnails.length ? thumbnails.length : maxThumbnailDisplay);
  }, [style]);

  useEffect(() => {
    setCurrentThumbnail(photos[index].url ? photos[index].url : backupImage);

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
    if (thumbnailIndexEnd === thumbnails.length) {
      document.getElementById('carousel-thumbnail-next').style.visibility = 'hidden';
    }
    if (thumbnailIndexStart === 0) {
      document.getElementById('carousel-thumbnail-prev').style.visibility = 'hidden';
    }
  }, [index]);

  const getNext = () => {
    if (thumbnailIndexEnd < thumbnails.length) {
      setThumbnailIndexStart(thumbnailIndexStart + 1);
      setThumbnailIndexEnd(thumbnailIndexEnd + 1);
    }

    setIndex(index + 1 === photos.length ? index : index + 1);
  };

  const getPrev = () => {
    if (thumbnailIndexStart > 0) {
      setThumbnailIndexStart(thumbnailIndexStart - 1);
      setThumbnailIndexEnd(thumbnailIndexEnd - 1);
    }

    setIndex(index - 1 > 0 ? index - 1 : 0);
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
    const navButtons = document.querySelectorAll('.navigate');
    const thumbnailContainer = document.getElementById('carousel-thumbnail-container');

    if (normalView) {
      setNormalView(false);
      imageGalleryContainer.style.height = '60vh';
      displayImageContainer.style.width = '90vh';
      productInfoContainer.style.display = 'none';
      imageGalleryContainer.style['z-index'] = 5;
      img.style.cursor = 'cell';
      img.style.transform = 'scale(1.0)';

      img.style.width = '600px';

      setExpandedView(true);
    } else if (expandedView) {
      img.style.cursor = 'zoom-out';
      img.style.transform = 'scale(2.5)';
      thumbnailContainer.style.visibility = 'hidden';
      navButtons.forEach((b) => b.style.visibility = 'hidden');

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

      thumbnailContainer.style.visibility = 'visible';
      navButtons.forEach((b) => b.style.visibility = 'visible');

      if (thumbnailIndexStart === 0) {
        document.getElementById('carousel-thumbnail-prev').style.visibility = 'hidden';
        document.getElementById('carousel-prev').style.visibility = 'hidden';
      }
      if (thumbnailIndexEnd === thumbnails.length) {
        document.getElementById('carousel-thumbnail-next').style.visibility = 'hidden';
        document.getElementById('carousel-next').style.visibility = 'hidden';
      }

      setNormalView(true);
    }
  };

  return (
    <div id="image-gallery-container">
      <div id="carousel-thumbnail-container">
        <button className="prev navigate" id="carousel-thumbnail-prev" aria-label="previous" type="button" onClick={getPrev}><i className="fa-regular fa-circle-up" /></button>
        {thumbnails.slice(thumbnailIndexStart, thumbnailIndexEnd)}
        <button className="next navigate" id="carousel-thumbnail-next" aria-label="next" type="button" onClick={getNext}><i className="fa-regular fa-circle-down" /></button>
      </div>
      <div id="display-image-container">
        <img id="displayed-image" role="presentation" src={photos[index].url ? photos[index].url : backupImage} alt={name} onClick={enlargeImage} onMouseMove={(e) => panImage(e)} onFocus={() => {}} />
        {normalView && <i id="expand-icon" className="fa-sharp fa-solid fa-expand" onClick={enlargeImage} />}
        <div className="carousel-actions">
          <button className="prev navigate" id="carousel-prev" aria-label="previous" type="button" onClick={getPrev}><i className="fa-regular fa-circle-left" /></button>
          <button className="next navigate" id="carousel-next" aria-label="next" type="button" onClick={getNext}><i className="fa-regular fa-circle-right" /></button>
        </div>
      </div>

    </div>
  );
}
