import React, { useState } from 'react';
import { Box, Text, Image, SimpleGrid, Button, Input } from '@chakra-ui/react';
import { Cheese } from '../types/base';
import { useCart } from '../context/CartContext';

interface CheeseListProps {
  cheeses: Cheese[];
}

const CheeseList: React.FC<CheeseListProps> = ({ cheeses }) => {
  const { addToCart } = useCart();
  const [quantities, setQuantities] = useState<{ [key: number]: number }>({});

  const handleAddToCart = (cheese: Cheese) => {
    const quantity = quantities[cheese.id] || 0;
    if (quantity > 0) {
      addToCart(cheese, quantity);
      setQuantities({ ...quantities, [cheese.id]: 0 }); // Reset quantity input after adding
    }
  };

  return (
    <SimpleGrid columns={{ base: 1, sm: 2, md: 3 }} spacing={4}>
      {cheeses.map((cheese) => (
        <Box key={cheese.id} borderWidth="1px" borderRadius="lg" overflow="hidden" p={4} bg="white" boxShadow="md">
          <Image src={cheese.imageUrl} alt={cheese.content} borderRadius="md" />
          <Text fontWeight="bold" fontSize="xl" color="primary">{cheese.content}</Text>
          <Text>Price: ${cheese.pricePerKilo} per kilo</Text>
          <Text>Color: {cheese.color}</Text>
          <Input
            type="number"
            min="0"
            placeholder="Enter kg"
            value={quantities[cheese.id] || ''}
            onChange={(e) => setQuantities({ ...quantities, [cheese.id]: Number(e.target.value) })}
            mt={2}
          />
          <Button mt={2} colorScheme="teal" onClick={() => handleAddToCart(cheese)}>Add to Cart</Button>
        </Box>
      ))}
    </SimpleGrid>
  );
};

export default CheeseList;
