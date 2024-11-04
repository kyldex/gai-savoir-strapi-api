import type { Schema, Attribute } from '@strapi/strapi';

export interface ContentCarousel extends Schema.Component {
  collectionName: 'components_content_carousels';
  info: {
    displayName: 'Carousel';
    icon: 'images';
  };
  attributes: {
    images: Attribute.Media & Attribute.Required;
  };
}

export interface ContentImage extends Schema.Component {
  collectionName: 'components_content_images';
  info: {
    displayName: 'Image';
    icon: 'image';
    description: '';
  };
  attributes: {
    image: Attribute.Media & Attribute.Required;
    caption: Attribute.Text;
    alternative_text: Attribute.String;
  };
}

export interface ContentText extends Schema.Component {
  collectionName: 'components_content_texts';
  info: {
    displayName: 'Text';
    icon: 'ad';
    description: '';
  };
  attributes: {
    text: Attribute.RichText & Attribute.Required;
  };
}

declare module '@strapi/types' {
  export module Shared {
    export interface Components {
      'content.carousel': ContentCarousel;
      'content.image': ContentImage;
      'content.text': ContentText;
    }
  }
}
