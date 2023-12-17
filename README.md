project: connect-411
license: UNLICENSED
author: Deepak Mahat
 
 eas build -p android --profile preview2 --local

Notes -- for associate, separate primary occupation & skills
Currently works fulltime partime, will leave job or need side hustle.

##KNOWN ISSUE TO BE RESOLVED AT THE END
1. Annoying keyword pushing tab bar issue in Android
2. Form loading slowness and framerate dropping plus some stutter
3.[SOLVED] Scrolling issue in Android?? -- issue was in  ...TransitionPresets.SlideFromRightIOS, 
    Android gesture handler goes crazy if two things scrolling in same direction




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
        Looking for [ ] [ ] [ ]                View Manage / star /right swipe 



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

Manage: Ability to update user's profile information.
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

Industry
Type of Partner
Business Stage
Occupation skill
Work arrangement
Mode of Operation
Communication Preference
References / NDA / Background Check

Star system alternative is way too much work for user during onboarding
Let's just use hardcoded score for each question as above

3 stars: This is very important to me and I would like to match with partners who also rank this point highly.
2 stars: This is important to me, but I am willing to compromise on this point if I find a good partner who does not rank this point as highly as I do.
1 star: This is not important to me and I do not mind if my partner does not rank this point highly.


/users
  /$user_id
    /name
    /email
    /phone_number
    /avatar
    /banner
    /whoAmI,
    /industries,
    /businessStage,
    /operationMode,
    /location,
    /workArrangementPreference,
    /communicationPreference,
    /partnerTypes,
    /education,
    /occupations,
    /ndaSign,
    /requireBackgroundCheck,
    /agreesBackgroundCheck,
    -
/detailed_profiles
  /$user_id
    /full_bio
    /website
    /social_media
    /portfolio
    /experience
    /references

/connection_requests
  /$connection_request_id
    /sent_by_user_id
    /sent_to_user_id
    /status (sent, received, accepted, declined)

/potential_matches
  /$potential_match_id
    /user1_id
    /user2_id
    /user2_public_profile
      /name
      /profile_picture
      /industry
      /occupation
      /business_stage
      /location
      /education
      /work_arrangement
      /communication_preference
    /match_score

/chat_rooms
  /$chat_room_id
    /participants
      /$user_id
        /name
        /profile_picture
    /messages
      /$message_id
        /user_id
        /timestamp
        /content



---------------------------
Next

Create 10 users -- 3 founder, 7 associates
Match all founders with all associates

Test ability to send connection request
Test ability to chat one to one


Revised potential matches

/potential_matches
  /$user_id_of_this_matches
    /user_id_of_potential_match
        /match_score
        /profile_viewed
        /check_later
        /not_interested

/similar_founders??



THIRD PARTY DEPENDENT

as02156we+6ds+f6/809/9800987=--892q1``

/users
  /$user_id
    /name
    /email
    /phone_number
    /avatar
    /banner
    /whoAmI,
    /industries,
    /businessStage,
    /operationMode,
    /location,

  /potential_matches
    /$user_id
      /user_id_of_potential_match
          /match_score
          /profile_viewed
          /check_later
          /not_interested



---------------------------------------------

Here are some suggestions for how to make the Find tab super useful:

Show the user's match score with each potential match. This will help the user to quickly identify the potential matches that are most likely to be a good fit for them.
Allow the user to filter potential matches by criteria such as industry, occupation, business stage, location, and education. This will make it easier for the user to find potential matches that are a good fit for their specific needs.
Allow the user to see which of their connections have also connected with each potential match. This will help the user to get a better idea of how well-connected each potential match is.
Allow the user to send personalized messages to potential matches along with their connection requests. This will help the user to stand out from other users and make a good first impression.
You could also change the name of the tab from "Find" to "Home". This would make it more clear that this is the main tab of the app and the place where users can go to find new potential matches and connect with other users.

Here are some ideas for how to handle potential matches that have already been viewed:

You could mark the potential matches as "viewed" and move them to a separate section of the tab. This would make it easier for the user to keep track of the potential matches that they have already seen.
You could allow the user to "hide" potential matches that they are not interested in. This would remove the potential matches from the user's view until they decide to unhide them.
You could implement a "swipe to match/reject" feature. This would allow the user to quickly dismiss potential matches that they are not interested in.
Ultimately, the best way to handle potential matches that have already been viewed is to choose a method that is consistent with the overall design and functionality of your app.
----------------------------------------------------------------------------------

Here is the features I will be implementing,please help me out.

View  people with new potential matches (as assigned by algorithm with score)
Action - Report people, Block people, View profile & all available action through profile section

View people whose profile is already viewed

View people to whom connection  request is sent
 -- Action , withdraw request

View rejected requests (you received requests and declined)
-- Action delete 

View declined requests (you sent requests and other party declined)
-- Action delete

View connected people (one party sent other accepted)
-- Action - withdraw connection, initiate chat, exit from connection, 

View bookmarked people (with or without connection 



BACKGROUND CHECK SECTION
View people to whom background check request was sent
View people who sent background check requests
Perform necessary action

NDA SECTION
View people to whom NDA sign request was sent
View people who sent NDA design request, 
View NDA signed people
 Perform necessary action


SEARCH SECTION 
Search people , --> view profile (do available actions)
 search chat messages, 
notes,  
notifications, 
action history


NOTIFICATION SECTION (View & perform relevant action)
View new notifications.
View past notificatons..
Open, mark as read, delete or remind later action kn each notification
Type of notifications --
- New potential matches **see in home page
- Connect Requests accepted/received **go to connection mgt page
- KYC Requests / done **go to kyc page
- NDA Requests / signed **go to NDA page
- New message received in chat **go to chat
- Connected User profile update **view profile
- NDA/Background Check due date reminders **go to nda/kyc page
- Scheduled Meeting reminder --no action
- Note reminder set by yourself to you to take some action --no action

PROFILE SECTION
View peoples  profile & see all shared info
Bookmark people
Save note about people
Send connection request
Edit your profile with all necessary info
Upload/Manage Documents / Media / NDA
Access management on each section --  private, public, to specific user only or group if supports creating group
Access to see  my connected User, by default everyone can see everyone's connection
Initiate Chat


CHAT SECTION
See recent messages
See recent replies
See active chat users
Create/Manage chat groups 

Send receive text messages
Send/Receive Background check request 
Send/Receive NDA sign request.
Schedule meeting in zoom/team/google
Send/Receive documents/media files
Quick view/update your notes on user to communicate better
LLM integration for response suggestion..


-------------------------------------------------------------

HOME Section:

    Dashboard: Provide a summary of important information and notifications.
    Potential Matches: List new potential matches with scores.
    Quick Actions: Allow users to take immediate actions on potential matches (e.g., send connection request, view profile).


MANAGE Section:
    Sent Requests: View and manage sent connection requests.
    Received Requests: View and manage received connection requests.
    Rejected & Declined Requests: Separate tabs for easier management.
    Connected Users: List of people with accepted connection requests.
    Bookmarked Users: Display bookmarked users.


  BACKGROUND CHECK Section:
      Sent Requests: View and manage background check requests sent.
      Received Requests: View and manage received background check requests.
      Actions: Perform necessary actions for background checks.


  NDA Section:
      Sent Requests: View and manage NDA sign requests sent.
      Received Requests: View and manage received NDA sign requests.
      Signed Users: View users who have signed the NDA.
      Actions: Perform necessary actions for NDAs.

CHAT Section:
    Connected Users: List of users you are connected with.
    Chat Groups: Manage and create chat groups.
    Recent Messages: Display recent messages and replies.
    Actions: Initiate chat, withdraw connection, schedule meetings, send/receive background check and NDA requests, manage documents/media files.

NOTIFICATION Section:
    Overview: Quick summary of new notifications.
    Notification Types: Categorize by type (matches, connection requests, KYC requests, NDA requests, messages, etc.).
    Notification History: View past notifications.
    Actions: Open, mark as read, delete, or set reminders for each notification.


PROFILE Section:
    Profile Overview: Display key information about the user.
    Actions: Edit profile, upload/manage documents, access management settings.
    Notes & Bookmarks: View and manage notes and bookmarks for each user.
    Connection Requests: Send connection requests from this section.

SEARCH Section:
    User Search: Search for people and view profiles.
    Chat Search: Search through chat messages.
    Note Search: Search through notes.
    Action History: View history of actions taken.

HISTORY SECTION
    Make sure every action taken by user is logged in database history section
    So it can be listed out easily and presented in the screen, also this can add to the search feature by adding one more thing user can search
    Also can group by
        Profiles viewed.
        Connection requests sent/received.
        Bookmarked profiles.
        Reports made.
        Notes added.

-------------------------------------------------------------------------------------------------------

HOME SECTION
-------------------------

Home Section UI Layout:

Top Header:

Left Icon with Profile Image: Quick access to the user's profile section.
Right Icon with Gear Icon for Settings: Settings page for app configuration.
Greeting Message: Personalized greeting with the user's first name.
Search Bar: Enables users to search for specific profiles or content easily.
******
Summary of Important Information and Notifications:

Display crucial information and notifications, 
>>  Notification Types: Categorize by type (matches, connection requests, KYC requests, NDA requests, messages, etc.).

accepted/declined connection requests, 
>> Someone sent a connection request, invitations
>> Some one accepted the connection request
>> Someone declined the connection request

and upcoming events or reminders.
such as new potential matches, 

Visible only when relevant information is present, to keep the interface clean.
************
Potential Matches Section (Endless Scroll):

Virtualized List: Efficiently loads batches of 20 from the database.
Each list item includes a profile picture, basic summary info, and quick actions like "View Profile" and "Bookmark."
Handling Viewed Profiles:

                Potential Match Item:

                Profile Picture: Visual representation for the user to quickly see the match.
                Basic Summary Info: Key information at a glance, such as name, age, location.
                Quick Actions in List Item:
                "View Profile": Takes users to the detailed profile.
                "Bookmark": Allows users to bookmark a potential match for later viewing.
                Profile Section:

                Within the detailed profile section, provide a more comprehensive set of actions:

                "Send Connection Request": Express interest in connecting.
                "Report": Flag inappropriate content or behavior.
                "Add Note": Add personal notes about the user.

Gray Out or Remove:
Gray out viewed profiles to distinguish them.
Keep them visible but distinguished in the list to avoid accidental skips.
Handling Future Suggestions:

Skip profiles that have been viewed but not acted upon, assuming the user isn't interested.
Prioritize showing new potential matches.




-------------------------------------INTRO-----------------------------------------

Find Associate Intro Script (Professional & Trustworthy)
Scene 1: Shuttle Animation (Fade in)

Narrator (Warm & Confident): Ever dreamt of launching your own venture? Or maybe you possess the skills to take someone else's idea to the next level? But finding the right partner... that feels like a daunting task.

Text Overlay (Animated): Find Associate.

Narrator: Introducing Find Associate, your bridge to entrepreneurial success, no matter where you stand.

Scene 2: Montage of features (Short clips & icons)

Personalized Matching: We go beyond resumes, matching you based on skills, goals, and values.
Vetted Profiles: Build trust with verified backgrounds and transparent profiles.
Secure Collaboration Tools: Brainstorm, share documents, and manage tasks in a trusted environment.
Built-in Communication: Seamless chat and video calls keep your collaboration smooth.
Mentor Connect: Learn from experienced entrepreneurs and gain valuable insights.
Narrator: Find Associate is more than just an app. It's a community of passionate individuals, all driven by the same ambition: to achieve entrepreneurial greatness.

Scene 3: Success Stories (Testimonials & visuals)

Entrepreneur 1: "Find Associate connected me with the perfect co-founder. Together, we're building something truly remarkable."
Business Partner 2: "My skills found a perfect home through Find Associate. This partnership is truly fulfilling."
Narrator: Join the Find Associate network and unlock your entrepreneurial potential.

Text Overlay (Animated): Find your perfect match. Build your dream.

Call to Action: Download Find Associate today and take your first step towards entrepreneurial success.

Note: This script is a starting point, and you can customize it further to fit your specific needs and brand voice. Consider adding:

Music: Uplifting and inspiring background music.
Visuals: Diverse visuals representing entrepreneurs and collaborators.
App Demo: Short clips showcasing key features in action.
Remember, the goal is to capture users' attention, convey your value proposition, and inspire them to take action.


----------------

“Partnership is not a legal contract between two equal individuals. It’s an emotional alliance between two people who are committed to each other’s success.” – Warren Buffet, businessman, investor, and philanthropist
“Success is best when it’s shared.” – Howard Schultz, businessman, author, and former CEO of Starbucks
“A friendship founded on a business is better than a business is founded on friendship.” – John D. Rockefeller, businessman, investor, and philanthropist
“All lasting business is built on friendship.” – Alfred A. Montaper,  engineer, philosopher, and author
“It’s rare to find a business partner who’s selfless. If you’re lucky it happens once in a lifetime.” – Michael Eisner, former CEO of The Walt Disney Company
“The best partnerships aren’t dependent on a more common goal but on a shared path of equality, desire, and no small amount of passion.” – Sarah MacLean, New York Times bestselling author
“If your business partners aren’t working as hard as you, it’s not a partnership it’s a sinking ship.” – Julian Hall, entrepreneur
“While it’s important to be aware of and sensitive to cultural differences when conducting business internationally, the principles of transparency, trust, and partnership are universal.” – Dan Quayle, 44th vice president of the US
“I had a female business partner once. Didn’t work.” – Mel Gibson, actor and film director
“Great things in business are never done by one person; they’re done by a team of people.” – Steve Jobs, entrepreneur, business magnate, and investor, media proprietor
“If everyone is moving forward together, then success takes care of itself.” – Henry Ford, founder of the Ford Motor Company
“Individually we’re one drop, but together we’re an ocean.” – Ryonosoke Satoro, entrepreneur
“Collaboration is the essence of life. The wind, bees, and flowers work together, to spread the pollen.” – Amit Ray, Indian author and “spiritual master”
“I know that the podcast is typically something I can do forever because it’s mine; it’s just me and my producer and business partner, so it’s our business.” – Marc Maron, American stand-up comedian
“I don’t think most people want me to have a business relationship as a senator where my business partners can reap the benefit of my position and I one day get the share the profits.” -Lindsey Graham, American lawyer and politician serving
“I’m no longer an artist, I’m a business partner.” – Pitbull, musician/rapper
“For many, my behavior has been a major disappointment, my behavior has caused considerable  worry  to my business partners, and everyone involved in my business, but most importantly to the younger people we influence, I apologize.” – Tiger Woods, professional golfer
“I’m very open with my business partners, just like I’m with my husband.” – Dolly Parton, singer/songwriter, actress
“”Contract law is essentially a defensive scorched-earth battleground where the constant question is, If my business partner was possessed by a brain-eating monster from beyond spacetime tomorrow, what’s the worst thing they could do to me?” “ – Charles Stross, writer
“Whenever you see a successful business, someone once made a courageous decision.” – Peter Drucker, management consultant, educator, and author
“Success on any level begins when you accept responsibility for creating life what you want. You’re the only person who can truly make it happen. Not your boss, your business partner, your financial planner, or your spouse of life-partner. Just you.” – Paul Clitheroe, television and radio presenter
“The man who’ll use his skill and constructive imagination to see how much he can give for a dollar, instead of how little he can give for a dollar, is bound to succeed.” – Henry Ford founder of the Ford Motor Company
“To me, a spouse should be a life partner and a business partner. Just like any good partner, her strengths must make up for my weaknesses and vice versa.” – Robert Kiyosaki, entrepreneur, and author
“It’s literally true that you can succeed best and quickest by helping others to succeed.” – Napoleon Hill, entrepreneur, and author
“The success combination in business is: do what you do better.., and: do more of what you do …” – David Joseph Schwartz, motivational speaker, and coach
“Just one great partnership with the right person can have an incredible impact on your business success.” – Janine Ogg and Jo Foster, entrepreneurs
“Whenever an individual or a business decides that success has been attained, progress stops.” – Thomas J. Watson, CEO of IBM
“Never burn bridges. Today’s junior jerk, tomorrow’s senior partner.” – Sigourney Weaver
“The best partnerships aren’t dependent on a mere common goal but on a shared path of equality, desire, and no small amount of passion. ” – Sarah MacLean


"Alone we can do so little; together we can do so much." — Helen Keller
"I can do things you cannot, you can do things I cannot; together we can do great things." — Mother Teresa
"We're all water from different rivers, that's why it's so easy to meet; we're all water in this vast, vast ocean, someday we'll evaporate together." — Yoko Ono
"Individually we are one drop, but together we are an ocean." — Ryunosuke Satoro
"One man can be a crucial ingredient on a team, but one man cannot make a team." — Kareem Abdul-Jabbar
"Fight for the things that you care about, but do it in a way that will lead others to join you." — Ruth Bader Ginsburg
"If I have seen further, it is by standing on the shoulders of giants." — Isaac Newton
"If you want to lift yourself up, lift up someone else." — Booker T. Washington
"You cannot shake hands with a clenched fist." — Indira Gandhi
"Surround yourself only with people who are going to take you higher." — Oprah Winfrey