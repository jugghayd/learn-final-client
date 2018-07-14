import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Table } from 'react-bootstrap';

import ScheduleCard from '../components/ScheduleCard';
import { getSchedule } from '../redux/modules/schedule/actions';
import { getTeam } from '../redux/modules/teams/actions';

class Schedules extends Component {

  componentDidMount(){
    this.props.getTeam("/teams/" + this.props.match_params_id);
    this.props.getSchedule(this.props.match_url);
  }
  
  render() {
    return (
      <div className="container">
        <h3 className="text-center">{this.props.team[0] ? this.props.team[0].fullname : null} Schedule</h3>
        <h5 className="text-center">Game chat will be available 6 days prior to and end 1 day after the scheduled start time of the contest.</h5>
        <Table bordered striped condensed>
          <thead>
            <tr>
              <th>Date</th>
              <th>Away Team</th>
              <th></th>
              <th>Home Team</th>
              <th>Location</th>
              <th>Chat Room</th>
            </tr>
          </thead>
          <tbody>
            {this.props.schedule.map(game => <ScheduleCard key={game.id} game={game} />)}
          </tbody>
        </Table>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return ({
    schedule: state.schedules,
    team: state.teams
  })
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    getSchedule: getSchedule,
    getTeam: getTeam
  }, dispatch);
}

export default connect((mapStateToProps), mapDispatchToProps)(Schedules)