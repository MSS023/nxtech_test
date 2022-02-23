import { Provider } from "react-redux";
import { combineReducers, createStore } from "redux";
import "./App.css";
import Navigation from "./navigation/navigation";
import { adminReducer } from "./store/reducer/admin-reducer";

function App() {
  const rootReducer = combineReducers({
    admin: adminReducer,
  });
  const store = createStore(rootReducer);
  return (
    <Provider store={store}>
      <div className="App">
        <Navigation />
      </div>
    </Provider>
  );
}

export default App;
