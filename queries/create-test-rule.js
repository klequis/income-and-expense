db.getCollection('rules').insertOne({
    "criteria" : [ 
        {
            "_id" : "5e57d48edfb85a470c44e53a",
            "field" : "description",
            "operation" : "beginsWith",
            "value" : "ATM WI"
        }
    ],
    "actions" : [ 
        {
            "_id" : "5e57d48edfb85a470c44e53b",
            "action" : "replaceAll",
            "field" : "description",
            "replaceWithValue" : "ATM WITHDRAWAL"
        }, 
        {
            "_id" : "5e57d48edfb85a470c44e53c",
            "action" : "categorize",
            "category1" : "income",
            "category2" : "para"
        }
    ]
})