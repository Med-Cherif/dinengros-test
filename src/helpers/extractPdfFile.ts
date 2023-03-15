import { IProduct } from "interfaces/product";

export default function extractPdfFile(product: IProduct) {
  if (!product) return null;
  const file: any = product.files.find(
    (file: any) => file?.file_info?.ext === "pdf"
  );
  if (!file) return null;
  return {
    name: file?.file_info?.name,
    path: `${file?.file_info?.uri}/${file?.file_info?.name}`,
  };
}
