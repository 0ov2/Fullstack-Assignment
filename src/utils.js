const pairSum = require('find-pair-sum');

// detecting sums with a 3rd party library
export const detectSums = (input) => {
  var sums = [];
  var parsedInput = [];
  var nanCheck = false;
  
  if (typeof input !== 'object' && input !== null){parsedInput = [...input]}; // convert string of numbers into seperate elements
  if (parsedInput.length === 0){ return "Input is empty" }; // check if user input is empty
  parsedInput.forEach((el) => { if (isNaN(el) === true) { nanCheck = true } }); // check for any non numbers in the user input 
  if (nanCheck) { return 'Input includes not a number' }; // return message if there is a non number in the user input

  try {
    for (var i = 0; i < parsedInput.length; i++){
      var idxs = [];
      for (var a = parsedInput.length -1; a >= 0; a--){ // check and store any duplicate number indexs in the user input for later use
        if (parsedInput[a] === parsedInput[i]){
          idxs.unshift(a);
        }
      }
      var pair = pairSum(parsedInput, parsedInput[i]); // find all pairs in user input
      for (var b = 0; b < pair.length; b++){ // loop through pairs
        if (pair[b][1].index === pair[b][0].index){ // check pair indexs are the same
          var newIndex = idxs.findIndex((obj => obj !== pair[b][1].index)); // find new pair index
          if (sums.findIndex(obj => obj.pA === idxs[newIndex] && obj.pB === pair[b][0].index && obj.sum === i) === -1){ // check for duplicate sum objects with new index
            sums.push({'pA': idxs[newIndex], 'pB': pair[b][0].index, 'sum': i}); // push sum object with new pair index
          }
        }else if (pair[b][1].index === i || pair[b][0].index === i){ // check if pair indexs are the same as the sum idex
          var newIndex = idxs.findIndex((obj => obj !== i)); // find new sum index
          if (newIndex !== -1){
            if (sums.findIndex(obj => obj.pA === pair[b][1].index && obj.pB === pair[b][0].index && obj.sum === idxs[newIndex]) === -1){ // check for duplicate sum objects with new index
              sums.push({'pA': pair[b][1].index, 'pB': pair[b][0].index, 'sum': idxs[newIndex]}); // push sum object with new pair index
            }
          }
        }else if (pair[b][1].index !== pair[b][0].index && i !== pair[b][0].index && i !== pair[b][1].index) { // check for duplicate pair and sum indexs
          if (sums.findIndex(obj => obj.pA === pair[b][1].index && obj.pB === pair[b][0].index && obj.sum === i) === -1){ // check for duplicate sum objects 
            sums.push({'pA': pair[b][1].index, 'pB': pair[b][0].index, 'sum': i}); // push sum object 
          }
        } 
      }
    } 
  } catch (error) {
    console.log(error);
  }
  
  return ((sums.length > 0)? sums : 'No sums found'); // return either calculated sums or no sums found message
};


// Below is how far i got with manually detecting and calculating sums without the use of a 3rd party library, it is not finished
export const manualDetectSums = (input) => {
  var sums = [];
  var parsedInput = [];
  var nanCheck = false;

  if (typeof input !== 'object' && input !== null){parsedInput = [...input]}; // convert string of numbers into seperate elements
  if (parsedInput.length === 0){ return "Input is empty" }; // check if user input is empty
  parsedInput.forEach((el) => { if (isNaN(el) === true) { nanCheck = true } }); // check for any non numbers in the user input 
  if (nanCheck) { return 'Input includes not a number' }; // return message if there is a non number in the user input

  try {
    for (var i = 0; i < parsedInput.length; i++){
      var idxs = [];
      for (var a = parsedInput.length -1; a >= 0; a--){ // check and store any duplicate number indexs for later use
        if (parsedInput[a] === parsedInput[i]){
          idxs.unshift(a);
        }
      }

      parsedInput.forEach((el) => {
        var sum = parseInt(parsedInput[i]) + parseInt(el); // calculate a sum 
        var sumIndex = parsedInput.indexOf(sum.toString()); // check if the calculated sum is in the original array
        if (sumIndex !== -1 && parsedInput.indexOf(el, i) !== i && parsedInput.indexOf(el, i) !== -1){  // check if sum exists, check if 2nd index is not a duplicate and check if 2nd index exists  
          if (sums.findIndex(obj => obj.pA === i && obj.pB === parsedInput.indexOf(el, i) && obj.sum === sumIndex) === -1){ // check for duplicate objects 
            if (sumIndex === i || sumIndex === parsedInput.indexOf(el, i)){ // check for duplicate indexs 
              var newIndex = idxs.findIndex((obj => obj !== sumIndex)); // if there is a duplcate index, use another index from the stored indexs array 
              sums.push({'pA': i, 'pB': parsedInput.indexOf(el, i), 'sum': idxs[newIndex]}); // insert sum object with non-duplicate index 
            } else {
              sums.push({'pA': i, 'pB': parsedInput.indexOf(el, i), 'sum': sumIndex}); // insert sum object
            }
          }
        }
      })
    }
  } catch (error) {
    console.log(error);
  }

  return ((sums.length > 0)? sums : 'No sums found');
}

export function calculateResult(input) {
  let error = null;
  let result = '';
  try {
    result = JSON.stringify(detectSums(input)); // convert result to a readable state for react 
  } catch (e) {
    error = e.message;
  }
  return { input: input, result, error } // return results to react app
}
