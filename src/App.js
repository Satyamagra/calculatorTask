import "./App.css";
import { useState, useEffect } from "react";
import NumberFormat from "react-number-format";

function App() {
  const [preState, setPreState] = useState("");
  const [curState, setCurState] = useState("");
  const [input, setInput] = useState("0");
  const [operator, setOperator] = useState(null);
  const [total, setTotal] = useState(false);

  const inputNum = (e) => {
    if (curState.includes(".") && e.target.innerText === ".") return;

    if (total) {
      setPreState("");
    }

    curState
      ? setCurState((pre) => pre + e.target.innerText)
      : setCurState(e.target.innerText);
    setTotal(false);
  };

  useEffect(() => {
    setInput(curState);
  }, [curState]);

  useEffect(() => {
    setInput("0");
  }, []);
  const operatorType = (e) => {
    setTotal(false);
    setOperator(e.target.innerText);
    if (curState === "") return;
    if (preState !== "") {
      equals();
    } else {
      setPreState(curState);
      setCurState("");
    }
  };

  const equals = (e) => {
    if (e?.target.innerText === "=") {
      setTotal(true);
    }
    let cal;
    switch (operator) {
      case "/":
        cal = String(parseFloat(preState) / parseFloat(curState));
        break;

      case "+":
        cal = String(parseFloat(preState) + parseFloat(curState));
        break;
      case "X":
        cal = String(parseFloat(preState) * parseFloat(curState));
        break;
      case "-":
        cal = String(parseFloat(preState) - parseFloat(curState));
        break;
      default:
        return;
    }
    setInput("");
    setPreState(cal);
    setCurState("");
  };


  const reset = () => {
    setPreState("");
    setCurState("");
    setInput("0");
  };
  const backspace=()=>{
    setCurState(curState.slice(0,-1))
}
  return (
    <div className='container'>
        <div className='screen'>
          {input !== "" || input === "0" ? (
            <NumberFormat
              value={input}
              displayType={"text"}
              thousandSeparator={true}
            />
          ) : (
            <NumberFormat
              value={preState}
              displayType={"text"}
              thousandSeparator={true}
            />
          )}
        </div>
      <div className='wrapper'>

        <button className='btn ' >
          CE
        </button>
        <button className='btn' onClick={reset}>
          c
        </button>
        <button className='btn' onClick={backspace} >
          back
        </button>
        {/* <div className='btn light-gray' onClick={percent}>
          %
        </div> */}
        {/* <div className='btn light-gray' onClick={minusPlus}>
          +/-
        </div> */}
        <button className='btn ' onClick={operatorType}>
          /
        </button>
        <button className='btn ' onClick={operatorType}>
          /
        </button>
        <button className='btn' onClick={inputNum}>
          7
        </button>
        <button className='btn' onClick={inputNum}>
          8
        </button>
        <button className='btn' onClick={inputNum}>
          9
        </button>
        <button className='btn ' onClick={operatorType}>
          X
        </button>
        <button className='btn' onClick={inputNum}>
          4
        </button>
        <button className='btn' onClick={inputNum}>
          5
        </button>
        <button className='btn' onClick={inputNum}>
          6
        </button>
        <button className='btn' onClick={operatorType}>
          +
        </button>
        <button className='btn' onClick={inputNum}>
          1
        </button>
        <button className='btn' onClick={inputNum}>
          2
        </button>
        <button className='btn' onClick={inputNum}>
          3
        </button>
        <button className='btn' onClick={operatorType}>
          -
        </button>
        <button className='btn ' onClick={inputNum}>
          0
        </button>
        <button className='btn' onClick={inputNum}>
          .
        </button>
        <button className='btn' onClick={equals}>
          =
        </button>
      </div>
    </div>
  );
}

export default App;
