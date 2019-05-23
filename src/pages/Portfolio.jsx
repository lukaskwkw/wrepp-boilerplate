import React from "react";
import styled from "styled-components";

import Header from "../components/Header";
import Link from "../components/Link";
import ImageTile from "../components/ImageTile";

const ImageUrls = ["img/nk.png", "img/wp_plugin.png", "img/wrepp.png"];

const Images = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const Container = styled.div`
  margin: 32px;
`;

const Section = () => pug`
  Container
    Images
      each image, index in [...ImageUrls, ...ImageUrls]
        ImageTile(key=image src=image title=image)  
`;

const Portfolio = () => (
  <>
    <Header>Portfolio section</Header>
    <Link href="/">Main Page</Link>
    <Section />
  </>
);

export default Portfolio;
