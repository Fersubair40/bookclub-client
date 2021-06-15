import React, { useEffect, useState } from "react";
import { Spin } from "antd";
import Layout from "../components/Layout";
import { Link } from "react-router-dom";

import Api from "../api/api";
import Loading from "../components/Loading";

export default function Home({ history }) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  

  useEffect(() => {
    (async () => {
      setLoading(true);
      const response = await Api.getAllBooks();
      if (response && response.status === 200) {
        setData(response.data);
      }
     
      setLoading(false);
    })();
  }, []);

  return (
    <Layout>

      <section>
        <div className="section-title">
          <i className="bx bx-book-open nav__icon"></i>
          <span>All Books</span>
        </div>
       {loading && (
         <Loading/>
       )}
        <div className="section">   
          {data.map((book, index) => (
            <div className="card" key={book.id}>
              <Link to={`/book/?id=${book.id}`}>
                <img className="img-responsive" src={book.book_image} alt="" />
              </Link>

              <div className="book__title">
                <h1 className="title-text"> {book.title} </h1>
              </div>
              <div className="author">
                <h4 className="author-text"> {book.author} </h4>
              </div>
            </div>
          ))}

          {/* <div className="card"></div>
          <div className="card"></div>
          <div className="card"></div> */}
        </div>
      </section>
    </Layout>
  );
}
