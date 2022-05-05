import React, {Component} from "react";
import {withRouter} from "react-router-dom";
import InvitationData from "../../assests/invitations.json";
import InvitationUpdateData from "../../assests/invitations_update.json";
import InvitationItem from "./InvitationItem";

class Invitation extends Component {
    constructor(props) {
        super(props);
        this.state = { invitations: [] }
    }

    componentDidMount() {
        let invitations = InvitationData.invites || [];
        let filterInvites = invitations.filter((v, k) => v.user_id === ''+this.props.user?.user_id);
        this.setState({ invitations: filterInvites});

        //Invitation update data fetch
        let updateInvitations = InvitationUpdateData.invites || [];
        let filterUpdateInvitations = updateInvitations.filter((v, k) => v.user_id === ''+this.props.user?.user_id);
        if(filterUpdateInvitations.length > 0) {
            let cnt = 0;
            let intervalID = setInterval( () => {
                let invitations = this.state.invitations;
                this.setState({invitations: [...invitations, filterUpdateInvitations[cnt]]})
                if (++cnt === filterUpdateInvitations.length) {
                    window.clearInterval(intervalID);
                }
            }, 5000);
        }
    }

    static getDate(timeStamp) {
        let date = new Date(timeStamp);
        return date.getDate() + "-"+ (date.getMonth()+1) + "-"+ date.getFullYear()
    }

    lists = () => {
        return this.state.invitations.map((v, idx) => {
            return (
                <InvitationItem
                    key={idx}
                    title={v?.vector}
                    subTitle={Invitation.getDate(v?.invite_time)}
                    body={v?.invite}
                    styles={{background: v?.status !== "read" ? "#547996" : "#cfdeeb"}}
                />
            )
        });
    }

    render() {
        return (
           <div style={{height: "calc(100vh - 70px)", overflow: "auto"}}>
               {this.lists()}
           </div>
        )
    }
}

export default withRouter(Invitation);