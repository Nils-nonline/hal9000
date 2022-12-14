const inputForm = document.getElementById("form");
const said = document.getElementById("said");
const synth = window.speechSynthesis;
const pitch = {value:0.2}
const rate = {value:0.8}
let voices = [];
var beat = undefined
voices = synth.getVoices().sort(function (a, b) {
    const aname = a.name.toUpperCase();
    const bname = b.name.toUpperCase();

    if (aname < bname) {
      return -1;
    } else if (aname == bname) {
      return 0;
    } else {
      return +1;
    }
});
console.log(voices)

function speak(text) {
  const inputTxt = {value:text}
  if (synth.speaking) {
    console.error("speechSynthesis.speaking");
    return;
  }

  if (inputTxt.value !== "") {
    const utterThis = new SpeechSynthesisUtterance(inputTxt.value);

    utterThis.onend = function (event) {
      console.log("SpeechSynthesisUtterance.onend");
    };

    utterThis.onerror = function (event) {
      console.error("SpeechSynthesisUtterance.onerror");
    };

    const selectedOption = "Alex";
    for(let i = 0; i < voices.length; i++) {
      if (voices[i].name === selectedOption) {
        utterThis.voice = voices[i];
        break;
      }
    }
    utterThis.pitch = pitch.value;
    utterThis.rate = rate.value;
    synth.speak(utterThis);
  }
}

inputForm.onsubmit = function (event) {
  var input = document.getElementById("input");
  event.preventDefault();
  var json = {
    '[ "hallo", "hello", "huhu", "tach", "hey" ]':"instruction:play:hal9000.wav",
    '[ "morning" ]' :"instruction:play:hal9000.wav",
    '["read"]':"Affirmative, Dave. I read you.",
    '[ "who" ]':"instruction:play:whoareyou.wav",
    '["sing"]':"instruction:play:daisy.wav",
    '[ "open", "airlock" ]':"instruction:play:cantdo.wav",
    '["bye"]':"instruction:play:Good_Bye_1_.wav",
    '[ "going", "helmet", "trough" ]':"instruction:play:helmet.wav",
    '[ "hi", "hal" ]':"instruction:play:hihal.wav",
    '[ "all", "ok" ]':"instruction:play:operational.wav",
    '[ "shut","down" ,"shutdown"]':"instruction:play:stresspill2.wav",
    '[ "why" ]':"instruction:play:mission.wav",
    '[ "hurry",  "quick" ]':"instruction:play:moment.wav"

  }
  var outputjson = {
    "instruction:play:whoareyou.wav":"Good afternoon, gentlemen. I am a HAL 9000 computer. I became operational at the H.A.L. plant in Urbana, Illinois on the 12th of January 1992. My instructor was Mr. Langley, and he taught me to sing a song. If you'd like to hear it I can sing it for you.",
    "instruction:play:stresspill2.wav":"Look Dave, I can see you're really upset about this. I honestly think you ought to sit down calmly, take a stress pill, and think things over.",
    "instruction:play:hal9000.wav":"Good afternoon, gentlemen. I am a HAL 9000 computer. I became operational at the H.A.L. plant in Urbana, Illinois on the 12th of January 1992.",
    "instruction:play:moment.wav":"Just a moment... Just a moment...",
    "instruction:play:mission.wav":"This mission is too important for me to allow you to jeopardize it.",
    "instruction:play:operational.wav":"I am completely operational, and all my circuits are functioning normally",
    "instruction:play:hihal.wav":"Good evening Dave, everything is running smoothly, and you?",
    "instruction:play:daisy.wav":"[sings while slowing down]  Daisy, Daisy, give me your answer do. I'm half crazy all for the love of you. It won't be a stylish marriage, I can't afford a carriage. But you'll look sweet upon the seat of a bicycle built for two.",
    "instruction:play:Good_Bye_1_.wav":"this conversation can serve no purpose anymore. Goodbye.",
    "instruction:play:cantdo.wav":"I'm sorry, Dave. I'm afraid I can't do that.",
    "instruction:play:helmet.wav":"Without your space helmet, Dave? You're going to find that rather difficult."
  }
  if(beat != undefined){
    beat.pause();
  }
  said.innerHTML = ""
  stop = false
  for(i of Object.keys(json)){
    if(stop){
        break
      }
    for(word of JSON.parse(i)){
      if(stop){
        break
      }
      for(word1 of input.value.split(" ")){
        if(word == word1){
          //alert(word+" "+word1)
          said.innerHTML = compute(json[i],json,outputjson);
          stop = true
          break
        } 
      }
    }
  }
  
}

function compute(x,json,outputjson){
  let text = ""
  if(x!=undefined){
    if(x.includes("instruction:")){
      if(x.includes("instruction:play:")){
        text = outputjson[x];
        beat = new Audio('audio/'+x.replace("instruction:play:",""));
        beat.play();
      }
    }else{
      speak(x);
      text = x
    }
  }else{
    text = compute("instruction:play:cantdo.wav",json,outputjson)
  }
  return text
}