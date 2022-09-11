import logo from "./logo.svg";
import "./App.css";
import React, { useState } from "react";

function App() {
  const [currentNote, setCurrentNote] = useState("");
  const [subject, setSubject] = useState("");
  const [notesList, setNotesList] = useState([]);
  const [noteId, setNoteId] = useState("0");
  const [isEditing, setIsEditing] = useState(-1);
  const [editingSubject, setEditingSubject] = useState("");
  const [editingNote, setEditingNote] = useState("");
  // JSON.parse(noteId)
  function submitNote() {
    if (!currentNote || !subject) {
      alert("Make a note");
    } else {
      var temp = notesList;
      temp.push({ id: noteId, subject: subject, note: currentNote });
      var temp2 = JSON.parse(noteId) + 1;
      setNoteId(temp2.toString());
      setNotesList(temp);
      console.log(notesList);
      setSubject("");
      setCurrentNote("");
    }
  }

  function deleteNote(noteId) {
    var temp = [];
    for (var i = 0; i < notesList.length; i++) {
      if (notesList[i].id != noteId) {
        temp.push(notesList[i]);
      }
      setNotesList(temp);
    }
  }

  function changeNoteValue(noteId, category, value) {
    var temp = notesList;
    for (var i = 0; i < temp.length; i++) {
      if (temp[i].id === noteId) {
        temp[i][category] = value;
      }
    }
    console.log("Temp: ");
    console.log(temp);
    setNotesList(temp);
  }

  return (
    <div>
      <center>
        <h1>Notes App</h1>

        <div>
          <input
            type="text"
            placeholder="Subject"
            value={subject}
            className="subject"
            onChange={(text) => {
              setSubject(text.target.value);
              console.log(text.target.value);
            }}
          />
          <br />
          <textarea
            className="currentNote"
            type="text"
            placeholder="Your note"
            value={currentNote}
            onChange={(text) => {
              setCurrentNote(text.target.value);
            }}
          />
          <br />

          <button
            className="submitButton"
            onClick={() => {
              submitNote();
            }}
          >
            Create Note
          </button>
        </div>
        <div>
          {notesList.map((data, key) => (
            <div key={key}>
              <div>
                <div key={data.id} className="note">
                  {isEditing != data.id && (
                    <p>
                      {data.subject} - {data.note}
                    </p>
                  )}
                  {isEditing == data.id && (
                    <div>
                      <input
                        type="text"
                        placeholder="Edit Subject"
                        value={data.subject}
                        className="editSubject"
                        onChange={(text) => {
                          setEditingSubject(text.target.value);
                          changeNoteValue(
                            data.id,
                            "subject",
                            text.target.value
                          );
                          console.log(text.target.value);
                        }}
                      />
                      <input
                        type="text"
                        placeholder="Edit Note"
                        value={data.note}
                        className="editNote"
                        onChange={(text) => {
                          setEditingNote(text.target.value);
                          changeNoteValue(data.id, "note", text.target.value);
                          console.log(text.target.value);
                        }}
                      />
                    </div>
                  )}
                  <button
                    className="editButton"
                    onClick={() => {
                      isEditing == -1 && setIsEditing(data.id);
                      isEditing > -1 && setIsEditing(-1);
                    }}
                  >
                    <img className="penImage" src="images/pen.png"/>
                  </button>
                  <button
                    className="deleteButton"
                    onClick={() => {
                      deleteNote(data.id);
                    }}
                  >
                    <img className="trashcanImage" src="images/trashcan.png" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </center>
    </div>
  );
}

export default App;
