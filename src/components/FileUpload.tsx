import { useState } from "react";
import axios from "axios";

export const FileUpload = () => {
  const [image, setImage] = useState<File>();

  const getImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const img: File = e.target.files[0];
    setImage(img);
  };

  const submitImage = () => {
    const data = new FormData();
    data.append("file", image); // image は File 型である必要あり

    const postImageUri = "任意のURL";

    axios
      .post(postImageUri, data) // headers は不要。axiosが自動で処理。
      .then((res) => {
        // 成功時の処理
        console.log("アップロード成功", res.data);
      })
      .catch((err) => {
        // エラー処理
        console.error("アップロード失敗", err);
      });
  };

  return (
    <>
      <div>
        <form>
          <label htmlFor="img">画像</label>
          <input id="img" type="file" accept="image/*,.png,.jpg,.jpeg,.gif" onChange={getImage} />
          <input type="button" value="保存" onClick={submitImage} />
        </form>
      </div>
    </>
  );
};
