import React, { useEffect, useState } from "react";
import Api from "../api/api";
import Layout from "../components/Layout";
import {
  Row,
  Col,
  Comment,
  Input,
  Tooltip,
  Avatar,
  Form,
  Button,
  Modal,
  Alert, 
} from "antd";
import Rate from 'rc-rate';
import 'rc-rate/assets/index.css';

import moment from "moment";

import Loading from "../components/Loading";

export default function Book() {
  const { TextArea } = Input;
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(false);
  const [comments, setComments] = useState([]);
  const [post, setPost] = useState("");
  const [isSigned, setIsSigned] = useState(false);
  const [modal, setModal] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [commentsSubmitted, setCommentsSubmitted] = useState(false);
  const [error, setError] = useState("");
  const [commentsSubmitting, setCommentsSubmitting] = useState(false)


  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const id = urlParams.get("id");

  useEffect(() => {
    (async () => {
      setLoading(true);

      const response = await Api.getOneBook(id);
      if (response && response.status === 200) {
        setData(response.data);
        console.log(typeof(data.average_rating))
      }
      const bookComments = await Api.getBooksComment(id);
      if (bookComments && bookComments.status === 200) {
        setComments(bookComments.data);
      }
      const isSignedIn = await Api.isSignedIn();
      if (isSignedIn && isSignedIn.status === 200) {
        setIsSigned(true);
      } else if (isSignedIn && isSignedIn.status === 401) {
        await Api.logOut();
        setIsSigned(false);
      }
      //   const isLoggedIn = await Api.isLoggedIn();
      //   setIsSigned(isLoggedIn);

      setLoading(false);
    })();
  }, [isSigned, commentsSubmitted, commentsSubmitting]);

  const toggle = () => setModal(!modal);

  const login = async () => {
    const data = {
      user: {
        username,
        password,
      },
    };
    setSubmitting(true);
    const response = await Api.authenticate(data);
    if (response && response.status === 200) {
      setIsSigned(true);
      setModal(false);
    } else {
      setError(response.data.message);
    }
    setSubmitting(false);
  };

  const addComment = async () => {
    const data = {
      comment: {
        comment: post,
        book_id: id,
      },
    };
    setCommentsSubmitting(true);
    const res = await Api.addComment(data);
    if (res && res.status === 201) {
      setCommentsSubmitted(true);
    } else if (res && res.status === 401) {
      setIsSigned(false);
    }
    setCommentsSubmitting(false);
  };

  return (
    <Layout>
      <>
        {loading && <Loading />}
        <Row gutter={[48, 16]}>
          <Col lg={6} className="section-book">
            <div className="single-book">
              <img
                className="img"
                alt={data.title}
                src={data.book_image}
                onContextMenu="return false;"
              />
            </div>
            <div className="rate">
              <h4>Average Rating: <span>  { data.average_rating } </span> </h4>
              
              <Rate 
              className='rating'
              disabled={true}
              value={data.average_rating}
              />
            </div>
          </Col>
          <Col lg={15}>
            <div className="description">
              <div className="book-card">
                <div className="text">
                  <h1 className="details"> Title: {data.title} </h1>
                  <h2 className="details"> Author: {data.author} </h2>
                  <h3 className="details"> Description: {data.description} </h3>
                  <h3 className="details"> Isbn10: {data.primary_isbn10} </h3>
                  <h3 className="details"> Isbn13: {data.primary_isbn13} </h3>
                  <h3 className="details">
                    {" "}
                    Buy Book <a href={data.book_link}> Amazon </a>{" "}
                  </h3>
                </div>
                <hr className="details"></hr>
                <div className="comment">
                  <h3 className="details">Comments</h3>
                  <h4 className="details">
                    Number of comments: {comments.length}{" "}
                  </h4>
                  {comments &&
                    comments.map((comment, index) => (
                      <Comment
                        key={comment.id}
                        author={comment.user.username}
                        content={<p className="details"> {comment.comment} </p>}
                        avatar={
                          <Avatar
                            src={`https://ui-avatars.com/api/?background=random&name=${comment.user.username}`}
                            alt={comment.user.username}
                          />
                        }
                        datetime={
                          <Tooltip
                            title={moment(comment.created_at).format(
                              "YYYY-MM-DD HH:mm:ss"
                            )}
                          >
                            <span>{moment(comment.created_at).fromNow()}</span>
                          </Tooltip>
                        }
                      />
                    ))}

                  {isSigned ? (
                    <>
                      <Form.Item>
                        <TextArea
                          rows={4}
                          onChange={(e) => {
                            setPost(e.target.value);
                          }}
                          value={post}
                        />
                      </Form.Item>
                      <Form.Item>
                        <Button
                          type="submit"
                          loading={commentsSubmitting}
                          onClick={addComment}
                          type="primary"
                        >
                          Add Comment
                        </Button>
                      </Form.Item>
                    </>
                  ) : (
                    <>
                      <div className="details">
                        You need to login to add comment
                      </div>
                      <button
                        type="submit"
                        // loading={submitting}
                        onClick={() => {
                          setModal(true);
                        }}
                        className="login-button"
                      >
                        Sign In
                      </button>{" "}
                    </>
                  )}
                </div>
              </div>
            </div>
          </Col>
        </Row>
        <Modal
          className="modal"
          title="Login"
          centered
          visible={modal}
          //   onOk={() => toggle()}
          onCancel={() => toggle()}
          footer={[
            <Button
              key="submit"
              type="primary"
              loading={submitting}
              onClick={() => {
                login();
              }}
            >
              {" "}
              Login{" "}
            </Button>,
          ]}
        >
          {error && (
            <Alert className="mb" message={error} type="error" showIcon />
          )}
          <div className="input">
            <Input
              className="login-input"
              placeholder="username"
              value={username}
              onChange={(e) => {
                setUsername(e.target.value);
              }}
              rules={[
                {
                  required: true,
                  message: "username is required",
                },
                {
                  validator: (_, value) => {
                    if (value || value.includes["null"]) {
                      return Promise.reject(new Error("Nice try!"));
                    }
                    return Promise.resolve();
                  },
                },
              ]}
            />
            <Input.Password
              className="login-input"
              placeholder="input password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
          </div>
        </Modal>
      </>
    </Layout>
  );
}
