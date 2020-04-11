db.getCollection('rules').insert({
    
    "acct" : "costco.citibank.credit-card.2791",
    "criteria" : [ 
        {
            "field" : "description",
            "operation" : "beginsWith",
            "value" : "^CHIPOTLE"
        }
    ],
    "actions" : [ 
        {
            "action" : "replaceAll",
            "field" : "description",
            "replaceWithValue" : "CHIPOTLE"
        }, 
        {
            "action" : "eat-out",
            // "category1" : "amazon",
        }
    ]
        
})