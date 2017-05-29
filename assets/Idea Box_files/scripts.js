// global vars ??
var ideaTitleInput = $('.title-input');
var ideaBodyInput = $('.body-input');
var ideaArray = [];


// event listeners
$(document).ready(documentReady());

$('.delete-button').on('click', deleteCard);

$('.bottom-section').on('keyup', '.idea-card-header', newHeader);

$('.bottom-section').on('keyup','.article-text-container',newBody);

$('.bottom-section').on('click', 'button.upvote-button', upVote);

$('.bottom-section').on('click', 'button.downvote-button', downVote);

$('.search-box').on('keyup', searchFilter);

// enable save button on inputs
$('.top-section').on('input', function()  {
  enableSaveButton();
})

$('.save-button').on('click', function(event) {
  var ideaTitle = ideaTitleInput.val();
  var ideaBody = ideaBodyInput.val();
  var newIdeaCard = new constructNewIdea(ideaTitle, ideaBody);
  ideaArray.push(newIdeaCard);
  $('.bottom-section').prepend(prependIdeaCard(newIdeaCard));
  storeIdeaCard(newIdeaCard);
  clearInput();
  disableSaveButton();
});

$('.bottom-section').on('click','.completed-task-button', function() {
  var id = $(this).closest('.idea-card').prop('id');
  var parseIdea = JSON.parse(localStorage.getItem(id));
    if(parseIdea.completed === 'no')  {
      $(this).parents('.idea-card').toggleClass('completed');
      parseIdea.completed = 'completed';
    }
    else if(parseIdea.completed === 'completed')  {
      $(this).parents('.idea-card').toggleClass('completed');
      parseIdea.completed = 'no';
    };
  localStorage.setItem(id, JSON.stringify(parseIdea));
});


//Function - Document Ready State
function documentReady() {
  ideasFromLocal();
}

//Functions - Alphabetical
function clearInput() {
  ideaTitleInput.val('');
  ideaBodyInput.val('');
}

function deleteCard() {
  var id = $('.delete-button').closest('.idea-card').prop('id');
  localStorage.removeItem(id);
  $(this).parents('.idea-card').remove();
}

function downVote (e) {
  var id = $(e.target).closest('.idea-card').prop('id');
  var parseIdea = JSON.parse(localStorage.getItem(id));
  if (parseIdea.quality === 'Genius') {
    $(e.target).siblings('p').children().text('Plausible');
  } else if (parseIdea.quality === 'Plausible') {
    $(e.target).siblings('p').children().text('Swill');
  }
  parseIdea.quality = $(e.target).siblings('p').children().text();
  localStorage.setItem(id, JSON.stringify(parseIdea));
}

function ideasFromLocal() {
  var keys = Object.keys(localStorage);
  var keyLength = keys.length;
  for (var i = 0; i < keyLength; i++) {
    prependIdeaCard(JSON.parse(localStorage.getItem(keys[i])));
  }
  for (var j = 0; j < keyLength; j++) {
    ideaArray.push(JSON.parse(localStorage.getItem(keys[j])));
  } return ideaArray;
}

function newBody(e) {
  var id = $(e.target).parents('.idea-card').prop('id');
  var parseIdea = JSON.parse(localStorage.getItem(id));
  var closestBody = $(`#${id}`).find('.article-text-container');
  parseIdea.body = $(closestBody).text();
  localStorage.setItem(id, JSON.stringify(parseIdea));
}

function constructNewIdea(title, body) {
  this.title = title;
  this.body = body;
  this.id = Date.now();
  this.quality = 'Swill';
  this.completed = 'no'
}

function newHeader(e) {
  var id = $(e.target).parents('.idea-card').prop('id');
  var parseIdea = JSON.parse(localStorage.getItem(id));
  var closestHeader = $(`#${id}`).find('.idea-card-header');
  parseIdea.title = $(closestHeader).text();
  localStorage.setItem(id, JSON.stringify(parseIdea));
}

function prependIdeaCard(newIdeaCard) {
  $('.bottom-section').prepend(`
    <article class="idea-card ${newIdeaCard.completed}" id=${newIdeaCard.id}>
      <div class="idea-name-section">
        <h2 contenteditable='true' class="idea-card-header idea-input">${newIdeaCard.title}</h2>
        <button class="delete-button" type="button" name="button"></button>
      </div>
      <div>
        <p contenteditable='true' class="article-text-container idea-input">${newIdeaCard.body}</p>
      </div>
      <div class="quality-control-container">
        <button class="upvote-button" type="button" name="button"></button>
        <button class="downvote-button" type="button" name="button"></button>
        <p class="quality-value" >quality: <span class="quality">${newIdeaCard.quality}</p>
        <button class="completed-task-button" type="button">Completed Task</button>
      </div>
    </article>`);
}

function searchFilter(e) {
  var search = $(e.target).val().toLowerCase();
  var filteredArray = ideaArray.filter(function(myObject) {
    return myObject.body.toLowerCase().includes(search) || myObject.title.toLowerCase().includes(search);
  });
  $('.bottom-section').empty();
  filteredArray.forEach(function (object, index) {
    prependIdeaCard (filteredArray[index]);
  }
);
};


function storeIdeaCard(newIdeaCard) {
  localStorage.setItem(newIdeaCard.id, JSON.stringify(newIdeaCard));
}


function upVote(e) {
  var id = $(e.target).closest('.idea-card').prop('id');
  var parseIdea = JSON.parse(localStorage.getItem(id));
  if (parseIdea.quality === 'Swill') {
    $(e.target).siblings('p').children().text('Plausible');
  } else if (parseIdea.quality === 'Plausible') {
    $(e.target).siblings('p').children().text('Genius');
  }
  parseIdea.quality = $(e.target).siblings('p').children().text();
  localStorage.setItem(id, JSON.stringify(parseIdea));
}

// enable save button
function enableSaveButton()  {
  var toDoTitle = $('.title-input').val();
  var toDoBody = $('.body-input').val();
    if (toDoTitle === "" || toDoBody === "") {
      $('.save-button').prop('disabled', true)
  } else {$('.save-button').prop('disabled', false)
}
}

// disable save button
function disableSaveButton() {
  $('.save-button').prop('disabled', true)
}
