import { ItemData } from "@/components/shared/ItemsCard";
import { useGetAllProductsQuery } from "@/redux/api/productApi";
import { Card, Col, Image, Row, Typography } from "antd";
import { Link } from "react-router-dom";

const { Title } = Typography;

interface RelatedProductsProps {
  brand: string;
  type: string;
  currentProductId: string; // To exclude the current product from the list
}

const RelatedProducts: React.FC<RelatedProductsProps> = ({ brand, type }) => {
  // Fetch all products
  const { data, isLoading } = useGetAllProductsQuery();
  const products = data?.data;
  console.log(products);
  // Filter products to find related ones with the same brand and type, excluding the current product
  const relatedProducts = products
    ?.filter(
      (product: ItemData) => product.brand === brand && product.type === type
    )
    .slice(0, 4); // Show only 4 related products

  if (isLoading) {
    return <p>Loading related products...</p>;
  }

  if (!relatedProducts || relatedProducts.length === 0) {
    return <p>No related products found.</p>;
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
                    src={product.image || "https://via.placeholder.com/150"}
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
