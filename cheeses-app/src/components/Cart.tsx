import React from 'react';
import { Box, Text, Button } from '@chakra-ui/react';
import { useCart } from '../context/CartContext';

const Cart: React.FC = () => {
  const { cartItems, getTotal, resetCart } = useCart();
  
  return (
    <Box p={4} borderWidth="1px" borderRadius="lg" bg="white" boxShadow="md">
      <Text fontSize="xl" fontWeight="bold">Shopping Cart</Text>
      {cartItems.length === 0 ? (
        <Text>Your cart is empty.</Text>
      ) : (
        cartItems.map(item => (
          <Box key={item.cheese.id} borderBottom="1px" borderColor="gray.200" py={2}>
            <Text>{item.cheese.content} - {item.quantity} kg</Text>
            <Text>Price: ${(item.cheese.pricePerKilo * item.quantity).toFixed(2)}</Text>
          </Box>
        ))
      )}
      <Text fontWeight="bold" mt={4}>Total: ${getTotal().toFixed(2)}</Text>
      <Button mt={4} ml={2} colorScheme="red" onClick={resetCart}>Reset Cart</Button> {/* Reset button */}
    </Box>
  );
};

export default Cart;
