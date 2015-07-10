//https://chrome.google.com/webstore/detail/allow-control-allow-origi/nlfbmbojpeacfghkpbjhddihlkkiljbi/related
//http://cocktails.wikia.com/wiki/Cocktails_Wiki
define(
    [
        'jquery',
        'underscore',
        'backbone'
    ], 
    function(
        $,
        _,
        Backbone
    ) {

        'use strict';

        /* Start - connection when the user search */
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

                return baseUrl+keywords+limit+minArticleQuality+batch+namespaces
            },

            "parse": function(data) {
                return data.items;
            }
        });

        var ViewSingleWiki = Backbone.View.extend({
            
            "template": _.template($('#success-list').html()),

            "events": {
                "click .title": "showOverlay"
            },

            "render": function(event) {
                $(this.el).html(this.template(this.model.attributes));
                return this;
            },

            "showOverlay": function() {
                var dataId = this.model.attributes.id;

                var show = new ModelOverlay({
                    "id": dataId
                });

                show.fetch({
                    "success": function(data) {
                        var overlay = new ViewOverlay({
                            "model": show
                        })
                    }
                });
            }

        });

        var ViewWiki = Backbone.View.extend({

            "el": "#cocktails-results",

            initialize: function() {
                this.render();
            },

            render: function() {
                var self = this;
                _.each(this.model.models, function(data) {
                    var cocktails = new ViewSingleWiki({"model": data});
                    $(self.el).append(cocktails.render().el);
                })
            }
        });

        var ViewError = Backbone.View.extend({
            
            "el": "#cocktails-results",

            "template": _.template($('#error-list').html()),

            "initialize": function() {
                this.render();
            },

            render: function() {
                $(this.el).html(this.template(this.model.attributes));
            }
        });
        /* End - connection when the user search */

        /* Start - input to search */
        var ModelSearch = Backbone.Model.extend();

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
                    $('#cocktails-results').empty();
                    this.submit(keywords);
                }
            },

            submit: function(keywords) {
                var getSearch = new CollectionWiki({
                    "keywords": keywords
                });

                var errorMsj = new ModelSearch({
                    "error": "Don't have any related with your search, Try with other word"
                });

                getSearch.fetch({
                    "success": function(data) {
                        var searchRequest = new ViewWiki({
                            "model": getSearch
                        })
                    },
                    "error": function() {
                        var searchRequest = new ViewError({
                            "model": errorMsj
                        })
                    }
                });
            }
        });

        var mainModelSearch = new ModelSearch({
            "placeholder": "Search your Cocktail"
        });

        var mainSearch = new ViewSearch({
            "model": mainModelSearch
        })
        /* End - input to search */

        /* Start - populate data */
        var ModelPopulate = Backbone.Model.extend();

        var CollectionSearch = Backbone.Collection.extend({

            model: ModelPopulate,

            url: "http://cocktails.wikia.com/api/v1/Articles/Popular?expand=1&limit=3",

            "parse": function(data) {
                return data.items;
            }

        })

        var ViewPopulate = Backbone.View.extend({

            "template": _.template($('#each-popular').html()),

            "events": {
                "click .title": "showOverlay"
            },

            render: function(event) {
                $(this.el).html(this.template(this.model.attributes));
                return this;
            },

            "showOverlay": function() {
                var dataId = this.model.attributes.id;

                var show = new ModelOverlay({
                    "id": dataId
                });

                show.fetch({
                    "success": function(data) {
                        var overlay = new ViewOverlay({
                            "model": show
                        })
                    }
                });
            }

        });

        var ViewListPopulate = Backbone.View.extend({

            "el": "#cocktails-content",

            initialize: function() {
                this.render();
            },

            render: function() {
                var self = this;
                _.each(this.model.models, function(populate) {
                    var eachPopulate = new ViewPopulate({"model": populate});
                    $(self.el).append(eachPopulate.render().el);
                })
            }

        });

        var mainModelPopulate = new CollectionSearch();

        mainModelPopulate.fetch({
            "success": function() {
                var mainPopulate = new ViewListPopulate({
                    "model": mainModelPopulate
                });
            }
        })
        /* End - populate data */

        /* Start - Overlay */
        var ModelOverlay = Backbone.Model.extend({
            url: function() {
                var baseUrl = "http://cocktails.wikia.com/api/v1/Articles/AsSimpleJson?",
                    dataId = "id=" + this.attributes.id;

                return baseUrl + dataId;
            },

            "parse": function(data) {
                return data;
            }
        });

        var ViewOverlay = Backbone.View.extend({
            "el": "#overlayRegion",

            "template": _.template($('#overlay').html()),

            "events": {
                "click .close": "closeOverlay",
                "click .overlay-layer": "closeOverlay"
            },

            initialize: function(){
                var number = this.model.attributes.id;
                number = number.toString();
                var data = this.model.attributes;
                this.render(data);
            },

            "render": function(data) {
                console.log(data);
                $(this.el).html(this.template(data));
                return this;
            },

            "closeOverlay": function() {
                $(this.el).empty();
            }
        });
        /* End - Overlay */
    });