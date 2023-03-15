import React from "react";
import Box from "../Box";

export interface ProductDescriptionProps {
  description: string
}

const ProductDescription: React.FC<ProductDescriptionProps> = ({description}) => {
  return (
    <Box>
      <div dangerouslySetInnerHTML={{
          __html: description || "<p>No description available</p>"
        }}
      />
    </Box>
  );
};

export default ProductDescription;
