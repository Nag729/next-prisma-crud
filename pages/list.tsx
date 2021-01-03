import { DeleteIcon, EditIcon, StarIcon } from "@chakra-ui/icons";
import {
  Box,
  Heading,
  IconButton,
  Image,
  Table,
  TableCaption,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import axios from "axios";
import React, { useEffect, useState } from "react";
import BackToHome from "../components/BackToHome";
import DeleteDialog from "../components/DeleteDialog";
import styles from "../styles/Home.module.css";

export default function List() {
  const [tableData, setTableData] = useState([]);
  const [editedId, setEditedId] = useState(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  // fetch table data at componentDidMount
  useEffect(() => {
    axios.get("/api/drink").then((res) => {
      setTableData(res.data);
    });
  }, []);

  // events
  const handleEdit = (e) => {
    const id = e.currentTarget.getAttribute("data-row-no");
    alert(id);
  };

  const rowDeleteClicked = (e) => {
    const id = e.currentTarget.getAttribute("data-row-no");
    setEditedId(id);
    setIsDeleteDialogOpen(true);
  };

  const handleDelete = () => {
    setIsDeleteDialogOpen(false);
    alert("削除するのは" + editedId);

    // TODO: delete
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
            alt="StarBucks logo"
          />
        </Box>

        {/* title */}
        <Heading
          maxWidth="80vw"
          size="xl"
          my="5"
          textAlign="center"
          color="gray.600"
        >
          Let's see everyone's customization !
        </Heading>

        {/* data table */}
        <Box width="60vw" my="5">
          <Table variant="striped">
            <TableCaption>みんなのカスタマイズ一覧</TableCaption>
            <Thead>
              <Tr>
                <Th>NAME</Th>
                <Th>DECRIPTION</Th>
                <Th isNumeric>PRICE</Th>
                <Th>RECOMMEND</Th>
                <Th>EDIT</Th>
                <Th>DELETE</Th>
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
                        <StarIcon w={5} h={5} color="teal.500" />
                      )}
                    </Td>
                    <Td>
                      <IconButton
                        onClick={handleEdit}
                        data-row-no={data.id}
                        colorScheme="teal"
                        aria-label="edit icon"
                        icon={<EditIcon />}
                      />
                    </Td>
                    <Td>
                      <IconButton
                        onClick={rowDeleteClicked}
                        data-row-no={data.id}
                        colorScheme="teal"
                        aria-label="delete icon"
                        icon={<DeleteIcon />}
                      />
                    </Td>
                  </Tr>
                );
              })}
            </Tbody>
          </Table>
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
