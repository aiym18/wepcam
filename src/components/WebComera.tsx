"use client";
import { useEffect, useRef, useState } from "react";
import Webcam from "react-webcam";
import axios from "axios";
import scss from "./WebComera.module.scss";
import { FaCamera } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

interface IImg {
  _id: number;
  images: string;
}

const WepCamera = () => {
  const WepCameRef = useRef<Webcam | null>(null);
  const [imageUrl, setImageUrl] = useState<string>("");
  const [img, setImgs] = useState<IImg[]>([]);
  console.log(img, "kjhkj");

  const getImgs = async () => {
    try {
      const { data } = await axios.get(
        "https://api.elchocrud.pro/api/v1/e8796ff48941d9f7983a491b88b55f21/webcamera"
      );
      console.log(data, "dataa");
      setImgs(data);
    } catch (error) {
      console.error("Error images:", error);
    }
  };

  const deletePhoto = async (_id: number) => {
    try {
      const response = await axios.delete(
        `https://api.elchocrud.pro/api/v1/e8796ff48941d9f7983a491b88b55f21/webcamera/${_id}`
      );
      console.log(response.data);
      getImgs();
    } catch (error) {
      console.error(error);
    }
  };

  const handleScreenShot = async () => {
    if (WepCameRef.current) {
      const imageBase64 = WepCameRef.current.getScreenshot();
      if (imageBase64) {
        console.log(imageBase64);

        setImageUrl(imageBase64); // Обновляем imageUrl, чтобы отобразить изображение
        const new_data = { images: imageBase64 };
        try {
          await axios.post(
            "https://api.elchocrud.pro/api/v1/e8796ff48941d9f7983a491b88b55f21/webcamera",
            new_data
          );
        } catch (error) {
          console.error("Error uploading image:", error);
        }
      }
    }
  };

  useEffect(() => {
    getImgs();
  }, [imageUrl]);

  return (
    <div className={scss.WebComera}>
      <h1>WepCamera</h1>
      <Webcam
        screenshotFormat="image/webp"
        style={{ width: 300, height: 300 }}
        ref={WepCameRef}
      />
      <button className={scss.cnop} onClick={handleScreenShot}>
        <FaCamera />
      </button>
      {/* {imageUrl && <img src={imageUrl} alt="Captured" />} */}
      <div className={scss.Photo}>
        {img.map((image, index) => (
        
          <div key={index}>
            <h1>{index}</h1>
            <img key={index} src={image.images} alt={`Captured ${index}`} />
            <button
              className={scss.delete}
              onClick={() => deletePhoto(image._id)}
              
            >
              <MdDelete />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WepCamera;
