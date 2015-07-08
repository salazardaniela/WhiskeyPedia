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

        // var whiskey;

        // var modelWiki = Backbone.Model.extend({});

        // var viewWiki = Backbone.View.extend({

        //     el: "#whiskey-content",

        //     template: _.template( $("#main-template").html()),

        //     render: function() {
        //         console.log('wiki');
        //         this.$el.html(this.model.attributes);

        //         return this;
        //     }
        // });

        // var viewWikiMain = Backbone.View.extend({

        //     el: "#results-data",

        //     initialize: function(start) {
        //         whiskey = new collectionWiki();
        //         whiskey.fetch();
        //         console.log('hay');
        //         console.log( whiskey);

        //         // this.whiskey = new collectionWiki(start);
        //         this.render();
        //     },

        //     render: function() {
        //         console.log('Fuck');
        //         console.log( whiskey );

        //         whiskey.each(function(item) {

        //         console.log(item);
        //             renderEach(item);
        //         }, this);
        //     },

        //     renderEach: function(item) {
        //         console.log('just');
        //         var whiskeyGlass = new viewWiki({
        //             model: item
        //         });
        //         whiskeyGlass.fetch(); 
        //         this.$el.append(whiskeyGlass.render)
        //     }

        // });

        // var collectionWiki = Backbone.Collection.extend({
        //     "model": modelWiki,
            
        //     "url": "http://cocktails.wikia.com/api/v1/Mercury/WikiVariables/",

        //     "parse": function(data) {
        //         return data.data.navData.navigation.wiki;
        //     } 
        // });

        // // var whiskey = new collectionWiki();

        // // whiskey.fetch();     

        // // console.log( whiskey );
        // var vs = new viewWikiMain();
        // vs.setElement($('#whiskey-content')).render();

        var ModelWiki = Backbone.Model.extend({
            urlRoot: "http://cocktails.wikia.com/api/v1/Mercury/WikiVariables/",
            initialize: function(data) {
                console.log(data);
            },

            defaults: {
                "text": 'some',
                "href": '#'
            }
        });

        var CollectionWiki = Backbone.Collection.extend({

            model: ModelWiki,

            url: "http://cocktails.wikia.com/api/v1/Mercury/WikiVariables/",

            "parse": function(data) {
                return data.data.navData.navigation.wiki;
                console.log(this)
            }
        });

        var viewCocktail = Backbone.View.extend({

            tagName: 'li',

            "template": _.template($('#main-template').html()),

            render: function(event) {
                $(this.el).html(this.template(this.model.attributes));
                return this;
            }
        });
        
        var ViewListWiki = Backbone.View.extend({

            tagName: 'ul',

            initialize: function(){
                console.log(this.model.model);
                this.render();
            },

            render: function(event) {
                $(this.el).html(this.el);

                _.each(this.model.models, function(cocktail) {
                    $(this.el).append(new viewCocktail({model: ModelWiki}).render().el);
                },this);
                return this;
            }
        });



        var viewWiki = Backbone.View.extend({

            template: _.template($('#simple-template').html()),

            render: function(event) {
                $(this.el).html(this.template(this.model.toJSON()));
                return this;
            }
        }); 

        // var RouterWiki = Backbone.Router.extend({
        //     routes: {
        //         "": "wiki"
        //     },
        //     wiki: function(page) {
        //         var wikeList = new CollectionWiki();
        //         console.log(wikeList);
        //         wikeList.fetch({
        //             success: function(){
        //                 $('#cocktails-content').html(new ViewListWiki({model: wikeList}).el);
        //             }
        //         });
        //      }
        // });

        // var app = new RouterWiki();
        // Backbone.history.start();

        var wikeList = new CollectionWiki();
        wikeList.fetch({
            success: function(){
                $('#cocktails-content').html(new ViewListWiki({model: wikeList}).el);
            }
        });
    });