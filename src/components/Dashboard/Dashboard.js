import React, { Component } from 'react';
import {withRouter} from "react-router-dom";
import {Card, CardBody, CardHeader, Button} from "reactstrap";
import Invitation from "../Invitation/Invitation";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

class Dashboard extends Component {
    interval = null;
    constructor(props) {
        super(props);
        this.state = { user: {} }
    }

    static getDerivedStateFromProps(props, state) {
        if(props.location?.state?.user !== state.user) {
            return {
                user: props.location.state.user
            }
        }
        return null;
    }
    componentDidMount() {
        const {state} = this.props.location
        this.setState({ user: state.user });
        this.interval = setInterval(() => {
            toast.success('Wow so easy!', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }, 5000);
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    onLogout = () => {
        localStorage.removeItem('hashPassword');
        localStorage.removeItem('isLoggedIn');
        this.props.history.push("/signin");
    }

    render() {
        return (
          <React.Fragment>
              <Card>
                  <CardHeader>
                      <div className={"d-flex justify-content-between align-items-center"}>
                          <div> Welcome, to dashboard </div>
                          <div className={"d-flex justify-content-between align-items-center"}>
                              <p className={"my-0 text-capitalize"}>{this.state.user?.first_name}</p>
                              <span className={"ml-2"} style={{cursor: "pointer"}} onClick={this.onLogout}>
                                  &#xe163;
                              </span>
                         </div>
                      </div>
                  </CardHeader>
                  <CardBody style={{height: "calc(100vh - 75px)"}}>
                      <Invitation user={this.state.user}/>
                  </CardBody>
              </Card>
              <ToastContainer />
          </React.Fragment>
        );
    }
}

export default withRouter(Dashboard);