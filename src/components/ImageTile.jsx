import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  background-color: #fff;
  padding: 4px;
  margin: 16px;
  width: 200px;
  height: 200px;
  cursor: pointer;
  overflow: hidden;
  position: relative;

  /* &:hover > :first-child {
    transform: scale(1.3);

    & + * {
      left: 0;
    }
  } */
`;

const Image = styled.img`
  width: 100%;
  height: auto;
  position: absolute;

  /* transition: transform 0.5s ease-out; */
`;

const ImageText = styled.div`
  left: -100%;
  background-color: black;
  color: white;
  position: absolute;
  bottom: 0;

  transition: 0.3s ease-out;
`;

const DefaultPosition = { x: 0, y: 0 };

// const onMouseDown = (setRelative) => (e) => {
//   // only left mouse button
//   if (e.button !== 0) return
//   var pos = $(this.getDOMNode()).offset()
//   this.setState({
//     dragging: true,
//     rel: {
//       x: e.pageX - pos.left,
//       y: e.pageY - pos.top
//     }
//   })
//   e.stopPropagation()
//   e.preventDefault()
// }

const onMouseMove = (myRef, setPosition) => e => {
  requestAnimationFrame(() => {
    //sometimes event is nullable
    if (!e.pageX) return;

    const { current } = myRef;
    console.info({ myRef, e });
    console.info({
      rec: e,
      ofx: current.offsetLeft,
      ofy: current.offsetTop
    });
    setPosition(({ x, y }) => {
      console.info({ x, y });
      const diffX = e.pageX - current.offsetLeft;
      const diffY = e.pageY - current.offsetTop;
      return { x: diffX, y: diffY };
    });
    // e.stopPropagation();
    // e.preventDefault();
  });
};

const HOC = ({ src, title }) => {
  const myRef = useRef();
  const [position, setPosition] = useState(DefaultPosition);
  const mouseMove = onMouseMove(myRef, setPosition);
  // const Element = React.createElement(ImageTile);
  // let reference = myRef.current;
  useEffect(() => {
    // myRef.current = reference;
    // console.info({ position, test: myRef.current });
    myRef.current.addEventListener("mousemove", mouseMove);
    return () => myRef.current.removeEventListener("mousemove", mouseMove);
  });
  // const ref = React.createRef();
  return (
    <ImageTile
      ref={myRef}
      mouseMove={mouseMove}
      setPosition={setPosition}
      position={position}
      src={src}
      title={src}
    />
  );
};

const ImageTile = React.forwardRef(
  (
    {
      mouseMove,
      mouseenter,
      position = DefaultPosition,
      setPosition,
      src,
      title
    },
    ref
  ) => pug`
  Wrapper(ref=ref)
    Image(onMouseMove=mouseMove style={left: position.x +'px', top: position.y + 'px'} src=src)
    ImageText #{title}
`
);

export default HOC;
