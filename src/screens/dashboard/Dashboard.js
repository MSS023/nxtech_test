import { useCallback, useEffect, useState, useRef } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
// import {
//   Bar,
//   BarChart,
//   CartesianGrid,
//   LabelList,
//   Legend,
//   Tooltip,
//   XAxis,
//   YAxis,
// } from "recharts";
import ListItem from "../../components/list-item/ListItem";
import Navbar from "../../components/navbar/Navbar";
import Chartjs from "chart.js/auto";
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
import { chartConfig } from "../../components/chart/chart-config";

function Dashboard(props) {
  const [registrations, setRegistrations] = useState([]);
  const [activeUsers, setActiveUsers] = useState([]);
  const [pageReg, setPageReg] = useState(1);
  const [pageUser, setPageUser] = useState(1);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const chartContainer = useRef(null);
  const [chartInstance, setChartInstance] = useState(null);

  const initialize = useCallback(async () => {
    const responseRegistrations = await getActiveRegistrations(pageReg);
    setRegistrations(responseRegistrations.data);
    const responseUsers = await getActiveUsers(pageUser);
    setActiveUsers(responseUsers.data);
    const allUsers = await getStates();
    let data = { state: [], data: [] };
    allUsers.forEach((val) => {
      data.state.push(val.state);
      data.data.push(val.num);
    });
    chartInstance.data.datasets[0].data = data.data;
    chartInstance.data.labels = data.state;
    chartInstance.update();
  }, [setRegistrations, pageReg, pageUser, chartInstance]);
  useEffect(() => {
    if (chartContainer && chartContainer.current) {
      const newChartInstance = new Chartjs(chartContainer.current, chartConfig);
      setChartInstance(newChartInstance);
    }
  }, [chartContainer]);
  useEffect(() => {
    initialize();
  }, [pageReg, pageUser, initialize]);
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
    dispatch(setAdmin(null, null));
  }

  function user() {
    navigate("/");
  }

  return (
    <div className="Dashboard">
      <section className="Top">
        <Navbar
          buttons={[
            { title: "User", onClick: user },
            { title: "Sign Out", onClick: logOut },
          ]}
        />
      </section>
      <section className="BottomDashboard">
        <div className="charts">
          {/* <BarChart
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
          </BarChart> */}
          <canvas
            id="mychart"
            ref={chartContainer}
            height={300}
            width={window.innerWidth}
          />
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
            {registrations.length === 0 ? (
              "No Pending Registrations"
            ) : (
              <div className="pageNav">
                <button
                  onClick={() => {
                    prev("reg");
                  }}
                >
                  Prev
                </button>
                <p>{pageReg}</p>
                <button
                  onClick={() => {
                    next("reg");
                  }}
                >
                  Next
                </button>
              </div>
            )}
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
            {activeUsers.length === 0 ? (
              "No Active Users"
            ) : (
              <div className="pageNav">
                <button
                  onClick={() => {
                    prev("user");
                  }}
                >
                  Prev
                </button>
                <p>{pageUser}</p>
                <button
                  onClick={() => {
                    next("user");
                  }}
                >
                  Next
                </button>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}

export default Dashboard;
