import { Box, Heading, Image, Link, Text } from "@chakra-ui/react";
import styles from "../styles/Home.module.css";
import LinkButton from "./../components/LinkButton";

export default function Home() {
  return (
    <div className={styles.container}>
      <main className={styles.main}>
        {/* Nextjs logo */}
        <Box my="2">
          <Image
            borderRadius="full"
            boxSize="150px"
            src="/next-logo.jpeg"
            alt="Nextjs logo"
          />
        </Box>

        {/* title */}
        <Heading
          maxWidth="50rem"
          size="3xl"
          mt={5}
          mb={5}
          textAlign="center"
          color="gray.800"
        >
          Welcome to{" "}
          <Link href="https://nextjs.org/" color="blue.500" isExternal>
            Next.js
          </Link>
          {" & "}
          <Link href="https://www.prisma.io/" color="blue.500" isExternal>
            Prisma
          </Link>{" "}
          CRUD Sample App !
        </Heading>

        {/* description */}
        <Box mt="3">
          <Text fontSize="xl">
            アプリを実践的なものにするために{" "}
            <Link href="https://chakra-ui.com/" color="teal.500" isExternal>
              chakra
            </Link>
            {" と "}
            <Link href="https://jestjs.io/ja/" color="teal.500" isExternal>
              Jest
            </Link>{" "}
            を利用しています。
          </Text>
          <Text fontSize="xl">
            キャッチアップのための情報は、
            <Link href="https://qiita.com/" color="teal.500" isExternal>
              Qiita - xxx
            </Link>{" "}
            にまとめています。
          </Text>
        </Box>

        {/* link button */}
        <Box mt={5} mb={5}>
          {/* Create */}
          <Box mt={5} mb={5}>
            <LinkButton href="/create">Create New Drink</LinkButton>
          </Box>

          {/* Link */}
          <Box mt={5} mb={5}>
            <LinkButton href="/list">Go To Drink List</LinkButton>
          </Box>
        </Box>
      </main>
    </div>
  );
}
