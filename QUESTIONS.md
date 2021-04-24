## Technical Questions

 - What would you add to your solution if you had more time?
> If I had more time I would add the following features:
 - Localisation of texts.  
 - More code coverage.  
 - Data type enforce (via type script or prop types) .
 - Zoom in or zoom out the order book  to
   have a grasp of the deep of the book.
   To Time out to disconnect the websocket if the tab is not used in N minutes.
 
3. What would you have done differently if you knew this page was going to get thousands of views per second vs per week?
> First to add a login , so only desired users can visit the page.
> To deploy CSS or any image on a CDN to speed up the load of the page.
> To remove unnecessary dependencies on the project, as I added material UI , but if this page only needs a one page order book component, there is no need for the full dependency, this will reduce the size of the bundle. 
> As it is only one page, there is no need for code splitting at the moment, but it could be required later on.
> To add data analytics in order to track the performance and the user interaction with the page. 

4. What was the most useful feature that was added to the latest version of your chosen language? Please include a snippet of code that shows how you've used it.
> Hooks  is not related to the language but  yes to the library of react, it make it so much cleaner and easier to reuse logic across components
> In the language I am a big fan of the spread operator, it makes so simple and clean to update/ merge /  copy  elements of an iterable.
```
setOrderBook((prevState) => ({
...prevState,
...{
errorMsg:GENERIC_ERROR_MESSAGE,
},
}));
```  
5. How would you track down a performance issue in production? Have you ever had to do this?
> Yes, first step is to require all the data possible in order to be able to replicated in another environment. 
> What is the issue ? Steps to reproduce the issue? Version of the WebApp, Version of the API , Backend etc etc, version of the browser, operating system of the user, operating system of the server. 
> Check the logs of the server, browser , http requests , http errors. 
> If the deployed app has a "debug" or "probe" mode, enable it  and increase the level of logs. 
> After gathering all the data, then it is important to know if the issue happens in an out of the box version of the web app or if there is any customization on the top. 
> Am I able to reproduce the error in another environment ? If yes, it is a problem on the app, if not it could be an issue related to the environment. 
> Analyze the root cause of the issue, once it is found, create an automated test so it is easier to reproduce the issue. 
> Fix the issue, if there is a hotfix branch , commit , test  it, and deploy it. 
>I had to do this many times in the past, the error could be in any different layer , so must of the times a team is needed to analyze the issue.   
>I had experience in something call "war rooms" where there is a group of different specialist that collaborate with each other in order to find the issue as soon as possible. 

6. Can you describe common security concerns to consider for a frontend developer?
> The most common security concerns that a front end developer must think about are the following: SQL injection , Cross-Site Scripting , this could be done by cleaning the markup that is going to be generated , so removing any malicious code before it is actually executed, I have used DomPurify in order to do this, specially on places where the output/input accepts rich text, also try to avoid as much as possible any output with rich text. 
> To avoid the use of  `eval` , as this can execute any code on the browser. 
> To avoid the use of cookies  or do not rely on them for the app to work, cookies can be modified by users, this could create issues on the web app. 
> Whenever an API is called, make sure to use https over http, avoid CORS issues by setting the proper headers.
> Avoid sending and receiving clear strings for important information, this could be obscured or encrypted. 
> On forms , to avoid the autocomplete=on on sensible forms or fields. 
  
7. How would you improve the Kraken API that you just used?
> When subscribing , I would like to to be able to set the frequency of the messages, as it might not be necessary to receive so many messages, specially on old mobile phones, after a while of opening the page the CPU usage can go up. 