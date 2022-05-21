import { Table } from "react-bootstrap";
import { useAppSelector } from "store/hooks";

export const ItemsTable: React.FC = () => {
  const items = useAppSelector((state) => state.item.items);
  return (
    <Table bordered>
      <thead>
        <tr>
          <th>#</th>
          <th>Item</th>
          <th>Date Created</th>
          <th>Created By</th>
        </tr>
      </thead>
      <tbody>
        {items.map((item) => {
          return (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.title}</td>
              <td>{item?.createdAt}</td>
              <td>{item?.user?.name}</td>
            </tr>
          );
        })}
      </tbody>
    </Table>
  );
};
