import React from 'react';
import { Box, Image, Text, VStack } from '@chakra-ui/react';

import { Cheese } from '../types/base'; 

interface CheeseItemProps {
  cheese: Cheese; 
}

const CheeseItem: React.FC<CheeseItemProps> = ({ cheese }) => {
    return (
    <Box borderWidth="1px" borderRadius="lg" overflow="hidden" p={4}>
      <Image src={cheese.imageUrl} alt={cheese.content} boxSize="150px" />
      <VStack align="start" mt={2}>
        <Text fontWeight="bold">{cheese.content}</Text>
        <Text>Price: ${cheese.pricePerKilo} per kilo</Text>
        <Text>Origin: {cheese.countryOfOrigin}</Text>
      </VStack>
    </Box>
  );
};

export default CheeseItem;
