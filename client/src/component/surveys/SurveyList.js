import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchSurvey } from '../../actions';


class SurveyList extends Component {

    componentDidMount() {
        this.props.fetchSurvey()
    }

//blue-grey calssName card style

    renderSurvey() {
        return this.props.surveys.reverse().map((survey) => {
            return (
                <div className='card  darken-1' key={survey_id}>
                    <div className='card-content'>
                        <span className='card-title'>{survey.title}</span>
                        <p>
                            {survey.body}
                        </p>
                        <p className='right'>
                            Sent On:{new Date(survey.dateSent).toLocaleDateString()}
                        </p>
                    </div>

                    <div className='card-action'>
                        <a>Yes:{survey.yes}</a>
                        <a>No:{survey.no}</a>
                    </div>

                </div>
            )
        })
    }

    render() {
        return (
            <div>
                {this.renderSurvey()}
            </div>
        )
    }
}

function mapStateToProps({ surveys }) {
    return {
        surveys: surveys
    }
}

export default connect(mapStateToProps, { fetchSurvey })(SurveyList) 