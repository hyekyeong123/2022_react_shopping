export async function uploadImage(file){
  const url = process.env.REACT_APP_CLOUDINARY_URL;

  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", process.env.REACT_APP_CLOUDINARY_PRESET);

  return fetch(url, {
    method: "POST",
    body: formData
  })
  .then((res) => res.json())
  .then((data) => data.url)
  .catch((error)=>{
    console.log("[JHG] error : "+error);
  })
}
