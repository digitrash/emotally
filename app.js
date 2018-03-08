'use strict';

/**
 * @constructor
 * The Topic model
 */
emo.Topic = function(text, happy, meh, sad) {
    this.text = text || '';
    this.happy = happy || 0;
    this.meh = meh || 0;
    this.sad = sad || 0;
};

/**
 *
 * @param {string} type
 */
emo.Topic.prototype.vote = function(type) {
    switch (type) {
        case happy:
            this.happy++;
            break;
        case meh:
            this.meh++;
            break;
        case sad:
            this.sad++;
            break;
    }
};

/**
 * @constructor
 * The app code
 */
emo.Tally = function() {
    // DOM elements
    this.$add = $('#addTopic');
    this.$reax = $('#reax');
    this.$topics = $('#topics');

    // data storage
    this.topics = [];
    this.topics.push(new emo.Topic('The rain in Spain'));
    this.topics.push(new emo.Topic('Falls mainly on the plain'));
    this.topics.push(new emo.Topic('I will not eat them on a train'));
    this.topics.push(new emo.Topic('I will not eat them on a plane'));

    // state
    this.sortedBy = null;

    this.updateTopics();

    this.listeners();
};

emo.Tally.prototype.listeners = function() {
    this.$add.on('click', this.showAddDialog.bind(this));
    this.$topics.on('mouseenter', '.topic', this.showReax.bind(this));
    this.$topics.on('mouseleave', '.topic', this.hideReax.bind(this));
};

emo.Tally.prototype.showAddDialog = function() {
    var topic = prompt("Enter a new topic", "");
    if (topic) {
        console.log("new topic", topic);
        this.topics.push(new emo.Topic(topic));
        this.updateTopics();
    }
};

emo.Tally.prototype.updateTopics = function() {
    console.log("topics", this.topics);
    this.$topics.empty();
    this.topics.forEach(function (t) {
        this.$topics.append('<div class="topic">' + t.text + '</div>');
    }.bind(this));
};

emo.Tally.prototype.showReax = function(el) {
    // this.$reax.show();
};

emo.Tally.prototype.hideReax = function(el) {
    // this.$reax.hide();
};


emo.Tally.prototype.reset = function() {

};