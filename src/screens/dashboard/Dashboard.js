import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {
  Bar,
  BarChart,
  CartesianGrid,
  LabelList,
  Legend,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import ListItem from "../../components/list-item/ListItem";
import Navbar from "../../components/navbar/Navbar";
import {
  approveRequest,
  getActiveRegistrations,
  getActiveUsers,
  getStates,
  rejectRequest,
  sendRemoveUser,
} from "../../services/services";
import { setAdmin } from "../../store/actions/admin-actions";
import "./Dashboard.css";

function Dashboard(props) {
  const [registrations, setRegistrations] = useState([]);
  const [activeUsers, setActiveUsers] = useState([]);
  const [chart, setChart] = useState([]);
  const [pageReg, setPageReg] = useState(1);
  const [pageUser, setPageUser] = useState(1);
  const dispatch = useDispatch();
  async function initialize() {
    const responseRegistrations = await getActiveRegistrations(pageReg);
    setRegistrations(responseRegistrations.data);
    const responseUsers = await getActiveUsers(pageUser);
    setActiveUsers(responseUsers.data);
    const allUsers = await getStates();
    let data = [];
    allUsers.forEach((val, index) => {
      data.push({ name: val.state, activeUsers: val.num });
    });
    setChart(data);
  }
  useEffect(() => {
    initialize();
  }, [pageReg,pageUser]);
  async function onApprove(id) {
    await approveRequest(id);
    await initialize();
  }
  async function onReject(id) {
    await rejectRequest(id);
    await initialize();
  }
  async function removeUser(id) {
    await sendRemoveUser(id);
    await initialize();
  }
  async function prev(name) {
    if (name === "user" && pageUser > 1) {
      setPageUser(pageUser - 1);
    } else if (name === "reg" && pageReg > 1) {
      setPageReg(pageReg - 1);
    }
  }
  async function next(name) {
    if (name === "user" && activeUsers.length === 10) {
      setPageUser(pageUser + 1);
    } else if (name === "reg" && registrations.length === 10) {
      setPageReg(pageReg + 1);
    }
  }

  function logOut() {
      dispatch(setAdmin(null,null));
  }

  return (
    <div className="Dashboard">
      <section className="Top">
        <Navbar buttons={[{title: "Sign Out", onClick: logOut}]} />
      </section>
      <section className="BottomDashboard">
        <div className="charts">
          <BarChart
            data={chart}
            margin={{ top: 20 }}
            width={window.innerWidth}
            height={300}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis minTickGap={10000} />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="activeUsers" fill="#8884d8">
              <LabelList dataKey="name" position="insideStart" angle={90} />
            </Bar>
          </BarChart>
        </div>
        <div className="list">
          <div className="active-registrations column">
            <h1 className="listHeading">Pending Registrations</h1>
            {registrations.map((val, index) => {
              return (
                <ListItem
                  className="item"
                  name={val.name}
                  state={val.state}
                  mobile={val.mobile}
                  key={index}
                  onApprove={onApprove}
                  id={val.id}
                  buttons={[
                    { title: "Approve", onClick: onApprove },
                    { title: "Reject", onClick: onReject },
                  ]}
                />
              );
            })}
            <div className="pageNav">
              <button onClick={() => {
                  prev("reg");
              }}>Prev</button>
              <p>{pageReg}</p>
              <button onClick={() => {
                  next("reg")
              }}>Next</button>
            </div>
          </div>
          <div className="active-users column">
            <h1 className="listHeading">Active Users</h1>
            {activeUsers.map((val, index) => {
              return (
                <ListItem
                  className="item"
                  name={val.name}
                  state={val.state}
                  mobile={val.mobile}
                  key={index}
                  id={val.id}
                  buttons={[{ title: "Remove", onClick: removeUser }]}
                />
              );
            })}
            <div className="pageNav">
              <button onClick={() => {
                  prev("user");
              }}>Prev</button>
              <p>{pageUser}</p>
              <button onClick={() => {
                  next("user");
              }}>Next</button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Dashboard;
