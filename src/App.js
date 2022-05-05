import React from 'react';
import {
    Route,
    BrowserRouter as Router,
    Switch,
} from "react-router-dom";
import UserLogin from "./components/Login/UserLogin";
import Dashboard from "./components/Dashboard/Dashboard";
import Protected from "./components/Routes/ProtectedRoute";
import 'bootstrap/dist/css/bootstrap.css';

function App() {
    return (
        <Router>
            <Switch>
                <Route exact path={'/signin'} component={UserLogin} />
                <Protected exact path={'/'} component={Dashboard} />
            </Switch>
        </Router>
    );
}

export default App;