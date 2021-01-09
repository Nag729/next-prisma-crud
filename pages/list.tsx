import { AddIcon, DeleteIcon, EditIcon, StarIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Center,
  Heading,
  IconButton,
  Image,
  Spinner,
  Table,
  TableCaption,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  useToast,
} from "@chakra-ui/react";
import Router from "next/router";
import React, { useEffect, useState } from "react";
import BackToHome from "../components/BackToHome";
import DeleteDialog from "../components/DeleteDialog";
import styles from "../styles/Home.module.css";
import { BeverageGridData } from "../types/beverage";
import axios from "../util/customAxios";

export default function List() {
  const [tableData, setTableData] = useState<BeverageGridData[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [editedId, setEditedId] = useState<string>(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const toast = useToast();

  // fetch table data at componentDidMount
  useEffect(() => {
    fetchTableData();
  }, []);

  // events
  const fetchTableData = async () => {
    setIsLoading(true);
    const res = await axios.get("/api/beverages");

    setIsLoading(false);
    setTableData(res.data);
  };

  const routeCreate = (e): void => {
    Router.push({
      pathname: `/create`,
    });
  };

  const handleEdit = (e): void => {
    const id = e.currentTarget.getAttribute("data-row-no");
    Router.push({
      pathname: `/update/${id}`,
    });
  };

  const rowDeleteClicked = (e): void => {
    const id: string = e.currentTarget.getAttribute("data-row-no");
    setEditedId(id);
    setIsDeleteDialogOpen(true);
  };

  const handleDelete = async () => {
    setIsDeleteDialogOpen(false);

    // delete beverage
    await axios.delete(`/api/beverage/${editedId}`);

    // re-fetch
    setTableData([]);
    await fetchTableData();

    // success toast
    toast({
      title: "Delete Successed !",
      description: "We've deleted beverage you clicked.",
      status: "success",
      duration: 3000,
      isClosable: true,
      position: "top",
    });
  };

  return (
    <div className={styles.container}>
      <main className={styles.main}>
        {/* link to home. */}
        <BackToHome></BackToHome>

        {/* Starbucks logo */}
        <Box mt="5" mb="2">
          <Image
            borderRadius="full"
            boxSize="150px"
            src="/starbucks-logo.png"
            alt="StarBucks_logo"
          />
        </Box>

        {/* title */}
        <Heading
          maxWidth="80vw"
          size="lg"
          my="5"
          textAlign="center"
          color="gray.600"
        >
          みんなのカスタマイズをチェックしましょう.
        </Heading>

        {/* add button */}
        {/* <Flex>
          <Spacer /> */}
        <Button
          onClick={routeCreate}
          leftIcon={<AddIcon />}
          colorScheme="teal"
          variant="solid"
          alignSelf="flex-end"
          mt="3"
          mr="3"
        >
          Add Beverage
        </Button>
        {/* </Flex> */}

        {/* data table */}
        <Box width={["100vw", "100vw", "80vw", "60vw"]} my="5">
          <Table variant="striped" size="sm">
            <TableCaption placement="top" mb="3">
              みんなのカスタマイズ一覧
            </TableCaption>
            <Thead>
              <Tr>
                <Th>名前</Th>
                <Th>説明</Th>
                <Th isNumeric>価格</Th>
                <Th>★</Th>
                <Th>編集</Th>
                <Th>削除</Th>
              </Tr>
            </Thead>
            <Tbody>
              {tableData.map((data) => {
                return (
                  <Tr key={data.id}>
                    <Td>{data.name}</Td>
                    <Td>{data.description}</Td>
                    <Td isNumeric>
                      {data.price ? data.price.toLocaleString() : null}
                    </Td>
                    <Td>
                      {data.isRecommend && (
                        <StarIcon w={4} h={4} color="teal.500" />
                      )}
                    </Td>
                    <Td>
                      <IconButton
                        onClick={handleEdit}
                        data-row-no={data.id}
                        colorScheme="teal"
                        aria-label="edit_icon"
                        size="sm"
                        icon={<EditIcon />}
                      />
                    </Td>
                    <Td>
                      <IconButton
                        onClick={rowDeleteClicked}
                        data-row-no={data.id}
                        colorScheme="pink"
                        aria-label="delete_icon"
                        size="sm"
                        icon={<DeleteIcon />}
                      />
                    </Td>
                  </Tr>
                );
              })}
            </Tbody>
          </Table>

          {isLoading && (
            <Center>
              <Spinner
                thickness="4px"
                speed="0.65s"
                emptyColor="gray.200"
                color="teal.500"
                size="xl"
                my="5"
              />
            </Center>
          )}
        </Box>

        {/* delete dialog */}
        <DeleteDialog
          isOpen={isDeleteDialogOpen}
          onClose={() => setIsDeleteDialogOpen(false)}
          onDelete={handleDelete}
        ></DeleteDialog>
      </main>
    </div>
  );
}
