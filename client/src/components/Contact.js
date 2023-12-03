import React, { useState } from "react";
import {
  Container,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Stack,
  Button,
  Heading,
  useColorModeValue,
  VStack,
  Flex,
  Text,
  Icon,
  Divider,
  SimpleGrid,
} from "@chakra-ui/react";
import { IoLocation } from "react-icons/io5";
import { FaPhone } from "react-icons/fa";
import { IoMail } from "react-icons/io5";
import { useToast } from '@chakra-ui/react'
import axios from "axios";
const contactOptions = [
  {
    label: "Address",
    value:
      "Gupta Palace 2nd Floor 208, Near Rajouri Garden Metro Gate No. 8, West, Delhi, 110027",
    icon: IoLocation,
  },
  {
    label: "PHONE NUMBER",
    value: "+91 7276301985",
    icon: FaPhone,
  },
  {
    label: "EMAIL",
    value: "support@dukhbhanjan.com  accounts@dukhbhanjan.com",
    icon: IoMail,
  },
];

const initialState = {
  name:"",
  email:"",
  PhoneNo:"",
  subject:"",
  message:""
}


const Contact = () => {
const [data, setData] = useState(initialState)
const toast = useToast()
const handleChangeData = (e) => {
   const {name,value} = e.target
   setData((prev)=> {
    return {...prev, [name]:value}
   })
}
// const handleSend = () => {
// if(data.name && data.email && data.PhoneNo && data.message && data.subject){


// }else{

//     toast({
//       title: 'Input Filed is required',
//     position:"top-right",
//       status: 'error',
//       duration: 3000,
//       isClosable: true,
//     })
// }
// }
const handleSend = async() => {
if(data.name && data.email && data.PhoneNo && data.message && data.subject){
  try {
    // Make the HTTP request and wait for the response
    const response = await axios.post("http://localhost:4000/contact/create", data, {
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${localStorage.getItem("token")}`
      }
    });
    // Log the response data
// Show a success toast
if(response.data){
toast({
title: "query submitted successfully",
status: "success",
duration: 5000,
isClosable: true,
position:"top-right"
})
setData(initialState)

}else{
toast({
title: "input fiels is required",
status: "error",
duration: 3000,
isClosable: true,
});

}

} catch (error) {
  // Log and show an error toast
  console.error("Error submitting form:", error.response.data.error);
  toast({
    title: "something wrong try again after sometime",
    status: "error",
    duration: 3000,
    isClosable: true,
    position:"top-right"
  });
}

}else{

      toast({
        title: 'Input Filed is required',
      position:"top-right",
        status: 'error',
        duration: 3000,
        isClosable: true,
      })
  }
  


 
};



  return (
    <div data-aos="fade-in">
      <Container maxW="7xl" py={10} px={{ base: 5, md: 8 }}>
        <Stack spacing={10}>
          <VStack align="center">
            <Heading fontSize={{ base: "2xl", md: "4xl" }} mb={2}>
              Contact Us
            </Heading>
            <Text fontSize="lg" textAlign="center">
              FEEL FREE TO REACH US{" "}
            </Text>
          </VStack>
          <SimpleGrid columns={{ base: 1, md: 3 }} spacing={6}>
            {contactOptions.map((option, index) => (
              <Flex
                key={index}
                direction="column"
                align="center"
                textAlign="center"
              >
                <Icon as={option.icon} w={10} h={10} color="yellow.400" />
                <Text fontSize="lg" fontWeight="semibold">
                  {option.label}
                </Text>
                <Text fontSize="md" textAlign="center">
                  {option.value}
                </Text>
              </Flex>
            ))}
          </SimpleGrid>
          <VStack
            as="form"
            spacing={8}
            w="100%"
            bg={useColorModeValue("white", "gray.700")}
            rounded="lg"
            boxShadow="lg"
            p={{ base: 5, sm: 10 }}
          >
            <VStack spacing={4} w="100%">
              <SimpleGrid columns={{ base: 1, md: 3 }} spacing={3}>
                <FormControl id="name">
                  <FormLabel>Name</FormLabel>
                  <Input
                    type="text"
                    placeholder="Write Your Name"
                    name="name"
                    value={data.name}
                    onChange={handleChangeData}
                    rounded="md"
                  />
                </FormControl>
                <FormControl id="email">
                  <FormLabel>Email</FormLabel>
                  <Input type="email" placeholder="Your Mail" required rounded="md"  name="email"
                    value={data.email}
                    onChange={handleChangeData}/>
                </FormControl>
                <FormControl id="phone">
                  <FormLabel>Phone Number</FormLabel>
                  <Input
                    type="tel"
                    placeholder="Your Phone Number"
                    rounded="md"
                    name="PhoneNo"
                    value={data.PhoneNo}
                    onChange={handleChangeData}
                  />
                </FormControl>
              </SimpleGrid>
              <FormControl id="subject">
                <FormLabel>Subject</FormLabel>
                <Input type="text" placeholder="Your Problem" rounded="md"  name="subject"
                    value={data.subject}
                    onChange={handleChangeData}/>
              </FormControl>
              <FormControl id="message">
                <FormLabel>Message</FormLabel>
                <Textarea
                  size="lg"
                  placeholder="Enter your message"
                  rounded="md"
                  name="message"
                  value={data.message}
                  onChange={handleChangeData}
                />
              </FormControl>
            </VStack>
            <VStack w="100%">
              <Button
              onClick={handleSend}
                bg="yellow.500"
                color="white"
                _hover={{
                  bg: "yellow.500",
                }}
                rounded="md"
                w={{ base: "100%", md: "max-content" }}
              >
                Send Message
              </Button>
            </VStack>
          </VStack>
        </Stack>
      </Container>
    </div>
  );
};

export default Contact;
