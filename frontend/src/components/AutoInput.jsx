import * as React from "react";
import { Autocomplete } from "@mui/material";
import TextField from "@mui/material/TextField";
import axios from "axios";
import { AutocompleteOption, ListItemContent } from "@mui/joy";

const BASE_URL = "https://4e08-116-96-45-57.ngrok-free.app/api/trie";

export default function AutoInput(props) {
  const [value, setValue] = React.useState("");
  const [suggestWords, setSuggestWords] = React.useState([]);
  const [userInput, setUserInput] = React.useState("");

  const handleInputChange = (event) => {
    if (!event) return;
    const input = event.target.value;
    if (props.placeHolder === "Name") props.onSetName(input);
    if (props.placeHolder === "Note") props.onSetNote(input);
    setUserInput(input);
    const lastCharacter = input.slice(-1);
    const lastWord = input
      .split(" ")
      .filter((word) => word !== "")
      .pop();
    // console.log(lastWord);

    if (lastCharacter === " ") {
      axios
        .post(`${BASE_URL}/insert?word=${lastWord}`)
        .then(function (res) {
          console.log(res.data);
        })
        .catch(function (error) {
          console.log(error);
        });
    } else {
      axios
        .get(`${BASE_URL}?prefix=${lastWord}`)
        .then(function (res) {
          const fullSentences = res.data.map(
            (word) => `${userInput.split(" ").slice(0, -1).join(" ")} ${word}`
          );
          setSuggestWords(fullSentences);
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  };

  // function handleClickButton() {
  //   axios
  //     .post(`http://localhost:8080/api/trie/build?paragraph=${userInput}`)
  //     .then(function (res) {
  //       console.log(res.data);
  //     })
  //     .catch(function (error) {
  //       console.log(error);
  //     });
  // }

  React.useEffect(() => {
    axios
      .post(`${BASE_URL}/build?paragraph=${value}`)
      .then(function (res) {
        console.log(res.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, [value]);

  return (
    <>
      <Autocomplete
        id="free-solo-demo"
        freeSolo
        value={props.curRowText}
        options={suggestWords}
        onInputChange={(event) => handleInputChange(event)}
        onChange={(event, newValue) => setValue(newValue)}
        renderInput={(params) => (
          <TextField {...params} label={props.placeHolder} />
        )}
        renderOption={(props, option) => (
          <AutocompleteOption {...props}>
            <ListItemContent sx={{ fontSize: "sm" }}>
              {` ${option.split(" ").at(option.split(" ").length - 1)}`}
            </ListItemContent>
          </AutocompleteOption>
        )}
      />
    </>
  );
}
