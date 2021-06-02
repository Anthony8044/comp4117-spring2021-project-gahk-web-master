/**
 * News.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {

    //  ╔═╗╦═╗╦╔╦╗╦╔╦╗╦╦  ╦╔═╗╔═╗
    //  ╠═╝╠╦╝║║║║║ ║ ║╚╗╔╝║╣ ╚═╗
    //  ╩  ╩╚═╩╩ ╩╩ ╩ ╩ ╚╝ ╚═╝╚═╝
    category: {
      type:'string'
    },
    startDate: {
      type:'ref',
      columnType:'datetime'
    },
    newsName: {
      type:'string'
    },
    // endDate: {
    //   type:'ref',
    //   columnType:'datetime'
    // },
    content: {
      type:'string',
    },
    // link: {
    //   type:'string',
    // },
    attachment:{
      type:'string',
    },
    attachmentName:{
      type:'string'
    },
    attachment2: {
      type:'string',
    },
    attachmentName2:{
      type:'string',
    },
    attachment3: {
      type:'string',
    },
    attachmentName3:{
      type:'string',
    },
    attachment4: {
      type:'string',
    },
    attachmentName4:{
      type:'string',
    },
    attachment5: {
      type:'string',
    },
    attachmentName5:{
      type:'string',
    },
    attachment6: {
      type:'string',
    },
    attachmentName6:{
      type:'string',
    },
    attachment7: {
      type:'string',
    },
    attachmentName7:{
      type:'string',
    },
    attachment8: {
      type:'string',
    },
    attachmentName8:{
      type:'string',
    },
    attachment9: {
      type:'string',
    },
    attachmentName9:{
      type:'string',
    },
    attachment10: {
      type:'string',
    },
    attachmentName10:{
      type:'string',
    },
    userGroup: {
      type: 'json',
      columnType:'array',
    }

    //  ╔═╗╔╦╗╔╗ ╔═╗╔╦╗╔═╗
    //  ║╣ ║║║╠╩╗║╣  ║║╚═╗
    //  ╚═╝╩ ╩╚═╝╚═╝═╩╝╚═╝


    //  ╔═╗╔═╗╔═╗╔═╗╔═╗╦╔═╗╔╦╗╦╔═╗╔╗╔╔═╗
    //  ╠═╣╚═╗╚═╗║ ║║  ║╠═╣ ║ ║║ ║║║║╚═╗
    //  ╩ ╩╚═╝╚═╝╚═╝╚═╝╩╩ ╩ ╩ ╩╚═╝╝╚╝╚═╝

  },

};

