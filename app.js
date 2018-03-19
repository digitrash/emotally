'use strict';

/**
 *
 * The Topic model
 * @typedef Topic
 * @param {string} text
 * @param {string} emotion
 * @param {?number} created
 * @constructor
 */
emo.Topic = function(text, emotion, created) {
    this.created = created || Date.now();
    this.text = text || '';
    this.happy = emotion === 'happy';
    this.meh = emotion === 'meh';
    this.sad = emotion === 'sad';
    this.votes = 0;
};

/**
 *
 */
emo.Topic.prototype.vote = function() {
    this.votes++;
};

/**
 *
 * The app code
 * @constructor
 */
emo.Tally = function() {
    // DOM elements
    this.$add = $('#addTopic');
    this.$topics = $('#topics');
    this.$modalBg = $('#modalBg');
    this.$addModal = $('#addModal');
    this.$cancelAddTopic = $('#cancelAddTopic');
    this.$submitAddTopic = $('#submitAddTopic');
    this.$topicInput = $('#topicInput');
    this.$happyList = this.$topics.find('.happy .bin-items');
    this.$mehList = this.$topics.find('.meh .bin-items');
    this.$sadList = this.$topics.find('.sad .bin-items');

    // data storage
    this.topics = [];

    // temp data for testing
    this.topics.push(new emo.Topic('The rain in Spain', 'happy', 1));
    this.topics.push(new emo.Topic('Falls mainly on the plain', 'meh', 2));
    this.topics.push(new emo.Topic('I will not eat them on a train', 'sad', 3));
    this.topics.push(new emo.Topic('I will not eat them on a plane', 'sad', 4));

    this.updateTopics();
    this.bindEvents();
};

emo.Tally.prototype.bindEvents = function() {
    this.$add.on('click', this.showAddDialog.bind(this));
    this.$topics.on('click', '.vote', this.vote.bind(this));
    this.$cancelAddTopic.on('click', this.hideAddDialog.bind(this));
    this.$submitAddTopic.on('click', this.addTopic.bind(this));
};

emo.Tally.prototype.showAddDialog = function() {
    this.$modalBg.show();
    this.$addModal.show();
};

emo.Tally.prototype.hideAddDialog = function() {
    this.$topicInput.val('');
    this.$modalBg.hide();
    this.$addModal.hide();
};

emo.Tally.prototype.addTopic = function() {
    var topic = this.$topicInput.val();
    if (!topic) {
        return;
    }
    var emotion = $('input[name=emo]:checked').val();
    console.log("new topic/emotion", topic, emotion);
    this.topics.push(new emo.Topic(topic, emotion, null));
    this.$topicInput.val('');
    this.updateTopics();
    this.hideAddDialog();
};

emo.Tally.prototype.updateTopics = function() {
    console.log("topics", this.topics);
    this.$happyList.empty();
    this.$mehList.empty();
    this.$sadList.empty();

    // sort by value
    this.topics.sort(function (a, b) {
      return b.votes - a.votes;
    });

    this.topics.forEach(function (t) {
        if (t.happy) {
            this.$happyList.append(this.buildRow(t));
        }
        if (t.meh) {
            this.$mehList.append(this.buildRow(t));
        }
        if (t.sad) {
            this.$sadList.append(this.buildRow(t));
        }
    }.bind(this));
};

/**
 * Build HTML for a topic row
 * @param {Topic} t
 */
emo.Tally.prototype.buildRow = function(t) {
    return '<div class="topic" data-created="'+ t.created+'">' + t.text +
        ' <span class="votes">'+ t.votes +'</span><i class="vote icon-plus"></i></div>';
};

/**
 * Increment vote count for a selected Topic
 * @param {Object} e
 */
emo.Tally.prototype.vote = function(e) {
    e.stopPropagation();
    var $e = $(e.currentTarget).parent('.topic');
    this.getTopic($e.data('created')).vote();
    this.updateTopics();
};

/**
 * Get Topic for given creation Id
 * @param {number} createdAt
 */
emo.Tally.prototype.getTopic = function(createdAt) {
    return this.topics.find(function (topic) {
        return topic.created === createdAt;
    });
};

emo.Tally.prototype.reset = function() {

};