import { useQuery } from "@apollo/client";
import { ItemsForm } from "components/items-form/items-form";
import { ItemsTable } from "components/items-table/items-table";
import { PageWrapper } from "components/page-wrapper/page-wrapper";
import { ALL_ITEMS } from "graphql/query/items.query";
import { useEffect } from "react";
import { useAppDispatch } from "store/hooks";
import { setItems } from "store/slices/itemSlice";

export const HomePage: React.FC = () => {
  const { data, loading } = useQuery(ALL_ITEMS);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (data) {
      dispatch(setItems(data.items));
    }
  }, [data, loading, dispatch]);

  return (
    <PageWrapper>
      <h3 className="mt-3">Items App</h3>
      <p>
        Welcome to Creatopy Items App. This is a demo app created using CRA
        template with <b>Redux-Toolkit</b>, and <b>Typescript</b>.
        <br />
        You can add a new item and will be dispatched to the redux state, and
        loaded right away in the table without needing to refresh the page :)
      </p>
      <ItemsForm />
      <ItemsTable />
    </PageWrapper>
  );
};
