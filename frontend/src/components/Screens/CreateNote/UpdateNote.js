import React, { useEffect, useState } from 'react'
import MainScreen from '../../MainScreen.js';
import { Form,Button, Card } from "react-bootstrap";
import {  useNavigate, useParams } from 'react-router-dom';
import Loading from '../../Loding.js';
import ErrorMessage from '../../ErrorMessage.js';
import ReactMarkdown from 'react-markdown'
import { useDispatch, useSelector } from 'react-redux';
import { deleteNoteAction, updateNotesList } from '../../../actions/noteActions.js';
import axios from 'axios';


const UpdateNote = () => {
     const [title, setTitle] = useState();
     const [content, setContent] = useState();
     const [category, setCategory] = useState();
    const [date, setDate] = useState("");
        const dispatch = useDispatch();
    const navigate = useNavigate();
    const { id } = useParams();
    


    const updateNote = useSelector((state) => state.notesUpdate);
    const {loading,error}= updateNote
    
    const noteDelete = useSelector((state) => state.notesDelete);
    const { loading: loadingDelete, error: errorDelete} = noteDelete;
  const userLogin = useSelector((state) => state.userLogin);
  const {userInfo} = userLogin
    


    useEffect(() => {
        const fetchData = async () => {
            const config = {
              headers: {
                Authorization: `Bearer ${userInfo.token}`,
              },
            };
            const { data } = await axios.get(`/api/notes/${id}`, config)
            setTitle(data.title);
            setContent(data.content);
            setCategory(data.category);
            setDate(data.createdAt)
        }
         fetchData();
    },[id,date,userInfo])

    const deleteHandler = (id) => {
      if (window.confirm("Are you sure?")) {
        dispatch(deleteNoteAction(id));
      }
      navigate("/mynotes")
    };

    const resetHandler = () => {
        setTitle("");
        setCategory("");
        setContent("");
    }
    const updateHandler = (e) => {
        e.preventDefault();
        if (!title || !content || !category) return;
        dispatch(updateNotesList(id, title, content, category));
        resetHandler();
        navigate("/mynotes")

    }
  return (
     <MainScreen title="Edit Note">
      <Card>
        <Card.Header>Edit your Note</Card.Header>
        <Card.Body>
          <Form onSubmit={updateHandler}>
            {loadingDelete && <Loading />}
            {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
            {errorDelete && (
              <ErrorMessage variant="danger">{errorDelete}</ErrorMessage>
            )}
            <Form.Group controlId="title">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="title"
                placeholder="Enter the title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="content">
              <Form.Label>Content</Form.Label>
              <Form.Control
                as="textarea"
                placeholder="Enter the content"
                rows={4}
                value={content}
                onChange={(e) => setContent(e.target.value)}
              />
            </Form.Group>
            {content && (
              <Card>
                <Card.Header>Note Preview</Card.Header>
                <Card.Body>
                  <ReactMarkdown>{content}</ReactMarkdown>
                </Card.Body>
              </Card>
            )}

            <Form.Group controlId="content">
              <Form.Label>Category</Form.Label>
              <Form.Control
                type="content"
                placeholder="Enter the Category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              />
            </Form.Group>
            {loading && <Loading size={50} />}
            <Button variant="primary" type="submit" className='my-2'>
              Update Note
            </Button>
            <Button
              className="mx-2 my-2"
              variant="danger"
              onClick={() => deleteHandler(id)}
            >
              Delete Note
            </Button>
          </Form>
        </Card.Body>

        <Card.Footer className="text-muted">
          Updated on - {date.substring(0, 10)}
        </Card.Footer>
      </Card>
    </MainScreen>
  );
  
}

export default UpdateNote
