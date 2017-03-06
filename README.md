# Nextbus Compare

##Description:
This React app finds up to 3 transit station and the corrosponding vechicles arrival time by the station's stop code.
I think the NextBus app used to take in stop code as input, but not any more. When a station have stop code on display, it is often much quicker and more convienant to type in digit than to search for street sign.

##Technology
I decided to use React for this app, which gets its json data from the NextBus API.
As always, I have basic implemented web accessibility and web security best practices.
Real-time input validation has been implemented, the React way. Very fun to do.

##To-Do
* Do some web accessibility testing such  as tab navigation and screen reader test to be sure.

##Image
Input form before data submission, with error message on display:
<kbd>![Input Form with Error](https://github.com/amychan331/nextbus-compare/blob/master/public/img/NC_no_input_output.png)</kbd>

The time chart displaying 3 different station stop, one of which does not exist:
<kbd>![Regular Output](https://github.com/amychan331/nextbus-compare/blob/master/public/img/NC_output.png)</kbd>

Error message for duplicate stop code entry:
<kbd>![Duplicate Input Error](https://github.com/amychan331/nextbus-compare/blob/master/public/img/NC_duplicate_err.png)</kbd>

Error message for maxing out input submission:
<kbd>![Maxed Input Error](https://github.com/amychan331/nextbus-compare/blob/master/public/img/NC_max_input_err.png)</kbd>