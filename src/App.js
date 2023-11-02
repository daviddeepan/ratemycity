import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LoginScreen from "./screens/LoginScreen";
import HomeScreen from "./screens/HomeScreen";
import RegisterScreen from "./screens/RegisterScreen";
import RegisterDetailScreen from './screens/RegisterDetailsScreen'
import NavBar from "./components/Navbar";
import "./App.css";

function App() {
	return (
		<div className="App">
			<NavBar />

			<Router>
				<Routes>
					<Route exact path="/" element={<HomeScreen />} />
					<Route
						exact
						path="/register/"
						element={<RegisterScreen />}
					/>
					<Route exact path="/login/" element={<LoginScreen />} />
					<Route
						exact
						path="/register-details/"
						element={<RegisterDetailScreen />}
					/>
				</Routes>
			</Router>
		</div>
	);
}

export default App;
