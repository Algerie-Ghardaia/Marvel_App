import "../App.css";
import React, { useEffect, useState } from "react";
import axios from "axios";
import CircularProgress from "@mui/material/CircularProgress";
import Pagination from "@mui/material/Pagination";
import { MdFavorite } from "react-icons/md";
import { Link } from "react-router-dom";

export default function Characters() {
  //-------------------STATE--------------------//
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [isOki, setIsOki] = useState(false);
  const [search, setSearch] = useState("");
  //-----------------------------------------------//

  //-----------------HANDL_PAGINATION--------------------//
  const handleChangePagination = (event, value) => {
    setPage(value);
  };
  //------------------------------------------------------//

  //-----------------ALL_HANDL--------------------//

  const handleChangeFavorite = (character) => {
    console.log(character._id);
  };
  //------------------------------------------------------//

  //-----------------HANDL_SUBMIT--------------------//
  useEffect(() => {
    
    const fetchData = async () => {
      try {
        const { data } = await axios.get(
          `http://localhost:3000/characters/?name=${search}&page=${page}`
        );
        setData(data);
        console.log(data);
        localStorage.setItem("data", JSON.stringify(data));

        setIsLoading(false);
      } catch (error) {
        console.log("Vous etes trop fortfort 😂 😂 😂 😂 " + error.message);
      }
    };
    fetchData();
  }, [search,page]);
  //------------------------------------------------------//

  //-------------------RETURN_UI-------------------------//
  return isLoading ? (
    <div className="cp">
      <CircularProgress size={70} color="success" />
    </div>
  ) : (
    <>
      <div spacing={2} className="pagination">
        <Pagination
          count={15}
          variant="outlined"
          page={page}
          onChange={handleChangePagination}
          color="secondary"
          className="page"
        />
      </div>
      <main className="main_character">
        {data.results.map((character) => {
          return (
            //--------------------- LINK -----------------------------//
            <article key={character._id}>
              <div className="img_character">
                <div className="div_log_name">
                  <h2>{character.name}</h2>
                  <div className="border">
                    <MdFavorite
                      size={27}
                      onClick={() => {
                        handleChangeFavorite(character);
                      }}
                      className={character.isOki ? "isLiked" : "white"}
                    />
                  </div>
                </div>
                {/* -------------IMAGE_API------------ */}
                <Link key={character._id} to={`/Character/${character._id}`}>
                  <img
                    src={
                      character.thumbnail.path +
                      "." +
                      character.thumbnail.extension
                    }
                    width={306}
                    height={414}
                    alt=""
                  />
                </Link>
                {/* ----------------------------------- */}
                {/* <p>{character.description}</p> */}
              </div>
            </article>

            //--------------------------------------------------------//
          );
        })}
      </main>
    </>
  );
}
