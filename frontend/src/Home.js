/* eslint-disable react/no-unstable-nested-components */
import {
  Container, Heading, Text, Flex, Spinner,
} from '@chakra-ui/react';
import React from 'react';
import Hero from './Hero';
import { DetailsCard, ImageCard } from './Card';
import useRemote from './hooks';
import Filterable from './Filterable';

function Home() {
  return (
    <>
      <Filterable
        dataSource="http://localhost:8080/places"
        map={({
          amenities, title, subtitle, rating, reviews, images, price,
        }) => (
          <DetailsCard
            image={images[0]}
            title={title}
            caption={subtitle}
            rating={rating}
            reviews={reviews}
            price={price}
            amenities={amenities}
          />
        )}
      />
      <Hero />
      <Container maxW={1600}>
        <Places />
        <About />
      </Container>
    </>
  );
}

export default Home;

function Places() {
  const [data, loading, error] = useRemote('http://localhost:8080/places');
  if (loading) return <Spinner />;
  if (error) return <Heading>Something went wrong</Heading>;
  return (
    <>
      <Heading my="1rem">Places</Heading>
      <Flex style={{ gap: '1rem' }}>
        {
        data.map(
          ({ image, city, country }) => (
            <ImageCard
              image={image}
              title={city}
              subtitle={country}
            />
          ),
        )
      }
      </Flex>
    </>
  );
}

function About() {
  return (
    <>
      <Heading my="1rem">About</Heading>
      <Text>
        This website was created for Advanced Programming course at Ashoka University.
        Contact us at mayank.kamboj_ug23@ashoka.edu.in
      </Text>
    </>
  );
}
