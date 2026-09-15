import { createFeedback, getFeedbackById } from "../models/feedbackModel.js";

//render the main feedback form page
export const renderForm = (req, res) => {
    res.render('index');
};

//POST /result - Process form submission and insert into the database
export const processFeedback = async (req, res, next) => {
    try {
        const insertId = await createFeedback(req.body);
        const newEntry = await getFeedbackById(insertId);


        res.render('result', { entry: newEntry });
    } catch (err) {
        console.error('Error processing feedback:', err);
        next(err); //passes error to Express default error handler
    }
};
