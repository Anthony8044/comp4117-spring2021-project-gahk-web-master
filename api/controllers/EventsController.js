/**
 * EventController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {


  index: async function (req, res) {
    return res.view('events/index', { events: await Events.find({ sort: 'end DESC' }) });
  },

  // json function
  json: async function (req, res) {

    var events = await Events.find();

    return res.json(events);
  },

  filter: async function (req, res) { //show filtered events to calendarFilter

    var whereClause = {};

    if (req.query.year) whereClause.start = { contains: req.query.year };
    if (req.query.discipline) whereClause.discipline = req.query.discipline;
    if (req.query.category) whereClause.category = req.query.category;
    if (req.query.venue) whereClause.venue = req.query.venue;

    var thoseEvents = await Events.find({
      where: whereClause,
      sort: [{ start: 'ASC' }],
    });


    //return res.status(201).json(thoseEvents);
    return res.view('pages/competition/calendarAlt', { events: thoseEvents });

  },




};

