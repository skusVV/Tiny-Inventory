import { useParams } from "react-router-dom";

export const Product = () => {
  const { id } = useParams<{ id: string }>();

  return (
    <div>
      <h1>Product {id}</h1>
    </div>
  );
};


