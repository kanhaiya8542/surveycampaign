const mongoose = require('mongoose')

const requireLogin = require('../middleware/requireLogin');
const requireCredits = require('../middleware/requireCredits');
const surveyTemplate = require('../services/emailTemplates/surveyTemplate');
const Mailer = require('../services/Mailer');
const Survey = mongoose.model('surveys');

const { URL } = require('url');
const { Path } = require('path-parser');
const { url } = require('inspector');
// const Path = require('path-parser');

// 1. In your surveyRoutes.js change the require import to:

// const Path = require('path-parser').default;

// 2. In your surveyRoutes.js change the require import to:

// const { Path } = require('path-parser');

// 3. Downgrade your path-parser module and leave the import as it is:

// npm uninstall --save path-parser 

// npm install --save path-parser@2.0.2 



module.exports = app => {
    app.get('/api/surveys', requireLogin, async (req, res) => {
        const surveys = await Survey.find({ _user: req.user.id }).select({
            recipients:false
        });
        res.send(surveys);
    });






    app.get('/api/surveys/:surveyId/:choice', (req, res) => {
        res.send('Thanks for voting!')
    })
    // sendgrid.com/settings/mail_settings* mailsetting sidemenu >
    //  turn on configuration > under HTTP POST URL write your webhook url 
    // like: http:******.***/api/survey/webhooks
    app.post('api/survey/webhooks', (req, res) => {
        const p = new Path('/api/surveys/:surveyId/:choice');

        // const events = _.chain(req.body)
        _.chain(req.body)
            .map(({ email, url }) => {
                const match = p.test(new URL(url).pathname);
                if (match) {
                    return {
                        email, surveyId: match.surveyId,
                        choice: match.choice
                    };
                }
            })
            .compact()
            .uniqBy('email', 'surveyId')
            .each(({ surveyId, email, choice }) => {
                Survey.updateOne({
                    _id: surveyId,
                    recipients: {
                        $eleMatch: { email: email, response: false }
                    }
                }, { //  [] key interpolation.
                    $inc: { [choice]: 1 }, // mongo oprator, t.m find and incremented
                    $set: { 'recipient.$.responsed': true }, // find and update as line number  56-58 
                    lastResponded: new Date(),
                }).exec();
            })
            .value();
        res.send({});

        // console.log(events); 


        // const events = _.map(req.body, ({ email, url }) => {
        //     const p = new Path('/api/surveys/:surveyId/:choice'); 
        //     const pathname = new URL(url).pathname;
        //     const match = p.test(pathname);
        //     if (match) {
        //         return { email, surveyId: match.surveyId, choice: match.choice }
        //     }
        // });

        // const compactEvents = _.compact(events);
        // const uniqueEvents = _.uniqBy(compactEvents, 'email', 'surveyId');
        // console.log(uniqueEvents);
        // res.send({});

    })

    app.post('/api/surveys', requireLogin, requireCredits, async (req, res) => {

        const { title, subject, body, recipients } = res.body;

        const survey = new Survey({
            title,
            subject,
            body,
            recipients: recipients.split(',').map(email => ({ email: email.trim() })),
            _user: req.user.id,
            dateSent: Date.now()
        });

        const mailer = new Mailer(survey, surveyTemplate(survey))

        try {
            await mailer.send();
            await survey.save();
            req.user.credits -= 1;
            const user = await req.user.save();

            res.send(user);
        } catch (err) {
            res.status(422).send(err)
        }


    })
}  