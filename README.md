project: connect-411
license: UNLICENSED
author: Deepak Mahat

TODO

1. General UI layout after onboarding
 -- Home
 -- Connect
 -- Chat
2. Save onboarding to DB
3. Implement background function in firebase for matching algorithm 
4. Notification must be functional
5. Make the general UI functional
6. Refine chat feature
7. Refine everything
8. Test

----------------BRAIN STORMING------------------------
Tabs:

Home:

List of potential partners, ranked by match score.
Ability to filter and sort the list of potential partners by criteria such as industry, business stage, location, and the type of partner they are looking for.
Ability to view a public profile of each potential partner, including their name, description, industry, business stage, and the type of partner they are looking for.
Ability to send connection requests to potential partners.

layout will be like gmail inbox app..

SEARCH BAR 
-----------------------------------------------
FILTER BAR
-----------------------------------------------

FOUNDER
  ---     Full Name                         SCORE
(  DM )  Business stage, Industries
  ---    Location
        Looking for [ ] [ ] [ ]                View Profile / star /right swipe 



ASSOCIATE
  ---     Full Name                         SCORE
(  DM )  Occupations....
  ---    Location
        Looking for role [ ] [ ] [ ]




Connections:

List of pending connection requests, sent connection requests, and accepted connections.
Ability to accept or decline pending connection requests.
Ability to view the detailed profile of each connection, including their contact information and any additional details they have provided.
Ability to send messages to connections.
Drawer:

Profile: Ability to update user's profile information.
Settings: Ability to manage user's settings, such as notifications and privacy.
Help: Ability to access help and support information.
Features:

Matchmaking algorithm: The app should use a sophisticated matchmaking algorithm to match users with potential partners based on their profile information, including their industry, business stage, location, and the type of partner they are looking for.
Connection requests: Users should be able to send connection requests to potential partners. Connection requests should include a brief message from the user explaining why they are interested in connecting.
Detailed profiles: Users should be able to view detailed profiles of potential partners, including their contact information and any additional details they have provided.
Messaging: Users should be able to send messages to their connections.
This is just a starting point, of course. You can customize the app to fit the specific needs of your target audience and the goals of your app. For example, you could add features such as the ability to schedule meetings with connections or the ability to share files with connections.

The most important thing is to make the app easy to use and effective at helping users find business partners.

***************************
Score Calculation Formula

Associate                                       Founder                         Score                                            
----------------------------------------------------------------------------------------
Industry ---                                    Industries                                                                             
Type of Partner --                              Type of Partner
Business Stage --                               Business Stage
Mode of Operation ----                          Busines operation mode
Work arrangement                                Work arrangement
Location --                                     Location
Occupation skill --                             Occupational skill
Education Qualification --                      Education
Communication Preference                        Communication Preference
References / NDA / Background Check             NDA / Background Check

Point	Importance	Score
Industry	30	30
Type of Partner	20	20
Business Stage	15	15
Occupation skill	10	10
Location	10	10
Education Qualification	5	5
Work arrangement	5	5
Mode of Operation	2	2
Communication Preference	1	1
References / NDA / Background Check	1	1

Star system alternative is way too much work for user during onboarding
Let's just use hardcoded score for each question as above

3 stars: This is very important to me and I would like to match with partners who also rank this point highly.
2 stars: This is important to me, but I am willing to compromise on this point if I find a good partner who does not rank this point as highly as I do.
1 star: This is not important to me and I do not mind if my partner does not rank this point highly.
