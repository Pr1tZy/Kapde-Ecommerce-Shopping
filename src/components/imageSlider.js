import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import '../styles/imageSlider.css'; // Ensure this path is correct
import poster1 from '../images/promoimages/poster1.png';
import poster2 from '../images/promoimages/poster2.png';
import poster3 from '../images/promoimages/poster3.png';
const ImageSlider = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 7000
  };

  const images = [
    poster1,
    poster2,
    poster3
  ];

  return (
    <div className="image-slider">
      <Slider {...settings}>
        {images.map((image, index) => (
          <div key={index}>
            <img src={image} alt={`Slide ${index + 1}`} />
          </div>
        ))}
      </Slider>
    </div>
  );
}

export default ImageSlider;
