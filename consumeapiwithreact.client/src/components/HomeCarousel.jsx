import React, {useState} from "react"; 
import Carousel from 'react-bootstrap/Carousel';
import img8 from '../assets/photo8.jpg'
import img9 from '../assets/photo9.jpg'
import img10  from '../assets/photo10.jpg'
const data = [
  {
   image: (img8), 
   caption:"Caption",
   description:"Description Here"
  },
  {
    image:(img9), 
    caption:"Caption",
    description:"Description Here"
   },
   {
    image:(img10), 
    caption:"Caption",
    description:"Description Here"
   } 
]

function HomeCarousel() {
  const [index, setIndex] = useState(0);
  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };

  return (
    <Carousel activeIndex={index} onSelect={handleSelect}>
       {data.map((slide, i) => {
        return (
          <Carousel.Item>        
        <img
          className="d-block w-100"
          src={slide.image}
          alt="slider image"
          height={600} 
        />
        <Carousel.Caption>
          <h3>{slide.caption}</h3>
          <p>{slide.description}</p>
        </Carousel.Caption>
      </Carousel.Item>
        )
      })}
      
    </Carousel>
  );
}
export default HomeCarousel;