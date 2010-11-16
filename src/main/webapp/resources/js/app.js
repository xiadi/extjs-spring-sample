Ext.namespace('App');

Ext.onReady(function(){

    App.SpringWriter = Ext.extend(Ext.data.JsonWriter, {
        encode          : false,
        writeAllFields  : true,
        listful         : true,
        constructor     : function(config){
                App.SpringWriter.superclass.constructor.call(this, config);
        },
        render          : function(params, baseParams, data) {
            // override the render function to insert the raw JSON payload
            params.jsonData = data;
        }
    });

    App.myWriter = new App.SpringWriter();

    App.myProxy = new Ext.data.HttpProxy({
        restful         : true,
        url             : '/contacts'
    });

    App.User = Ext.data.Record.create([
         {name: 'id', type: 'integer'},
         {name: 'firstName', type: 'string'},
         {name: 'lastName', type: 'string'},
         {name: 'dob', type: 'date', dateFormat: 'Y-m-d'}
    ]);

    App.myReader = new Ext.data.JsonReader({
        totalProperty   : 'total',
        successProperty : 'success',
        idProperty      : 'id',
        root            : 'data',
        messageProperty : 'message'
    }, App.User);

    // Typical Store collecting the Proxy, Reader and Writer together.
    App.myStore = new Ext.data.Store({
        id              : 'user',
        proxy           : App.myProxy,
        reader          : App.myReader,
        writer          : App.myWriter,  // <-- plugin an instance of our SpringWriter
        autoSave        : false // <-- false would delay executing create, update,
    });
});