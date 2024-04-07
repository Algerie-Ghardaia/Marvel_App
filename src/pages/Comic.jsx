import React from "react";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";

export default function Comic() {
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const { comicId } = useParams();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(
          `http://localhost:3000/comic/${comicId}`
        );
        setData(data);
        console.log(data);
        setIsLoading(false);
      } catch (error) {
        console.log("Vous etes trop fortfort 😂 😂 😂 😂 " + error.message);
      }
    };
    fetchData();
  }, [comicId]);
  return isLoading ? (
    <div className="cp">
      <CircularProgress size={70} color="success" />
    </div>
  ) : (
    <>
    <div>{data.results}</div>
      {/* <div className="container">
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
      </div> */}
    </>
  );
}
