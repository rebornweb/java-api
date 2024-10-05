import { Stack, Box, Heading, Image, Badge, Button, useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,

 } from '@chakra-ui/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';
import { useCart } from '../context/CartContext';
import  Cart from './Cart'


const Header = () => {
  const logo = 'https://www.cheese.com/static/common/img/logo.3feae68fc57a.svg';
  const { cartItems } = useCart();
  const { isOpen, onOpen, onClose } = useDisclosure()

  const getTotalItems = () => {
    return cartItems.reduce((acc, item) => acc + item.quantity, 0);
  };

  const totalItems = getTotalItems();


  return (
    <Stack direction={['column', 'row']} spacing={6} mb={8}>
      <Box flex={1}>
        <Heading as="h1" size="xl">Cheese Shop</Heading>
      </Box>
      <Box display="flex" alignItems="center" padding={5} onClick={onOpen}>
        <Image className="App-logo" src={logo} alt="logo" sizes="lg" mr={5} />
        <FontAwesomeIcon icon={faCartShopping} className='cartIcon' />
        <Badge colorScheme="red" ml={2}>
            {totalItems}
        </Badge>
      </Box>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader></ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Cart />
          </ModalBody>

          <ModalFooter>
            <Button colorScheme='blue' mr={3} onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Stack>
    
  );
};

export default Header;