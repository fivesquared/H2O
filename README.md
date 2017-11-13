Proffer Hackathon Entry - My H2O (by Niraj Swami)
===================

This repository contains the source code for the My H2O Mobile App (bot for [Toshi](https://toshi.org "Toshi")).  

[TOC]

----------

### What is My H2O?
Health Habits and Outcomes (H2O) is an intelligent assistant that helps you be accountable for healthy habits - like drinking more water - in a **fun, motivating & rewarding way**.

#### **Inspiration**
We all aim to have healthy habits, but somewhere in the daily stress and self 'convincing', we end up not holding ourselves accountable and help ourselves to that extra serving of ice cream or cake. Calorie counting apps don't always work! They need motivation :)  _Actually, the case is different when we ask a friend to hold us accountable and motivated!_

**Imagine this**: what if I could hold a small bounty ($5) with a trusting friend (read: Blockchain!) who will see what I eat and give me parts of the money back as rewards for eating 'good'. **_This is where I got inspired for the idea!_**

Now, this friend is a little sassy. Instead of just giving me a standard amount of money back, they see how often and how good my meals are. So, if I'm very diligent about eating good often and early in my habit, my friend rewards me greater portions - it's like a _**reward for how quickly I'm forming my habit!**_

> Blockchain technologies seem like the perfect fit for this free-form finance use case with a health-focused item!

### Architecture
Insert architecture picture

##### APIs Used
The following external APIs have been used in our solution:
- [Clarifai](https://clarifai.com) for Image-based AI
- [Filestack](https://www.filestack.com) for image storing temporarily
- [Request](https://github.com/request/request) npm package for interacting with our hosted services/APIs

###### A note on AI&nbsp;+ &nbsp;Blockchain
With the power of AI technologies (predicting validation of images and extracting concepts from activity/images), we are able to accentuate the value of a virtual assistant in a finance-related application. In H2O, this focus is currently based on image recognition (tagging concepts) using models we've created for:
- Water identification
- Healthy foods identification (Weight loss, Diabetes, etc)
- Unhealthy foods identification per diet-type (Weight loss, Diabetes, etc)

This enables us to bring in the 'thinking' of medical and nutrition professionals to a distributed scenario (Blockchain!).

### **Next Steps**
##### Social Impact
What if we could involve rewards not just from our own stake, but from other folks that care about our wellbeing? Like family members, health care providers, dietitians, and even insurance services! The potential for a __gamefying__ good habits with secure financial bounties is where H2O can really make an impact!

> We are pinging Diabetes' doctors and experts to help with rolling out good habits - a top reason for healthy management of Diabetes!  

##### Technology Roadmap

We plan to focus on the following aspects of our solution as our next steps:
>- Implement native image checking and validation (so user is not uploading a picture from the web and we can validate the image is coming from the user's camera using AI + profiling technologies)
>- Additional AI models to provide more 'habit' labels by partnering with dietitians and healthcare providers (we've already got some early traction from hackathon weekend's testing!)
>- Hook into payment gateways (food habits when traveling for work!) and native sensors (like continuous glucose monitors and wearables), so our reward validation system is more holistic
>- Social Finance: This is a key enabler as it would allow us to involve with a 3rd party to put the money stake on a user's MyH2O "account" - that way we can enable rewards from family members, medical system and insurance providers!

##### About the maker
[Niraj Swami](https://www.linkedin.com/in/nirajswami)

With help from endocrinology fellows, dietitians, and research:
[Calorie-counting Research Paper](https://www.semanticscholar.org/paper/Calorie-counting-compared-to-exchange-system-diets-Wing-Nowalk/cd91680eeb70836ae9f92bc5d06ad2308dce3d14)
[Motivation & Calorie-counting](https://www.ncbi.nlm.nih.gov/pubmed/28286739)
[Social Motivation for Weight Loss](https://www.ncbi.nlm.nih.gov/pubmed/29125393)
