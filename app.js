'use strict';

/**
 *
 * The Topic model
 * @param {string} text
 * @param {string} emotion
 * @constructor
 */
emo.Topic = function(text, emotion) {
    this.text = text || '';
    this.happy = emotion === 'happy';
    this.meh = emotion === 'meh';
    this.sad = emotion === 'sad';
};

/**
 *
 * @param {string} type
 */
emo.Topic.prototype.vote = function(type) {
    switch (type) {
        case 'happy':
            this.happy++;
            break;
        case 'meh':
            this.meh++;
            break;
        case 'sad':
            this.sad++;
            break;
    }
};

/**
 *
 * The app code
 * @constructor
 */
emo.Tally = function() {
    // DOM elements
    this.$add = $('#addTopic');
    this.$reax = $('#reax');
    this.$topics = $('#topics');
    this.$modalBg = $('#modalBg');
    this.$addModal = $('#addModal');
    this.$cancelAddTopic = $('#cancelAddTopic');
    this.$submitAddTopic = $('#submitAddTopic');
    this.$topicInput = $('#topicInput');

    // data storage
    this.topics = [];
    this.topics.push(new emo.Topic('The rain in Spain', 'happy'));
    this.topics.push(new emo.Topic('Falls mainly on the plain', 'meh'));
    this.topics.push(new emo.Topic('I will not eat them on a train', 'sad'));
    this.topics.push(new emo.Topic('I will not eat them on a plane', 'sad'));

    // state
    this.sortedBy = null;

    this.updateTopics();

    this.listeners();
};

emo.Tally.prototype.listeners = function() {
    this.$add.on('click', this.showAddDialog.bind(this));
    this.$topics.on('mouseenter', '.topic', this.showReax.bind(this));
    this.$topics.on('mouseleave', '.topic', this.hideReax.bind(this));
    this.$reax.on('onmouseenter mouseleave', function(e){
        e.stopPropagation();
    });
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
    this.topics.push(new emo.Topic(topic, emotion));
    this.$topicInput.val('');
    this.updateTopics();
    this.hideAddDialog();
};

emo.Tally.prototype.updateTopics = function() {
    console.log("topics", this.topics);
    this.$topics.empty();
    this.topics.forEach(function (t) {
        this.$topics.append('<div class="topic">' + t.text + '</div>');
    }.bind(this));
};

emo.Tally.prototype.showReax = function(el) {
    var $e = $(el.currentTarget);
    var pos = $e.position();
    this.$reax.css({'top': pos.top+"px", 'left': pos.left + $e.width() - 100+'px'});
    this.$reax.show();
};

emo.Tally.prototype.hideReax = function(el) {
    this.$reax.hide();
};


emo.Tally.prototype.reset = function() {

};