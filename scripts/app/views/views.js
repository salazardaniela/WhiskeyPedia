// define(
//     [
//         'jquery',
//         'underscore',
//         'backbone'
//     ], 
//     function(
//         $,
//         _,
//         Backbone,
//     ) {

//         'use strict';

//         var wiki = wiki || {},
//             viewSimple;

//         viewSimple = Backbone.View.extend({

//             "template": _.template( $("#article-template").html()),

//             "render": function() {
//                 alert('some');
//                 this.$el.html(this.template());
//             }

//         });

//         return viewSimple;

//     });