requirejs.config({
    "baseUrl": "scripts/",
    "paths": {
        "jquery": "vendor/jquery.min",
        "underscore": "vendor/underscore",
        "backbone": "vendor/backbone",
        "constantsWiki": "app/constants/constants",
        "modelsWiki": "app/models/models",
        "collectionWiki": "app/collections/collections",
        "constantsWiki": "app/constants/constants",
        "viewSimpleWiki": "app/views/views",
        "viewMainWiki": "app/views/view-app"
    },

    "waitSeconds": 10
});

requirejs(["app/app"])