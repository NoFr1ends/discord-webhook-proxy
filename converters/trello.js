const request = require("request");
const discord = require('discord.js');

module.exports = function(app) {


    app.head("/hooks/:id/:token/trello", function(req, res) {
        res.send("");
    });

    app.post("/hooks/:id/:token/trello", async function(req, res) {
        const client = new discord.WebhookClient(req.params.id, req.params.token);

        const author = {
            name: req.body.action.memberCreator.fullName,
            icon_url: req.body.action.memberCreator.avatarUrl
        };

        const type = req.body.action.type;
        console.log('Receive new action', type);
        console.log(req.body.action.data);

        switch(type) {
            case 'addLabelToCard':
                await client.send('', {
                    type: "rich",
                    embeds: [{
                        title: 'Label added',
                        description: 'A new label was added to a card',
                        author,
                        fields: [
                            {name: 'Label', value: req.body.action.data.label.name},
                            {name: 'Card', value: req.body.action.data.card.name},
                        ],
                        provider: {
                            name: 'Trello',
                            url: 'https://trello.com/c/' + req.body.action.data.card.shortLink
                        },
                        url: 'https://trello.com/c/' + req.body.action.data.card.shortLink
                    }]
                });
                break;
            case 'removeLabelFromCard':
                await client.send('', {
                    type: "rich",
                    embeds: [{
                        title: 'Label removed',
                        description: 'A label was removed from a card',
                        author,
                        fields: [
                            {name: 'Label', value: req.body.action.data.label.name},
                            {name: 'Card', value: req.body.action.data.card.name},
                        ],
                        provider: {
                            name: 'Trello',
                            url: 'https://trello.com/c/' + req.body.action.data.card.shortLink
                        },
                        url: 'https://trello.com/c/' + req.body.action.data.card.shortLink
                    }]
                });
                break;
            case 'commentCard':
                await client.send('', {
                    type: "rich",
                    embeds: [{
                        title: 'Commented a card',
                        description: req.body.action.data.text,
                        author,
                        fields: [
                            {name: 'Card', value: req.body.action.data.card.name},
                        ],
                        provider: {
                            name: 'Trello',
                            url: 'https://trello.com/c/' + req.body.action.data.card.shortLink
                        },
                        url: 'https://trello.com/c/' + req.body.action.data.card.shortLink
                    }]
                });
                break;
            case 'createCard':
                await client.send('', {
                    type: "rich",
                    embeds: [{
                        title: 'Created a card',
                        author,
                        fields: [
                            {name: 'Card', value: req.body.action.data.card.name},
                            {name: 'List', value: req.body.action.data.list.name}
                        ],
                        provider: {
                            name: 'Trello',
                            url: 'https://trello.com/c/' + req.body.action.data.card.shortLink
                        },
                        url: 'https://trello.com/c/' + req.body.action.data.card.shortLink
                    }]
                });
                break;
            case 'updateCard':
                if(req.body.action.data.listBefore) {
                    await client.send('', {
                        type: "rich",
                        embeds: [{
                            title: 'Moved a card',
                            description: 'Moved from "' + req.body.action.data.listBefore.name + '" to "' + req.body.action.data.listAfter.name + '"',
                            author,
                            fields: [
                                {name: 'Card', value: req.body.action.data.card.name},
                            ],
                            provider: {
                                name: 'Trello',
                                url: 'https://trello.com/c/' + req.body.action.data.card.shortLink
                            },
                            url: 'https://trello.com/c/' + req.body.action.data.card.shortLink
                        }]
                    });
                } else {
                    await client.send('', {
                        type: "rich",
                        embeds: [{
                            title: 'Updated card',
                            author,
                            fields: [
                                {name: 'Card', value: req.body.action.data.card.name},
                            ],
                            provider: {
                                name: 'Trello',
                                url: 'https://trello.com/c/' + req.body.action.data.card.shortLink
                            },
                            url: 'https://trello.com/c/' + req.body.action.data.card.shortLink
                        }]
                    });
                }
                break;
        }

        res.send("");
    });
};