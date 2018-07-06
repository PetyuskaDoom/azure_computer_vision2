// node app2

var nums = [1, 2, 3, 4, 6, 7, 8, 9 , 10];
var output = '';

// Print numbers in initial order
for (var i = 0; i < nums.length; i++) {
  output += nums[i] + ' ';
}
console.log(output);

// Sort the numbers 
var min = 0;
var temp = 0;
    
output = '';

for (var i = 0; i < nums.length; i++) {
  min = i;
	
  for(var j = i; j < nums.length; j++) {
	  if(nums[j] < nums[min])
	    min = j;
	 }
	 temp = nums[i];
	 nums[i] = nums[min];
	 nums[min] = temp;
   
   output += nums[i] + ' ';
}
console.log(output);

temp = 0;
output = '';

// Reverse array - FIX
for(var i = 0; i < nums.length; i++) {
    temp = nums[i];
    nums[i] = nums[nums.length - i - 1];
    //nums[nums.length - 1] = temp;

    output += nums[i] + ' ';
}
console.log(output);
