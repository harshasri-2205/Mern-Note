import React, { useEffect } from "react";
import MainScreen from "../../MainScreen.js";
import { Link, useNavigate } from "react-router-dom";
import { Accordion, Badge, Button, Card } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { deleteNoteAction, notesList } from "../../../actions/noteActions.js";
import Loading from "../../Loding.js";
import ErrorMessage from "../../ErrorMessage.js";

const MyNotes = ({ search }) => {
  const dispatch = useDispatch();
  const noteList = useSelector((state) => state.notesList);
  const { loading, notes, error } = noteList;
  const userLogin = useSelector((state) => state.userLogin);

  const noteDelete = useSelector((state) => state.notesDelete);
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = noteDelete;

  const { userInfo } = userLogin;
  const navigate = useNavigate();
  const deleteNote = (id) => {
    if (window.confirm("Are you sure wnt to delete this note?")) {
      dispatch(deleteNoteAction(id));
    }
  };

  const noteCreate = useSelector((state) => state.notesCreate);
  const { success: noteCreateSuccess } = noteCreate;
  const noteUpdate = useSelector((state) => state.notesCreate);
  const { success: noteUpdateteSuccess } = noteUpdate;

  useEffect(() => {
    dispatch(notesList());
    if (!userInfo) {
      navigate("/");
    }
  }, [
    dispatch,
    noteCreateSuccess,
    noteUpdateteSuccess,
    userInfo,
    navigate,
    successDelete,
  ]);

  return (
    <div>
      <MainScreen title={`Welcome to ${userInfo?.name}`}>
        <Link to="/createnote">
          <Button style={{ marginLeft: 10, marginBottom: 6 }} size="lg">
            Create Note
          </Button>
        </Link>
        {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
        {errorDelete && (
          <ErrorMessage variant="danger">{errorDelete}</ErrorMessage>
        )}
        {loading && <Loading />}
        {loadingDelete && <Loading />}
        {notes
          ?.reverse()
          .filter((each) =>
            each.title.toLowerCase().includes(search.toLowerCase())
          )
          .map((each) => (
            <Accordion key={each._id} style={{ border: "none" }}>
              <Card style={{ margin: 10 }}>
                <Accordion.Item eventKey="0" style={{ border: "none" }}>
                  <Card.Header style={{ display: "flex", border: "none" }}>
                    <span
                      style={{
                        color: "black",
                        textDecoration: "none",
                        flex: 1,
                        cursor: "pointer",
                        alignSelf: "center",
                        fontSize: 18,
                        border: "none",
                      }}
                    >
                      <Accordion.Header style={{ border: "none" }}>
                        {each.title}
                      </Accordion.Header>
                    </span>
                    <div>
                      <Button href={`/note/${each._id}`}>Edit</Button>
                      <Button
                        variant="danger"
                        className="mx-2"
                        onClick={() => deleteNote(each._id)}
                      >
                        Delete
                      </Button>
                    </div>
                  </Card.Header>
                  <Accordion.Body>
                    <Card.Body>
                      <h4>
                        <Badge bg="success">Category - {each.category}</Badge>
                      </h4>
                      <blockquote className="blockquote mb-0">
                        <p>{each.content}</p>
                        <footer className="blockquote-footer">
                          Created on {each.createdAt.substring(0, 10)}
                        </footer>
                      </blockquote>
                    </Card.Body>
                  </Accordion.Body>
                </Accordion.Item>
              </Card>
            </Accordion>
          ))}
      </MainScreen>
    </div>
  );
};

export default MyNotes;
