'use client';

import cx from 'clsx';
import { useClient } from 'next/client';
import { useState, useEffect } from 'react';
import { Table, Checkbox, ScrollArea, Group, Avatar, Text, rem } from '@mantine/core';
import classes from './index.css';

export function UsersPage() {

  const [selection, setSelection] = useState(['1']);
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  useEffect(() => {
    setLoading(true);

    const response = async () => {
      const d = await fetch("https://63c57732f80fabd877e93ed1.mockapi.io/api/v1/users");

      const r = await d.json();

      setData(r);

      setLoading(false);

    }

    response();
  }, [])

  const toggleRow = (id) =>
    setSelection((current) =>
      current.includes(id) ? current.filter((item) => item !== id) : [...current, id]
    );
  const toggleAll = () =>
    setSelection((current) => (current.length === data.length ? [] : data.map((item) => item.id)));

  const rows = data.map((item) => {
    const selected = selection.includes(item.id);
    return (
      <Table.Tr key={item.id} className={cx({ [classes.rowSelected]: selected })}>
        <Table.Td>
          <Checkbox checked={selection.includes(item.id)} onChange={() => toggleRow(item.id)} />
        </Table.Td>
        <Table.Td>
          <Group gap="sm">
            <Avatar size={26} src={item.avatar} radius={26} />
            <Text size="sm" fw={500}>
              {item.id}
            </Text>
          </Group>
        </Table.Td>
        <Table.Td>{item.email}</Table.Td>
        <Table.Td>{item.job}</Table.Td>
      </Table.Tr>
    );
  });

  return (
    <ScrollArea>
      <Table miw={800} verticalSpacing="sm">
        <Table.Thead>
          <Table.Tr>
            <Table.Th style={{ width: rem(40) }}>
              <Checkbox
                onChange={toggleAll}
                checked={selection.length === data.length}
                indeterminate={selection.length > 0 && selection.length !== data.length}
              />
            </Table.Th>
            <Table.Th>User ID</Table.Th>
            <Table.Th>Email</Table.Th>
            <Table.Th>Job</Table.Th>
          </Table.Tr>
        </Table.Thead>
        {isLoading ? <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}><h1>Loading</h1></div> : <Table.Tbody>{rows}</Table.Tbody>}
      </Table>
    </ScrollArea>
  );
}