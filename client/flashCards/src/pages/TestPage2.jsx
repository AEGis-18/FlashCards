import { Link, useNavigate } from "react-router-dom";
import { Button } from "../components/formElements/Button";
import { useEffect, useState } from "react";
import { Api } from "../api/base.api";

export function TestPage2() {
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    document.title = "Test 2 - Flash Cards";
  }, []);

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const res = await Api.get("/notes");
        console.log(res.data);
        setNotes(res.data);
      } catch (error) {
        console.log("Notes error: ", error);
      }
    };

    fetchNotes();
  }, []);

  return (
    <div>
      <h2>Notes</h2>
      <ul>
        {notes.map((note) => (
          <li key={note.id}>{note.description}</li>
        ))}
      </ul>
      <Link to="/">
        <Button>Notes</Button>
      </Link>
    </div>
  );
}
