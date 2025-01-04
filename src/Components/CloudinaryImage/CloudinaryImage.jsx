import React from 'react';
import { Cloudinary } from '@cloudinary/url-gen';
import { fill } from '@cloudinary/url-gen/actions/resize';
import { AdvancedImage } from '@cloudinary/react';

const CloudinaryImage = ({ imageId, width = 500, height = 500 }) => {
  const cld = new Cloudinary({
    cloud: {
      cloudName: 'dm3itgnqr'
    }
  });

  const image = cld
    .image(imageId)
    .resize(fill().width(width).height(height));

  return (
    <div style={{ 
      display: 'flex', 
      justifyContent: 'center', 
      padding: '20px',
      margin: '20px'
    }}>
      <AdvancedImage cldImg={image} alt="Cloudinary Image" />
    </div>
  );
};

export default CloudinaryImage;