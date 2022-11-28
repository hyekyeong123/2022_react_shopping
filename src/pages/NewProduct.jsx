import React, {useState} from 'react';
import Button from "../components/ui/Button";
import {uploadImage} from "../api/uploader";
import useProduct from "../hooks/useProduct";

export default function NewProduct() {
  const [product, setProduct] = useState({});
  const [file, setFile] = useState();

  const [isUploading, setIsUploading] = useState(false);
  const [success, setSuccess] = useState(null);

  // V2. useMutation 사용하기(상품 추가)
  // const queryClient = useQueryClient();
  // const addProduct = useMutation(({product, url}) =>
  //   addNewProduct(product,url),{
  //   onSuccess: ()=>queryClient.invalidateQueries(["products"])
  // })

  // V3. useMutation Hook 사용하기
  const {addProduct} = useProduct()
// ************************************************************

  // 파일 업로드 할 시
  const handleChange = (e) => {
    const {name, value, files} = e.target;

    // 만약에 input의 name이 image_file인 경우에는
    if(name === "image_file"){
      setFile(files && files[0]);
      return;
    }
    setProduct((product) => ({
      ...product,

        // input의 name에 file의 value 할당
        [name] : value
    }));
  }

  const handleSubmit = () => {
    setIsUploading(true);

    // 제품의 사진을 Cloudinary에 업로드 하고 URL을 획득
    uploadImage(file).then(url => {

      // V1. Firebase에 새로운 제품 추가
      // addNewProduct(product, url)
      // .then(() => {
      //   setSuccess("성공적으로 제품이 추가되었습니다.");
      //   setTimeout(()=>{
      //     setSuccess(null);
      //   },4000)
      // });

      // V2. Firebase에 새로운 제품 추가
      addProduct.mutate({product,  url}, {onSuccess : () => {
          setSuccess("성공적으로 제품이 추가되었습니다.");
          setTimeout(()=>{
            setSuccess(null);
          },4000)
      }})
    }).finally(()=>{
      setIsUploading(false);
    })
  }
// ************************************************************
  return (
    <section>
      <h2>New Product Upload</h2>
      {success && <p>{success}</p>}
      {file && <img src={URL.createObjectURL(file)} alt="local file"/>}
      <div className="flex flex-col">
        <input type="file" accept="image/*"
          name="image_file"
          required={true} onChange={handleChange}
        />
        <input type="text" placeholder="제품명"
         name="title" value={product.title ?? ""}
          required={true} onChange={handleChange}
        />
        <input type="number" placeholder="가격"
          name="price" value={product.price ?? ""}
          required={true} onChange={handleChange}
        />
        <input type="text" placeholder="카테고리"
          name="category" value={product.category ?? ""} required={true} onChange={handleChange}
        />
        <input type="text" placeholder="제품 설명"
          name="description" value={product.description ?? ""}
          required={true} onChange={handleChange}
        />
        <input type="text" placeholder="옵션들 , 로 구분"
          name="options" value={product.options ?? ""}
          required={true} onChange={handleChange}
        />
        <Button type="button"
          text={isUploading ? "업로드중..." : 'product upload'}
          onClick={handleSubmit}
          disabled={isUploading}
        ></Button>
      </div>
    </section>
  );
}
