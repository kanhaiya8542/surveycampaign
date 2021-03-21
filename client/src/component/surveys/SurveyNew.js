import React, { Component } from 'react';
import SurveyForm from './SurveyForm';
import SurveyFormreview from '../surveys/SurveyFormreview';
import { reduxForm } from 'redux-form';

export class SurveyNew extends Component {
    state = { showFormReview: false };


    renderContent() {
        if (this.state.showFormReview) {
            return <SurveyFormreview
                onCancel={() => this.setState({ showFormReview: false })}
            />;
        } else {
            return <SurveyForm
                onSurveySubmit={() => this.setState({ showFormReview: true })}
            />
        }
    }

    render() {
        return (
            <div>
                {this.renderContent()}
            </div>
        )
    }
}

export default reduxForm({
    form: 'surveyForm'
})(SurveyNew)