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

        var ModelWiki = Backbone.Model.extend({
            defaults: {
                "text": 'some',
                "href": '#'
            }
        });

        var CollectionWiki = Backbone.Collection.extend({

            model: ModelWiki,

            url: "http://cocktails.wikia.com/api/v1/Search/List",

            "parse": function(data) {
                return data.data.navData.navigation.wiki;
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

            "el": "#cocktails-content",
            
            tagName: 'ul',

            initialize: function(){
                this.render();
            },

            render: function(event) {
                _.each(this.model.models, function(cocktail) {
                    // console.log(cocktail);
                    var childView = new viewCocktail({"model": cocktail});
                    $(this.el).append(childView.render().el);

                },this);

                return this.el;
            }
        });

        var viewWiki = Backbone.View.extend({

            template: _.template($('#simple-template').html()),

            render: function(event) {
                $(this.el).html(this.template(this.model.toJSON()));
                return this;
            }
        }); 

        var wikeList = new CollectionWiki();

        console.log(wikeList);
        wikeList.fetch({
            "success": function() {       
                var viewList = new ViewListWiki({"model": wikeList});
                viewList.render();
            }
        });


    });