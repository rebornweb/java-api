import React, { useEffect, useState } from 'react';
import { ChakraProvider, Container, Heading, Image, Stack, Box, extendTheme, Text } from '@chakra-ui/react';
import CheeseList from './components/CheeseList';
import Cart from './components/Cart';
import { CartProvider } from './context/CartContext';
import { Cheese } from './types/base';
import './App.css';
import  Header  from './components/Header'

const theme = extendTheme({
  colors: {
    primary: '#007bff',
    secondary: '#6c757d',
  },
  styles: {
    global: {
      body: {
        bg: 'gray.50',
        color: 'gray.800',
      },
    },
  },
});

const App: React.FC = () => {
  const [cheeses, setCheeses] = useState<Cheese[]>([]);
  const logo = 'https://www.cheese.com/static/common/img/logo.3feae68fc57a.svg';
  document.title = 'Cheese Shop';

  const fetchCheeseData = async () => {
    const response = await fetch('http://localhost:8080/cheese');
    const data: Cheese[] = await response.json();
    setCheeses(data);
  };

  useEffect(() => {
    fetchCheeseData();
  }, []);

  return (
    <ChakraProvider theme={theme}>
      <CartProvider>
        <Container maxW="container.xl">
        <Header/>
          <CheeseList cheeses={cheeses} />
          <Cart />
        </Container>
      </CartProvider>
    </ChakraProvider>
  );
};

export default App;