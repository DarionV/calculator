# The Odin Project - Calculator

This is an assignment from The Odin Project. The goal was to practice Javascript by creating a simple calculator application.

## Assignment
 - Create functions that could add, subtract, multiply and divide.
 - Create a calculator UI.
 - Be able to string together several operations.
 - Round long decimals.
 - Have keyboard support
 - Make the design look nice.

Full description: https://www.theodinproject.com/lessons/foundations-calculator

## Idea
For this project, I again wanted to make something that I could practice CSS with. 
I initially was going to create a very minimalistic and sleek design but I wanted to use this opportunity to try something different so I decided to go for a "realistic" look and imitate a real calculator. I selected a few pictures online and let my niece pick the final design.

## Design
After having settled for the design, it was pretty apparent to me how the calculator was supposed to work. I wanted it to mimic an old, simple calculator, like the ones you had in school as a kid. 

Therefore I chose not to add some of the functionalities that other student's have in their calculators. For example when typing "2+2=" the display will not show "2+2=4". It will instead show one thing at a time, with a little "flash" of the digits when pressing buttons as a form of visual feedback.

The buttons are tilted a tiny bit in random directions to make them look a bit loose. When hovering they tilt a bit as well to better sell the effect. 

For the etch-a-sketch project I used a lot of CSS to style the components. I figured I would use SVG's to create the design for this project. As I learned, SVGs are not that good for complex shapes and I had to settle with a .png for the calculator instead, which was a bit of a disappointment, because that meant that I could have just photoshopped the reference image instead of recreating the whole thing with vector graphics. (All graphics on the page was created by me)

In that regard, the etch-a-sketch project was more useful for learning CSS and how to place things properly. With this design, it was more practice with vector graphics. 

## Problems

 - **Problem** 
 I had issues keeping track of all the variables and didn't quite know how to store them correctly to have the functionality that I wanted. Many times, I came up with new booleans and variables that were essentially duplicating the purposes of other variables. Which after a while lead to great confusion.
 **Solution** 
 I deleted a big chunk of the code, along with the variables and made a flow chart on paper, which helped me better understand what variables were needed and when. 
 - **Problem** 
 It was hard to anticipate, and to test for all the different possible combination of keystrokes. If I fixed something, it broke something else. 
 **Solution** 
 Again, the flow chart helped me structure the code. Having some visual representation of the code was very useful in wrapping my head around the issues I faced.

## Takeaways

It can be very helpful to write psuedo code or draw flow charts when planning your code. If I had done that before starting to code I would have saved myself quite a bit of time. I think I redid the code two or three times before getting somewhere. 

I want to focus more on the important things, which is Javascript, HTML and CSS. I feel that I put too much effort on the vector graphics, which isn't part of this course. Instead of making something look nice with a lot of vector graphics, I will try to make it look nice with CSS instead so that I get the practice that I need.



