/**
 * AdminController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

const { registerMultiTask } = require("grunt");

module.exports = {
  index: async function (req, res) {
    return res.view('admin/index');
  },

  news_list: async function (req, res) {
    var models = await News.find({ sort: 'category' });
    return res.view('admin/news/index', { news: models });
  },



  news_create: async function (req, res) {

    if (req.method === 'GET') {
      return res.view('admin/news/create', { news: {} });
    }

    if (!req.body.News) { return res.badRequest(); }

    req.body.News.startDate = new Date(req.body.News.startDate);
    req.body.News.endDate = new Date(req.body.News.endDate);

    var userArray = [];
    userArray = req.body.News.userGroup;
    var sendCoach = [];
    var sendMember = [];
    var sendJudge = [];
    var sendAthlete = [];

    //Get array of each usergroup if checkbox is selected
    if (req.body.News.userGroup != null) {
      if (userArray.includes("member")) {
        sendMember = await User.find({
          where: { role: 'member'},
        });
      }
      if (userArray.includes("coach")) {
        sendCoach = await User.find({
          where: { role: 'coach'},
        });
      }
      if (userArray.includes("judge")) {
        sendJudge = await User.find({
          where: { role: 'judge'},
        });
      }
      if (userArray.includes("athlete")) {
        sendAthlete = await User.find({
          where: { role: 'athlete'},
        });
      }
    }

    //Get the email field of each usergroup arrray
    function getEmails(input, field) {
      var output = [];
      for (var i = 0; i < input.length; ++i)
        output.push(input[i][field]);
      return output;
    }

    var emailList = [];

    var coachEmails = getEmails(sendCoach, "Email");
    var memberEmails = getEmails(sendMember, "Email");
    var judgeEmails = getEmails(sendJudge, "Email");
    var athleteEmails = getEmails(sendAthlete, "Email");


    //Combine all arrays into one email list
    emailList = coachEmails.concat(memberEmails, judgeEmails, athleteEmails);

    //Email template for the email body
    var bodyString = "敬啟者:\n\n以下是" + req.body.News.newsName + "最新資訊，敬請留意，謝謝!\n\n";
    bodyString += req.body.News.content;
    bodyString += "\n\n中國香港體操總會";


    //Send email to users in the email list with attachment file
    if (emailList.length > 0 && req.body.News.attachmentName != "" || req.body.News.attachmentName2 != "" || req.body.News.attachmentName3 != "" || req.body.News.attachmentName4 != "" || req.body.News.attachmentName5 != "" || req.body.News.attachmentName6 != "" || req.body.News.attachmentName7 != "" || req.body.News.attachmentName8 != "" || req.body.News.attachmentName9 != "" || req.body.News.attachmentName10 != "") {
      sails.hooks['email-without-ejs'].send({
        bcc: emailList,
        subject: req.body.News.newsName,
        text: bodyString,
        attachments: [
          {
            filename: req.body.News.attachmentName,
            path: req.body.News.attachment
          },
          {
            filename: req.body.News.attachmentName2,
            path: req.body.News.attachment2
          },
          {
            filename: req.body.News.attachmentName3,
            path: req.body.News.attachment3
          },
          {
            filename: req.body.News.attachmentName4,
            path: req.body.News.attachment4
          },
          {
            filename: req.body.News.attachmentName5,
            path: req.body.News.attachment5
          },
          {
            filename: req.body.News.attachmentName6,
            path: req.body.News.attachment6
          },
          {
            filename: req.body.News.attachmentName7,
            path: req.body.News.attachment7
          },
          {
            filename: req.body.News.attachmentName8,
            path: req.body.News.attachment8
          },
          {
            filename: req.body.News.attachmentName9,
            path: req.body.News.attachment9
          },
          {
            filename: req.body.News.attachmentName10,
            path: req.body.News.attachment10
          }

        ],
      }, function (err) { console.log(err || "Email Sent with attachment!") })
    }

    //Send email to users in the email list without attachment file
    if (emailList.length > 0 && req.body.News.attachmentName == "") {
      sails.hooks['email-without-ejs'].send({
        bcc: emailList,
        subject: req.body.News.newsName,
        text: bodyString,
      }, function (err) { console.log(err || "Email Sent without attachment!") })
    }

    return res.json(await News.create(req.body.News).fetch());
  },





  news_detail: async function (req, res) {
    //    var models = await News.find({sort:'create_at DESC'});

    var id = req.params.id || '';

    if (req.method === 'GET') {
      return res.view('admin/news/detail', { news: await News.findOne(id) });
    }

    if (!req.body.News) { return res.badRequest(); }

    req.body.News.startDate = new Date(req.body.News.startDate);
    req.body.News.endDate = new Date(req.body.News.endDate);

    var userArray = [];
    userArray = req.body.News.userGroup;
    var sendCoach = [];
    var sendMember = [];
    var sendJudge = [];
    var sendAthlete = [];

    //Get array of each usergroup if checkbox is selected
    if (req.body.News.userGroup != null) {
      if (userArray.includes("member")) {
        sendMember = await User.find({
          where: { role: 'member' },
        });
      }
      if (userArray.includes("coach")) {
        sendCoach = await User.find({
          where: { role: 'coach' },
        });
      }
      if (userArray.includes("judge")) {
        sendJudge = await User.find({
          where: { role: 'judge' },
        });
      }
      if (userArray.includes("athlete")) {
        sendAthlete = await User.find({
          where: { role: 'athlete' },
        });
      }
    }

    //Get the email field of each usergroup arrray
    function getEmails(input, field) {
      var output = [];
      for (var i = 0; i < input.length; ++i)
        output.push(input[i][field]);
      return output;
    }

    var emailList = [];

    var coachEmails = getEmails(sendCoach, "Email");
    var memberEmails = getEmails(sendMember, "Email");
    var judgeEmails = getEmails(sendJudge, "Email");
    var athleteEmails = getEmails(sendAthlete, "Email");

    //Combine all arrays into one email list
    emailList = coachEmails.concat(memberEmails, judgeEmails, athleteEmails);

    //Email template for the email body
    var bodyString = "標題: <活動名稱>\n\n敬啟者:\n\n以下是<活動名稱>最新資訊，敬請留意，謝謝\n\n";
    bodyString += req.body.News.content;
    bodyString += "\n\n中國香港體操總會";


    //Send email to users in the email list with attachment file
    if (emailList.length > 0 && req.body.News.attachmentName != "" || req.body.News.attachmentName2 != "" || req.body.News.attachmentName3 != "" || req.body.News.attachmentName4 != "" || req.body.News.attachmentName5 != "" || req.body.News.attachmentName6 != "" || req.body.News.attachmentName7 != "" || req.body.News.attachmentName8 != "" || req.body.News.attachmentName9 != "" || req.body.News.attachmentName10 != "") {
      sails.hooks['email-without-ejs'].send({
        bcc: emailList,
        subject: req.body.News.newsName,
        text: bodyString,
        attachments: [
          {
            filename: req.body.News.attachmentName,
            path: req.body.News.attachment
          },
          {
            filename: req.body.News.attachmentName2,
            path: req.body.News.attachment2
          },
          {
            filename: req.body.News.attachmentName3,
            path: req.body.News.attachment3
          },
          {
            filename: req.body.News.attachmentName4,
            path: req.body.News.attachment4
          },
          {
            filename: req.body.News.attachmentName5,
            path: req.body.News.attachment5
          },
          {
            filename: req.body.News.attachmentName6,
            path: req.body.News.attachment6
          },
          {
            filename: req.body.News.attachmentName7,
            path: req.body.News.attachment7
          },
          {
            filename: req.body.News.attachmentName8,
            path: req.body.News.attachment8
          },
          {
            filename: req.body.News.attachmentName9,
            path: req.body.News.attachment9
          },
          {
            filename: req.body.News.attachmentName10,
            path: req.body.News.attachment10
          }
        ],
      }, function (err) { console.log(err || "Email Sent with attachment!") })
    }

    //Send email to users in the email list without attachment file
    if (emailList.length > 0 && req.body.News.attachmentName == "") {
      sails.hooks['email-without-ejs'].send({
        bcc: emailList,
        subject: req.body.News.newsName,
        text: bodyString,
      }, function (err) { console.log(err || "Email Sent without attachment!") })
    }

    return res.json(await News.update(id).set(req.body.News).fetch());
  },




  news_delete: async function (req, res) {

    var deletedNews = await News.destroyOne(req.params.id);

    if (!deletedNews) { return res.notFound(); }

    if (req.wantsJSON) {
      return res.status(204).send();
    } else {
      return res.redirect('/admin/news/');
    }
  },

  email_list: async function (req, res) {
    return res.view('admin/email/index', { emails: await Email.find() });
  },

  email_detail: async function (req, res) {
    return res.json(await Email.update(req.params.id).set(req.body.Email).fetch());
  },

  user_list: async function (req, res) {
    return res.view('admin/user/index', { news: await User.find({ sort: 'create_at DESC' }) });
  },

  user_detail: async function (req, res) {

  },

  event_list: async function (req, res) {
    var models = await Events.find();
    return res.view('admin/events/index', { events: models });
  },


  events_create: async function (req, res) {

    if (req.method === 'GET') {
      return res.view('admin/events/create', { events: {} });
    }

    if (!req.body.Events) return res.badRequest();
    req.body.Events.start = new Date(req.body.Events.start);
    req.body.Events.end = new Date(req.body.Events.end);
    // req.session.data = req.body.Events;


    return res.json(await Events.create(req.body.Events).fetch())
  },


  events_delete: async function (req, res) {

    var deletedEvents = await Events.destroyOne(req.params.id);

    if (!deletedEvents) return res.notFound();

    if (req.wantsJSON) {
      return res.status(204).send();
    } else {
      return res.redirect('/admin/events/');
    }
  },

  events_detail: async function (req, res) {

    var id = req.params.id || '';

    if (req.method === 'GET') {
      return res.view('admin/events/detail', { events: await Events.findOne(id) });
    }

    if (!req.body.Events) { return res.badRequest(); }

    req.body.Events.start = new Date(req.body.Events.start);
    req.body.Events.end = new Date(req.body.Events.end);

    return res.json(await Events.update(id).set(req.body.Events).fetch());
  },

  //applyHandle
  /*apply_search: async function (req, res) {
    req.session.searchResult = {};
    var condition = {};
    var form = req.query.application;
    var projectYear = req.query.year;
  
    if (req.query.application == "TRGP") {
      if (req.query.year) condition.compYear = req.query.year;
      if (req.query.category) condition.category = req.query.category;
      if (req.query.payStatus) condition.payStatus = req.query.payStatus;
      if (req.query.formStatus) condition.formStatus = req.query.formStatus;
      if (req.query.teamStatus) condition.teamStatus = req.query.teamStatus;
  
      var models = await TRGP.find({
        where: condition
      });
    } else if (req.query.application == "TRGS") {
      if (req.query.year) condition.compYear = req.query.year;
      if (req.query.category) condition.category = req.query.category;
      if (req.query.payStatus) condition.payStatus = req.query.payStatus;
      if (req.query.formStatus) condition.formStatus = req.query.formStatus;
      if (req.query.teamStatus) condition.teamStatus = req.query.teamStatus;
  
      var models = await TRGS.find({
        where: condition
      });
  
    } else if (req.query.application == "GRGS") {
      if (req.query.year) condition.compYear = req.query.year;
      if (req.query.category) condition.category = req.query.category;
      if (req.query.payStatus) condition.payStatus = req.query.payStatus;
      if (req.query.formStatus) condition.formStatus = req.query.formStatus;
      if (req.query.teamStatus) condition.teamStatus = req.query.teamStatus;
  
      var models = await GRGS.find({
        where: condition
      });
    } else if (req.query.application == "GRGP") {
      if (req.query.year) condition.compYear = req.query.year;
      if (req.query.category) condition.category = req.query.category;
      if (req.query.payStatus) condition.payStatus = req.query.payStatus;
      if (req.query.formStatus) condition.formStatus = req.query.formStatus;
      if (req.query.teamStatus) condition.teamStatus = req.query.teamStatus;
  
      var models = await GRGP.find({
        where: condition
      });
    } else if (req.query.application == "trampoline") {
      if (req.query.year) condition.compYear = req.query.year;
      if (req.query.gender) condition.gender = req.query.gender;
      if (req.query.category) condition.category = req.query.category;
      if (req.query.payStatus) condition.payStatus = req.query.payStatus;
      if (req.query.formStatus) condition.formStatus = req.query.formStatus;
      if (req.query.teamStatus) condition.teamStatus = req.query.teamStatus;
  
      var models = await Trampoline.find({
        where: condition
      });
    } else if (req.query.application == "gfa") {
      if (req.query.year) condition.compYear = req.query.year;
      if (req.query.category) condition.category = req.query.category;
      if (req.query.payStatus) condition.payStatus = req.query.payStatus;
      if (req.query.formStatus) condition.formStatus = req.query.formStatus;
      if (req.query.teamStatus) condition.teamStatus = req.query.teamStatus;
  
      var models = await GFA.find({
        where: condition
      });
    } else if (req.query.application == "acroage") {
      if (req.query.year) condition.compYear = req.query.year;
      if (req.query.item) condition.item = req.query.item;
      if (req.query.category) condition.category = req.query.category;
      if (req.query.payStatus) condition.payStatus = req.query.payStatus;
      if (req.query.formStatus) condition.formStatus = req.query.formStatus;
      if (req.query.teamStatus) condition.teamStatus = req.query.teamStatus;
  
      var models = await Acroage.find({
        where: condition
      });
  
    } else if (req.query.application == "clubMem") {
      if (req.query.year) condition.clubYear = req.query.year;
      if (req.query.payStatus) condition.payStatus = req.query.payStatus;
      if (req.query.formStatus) condition.formStatus = req.query.formStatus;
      var models = await ClubMember.find({
        where: condition
      });
  
    }
    req.session.searchResult = condition;
    return res.view('admin/applyHandle/search', { applications: models, form, projectYear });
  },*/

  acroSearch: async function (req, res) {
    req.session.acroSearchResult = {};
    var condition = {};
    var projectYear = req.query.year;

    if (!req.query.year && !req.query.item && !req.query.category && !req.query.payStatus && !req.query.formStatus && !req.query.teamStatus) {
      var models = await Acroage.find();

    } else {
      if (req.query.year) { condition.compYear = req.query.year; }
      if (req.query.item) { condition.item = req.query.item; }
      if (req.query.category) { condition.category = req.query.category; }
      if (req.query.payStatus) { condition.payStatus = req.query.payStatus; }
      if (req.query.formStatus) { condition.formStatus = req.query.formStatus; }
      if (req.query.teamStatus) { condition.teamStatus = req.query.teamStatus; }
      var models = await Acroage.find({
        where: condition
      });
      req.session.acroSearchResult = condition;
    }

    return res.view('admin/applyHandle/acroSearch', { applications: models, projectYear });
  },

  gfaSearch: async function (req, res) {
    req.session.gfaSearchResult = {};
    var condition = {};
    var projectYear = req.query.year;

    if (!req.query.year && !req.query.category && !req.query.payStatus && !req.query.formStatus && !req.query.teamStatus) {
      var models = await GFA.find();

    } else {
      if (req.query.year) { condition.compYear = req.query.year; }
      if (req.query.category) { condition.category = req.query.category; }
      if (req.query.payStatus) { condition.payStatus = req.query.payStatus; }
      if (req.query.formStatus) { condition.formStatus = req.query.formStatus; }
      if (req.query.teamStatus) { condition.teamStatus = req.query.teamStatus; }
      var models = await GFA.find({
        where: condition
      });
      req.session.gfaSearchResult = condition;
    }

    return res.view('admin/applyHandle/gfaSearch', { applications: models, projectYear });
  },

  trampolineSearch: async function (req, res) {
    req.session.tramSearchResult = {};
    var condition = {};
    var projectYear = req.query.year;

    if (!req.query.year && !req.query.gender && !req.query.category && !req.query.payStatus && !req.query.formStatus && !req.query.teamStatus) {
      var models = await Trampoline.find();

    } else {
      if (req.query.year) { condition.compYear = req.query.year; }
      if (req.query.gender) { condition.gender = req.query.gender; }
      if (req.query.category) { condition.category = req.query.category; }
      if (req.query.payStatus) { condition.payStatus = req.query.payStatus; }
      if (req.query.formStatus) { condition.formStatus = req.query.formStatus; }
      if (req.query.teamStatus) { condition.teamStatus = req.query.teamStatus; }
      var models = await Trampoline.find({
        where: condition
      });
      req.session.tramSearchResult = condition;
    }

    return res.view('admin/applyHandle/trampolineSearch', { applications: models, projectYear });
  },

  clubMemberSearch: async function (req, res) {
    req.session.clubMemSearchResult = {};
    var condition = {};
    var projectYear = req.query.year;

    if (!req.query.year && !req.query.payStatus && !req.query.formStatus) {
      var models = await ClubMember.find();

    } else {
      if (req.query.year) { condition.clubYear = req.query.year; }
      if (req.query.payStatus) { condition.payStatus = req.query.payStatus; }
      if (req.query.formStatus) { condition.formStatus = req.query.formStatus; }
      var models = await ClubMember.find({
        where: condition
      });
      req.session.clubMemSearchResult = condition;
    }

    return res.view('admin/applyHandle/clubMemberSearch', { applications: models, projectYear });
  },

  HKRGASearch: async function (req, res) {
    req.session.hkrgaSearchResult = {};
    var condition = {};
    var form = req.query.application;
    var projectYear = req.query.year;

    if (!req.query.application && !req.query.year && !req.query.category && !req.query.payStatus && !req.query.formStatus && !req.query.teamStatus) {
      var trgpModels = await TRGP.find();
      var trgsModels = await TRGS.find();
      var grgpModels = await GRGP.find();
      var grgsModels = await GRGS.find();

    } else {
      if (req.query.year) { condition.compYear = req.query.year; }
      if (req.query.category) { condition.category = req.query.category; }
      if (req.query.payStatus) { condition.payStatus = req.query.payStatus; }
      if (req.query.formStatus) { condition.formStatus = req.query.formStatus; }
      if (req.query.teamStatus) { condition.teamStatus = req.query.teamStatus; }

      if (req.query.application) {
        if (req.query.application == 'TRGP') {
          var trgpModels = await TRGP.find({
            where: condition
          });

        } else if (req.query.application == 'TRGS') {
          var trgsModels = await TRGS.find({
            where: condition
          });
        } else if (req.query.application == 'GRGP') {
          var grgpModels = await GRGP.find({
            where: condition
          });
        } else if (req.query.application == 'GRGS') {
          var grgsModels = await GRGS.find({
            where: condition
          });
        }

      } else {
        var trgpModels = await TRGP.find({
          where: condition
        });
        var trgsModels = await TRGS.find({
          where: condition
        });
        var grgpModels = await GRGP.find({
          where: condition
        });
        var grgsModels = await GRGS.find({
          where: condition
        });
      }

      req.session.hkrgaSearchResult.form = req.query.application;
      req.session.hkrgaSearchResult = condition;
    }

    return res.view('admin/applyHandle/HKRGASearch', { trgpApp: trgpModels, trgsApp: trgsModels, grgpApp: grgpModels, grgsApp: grgsModels, form, projectYear });
  },



};

