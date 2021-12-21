import close from "./close.png";
import "./App.css";
import { useEffect, useState } from "react";

const App = () => {
  const [toggleOtp, setToggleOtp] = useState(false);
  const closeOtp = (e) => {
    e.stopPropagation();
    console.log("cleared");
    setToggleOtp(() => false);
  };
  return (
    <div className="AppMain">
      <button
        className="primary"
        onClick={() => {
          setToggleOtp((prev) => !prev);
        }}
      >
        Toggle Otp Modal
      </button>
      {toggleOtp && <Otp closeOtp={closeOtp} />}
    </div>
  );
};
function Otp({ closeOtp }) {
  const [val, setVal] = useState("");
  const [otp1, setOtp1] = useState("");
  const [otp2, setOtp2] = useState("");
  const [otp3, setOtp3] = useState("");
  const [otp4, setOtp4] = useState("");
  const [otp5, setOtp5] = useState("");
  useEffect(() => {
    if (otp1 && otp2 && otp3 && otp4) {
      setVal(`${otp1 + otp2 + otp3 + otp4}`);
    }
  }, [otp1, otp2, otp3, otp4]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (val) {
      window.alert(val);
    } else {
      window.alert("Invalid Otp");
    }
  };
  const inputfocus = (elmnt) => {
    // Number.isNaN(Number(elmnt.target.value))
    if (elmnt.key == "ArrowRight") {
      const next = elmnt.target.tabIndex + 1;
      if (next < 4) {
        elmnt.target.form.elements[next].focus();
      }
    } else if (elmnt.key == "ArrowLeft") {
      const next = elmnt.target.tabIndex - 1;
      if (next > -1) {
        elmnt.target.form.elements[next].focus();
      }
    }
    console.log(elmnt.key);
    if (elmnt.key === "Delete" || elmnt.key === "Backspace") {
      // elmnt.preventDefault();
      const next = elmnt.target.tabIndex - 1;
      if (next > -1) {
        elmnt.target.form.elements[next].focus();
      }
    }
    if (elmnt.target.value == "") {
      console.log(elmnt.target.value);
      elmnt.target.val = "";
      return;
    }
    if (elmnt.key === "Delete" || elmnt.key === "Backspace") {
      // elmnt.preventDefault();
      const next = elmnt.target.tabIndex - 1;
      if (next > -1) {
        elmnt.target.form.elements[next].focus();
      }
    } else {
      console.log("next");

      const next = elmnt.target.tabIndex + 1;
      if (next < 4) {
        elmnt.target.form.elements[next].focus();
      }
    }
  };
  const pasteHandler = (e) => {
    var pastedValue = e.clipboardData.getData("text");
    if (!Number.isNaN(+pastedValue) && pastedValue.length == 4) {
      setOtp1(pastedValue[0]);
      setOtp2(pastedValue[1]);
      setOtp3(pastedValue[2]);
      setOtp4(pastedValue[3]);
    }
  };
  return (
    <div className="App">
      {/* <span onClick={closeOtp} className="closeButton">
        <img src={close}></img>
      </span> */}
      <img src="https://cdn.eckovation.com/images/otp_icon-1.svg"></img>
      <form onSubmit={handleSubmit}>
        <div className="otpContainer">
          <input
            autoFocus={true}
            name="otp1"
            type="text"
            autoComplete="off"
            className="otpInput"
            value={otp1}
            onChange={(e) => {
              if (Number.isNaN(+e.target.value)) return;
              setOtp1(e.target.value);
            }}
            tabIndex="0"
            maxLength="1"
            onPaste={pasteHandler}
            onKeyUp={(e) => inputfocus(e)}
          />
          <input
            name="otp2"
            type="text"
            autoComplete="off"
            className="otpInput"
            value={otp2}
            onPaste={pasteHandler}
            onChange={(e) => {
              if (Number.isNaN(+e.target.value)) return;
              setOtp2(e.target.value);
            }}
            tabIndex="1"
            maxLength="1"
            onKeyUp={(e) => inputfocus(e)}
          />
          <input
            name="otp3"
            type="text"
            autoComplete="off"
            className="otpInput"
            value={otp3}
            onPaste={pasteHandler}
            onChange={(e) => {
              if (Number.isNaN(+e.target.value)) return;
              setOtp3(e.target.value);
            }}
            tabIndex="2"
            maxLength="1"
            onKeyUp={(e) => inputfocus(e)}
          />
          <input
            name="otp4"
            type="text"
            autoComplete="off"
            className="otpInput"
            value={otp4}
            onPaste={pasteHandler}
            onChange={(e) => {
              if (Number.isNaN(+e.target.value)) return;

              setOtp4(e.target.value);
            }}
            tabIndex="3"
            maxLength="1"
            onKeyUp={(e) => inputfocus(e)}
          />
        </div>
        <button className="primary" type="submit">
          Submit
        </button>
      </form>
    </div>
  );
}

export default App;
