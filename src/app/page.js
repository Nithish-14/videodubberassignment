import styles from "./page.module.css";
import '@mantine/core/styles.css';
import {UsersPage} from './components/UsersPage'

import { MantineProvider } from '@mantine/core';

export default function Home() {
  return (
    <main className={styles.main}>
      <MantineProvider>
        <UsersPage />
      </MantineProvider>
    </main>
  );
}
