var word = "";
var synonyms = [];

function synonymphButtonPressed(event) {
    event.preventDefault();
    document.getElementById("synonymph").src = "/images/synonymph_mad.png";
    if (document.getElementById("submitButton").disabled == true) {
        if (Math.random() > 0.5) document.getElementById("tip").textContent = "Aren't you going to pick a new word? Press the button, not me!";
        else document.getElementById("tip").textContent = "Enough about me, let's start already!";
    } else {
        switch (Math.floor(Math.random() * 8)) {
            case 0:
                document.getElementById("tip").textContent = "Ouch!";
                break;
            case 1:
                document.getElementById("tip").textContent = "I don't appreciate that.";
                break;
            case 2:
                document.getElementById("tip").textContent = "The input field is down there!";
                break;
            case 3:
                document.getElementById("tip").textContent = "Leave me alone...";
                break;
            case 4:
                document.getElementById("tip").textContent = "What are you doing?";
                break;
            case 5:
                document.getElementById("tip").textContent = "No! This is not how you play the game.";
                break;
            case 6:
                document.getElementById("tip").textContent = "*sigh*";
                break;
            case 7:
                document.getElementById("tip").textContent = "Hey, you. Are you crazy?";
                break;
            default:
                document.getElementById("tip").textContent = "You boggle my mind.";
        }

    }
}

function startButtonPressed(event) {
    event.preventDefault();
    fetch("https://wordsapiv1.p.rapidapi.com/words/?soundsMax=5&hasDetails=synonyms,similarTo&partOfSpeech=adjective&random=true", {
        "method": "GET",
        "headers": {
            "x-rapidapi-host": "wordsapiv1.p.rapidapi.com",
            "x-rapidapi-key": "2f8150b9a3mshbbf158886948837p1921fejsnc052ac594f89"
        }
    }).then(function(response) {
            console.log(response);
            return response.json();
    }).then(function(json) {
        console.log(json);
        word = json["word"];
        fetch("https://wordsapiv1.p.rapidapi.com/words/" + word + "/synonyms", {
            "method": "GET",
            "headers": {
                "x-rapidapi-host": "wordsapiv1.p.rapidapi.com",
                "x-rapidapi-key": "2f8150b9a3mshbbf158886948837p1921fejsnc052ac594f89"
            }
        }).then(function(response) {
                console.log(response);
            return response.json();
        }).then(function(json) {
            console.log(json);
            synonyms = [];
            json["synonyms"].forEach((element) => {
                if (element.indexOf(" ") == -1 && element.indexOf("-") == -1 && element.indexOf(word) == -1 && word.indexOf(element) == -1) {
                    synonyms.push(element);
                }
            });
            console.log(synonyms);
            if (synonyms.length < 2) startButtonPressed(event);
            else {
                document.getElementById("word").textContent = "The word is: " + word;
                document.getElementById("submitButton").disabled = false;
                document.getElementById("guess").value = "";
                document.getElementById("guess").setAttribute('value','');
                document.getElementById("tip").textContent = "Alright, the next word is \"" + word + "!\" Can you enter a word that means the same thing?";
                document.getElementById("synonymph").src = "/images/synonymph_think.png";
            }
        }).catch(function(error) {
            console.log(error);
        });
    }).catch(function(error) {
        console.log(error);
    });
}

function submitButtonPressed(event) {
    event.preventDefault();
    if (document.getElementById("guess").value == "") {
        if (Math.random() > 0.5) document.getElementById("tip").textContent = "Um, excuse me? Did you forget to type anything?";
        else document.getElementById("tip").textContent = "You left the input field blank! Please enter a synonym for \"" + word + ".\"";
        document.getElementById("synonymph").src = "/images/synonymph_mad.png";
    } else if (document.getElementById("guess").value.toLowerCase() == word) {
        document.getElementById("tip").textContent = "Hey, you can't just enter the same word! I need a different one!";
        document.getElementById("synonymph").src = "/images/synonymph_mad.png";
    } else if (synonyms.indexOf(document.getElementById("guess").value.toLowerCase()) != -1) {
        document.getElementById("submitButton").disabled = true;
        switch (Math.floor(Math.random() * 3)) {
            case 0:
                document.getElementById("tip").textContent = "Hey, that word works! The meaning of " + document.getElementById("guess").value.toLowerCase() + " matches " + word + "!";
                break;
            case 1:
                document.getElementById("tip").textContent = "" + document.getElementById("guess").value.charAt(0).toUpperCase() + document.getElementById("guess").value.slice(1).toLowerCase() + ", huh? Hey, that actually sounds right! Nice job!";
                break;
            case 2:
                document.getElementById("tip").textContent = "Congratulations, you correctly entered a synonym of " + word + "! There isn't a prize, though.";
                break;
            default:
                document.getElementById("tip").textContent = "Um, you won? I think?";
        }
        document.getElementById("synonymph").src = "/images/synonymph_happy.png";
    } else {
        document.getElementById("synonymph").src = "/images/synonymph_think.png";
        switch (Math.floor(Math.random() * 6)) {
            case 0:
                hint = synonyms[Math.floor(Math.random() * synonyms.length)];
                document.getElementById("tip").textContent = "Sorry, that's not quite right. One of the words that might work starts with '" + hint.charAt(0) + ".'";
                break;
            case 1:
                hint = synonyms[Math.floor(Math.random() * synonyms.length)];
                document.getElementById("tip").textContent = "I don't think that's the word I'm looking for. Maybe try something with '" + hint.charAt(hint.length - 1) + "' at the end?";
                break;
            case 2:
                document.getElementById("tip").textContent = "That doesn't seem correct, but if it is I blame wordsapi.com!";
                break;
            case 3:
                hint = synonyms[Math.floor(Math.random() * synonyms.length)];
                document.getElementById("tip").textContent = "No dice. I'm kind of feeling a " + hint.length + "-letter word.";
                break;
            case 4:
                document.getElementById("tip").textContent = "Nice try! But I'm afraid I can't accept that answer.";
                break;
            case 5:
                document.getElementById("tip").textContent = "If it's too hard, you can always try with a different word instead! Just press the button!";
                break;
            default:
                document.getElementById("tip").textContent = "I don't have anything to say to that...";
        }
    }
}

document.getElementById("synonymphButton").addEventListener("click", synonymphButtonPressed);
document.getElementById("startButton").addEventListener("click", startButtonPressed);
document.getElementById("submitButton").addEventListener("click", submitButtonPressed);
