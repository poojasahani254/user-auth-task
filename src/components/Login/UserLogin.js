import React, { Component } from 'react';
import {Button, Form, FormGroup, Input, Label} from "reactstrap";
import Users from "../../assests/users.json";
import bcrypt from 'bcryptjs'
import { Container, Row, Col, Card, CardBody } from "reactstrap";
import {withRouter} from "react-router-dom";

const salt = bcrypt.genSaltSync(10);
class UserLogin extends Component {
    constructor(props) {
        super(props);
        this.state = { users: [], email: "", password: "", isError: false }
    }

    componentDidMount() {
        this.setState({ users: Users.users || []});
    }

    static _omit = (key, { [key]: _, ...obj }) => obj;

    onChange = (e) => this.setState( { [e.target.name]: e.target.value });

    onLogin = () => {
        const { users, email, password } = this.state;
        if(users.length > 0) {
            let isUser = users.find(o => (o.email === email && o.password === password));
            if(isUser) {
                const encryptedPass = bcrypt.hashSync(password, salt);
                localStorage.setItem('hashPassword', encryptedPass);
                localStorage.setItem('isLoggedIn', "true");

                this.props.history.push({pathname: '/', state: { user: UserLogin._omit("password", isUser) }})
            } else {
                this.setState({isError: true});
            }
        }
    }

    render() {
        return (
            <Container>
                <Row>
                    <Col />
                    <Col className={"mt-3"} lg="8">
                        <h3> Login </h3>
                        <hr />
                        <Card>
                            <CardBody>
                                <Form inline>
                                    <FormGroup floating>
                                        <Input
                                            id="userEmail"
                                            name="email"
                                            placeholder="Email"
                                            type="email"
                                            value={this.state.email}
                                            onChange={this.onChange}
                                        />
                                        <Label for="exampleEmail">
                                            Email
                                        </Label>
                                    </FormGroup>
                                    {' '}
                                    <FormGroup floating>
                                        <Input
                                            id="password"
                                            name="password"
                                            placeholder="Password"
                                            type="password"
                                            value={this.state.password}
                                            onChange={this.onChange}
                                        />
                                        <Label for="examplePassword">
                                            Password
                                        </Label>
                                    </FormGroup>
                                    {' '}
                                    <Button onClick={this.onLogin}>
                                        Submit
                                    </Button>
                                </Form>
                            </CardBody>
                        </Card>
                    </Col>
                    <Col />
                </Row>
            </Container>


        );
    }
}

export default withRouter(UserLogin);