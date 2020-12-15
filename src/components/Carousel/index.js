import React, { Component } from 'react';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';

class CardCarousel extends Component {
  render() {
    const { cards } = this.props;
    const responsive = {
      desktop: {
        breakpoint: { max: 3000, min: 1024 },
        items: 3,
        slidesToSlide: 3,
      },
      tablet: {
        breakpoint: { max: 1024, min: 464 },
        items: 2,
        slidesToSlide: 2,
      },
      mobile: {
        breakpoint: { max: 464, min: 0 },
        items: 1,
        slidesToSlide: 1,
      },
    };
    return (
      <Carousel
  swipeable={false}
  draggable={false}
  showDots={true}
  responsive={responsive}
  ssr={true}
  infinite={true}
  autoPlay={false}
  autoPlaySpeed={1000}
  keyBoardControl={true}
  customTransition="transform 300ms ease-in-out"
  transitionDuration={500}
  containerClass='carousel-container'
  removeArrowOnDeviceType={['tablet', 'mobile']}
  deviceType={this.props.deviceType}
  dotListClass="custom-dot-list-style"
  itemClass="carousel-item-padding-40-px"
>
{cards}
</Carousel>
    );
  }
}

export default CardCarousel;