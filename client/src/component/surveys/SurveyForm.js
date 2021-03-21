import React, { Component } from 'react';
import _ from 'lodash';
import { reduxForm, Field } from 'redux-form';
import SurveyField from './SurveyField';
import { Link } from 'react-router-dom';
import formFields from './formFields';




class SurveyForm extends Component {

    renderFields() {
        return _.map(formFields, ({ name, label }) => {
            return <Field type='text'
                key={name}
                label={label}
                name={name}
                component={SurveyField} />
        })
    }

    render() {
        // console.log(this.props, "props")
        return (
            <div>
                <form
                    onSubmit={this.props.handleSubmit(this.props.onSurveySubmit)}
                >
                    {this.renderFields()}

                    <Link to='/surveys' className='red btn-flat white-text'>
                        CANCEL
                    </Link>

                    <button type='submit' className='teal btn-flat right white-text'>
                        Next
                        <i className='material-icons right'>done</i>
                    </button>
                </form>

            </div>
        )
    }
}

function validate(value) {
    const error = {};

    // error.emails = validateEamils(value.emails || '');
    _.each(formFields, ({ name, errormsg }) => {
        if (!value[name]) {
            error[name] = "You must provide a value";
            // error[name] = errormsg;
        }
    })


    return error;
}

export default reduxForm({
    validate,
    form: 'surveyForm',
    destroyOnUnmount: false,
})(SurveyForm)