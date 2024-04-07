import "../App.css";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";

export default function Character() {
  const { characterId } = useParams();

  //-----------------USE_STATE--------------------//
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  //-----------------------------------------------//

  //-----------------HANDL_SUBMIT--------------------//
  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(
          `http://localhost:3000/character/${characterId}`
        );
        setData(data);
        setIsLoading(false);
      } catch (error) {
        console.log("Vous etes trop fortfort 😂 😂 😂 😂 " + error.message);
      }
    };
    fetchData();
  }, [characterId]);
  //--------------------------------------------------//

  //-----------------RETURN_UI--------------------//
  return isLoading ? (
    <div className="cp">
      <CircularProgress size={70} color="success" />
    </div>
  ) : (
    <>
      <div className="container">
        <article className="article2">
          <h1>{data.name}</h1>
          <div className="detail_selected">
            <img
              src={data.thumbnail.path + "." + data.thumbnail.extension}
              alt={data.name}
              height={630}
              width={820}
            />
          </div>
          <div className="description">{data.description}</div>
        </article>
      </div>
    </>
  );
  //--------------------------------------------------//
}
