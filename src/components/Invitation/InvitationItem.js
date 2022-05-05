import React, {Component} from "react";
import {Card, CardBody, CardSubtitle, CardText, CardTitle} from "reactstrap";
import {withRouter} from "react-router-dom";

class InvitationItem extends Component {

    render() {
        const { title, subTitle, body, styles } = this.props
        return (
            <Card className={"mb-3"} style={styles}>
                <CardBody>
                    <CardTitle tag="h5">
                        {title}
                    </CardTitle>
                    <CardSubtitle
                        className="mb-2 text-muted"
                        tag="h6"
                    >
                        {subTitle}
                    </CardSubtitle>
                    <CardText>
                        {body}
                    </CardText>
                </CardBody>
            </Card>
        )
    }
}

export default withRouter(InvitationItem);