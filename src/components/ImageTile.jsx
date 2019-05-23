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

const onMouseMove = (myRef, setPosition) => e => {
  requestAnimationFrame(() => {
    // if (e.path.length > 8) return;
    const { current } = myRef;
    // e.stopPropagation();
    // e.preventDefault();
    const { offsetWidth, offsetHeight } = current;
    const { pageX, pageY, offsetX, offsetY } = e;
    const signX = offsetX > offsetWidth / 2 ? -1 : 1;
    const signY = offsetY > offsetWidth / 2 ? -1 : 1;
    console.info({ eP: e.path, e });
    const maxX = ImageScale * offsetWidth - offsetWidth;
    const maxY = ImageScale * offsetHeight - offsetHeight;
    const diffX = pageX - (pageX + ImageScale * offsetX - maxX / 2);
    const diffY = pageY - (pageY + ImageScale * offsetY - maxY / 2);
    const clampedX = clamp(diffX, -10000000, maxX / 2);
    const clampedY = clamp(diffY, -10000000, maxY / 2);
    console.info({
      xScaled: ImageScale * current.offsetWidth,
      current,
      offsetX,
      offsetY,
      maxX,
      pageX,
      pageY,
      diffX,
      diffY,
      clampedX,
      clampedY
    });
    setPosition({
      x: clampedX,
      y: clampedY
    });
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
