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

        // var ModelWiki = Backbone.Model.extend({
        //     defaults: {
        //         "text": 'some',
        //         "href": '#'
        //     }
        // });

        // var CollectionWiki = Backbone.Collection.extend({

        //     model: ModelWiki,

        //     url: "http://cocktails.wikia.com/api/v1/"

        //     // "parse": function(data) {
        //     //     return data.data.navData.navigation.wiki;
        //     // }
        // });

        // var viewCocktail = Backbone.View.extend({

        //     tagName: 'li',

        //     "template": _.template($('#input-search').html()),

        //     render: function(event) {
        //         // $(this.el).html(this.template(this.model.attributes));
        //         return this;
        //     }
        // });

        // var ViewListWiki = Backbone.View.extend({

        //     "el": "#cocktails-content",
            
        //     tagName: 'ul',

        //     initialize: function(){
        //         this.render();
        //     },

        //     render: function(event) {
        //         _.each(this.model.models, function(cocktail) {
        //             // console.log(cocktail);
        //             var childView = new viewCocktail({"model": cocktail});
        //             $(this.el).append(childView.render().el);

        //         },this);

        //         return this.el;
        //     }
        // });

        // var viewWiki = Backbone.View.extend({

        //     template: _.template($('#simple-template').html()),

        //     render: function(event) {
        //         $(this.el).html(this.template(this.model.toJSON()));
        //         return this;
        //     }
        // }); 

        // var wikeList = new CollectionWiki();

        // wikeList.fetch({
        //     "success": function() {       
        //         var viewList = new ViewListWiki({"model": wikeList});
        //         viewList.render();
        //     }
        // });

        var ModelWiki = Backbone.Model.extend({
            defaults: {
                "baseUrlSearch": "http://cocktails.wikia.com/api/v1/Search/List",
                "keywords": " ",
                "limit": 5,
                "minArticleQuality": 10,
                "batch": 1,
                "namespaces": "0%2C14"
            }
        });

        var CollectionWiki = Backbone.Collection.extend({

            model: ModelWiki,

            url: function() {
                var baseData = this.models[0].attributes,
                    baseUrl = baseData.baseUrlSearch,
                    keywords = "?query=" + baseData.keywords,
                    limit = "&limit=" + baseData.limit,
                    minArticleQuality = "&minArticleQuality=" + baseData.minArticleQuality,
                    batch = "&batch=" + baseData.batch,
                    namespaces = "&namespaces=" + baseData.namespaces;

                console.log(keywords);
                return baseUrl+keywords+limit+minArticleQuality+batch+namespaces
            }

        });

        var ViewWiki = Backbone.View.extend({
            "el": "#cocktails-content",

            initialize: function() {
                console.log('initialized');
            }
        });

        var ModelSearch = Backbone.Model.extend({
            defaults: {
                "placeholder": "Search your Cocktail"
            }
        });

        var ViewSearch = Backbone.View.extend({
            "el": "#search-wrapper",

            "template": _.template($('#input-search').html()),

            events: {
                'keyup': 'processKey'
            },

            "initialize": function() {
                var data = this.model.attributes;
                this.render(data);
            },

            render: function(data) {
                $(this.el).html(this.template(data));
                return this;
            },

            processKey: function(e) {
                if(e.which === 13) {
                    var keywords = $(e.currentTarget).children().val();
                    this.submit(keywords);
                }
            },

            submit: function(keywords) {
                var getSearch = new CollectionWiki({
                    "keywords": keywords
                });

                console.log(getSearch);

                getSearch.fetch({
                    "success": function() {
                        var searchRequest = new ViewWiki({
                            "model": getSearch
                        })
                    }
                });
            }
        });

        var mainModelSearch = new ModelSearch({});

        var mainSearch = new ViewSearch({
            "model": mainModelSearch
        })

    });