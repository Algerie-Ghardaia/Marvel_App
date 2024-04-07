import "../App.css";
import React, { useEffect, useState } from "react";
import axios from "axios";
import CircularProgress from "@mui/material/CircularProgress";
import Pagination from "@mui/material/Pagination";
import { MdFavorite } from "react-icons/md";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import { HiOutlineSortDescending } from "react-icons/hi";
import { Link } from "react-router-dom";

export default function Comics() {
  //-------------------STATE--------------------//
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = React.useState(3);
  //--------------------------------------------//

  //-------------------------ALL_HANDL--------------------//
  //---------HANDL_PAGINATION-----------//
  const handleChangePagination = (event, value) => {
    setPage(value);
  };
  //------------------------------------//

  //----------HANDL_CLICK-------------//
  const handleChangeFavorite = (characterId) => {
    // const filter = data.results.map((f) => {
    //   //   if (f._id === characterId) {
    //   //     f.isLiked = true;
    //   //     return (f.isLiked = true);
    //   //   }
    // });
    // console.log(filter);
  };
  //------------------------------------//

  //------------------------------------------------------//

  //-----------------HANDL_SUBMIT--------------------//
  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get("http://localhost:3000/comics");
        setData(data);
        console.log("MOIS" + data.results);
        setIsLoading(false);
      } catch (error) {
        console.log("Vous etes trop fortfort 😂 😂 😂 😂 " + error.message);
      }
    };
    fetchData();
  }, []);
  //---------------------------------------------------//

  //-------------------RETURN_UI-------------------------//
  return isLoading ? (
    <div className="cp">
      <CircularProgress size={70} color="success" />
    </div>
  ) : (
    <>
      <div className="page_comics">
        {/* --------------Pagination-------------- */}
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
        {/* --------------Pagination-------------- */}
        <main className="page_comics1">

          {data.results.map((character) => {
            return (
              <>
                <div className="accordion">
                  <Accordion className="C">
                    <div className="k">
                      <div className="deux-log">
                        <div className="div_log_name A">
                          <div className="border">
                            <MdFavorite
                              size={27}
                              onClick={() => {
                                handleChangeFavorite(character._id);
                              }}
                              className={
                                character.isLiked ? "isLiked B" : "white B"
                              }
                            />
                          </div>
                        </div>
                        <AccordionSummary
                        style={{marginRight:'-124px'}}
                          expandIcon={
                            <HiOutlineSortDescending
                              size={27}
                              color="black"
                              className="click1"
                            />
                          }
                          size={27}
                          aria-controls="panel1-content"
                          id="panel1-header"
                        ></AccordionSummary>
                      </div>
                      <Link key={character._id} to={`/Comics/${character._id}`}>
                        <img
                          src={
                            character.thumbnail.path +
                            "." +
                            character.thumbnail.extension
                          }
                          //   style={{marginRight:'10px'}}
                          width={290}
                          height={414}
                          alt={character.name}
                          className="i-comics"
                        />
                      </Link>
                    </div>
                    <AccordionDetails>
                      <article className="comics_p">
                        <p>{character.description}</p>
                        <p>{!character.description? character.title :""}</p>
                      </article>
                    </AccordionDetails>
                  </Accordion>
                </div>
              </>
            );
          })}
        </main>

        
      </div>
    </>
  );
  //------------------------------------------------------//
}
