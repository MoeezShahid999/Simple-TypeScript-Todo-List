import React from "react";
import "./App.css";
interface data {
  val: string;
  status: string;
  id: number;
}
interface dataObj {
  val: string;
  status: string;
  id: number;
  completeIt: (id: number) => void;
}
const App = () => {
  const [val, setVal] = React.useState<string>("");
  const [data, setData] = React.useState<data[]>([
    { val: "", status: "", id: 0 },
  ]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setVal(e.currentTarget.value);
  };
  const addVal = (e: React.MouseEvent<HTMLButtonElement>): void => {
    if (val && val.length > 0) {
      let dataIns = { val: val, status: "pending", id: Math.random() * 1000 };
      setData([...data, dataIns]);
      setVal("");
    } else {
      alert("Alert: Please add some value first");
    }
  };
  const completeIt = (id: number) => {
    const dataSet: data[] = [...data];
    let index: number = 0;
    dataSet.find((el, ind) => {
      if (el.id === id) {
        index = ind;
        return el;
      }
    });

    dataSet[index].status =
      dataSet[index].status === "completed" ? "pending" : "completed";
    setData(dataSet);
  };
  console.log(data)
  return (
    <div>
      <Header />
      <div className="App">
        <div className="form-flex">
          <input
            className="input"
            placeholder="Add some tasks ?"
            type="text"
            value={val}
            onChange={handleChange}
          />
          <button className="btn" onClick={addVal}>
            Add
          </button>
        </div>
        {(data.length > 1 ) ? (
          <div className="tasks-list">
            {data.map((el) => {
              if (el.val && el.val.length > 0)
                return (
                  <CompletedTasks
                    key={el.id}
                    id={el.id}
                    status={el.status}
                    val={el.val}
                    completeIt={completeIt}
                  />
                );
            })}
          </div>
        ) : null}
      </div>
    </div>
  );
};

const CompletedTasks: React.FC<dataObj> = (data) => {
  const completeIt = () => {
    data.completeIt(data.id);
  };
  console.log(data)
  return (
    <div
      className="completed-tasks"
      status-prop={data.status}
      id-prop={data.id}
    >
      <div
        style={
          data.status !== "pending"
            ? { textDecoration: "line-through", width: "28vw" }
            : { width: "28vw",minWidth:'300px' }
        }
      >
        {data.val}
      </div>
      <button
        style={{ width: "9vw", border: "none", outline: "none" }}
        className="close"
        onClick={completeIt}
      >
        {data.status === "pending" ? "Mark As Complete" : "Mark As Incomplete"}
      </button>
    </div>
  );
};

const Header = () => {
  return <div className="header">A simple Todo List in Typescript</div>;
};

export default App;
