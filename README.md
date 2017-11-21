_Habit Economics_ with @MyH2OBot
===================
This repository contains the source code for the "My H2O" mobile app (bot for [Toshi](https://toshi.org "Toshi")).
>**MyH2OBot: [Demo](https://www.youtube.com/watch?v=_F4tKmcMMEc)** | Idea inspired @ the [Proffer Hackathon](https://proffer.network/hackathon) by [Niraj Swami](https://twitter.com/nswami)
----------

![Habit Economics](https://user-images.githubusercontent.com/567670/33082870-78d20c2a-cea3-11e7-9853-82297ede839d.png)

### What is MyH2OBot?
Habits for Healthy Outcomes (H2O) is an intelligent assistant that helps you be accountable for healthy habits - like drinking more water - in a **fun, motivating & rewarding way**. Let's hack on the idea of a **_'habit economics'_**.

#### **Inspiration**
We all aim to have healthy habits, but somewhere in the daily stress and self 'convincing', we end up not holding ourselves accountable and help ourselves to that extra serving of ice cream or cake. Calorie counting apps don't always work because nobody is there to motivate you!! _But, the case is different when we ask a friend to hold us accountable and motivated!_ <sup>[*](https://www.ncbi.nlm.nih.gov/pubmed/28286739)</sup>

**Imagine this**: what if I could hold a small bounty ($5) with a trusting friend (read: Blockchain!) who will see what I eat and give me parts of the money back as rewards for eating 'good'. **_This is where I got inspired for the idea!_**

Now, this friend is a little sassy. Instead of just giving me a standard amount of money back, they see how often and how good my meals are. So, if I'm very diligent about eating good often and early in my habit, my friend rewards me greater portions - it's like a _**reward for how quickly I'm forming my habit!**_

> Blockchain technologies seem like the perfect fit for this free-form finance use case with a health-focused item!

### Architecture
![Architecture Diagram](https://user-images.githubusercontent.com/567670/32739369-98f8b2ce-c86d-11e7-993d-42b142502507.png)
> Note that we're using a Webview with a filepicker to bypass Toshi client limitations for image messages.

#### APIs Used
The following external APIs have been used in our solution:
- [Clarifai](https://clarifai.com) for Image-based AI
- [Filestack](https://www.filestack.com) for food image capture and link generation
- [Request](https://github.com/request/request) npm package for interacting with our hosted services/APIs

##### A note on AI&nbsp;+ &nbsp;Blockchain
With the power of AI technologies (predicting validation of images and extracting concepts from activity/images), we are able to accentuate the value of a virtual assistant in a finance-related application. In H2O, this focus is currently based on image recognition (tagging concepts) using models we've created for:
- Water identification
- Healthy foods identification (Weight loss, Diabetes, etc)
- Unhealthy foods identification per diet-type (Weight loss, Diabetes, etc)

This enables us to bring in the 'thinking' of medical and nutrition professionals to a distributed scenario (Blockchain!).

### **Next Steps**
#### Social Impact
What if we could involve rewards not just from our own stake, but from other folks that care about our wellbeing? Like family members, health care providers, dietitians, and even insurance services! The potential for a __gamefying__ good habits with secure financial bounties is where H2O can really make an impact!

> We are pinging Diabetes' doctors and experts to help with rolling out good habits - a top reason for healthy management of Diabetes!  

#### Technology Roadmap

We plan to focus on the following aspects of our solution as our next steps:
>- Implement native image checking and validation (so user is not uploading a picture from the web and we can validate the image is coming from the user's camera using AI + profiling technologies)
>- Additional AI models to provide more 'habit' labels by partnering with dietitians and healthcare providers (we've already got some early traction from hackathon weekend's testing!)
>- Hook into payment gateways (food habits when traveling for work!) and native sensors (like continuous glucose monitors and wearables), so our reward validation system is more holistic
>- Social Finance: This is a key enabler as it would allow us to involve with a 3rd party to put the money stake on a user's MyH2O "account" - that way we can enable rewards from family members, medical system and insurance providers!

### About the maker
[Niraj Swami](https://www.linkedin.com/in/nirajswami)

With help from endocrinology fellows, dietitians, and research:
[Calorie-counting Research Paper](https://www.semanticscholar.org/paper/Calorie-counting-compared-to-exchange-system-diets-Wing-Nowalk/cd91680eeb70836ae9f92bc5d06ad2308dce3d14)
[Motivation & Calorie-counting](https://www.ncbi.nlm.nih.gov/pubmed/28286739)
[Social Motivation for Weight Loss](https://www.ncbi.nlm.nih.gov/pubmed/29125393)

----------
### Talk to @MyH2OBot on Toshi
Open Toshi and add @MyH2OBot, or scan:
![toshiprod-bot](https://user-images.githubusercontent.com/567670/32739734-cb00477c-c86e-11e7-85f8-bb80625f0b14.png)

For Toshi Dev Client, add @MyH2OBot, or scan:
![toshidev-bot](https://user-images.githubusercontent.com/567670/32739741-d143296a-c86e-11e7-9a88-cdfb8246fcc6.png)

#### Screenshots
![Screenshot 1](https://user-images.githubusercontent.com/567670/32739480-ffc349c4-c86d-11e7-9737-2e44cc40fe86.PNG)
![Screenshot 2](https://user-images.githubusercontent.com/567670/32739479-ffb89c54-c86d-11e7-8da0-28a1a10a8621.PNG)
![Screenshot 3](https://user-images.githubusercontent.com/567670/32739478-ffa69c84-c86d-11e7-9bb6-8ef99aa074c1.PNG)
![Screenshot 4](https://user-images.githubusercontent.com/567670/32739477-ff954128-c86d-11e7-9c19-012a533f4a82.PNG)
