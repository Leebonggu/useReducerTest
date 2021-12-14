import "./styles.css";
import { useReducer } from "react";

const filterInitialState = {
  stage: 0,
  status: []
};

const filterReducer = (state = filterInitialState, action) => {
  switch (action.type) {
    case "CHANGE_FILTER":
      const { name, value } = action.value;
      return { ...state, [name]: value };
    default:
      return state;
  }
};

const queryInitialState = {
  query: ""
};

const queryReducer = (state = queryInitialState, action) => {
  switch (action.type) {
    case "CHANGE_QUERY":
      const { name, value } = action.value;
      return { ...state, [name]: value };
    default:
      return state;
  }
};

export default function App() {
  const [queryState, queryDispatch] = useReducer(
    queryReducer,
    queryInitialState
  );
  const [filterState, filterDispatch] = useReducer(
    filterReducer,
    filterInitialState
  );

  const handleQuery = (event) => {
    const { value } = event.target;
    queryDispatch({ type: "CHANGE_QUERY", value: { name: "query", value } });
  };
  const handleStage = () => {
    filterDispatch({
      type: "CHANGE_FILTER",
      value: { name: "stage", value: filterState.stage + 1 }
    });
  };
  const handleStatus = () => {
    filterDispatch({
      type: "CHANGE_FILTER",
      value: {
        name: "status",
        value: [...filterState.status, parseInt(Math.random() * 10, 10)]
      }
    });
  };

  return (
    <div className="App">
      <h1>useReducer Test</h1>
      <input type="text" value={queryState.query} onChange={handleQuery} />
      <div className="devider" />
      <button onClick={handleStage}>stage</button>
      <h2>{filterState.stage}</h2>
      <div className="devider" />
      <button onClick={handleStatus}>status</button>
      {filterState.status.map((s, i) => (
        <h2 key={`${s}-${i}`}>{s}</h2>
      ))}
      <h2>반복되는 코드를 줄여보자!</h2>
    </div>
  );
}
