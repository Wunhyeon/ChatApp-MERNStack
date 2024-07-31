import {
  Box,
  Container,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
} from "@chakra-ui/react";
import React from "react";
import Login from "./Authentication/Login";
import Signup from "./Authentication/Signup";

const HomeComponent = () => {
  return (
    <Container className="w-10 mx-auto  bg-red-700 border-8 border-yellow-600 rounded-lg">
      <Box
        display="flex"
        justifyContent="center"
        p={3}
        bg={"white"}
        w="100%"
        m="40px 0 15px 0"
        borderRadius="1g"
        borderWidth="1px"
        className="bg-white w-full flex justify-center p-3 mt-4 mb-1 border-8 border-purple-600 rounded-lg"
      >
        <Text className="text-5xl">Talk </Text>
      </Box>
      <Box className="bg-white w-full p-4 rounded-md border-1">
        <Tabs variant="soft-rounded">
          <TabList className="mb-4">
            <Tab className="w-1/2">Login</Tab>
            <Tab className="w-1/2">Sign up</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <Login />
            </TabPanel>
            <TabPanel>
              <Signup />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </Container>
  );
};

export default HomeComponent;
