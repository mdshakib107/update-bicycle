import { ItemData } from "@/components/shared/ItemsCard";
import { useGetAllProductsNoPageQuery } from "@/redux/api/productApi";
import { Card, Col, Image, Row, Skeleton, Typography } from "antd";
import { Link } from "react-router-dom";

const { Title } = Typography;

interface RelatedProductsProps {
  brand: string;
  type: string;
  currentProductId: string; // To exclude the current product from the list
}

const RelatedProducts: React.FC<RelatedProductsProps> = ({
  brand,
  type,
  currentProductId,
}) => {
  // Fetch all products
  const { data, isLoading } = useGetAllProductsNoPageQuery(undefined);
  const products = data?.data?.result;
  // console.log(products);
  // Filter products to find related ones with the same brand and type, excluding the current product
  const relatedProducts = products
    ?.filter(
      (product: ItemData) =>
        product.brand === brand ||
        (product.type === type && product._id !== currentProductId) // Exclude the current product
    )
    .slice(0, 4); // Show only 4 related products

  if (isLoading) {
    return <Skeleton active />;
  }

  if (!relatedProducts || relatedProducts.length === 0) {
    return <p className="text-red-500">No related products found.</p>;
  }

  return (
    <div className="mt-8">
      <Title level={3} className="text-2xl font-semibold">
        Related Products
      </Title>
      <Row gutter={24} className="mt-4">
        {relatedProducts.map((product: ItemData) => (
          <Col xs={24} sm={12} md={6} key={product._id}>
            <Link to={`/bicycles/${product._id}`}>
              <Card
                hoverable
                cover={
                  <Image
                    src={product.Img || "https://via.placeholder.com/150"}
                  />
                }
                className="rounded-lg shadow-md"
              >
                <Card.Meta
                  title={product.name}
                  description={`Price: $${product.price}`}
                />
              </Card>
            </Link>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default RelatedProducts;
