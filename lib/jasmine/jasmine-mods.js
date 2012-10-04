jasmine.stackTraceFilter = function(msg) {
    var regexList = [/jasmine.js/, /jermaine.js/]; //array of regular expressions to test for
    
    var splitMsg = msg.split("\n"); //create an array of messages separated by \n
    var finalMsg = splitMsg[0] + "\n"; //start the final message with the first line containing the type error

    function regexTest(msgString){
      for (j=0;j<regexList.length;j++){ //loop through the regexList array

        if (msgString.match(regexList[j])){ //test for match
          return true; //if match, return true
        }
      } 
    }

    for (i=1; i<splitMsg.length; i++){  //loop through the message array
      var currMsg = splitMsg[i];
      if (!regexTest(currMsg)){  //send msg string to regexTest function
        finalMsg += splitMsg[i] + "\n";  //if msg doesn't match any of the regexList array items, add to the final message
      }
    }

    return finalMsg;

};


jasmine.HtmlReporter.SpecView.prototype.appendFailureDetail = function() {
  this.detail.className += ' ' + this.status();

  var resultItems = this.spec.results().getItems();
  var messagesDiv = this.createDom('div', { className: 'messages' });

  for (var i = 0; i < resultItems.length; i++) {
    var result = resultItems[i];

    if (result.type == 'log') {
      messagesDiv.appendChild(this.createDom('div', {className: 'resultMessage log'}, result.toString()));
    } else if (result.type == 'expect' && result.passed && !result.passed()) {
      messagesDiv.appendChild(this.createDom('div', {className: 'resultMessage fail'}, result.message));

      if (result.trace.stack) {
        messagesDiv.appendChild(this.createDom('div', {className: 'stackTrace'}, 
                                               jasmine.stackTraceFilter(result.trace.stack)
                                              ));
      }
    }
  }

  if (messagesDiv.childNodes.length > 0) {
    this.detail.appendChild(messagesDiv);
    this.dom.details.appendChild(this.detail);
  }
};

