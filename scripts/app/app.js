//https://chrome.google.com/webstore/detail/allow-control-allow-origi/nlfbmbojpeacfghkpbjhddihlkkiljbi/related
//http://cocktails.wikia.com/wiki/Cocktails_Wiki
define(
    [
        'jquery',
        'underscore',
        'backbone',
        'constantsWiki'
    ], 
    function(
        $,
        _,
        Backbone,
        constantsWiki
    ) {

        'use strict';

        var wiki = wiki || {};


        var viewWiki = Backbone.View.extend({

            el: "#whiskey-content",

            template: _.template( $("#main-template").html()),

            render: function() {
                this.$el.html('<p>Render</p>');

                return this;
            },

            initialize: function() {
                this.render;
                this.model = new Rectangulo();          
                this.model.on('change', this.render);
            }
        });

        var modelWiki = Backbone.Model.extend({
            defaults: {
                name: "Not specified",
                artist: "Not specified"
            },
            initialize: function() {
                console.log('This model has been initialized.');
            }
        });

        var collectionWiki = Backbone.Collection.extend({
            "model": modelWiki,
            
            "url": "http://cocktails.wikia.com/api/v1/Mercury/WikiVariables/",

            "parse": function(data) {
                return data.data.navData.navigation.wiki;
            } 
        });

        var whiskey = new collectionWiki();

        whiskey.fetch({ "method": "GET" });     

        console.log( whiskey );

    });